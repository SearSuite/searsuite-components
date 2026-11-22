import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'vite';

test('component index and individual pages render on the server', async () => {
  const vite = await createServer({ server: { middlewareMode: true, hmr: { port: 24679 } }, appType: 'custom' });
  try {
    const { render } = await vite.ssrLoadModule('/demo/entry-server.tsx');
    const index = render('/');
    assert.equal(index.title, 'Overview - SearSuite Components');
    assert.equal((index.html.match(/data-component=/g) || []).length, 0);
    assert.equal(render('/components').html, index.html);
    assert.match(index.html, /<h1>Overview<\/h1>/);
    assert.match(index.html, /Component model/);
    assert.match(index.html, /<header class="searsuite-header">/);
    assert.match(index.html, /<aside class="searsuite-sidebar" aria-label="Component navigation">/);
    assert.match(index.html, /<footer class="searsuite-footer">/);
    assert.match(index.html, /href="\/" aria-current="page"[^>]*>Overview<\/a>/);
    assert.doesNotMatch(index.html, /gallery-list-number|gallery-component-list|Preview navigation/);
    const components = [
      ['color-swatch', 'ColorSwatch'],
      ['icon', 'Icon'],
      ['button', 'Button'],
      ['icon-button', 'IconButton'],
      ['copy-button', 'CopyButton'],
      ['code-block', 'CodeBlock'],
      ['link', 'Link'],
      ['source-link', 'SourceLink'],
      ['skip-link', 'SkipLink'],
      ['toc-link', 'TocLink'],
      ['brand-mark', 'BrandMark'],
      ['keycap', 'Keycap'],
      ['search-trigger', 'SearchTrigger'],
      ['search-dialog', 'SearchDialog'],
      ['nav-item', 'NavItem'],
      ['group-toggle', 'GroupToggle'],
      ['breadcrumb-item', 'BreadcrumbItem'],
      ['section-heading', 'SectionHeading'],
      ['feedback', 'Feedback'],
      ['header', 'Header'],
      ['breadcrumbs', 'Breadcrumbs'],
      ['sidebar-group', 'SidebarGroup'],
      ['sidebar', 'Sidebar'],
      ['article', 'Article'],
      ['section', 'Section'],
      ['table-of-contents', 'TableOfContents'],
      ['footer', 'Footer'],
      ['page', 'Page'],
    ];
    let previousPosition = -1;
    for (const [id, name] of components) {
      const position = index.html.indexOf(`href="/components/${id}"`);
      assert.ok(position > previousPosition, `${name} should follow the previous component`);
      previousPosition = position;
      const page = render(`/components/${id}`);
      assert.equal(page.title, `${name} - SearSuite Components`);
      assert.equal(page.status, 200);
      assert.equal((page.html.match(/data-component=/g) || []).length, 1);
      assert.match(page.html, new RegExp(`data-component="${name}"`));
      assert.match(page.html, new RegExp(`<a[^>]*href="/components/${id}"[^>]*aria-current="page"[^>]*>${name}</a>`));
      assert.match(page.html, /<article class="searsuite-article">/);
      assert.match(page.html, /<section class="searsuite-section" id="preview">/);
    }
    assert.match(render('/components/page').html, /Page preview/);
    const tocHtml = render('/components/table-of-contents').html;
    assert.match(tocHtml, /class="searsuite-toc-subsections"/);
    assert.match(tocHtml, /href="#toc-install"[^>]*>Install dependencies<\/a>/);
    assert.match(tocHtml, /href="#toc-run"[^>]*>Run the editor<\/a>/);
    assert.equal(render('/components/docs-button').title, 'Button - SearSuite Components');
    const colorHtml = render('/components/color-swatch').html;
    const colorCss = await readFile(new URL('../src/color.css', import.meta.url), 'utf8');
    const colorTokens = [...colorCss.matchAll(/--searsuite-([a-z0-9-]+):/g)].map(match => match[1]);
    assert.equal((colorHtml.match(/data-color-token=/g) || []).length, colorTokens.length);
    for (const token of colorTokens) assert.match(colorHtml, new RegExp(`data-color-token="--searsuite-${token}"`));
    assert.equal(render('/components/unknown').status, 404);
    assert.match(render('/preview/page').html, /SearSuite developer guide/);
    assert.match(render('/components/page').html, /src="\/preview\/page#headless-editor"/);
    assert.equal(render('/missing').status, 404);
  } finally {
    await vite.close();
  }
});
