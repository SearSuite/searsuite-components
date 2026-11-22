import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import React, { act } from 'react';
import { renderToString } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import Prism from 'prismjs';
import * as components from '../dist/index.js';
import { Button, CodeBlock, ColorSwatch, FeatureList, Header, Link, Page, SearchField, SidebarGroup, SiteNavigation, TableOfContents } from '../dist/index.js';

const props = {
  brand: 'SearSuite Docs',
  breadcrumbs: [{ label: 'Home', href: '/' }],
  sidebarTitle: 'Get started',
  navigation: [{ label: 'Quickstart', links: [{ label: 'Commands', href: '#commands' }] }],
  title: 'Create a headless Sheet editor',
  intro: React.createElement('p', null, 'Run Sheet commands without a UI host.'),
  sections: [
    { id: 'overview', title: 'Overview', content: React.createElement('p', null, 'Create an editor.') },
    { id: 'commands', title: 'Commands', content: React.createElement('p', null, 'Export Sheet state.'), searchText: 'editor run' },
  ],
  markdown: '# Create a headless Sheet editor',
};

test('renders the complete page on the server without browser globals', () => {
  const html = renderToString(React.createElement(Page, props));
  assert.match(html, /SearSuite Docs/);
  assert.match(html, /Create a headless Sheet editor/);
  assert.match(html, /href="#commands"/);
  assert.match(html, /In this article/);
  assert.doesNotMatch(html, /Search documentation" type="search"/);
});

test('exports SidebarGroup for standalone server rendering', () => {
  const html = renderToString(React.createElement(SidebarGroup, {
    group: { label: 'Quickstart', links: [{ label: 'Commands', href: '#commands' }] },
    currentHref: '#commands',
  }));
  assert.match(html, /Quickstart/);
  assert.match(html, /href="#commands"/);
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /href="#commands" aria-current="page"/);
});

test('uses the bundled SearSuite brand by default', () => {
  const html = renderToString(React.createElement(Header));
  assert.match(html, /SearSuite/);
  assert.match(html, /searsuite-brand-mark-searsuite/);
});

test('renders website navigation and reference controls from components', () => {
  const html = renderToString(React.createElement('div', null,
    React.createElement(Header, { navigation: React.createElement(SiteNavigation, {
      items: [{ label: 'API', href: '/docs/ref/', current: true }],
    }) }),
    React.createElement(TableOfContents, { heading: 'Contents', sections: [{
      id: 'details-foundation', title: 'Foundation',
      subsections: [{ id: 'sear-foundation-platform', title: 'sear-foundation-platform' }],
    }] }),
    React.createElement(SearchField, { 'data-reference-search': '', placeholder: 'Find an API name' }),
  ));
  assert.match(html, /data-searsuite-component="SiteNavigation"/);
  assert.match(html, /aria-current="page"/);
  assert.match(html, /href="#sear-foundation-platform"/);
  assert.match(html, /class="searsuite-toc"/);
  assert.equal('ReferenceSidebar' in components, false);
  assert.match(html, /data-reference-search=""/);
});

test('exports standalone button, link, and color primitives', () => {
  assert.deepEqual(Object.keys(components).filter(name => /^Docs[A-Z]/.test(name)), []);
  const html = renderToString(React.createElement('div', null,
    React.createElement(Button, { variant: 'feedback', selected: true }, 'Yes'),
    React.createElement(Link, { href: '/guide', variant: 'source' }, 'Guide'),
    React.createElement(ColorSwatch, { color: '#0969da', label: 'Accent', value: '#0969da' }),
  ));
  assert.match(html, /searsuite-feedback-button searsuite-selected/);
  assert.match(html, /href="\/guide"/);
  assert.match(html, /background-color:#0969da/);
  assert.match(html, /Accent/);
});

test('renders linked feature cards without changing static home cards', () => {
  const linked = renderToString(React.createElement(FeatureList, {
    items: [{ title: 'Guide', description: 'Read the guide.', href: '/docs/guide/' }],
  }));
  assert.match(linked, /<a class="searsuite-feature-card"[^>]*href="\/docs\/guide\/"/);
  assert.match(linked, /data-searsuite-component="FeatureCard"/);
  assert.doesNotMatch(linked, /<article/);

  const staticCard = renderToString(React.createElement(FeatureList, {
    items: [{ title: 'Engine', description: 'Composable modules.' }],
  }));
  assert.match(staticCard, /<article class="searsuite-feature-card"/);
});

test('highlights code on the server and escapes source text', () => {
  const typescript = renderToString(React.createElement(CodeBlock, {
    language: 'typescript',
    code: 'const value = "<script>alert(1)</script>";',
  }));
  assert.match(typescript, /data-searsuite-component="CodeBlock"/);
  assert.match(typescript, /class="token keyword">const<\/span>/);
  assert.match(typescript, /class="token definition">value<\/span>/);
  assert.equal(Prism.languages.typescript.definition, undefined);
  assert.match(typescript, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(typescript, /<script>/);
  assert.doesNotMatch(typescript, /class="token definition">script<\/span>/);

  const bash = renderToString(React.createElement(CodeBlock, { language: 'bash', code: 'pnpm install\npnpm dev' }));
  assert.match(bash, /language-bash/);
  assert.match(bash, /class="token function">pnpm<\/span>/);
});

test('hydrates server HTML and opens functional search', async () => {
  const html = renderToString(React.createElement(Page, props));
  const dom = new JSDOM(`<div id="root">${html}</div>`, { url: 'https://searsuite.com/docs#commands', pretendToBeVisual: true });
  const old = Object.fromEntries(['window', 'document', 'HTMLElement', 'Node', 'IS_REACT_ACT_ENVIRONMENT'].map(key => [key, globalThis[key]]));
  Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Node: dom.window.Node, IS_REACT_ACT_ENVIRONMENT: true });
  const errors = [];
  const oldError = console.error;
  console.error = (...args) => errors.push(args.join(' '));
  let root;
  try {
    const { hydrateRoot } = await import('react-dom/client');
    await act(async () => { root = hydrateRoot(dom.window.document.getElementById('root'), React.createElement(Page, props)); });
    assert.equal(dom.window.document.querySelector('.searsuite-toc-active')?.getAttribute('href'), '#commands');
    await act(async () => { dom.window.document.querySelector('.searsuite-header-search').click(); });
    assert.ok(dom.window.document.querySelector('[role="dialog"]'));
    assert.equal(dom.window.document.activeElement?.getAttribute('type'), 'search');
    assert.deepEqual(errors, []);
    await act(async () => root.unmount());
  } finally {
    console.error = oldError;
    for (const [key, value] of Object.entries(old)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
    dom.window.close();
  }
});

test('ships a standalone stylesheet for SSR consumers', async () => {
  const css = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');
  const colors = await readFile(new URL('../dist/color.css', import.meta.url), 'utf8');
  const website = await readFile(new URL('../dist/website.css', import.meta.url), 'utf8');
  assert.match(css, /@import '\.\/color\.css'/);
  assert.match(css, /\.searsuite-article-layout/);
  assert.match(css, /\.\/assets\/searsuite-logo\.png/);
  assert.match(colors, /--searsuite-primary-500:#3182dc/);
  assert.match(colors, /--searsuite-blue:var\(--searsuite-link\)/);
  assert.match(website, /@import '\.\/styles\.css'/);
  const logo = await readFile(new URL('../dist/assets/searsuite-logo.png', import.meta.url));
  assert.equal(logo.subarray(1, 4).toString(), 'PNG');
});

test('keeps fixed color values in the Color stylesheet', async () => {
  for (const directory of ['src', 'demo']) {
    const root = new URL(`../${directory}/`, import.meta.url);
    for (const file of await readdir(root, { recursive: true })) {
      if (!/\.(?:css|ts|tsx)$/.test(file) || file === 'color.css') continue;
      const source = await readFile(new URL(file, root), 'utf8');
      assert.doesNotMatch(source, /#[0-9a-f]{3,8}\b|rgba?\(/i, `${directory}/${file}`);
    }
  }
  const html = renderToString(React.createElement(ColorSwatch, { token: 'primary-500', label: 'Brand primary' }));
  assert.match(html, /background-color:var\(--searsuite-primary-500\)/);
  assert.match(html, /--searsuite-primary-500/);
});

test('primary link and fill colors meet text contrast on white', async () => {
  const css = await readFile(new URL('../src/color.css', import.meta.url), 'utf8');
  const luminance = (hex) => {
    const channels = [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255);
    return channels.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  };
  for (const shade of [600, 700]) {
    const hex = css.match(new RegExp(`--searsuite-primary-${shade}:(#[0-9a-f]{6})`))?.[1];
    assert.ok(hex);
    assert.ok(1.05 / (luminance(hex) + 0.05) >= 4.5, `${hex} must contrast with white`);
  }
});
