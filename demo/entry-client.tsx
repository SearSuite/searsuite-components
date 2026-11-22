import { hydrateRoot } from 'react-dom/client';
import { App } from './App.js';
import { ComponentGallery } from './ComponentGallery.js';

const pathname = window.location.pathname.replace(/\/$/, '') || '/';
const requestedId = pathname.startsWith('/components/') ? pathname.slice('/components/'.length)
  : pathname === '/' || pathname === '/components' ? undefined : pathname;
const componentId = requestedId?.startsWith('docs-') ? requestedId.slice(5) : requestedId;
hydrateRoot(document.getElementById('root')!, pathname === '/preview/page' ? <App /> : <ComponentGallery componentId={componentId} />);
