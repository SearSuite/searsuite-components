import { createServer as createHttpServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createServer as createViteServer } from 'vite';

const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'custom' });
const template = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const port = Number(process.env.PORT || 5181);

const server = createHttpServer((request, response) => {
  vite.middlewares(request, response, async () => {
    try {
      const { render } = await vite.ssrLoadModule('/demo/entry-server.tsx');
      const pathname = new URL(request.url || '/', 'http://localhost').pathname.replace(/\/$/, '') || '/';
      const page = render(pathname);
      const html = (await vite.transformIndexHtml(request.url || '/', template))
        .replace('Overview - SearSuite Components', page.title)
        .replace('<!--app-html-->', page.html);
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.statusCode = page.status;
      response.end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      response.statusCode = 500;
      response.end(String(error));
    }
  });
});

server.listen(port, () => console.log(`Component gallery: http://localhost:${port}/components`));
