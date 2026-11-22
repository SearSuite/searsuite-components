import { renderToString } from 'react-dom/server';
import { App } from './App.js';
import { ComponentGallery, componentCatalog } from './ComponentGallery.js';

export function render(pathname: string) {
  const pagePreview = pathname === '/preview/page';
  const requestedId = pathname.startsWith('/components/') ? pathname.slice('/components/'.length)
    : pathname === '/' || pathname === '/components' ? undefined : pathname;
  const componentId = requestedId?.startsWith('docs-') ? requestedId.slice(5) : requestedId;
  const selectedComponent = componentCatalog.find(component => component.id === componentId);
  return {
    title: pagePreview ? 'Page preview - SearSuite Components' : `${selectedComponent?.name ?? 'Overview'} - SearSuite Components`,
    status: pagePreview || !componentId || selectedComponent ? 200 : 404,
    html: renderToString(pagePreview ? <App /> : <ComponentGallery componentId={componentId} />),
  };
}
