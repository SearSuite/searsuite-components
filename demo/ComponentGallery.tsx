import { useState, type ReactNode } from 'react';
import { IconGallery } from './IconGallery.js';
import { UiIcon } from '../src/UiIcon.js';
import { Article, BackToTop, BlogEntry, BlogList, BrandMark, BreadcrumbItem, Breadcrumbs, Button, CodeBlock, ContentNote, ColorSwatch, colorGroups, CopyButton, DemoFrame, DestinationLink, DestinationList, Feedback, FeatureCard, FeatureList, Footer, GroupToggle, Header, IconButton, Keycap, Link, NavItem, ReadingLinks, SearchDialog, SearchField, SearchTrigger, Section, SectionHeading, Sidebar, SidebarResizeHandle, SiteNavigation, SkipLink, SourceLink, TableOfContents, TocLink, SidebarGroup, type DocSection, type NavGroup, type NavLink } from '../src/index.js';
import './gallery.css';
import '../src/website.css';

const components = [
  { id: 'color-swatch', name: 'ColorSwatch', kind: 'Color' },
  { id: 'icon', name: 'Icon', kind: 'Icon' },
  { id: 'button', name: 'Button', kind: 'Button' },
  { id: 'icon-button', name: 'IconButton', kind: 'Button' },
  { id: 'back-to-top', name: 'BackToTop', kind: 'Button' },
  { id: 'copy-button', name: 'CopyButton', kind: 'Button' },
  { id: 'code-block', name: 'CodeBlock', kind: 'Content' },
  { id: 'link', name: 'Link', kind: 'Link' },
  { id: 'destination-link', name: 'DestinationLink', kind: 'Link' },
  { id: 'blog-entry', name: 'BlogEntry', kind: 'Link' },
  { id: 'source-link', name: 'SourceLink', kind: 'Link' },
  { id: 'skip-link', name: 'SkipLink', kind: 'Link' },
  { id: 'toc-link', name: 'TocLink', kind: 'Link' },
  { id: 'brand-mark', name: 'BrandMark', kind: 'Brand' },
  { id: 'keycap', name: 'Keycap', kind: 'Content' },
  { id: 'search-trigger', name: 'SearchTrigger', kind: 'Button' },
  { id: 'search-field', name: 'SearchField', kind: 'Search' },
  { id: 'search-dialog', name: 'SearchDialog', kind: 'Search' },
  { id: 'nav-item', name: 'NavItem', kind: 'Navigation' },
  { id: 'site-navigation', name: 'SiteNavigation', kind: 'Navigation' },
  { id: 'reading-links', name: 'ReadingLinks', kind: 'Navigation' },
  { id: 'group-toggle', name: 'GroupToggle', kind: 'Navigation' },
  { id: 'breadcrumb-item', name: 'BreadcrumbItem', kind: 'Navigation' },
  { id: 'section-heading', name: 'SectionHeading', kind: 'Content' },
  { id: 'feature-card', name: 'FeatureCard', kind: 'Content' },
  { id: 'content-note', name: 'ContentNote', kind: 'Content' },
  { id: 'feedback', name: 'Feedback', kind: 'Content' },
  { id: 'header', name: 'Header', kind: 'Navigation' },
  { id: 'breadcrumbs', name: 'Breadcrumbs', kind: 'Navigation' },
  { id: 'sidebar-group', name: 'SidebarGroup', kind: 'Navigation' },
  { id: 'sidebar', name: 'Sidebar', kind: 'Navigation' },
  { id: 'sidebar-resize-handle', name: 'SidebarResizeHandle', kind: 'Navigation' },
  { id: 'article', name: 'Article', kind: 'Content' },
  { id: 'section', name: 'Section', kind: 'Content' },
  { id: 'table-of-contents', name: 'TableOfContents', kind: 'Content' },
  { id: 'feature-list', name: 'FeatureList', kind: 'Content' },
  { id: 'destination-list', name: 'DestinationList', kind: 'Navigation' },
  { id: 'blog-list', name: 'BlogList', kind: 'Content' },
  { id: 'demo-frame', name: 'DemoFrame', kind: 'Layout' },
  { id: 'footer', name: 'Footer', kind: 'Layout' },
  { id: 'page', name: 'Page', kind: 'Layout' },
] as const;
export const componentCatalog = components;
const galleryLinks: NavLink[] = [
  { label: 'Overview', href: '/' },
  ...components.map(component => ({ label: component.name, href: `/components/${component.id}` })),
];

const sampleGroups: NavGroup[] = [
  { label: 'Get started', links: [
    { label: 'Overview', href: '/components/article' },
    { label: 'Browser example', href: '/components/section' },
    { label: 'Headless editor', href: '/components/page' },
  ] },
  { label: 'Reference', defaultOpen: false, links: [
    { label: 'Components', href: '/components' },
    { label: 'Guides', href: '/components/table-of-contents' },
  ] },
];

const articleSections: DocSection[] = [
  { id: 'article-overview', title: 'Overview', content: <p>SearSuite provides TypeScript modules for spreadsheet and rich-document editors.</p> },
  { id: 'article-checklist', title: 'Run the example', content: <ol><li>Install dependencies with <code>pnpm install</code>.</li><li>Start the browser editor with <code>pnpm dev</code>.</li><li>Explore Sheet commands in the example host.</li></ol> },
];

function SearchDialogPreview() {
  const [open, setOpen] = useState(true);
  return <div className="gallery-dialog-frame">
    {!open && <Button onClick={() => setOpen(true)}>Open search</Button>}
    {open && <SearchDialog sections={articleSections} onClose={() => setOpen(false)} />}
  </div>;
}

export function ComponentGallery({ componentId }: { componentId?: string }) {
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const selectedIndex = components.findIndex(component => component.id === componentId);
  const selected = components[selectedIndex];
  let preview: ReactNode = null;
  let previewClassName = '';
  let previewAction: ReactNode = null;

  switch (componentId) {
    case 'icon':
      preview = <IconGallery />;
      previewClassName = 'gallery-preview-icons';
      break;
    case 'page':
      preview = <iframe title="Page preview" src="/preview/page#headless-editor" loading="lazy" />;
      previewClassName = 'gallery-preview-page';
      previewAction = <Link className="gallery-open-link" href="/preview/page">Open preview <UiIcon name="arrowUpRight" size={16} /></Link>;
      break;
    case 'header':
      preview = <Header brandHref="/components" onSearch={() => setMessage('Search action')} onMenu={() => setMessage('Menu action')} navigation={<SiteNavigation items={[{ label: 'Quickstart', href: '/components/article' }, { label: 'API', href: '/components/page' }]} />} />;
      previewClassName = 'gallery-preview-header';
      break;
    case 'breadcrumbs':
      preview = <Breadcrumbs items={[{ label: 'Home', href: '/components' }, { label: 'Documentation', href: '/components/sidebar' }, { label: 'Quickstart', href: '/components/article' }]} current="Get started with SearSuite" sidebarCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(value => !value)} />;
      previewClassName = 'gallery-preview-breadcrumbs';
      break;
    case 'sidebar':
      preview = <Sidebar title="Get started" groups={sampleGroups} />;
      previewClassName = 'gallery-preview-sidebar';
      break;
    case 'sidebar-resize-handle':
      preview = <div className="searsuite-shell searsuite-resizable-shell gallery-resize-sample">
        <aside className="searsuite-sidebar gallery-resize-side"><strong>Contents</strong><p>Quickstart</p><p>Reference</p></aside>
        <main className="searsuite-main gallery-resize-main"><h3>Documentation</h3><p>Page content stays beside the sidebar.</p></main>
        <SidebarResizeHandle />
      </div>;
      previewClassName = 'gallery-preview-resizer';
      break;
    case 'sidebar-group':
      preview = <div className="gallery-group-frame"><SidebarGroup group={{ label: 'Using SearSuite', links: [{ label: 'Quickstart', href: '/components/page' }, { label: 'Sheet editor', href: '/components/article' }, { label: 'API reference', href: '/components/section' }] }} /></div>;
      previewClassName = 'gallery-preview-group';
      break;
    case 'article':
      preview = <Article title="Run the browser example" intro={<p>Explore an assembled SearSuite editor.</p>} sections={articleSections} markdown={'# Run the browser example\n\npnpm install\npnpm dev'} feedback />;
      previewClassName = 'gallery-preview-article';
      break;
    case 'section':
      preview = <Section id="sample-section" title="Create a headless Sheet editor"><p>Import <code>createHeadlessEditor</code> from <code>@searsuite/sear-assembly-headless</code>.</p><p>Provide an initial Sheet state, run commands, and destroy the editor when finished.</p></Section>;
      previewClassName = 'gallery-preview-section';
      break;
    case 'table-of-contents':
      preview = <div className="gallery-toc-sample"><TableOfContents sections={[{ id: 'toc-overview', title: 'Overview' }, { id: 'toc-browser', title: 'Browser example', subsections: [{ id: 'toc-install', title: 'Install dependencies' }, { id: 'toc-run', title: 'Run the editor' }] }, { id: 'toc-headless', title: 'Headless editor' }]} /><div className="gallery-toc-article"><h3 id="toc-overview">Overview</h3><p>Build spreadsheet and document editors with SearSuite.</p><h3 id="toc-browser">Browser example</h3><h4 id="toc-install">Install dependencies</h4><p>Install workspace packages.</p><h4 id="toc-run">Run the editor</h4><p>Start the example host.</p><h3 id="toc-headless">Headless editor</h3><p>Run Sheet commands without a UI host.</p></div></div>;
      previewClassName = 'gallery-preview-toc';
      break;
    case 'footer':
      preview = <Footer brand="SearSuite Docs" links={[{ label: 'Documentation', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Back to top', href: '#preview' }]} />;
      previewClassName = 'gallery-preview-footer';
      break;
    case 'feature-card':
      preview = <FeatureCard title="Spreadsheet foundation" description="Matrices, formulas, selections, and rich cells work as reusable infrastructure." />;
      previewClassName = 'gallery-preview-small';
      break;
    case 'feature-list':
      preview = <FeatureList items={[{ title: 'Spreadsheet foundation', description: 'Reusable cell and formula capabilities.' }, { title: 'Composable runtimes', description: 'Assemblies and adapters for different hosts.' }]} />;
      break;
    case 'destination-link':
      preview = <DestinationLink href="/components/page" index="01" title="Library guide" description="Learn the concepts and module responsibilities." />;
      break;
    case 'destination-list':
      preview = <DestinationList items={[{ href: '/components/page', index: '01', title: 'Library guide', description: 'Learn the concepts and module responsibilities.' }, { href: '/components/article', index: '02', title: 'Reference manual', description: 'Find public exports and signatures.' }]} />;
      break;
    case 'blog-entry':
      preview = <BlogEntry href="/components/article" date="2026-10-30" dateLabel="October 30, 2026" title="Hi" description="A first hello from the SearSuite blog." />;
      break;
    case 'blog-list':
      preview = <BlogList items={[{ href: '/components/article', date: '2026-10-30', dateLabel: 'October 30, 2026', title: 'Hi', description: 'A first hello from the SearSuite blog.' }]} />;
      break;
    case 'content-note':
      preview = <ContentNote title="Other resources"><Link href="/components/article">Blog posts</Link> about the project.</ContentNote>;
      break;
    case 'reading-links':
      preview = <ReadingLinks items={[{ label: 'Read the library guide', href: '/components/page' }, { label: 'Browse the API', href: '/components/article' }]} />;
      break;
    case 'site-navigation':
      preview = <SiteNavigation items={[{ label: 'Quickstart', href: '/components/page', current: true }, { label: 'Documentation', href: '/components/article' }, { label: 'API', href: '/components/sidebar' }]} />;
      break;
    case 'search-field':
      preview = <SearchField aria-label="Search this package" placeholder="Find an API name" />;
      previewClassName = 'gallery-preview-small';
      break;
    case 'demo-frame':
      preview = <DemoFrame src="/preview/page" title="Documentation preview" />;
      previewClassName = 'gallery-preview-page';
      break;
    case 'button':
      preview = <><Button onClick={() => setMessage('Action clicked')}>Action button</Button><Button variant="feedback" onClick={() => setMessage('Feedback clicked')}>Feedback button</Button><Button variant="feedback" selected onClick={() => setMessage('Selected')}>Selected</Button></>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'icon-button':
      preview = <IconButton aria-label="Open navigation" title="Open navigation" onClick={() => setMessage('Navigation action')}><UiIcon name="menu" size={20} /></IconButton>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'back-to-top':
      preview = <BackToTop alwaysVisible />;
      previewClassName = 'gallery-preview-back-to-top';
      break;
    case 'copy-button':
      preview = <CopyButton markdown="# SearSuite\n\nComponent preview" />;
      previewClassName = 'gallery-preview-small';
      break;
    case 'code-block':
      preview = <CodeBlock language="typescript" code={"import { createHeadlessEditor } from '@searsuite/sear-assembly-headless';\n\nconst editor = createHeadlessEditor({ sheetState });\neditor.destroy();"} />;
      previewClassName = 'gallery-preview-code';
      break;
    case 'search-trigger':
      preview = <SearchTrigger onClick={() => setMessage('Search action')} />;
      previewClassName = 'gallery-preview-small';
      break;
    case 'link':
      preview = <><Link href="/components">Default link</Link><Link variant="source" href="/components">Muted link</Link></>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'source-link':
      preview = <SourceLink href="https://github.com/SearSuite/searsuite-components" />;
      previewClassName = 'gallery-preview-small';
      break;
    case 'skip-link':
      preview = <SkipLink href="#preview" />;
      previewClassName = 'gallery-preview-small gallery-preview-skip';
      break;
    case 'toc-link':
      preview = <div className="searsuite-toc"><nav><TocLink id="preview" title="Overview" active /><TocLink id="preview" title="API reference" /></nav></div>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'nav-item':
      preview = <div className="searsuite-group-links gallery-group-frame"><NavItem link={{ label: 'Quickstart', href: '/components/page' }} current /><NavItem link={{ label: 'API reference', href: '/components/section' }} /></div>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'group-toggle':
      preview = <div className="gallery-group-frame"><GroupToggle label="Using SearSuite" open={!sidebarCollapsed} controls="gallery-toggle-panel" onClick={() => setSidebarCollapsed(value => !value)} /><div id="gallery-toggle-panel" hidden={sidebarCollapsed}>Quickstart and reference</div></div>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'breadcrumb-item':
      preview = <div className="searsuite-breadcrumbs"><BreadcrumbItem item={{ label: 'Documentation', href: '/components' }} /><span className="searsuite-crumb-current">Components</span></div>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'brand-mark':
      preview = <BrandMark />;
      previewClassName = 'gallery-preview-small';
      break;
    case 'keycap':
      preview = <Keycap>/</Keycap>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'section-heading':
      preview = <div className="searsuite-section"><SectionHeading id="preview" title="Headless editor" /></div>;
      previewClassName = 'gallery-preview-small';
      break;
    case 'feedback':
      preview = <Feedback />;
      previewClassName = 'gallery-preview-small gallery-preview-feedback';
      break;
    case 'search-dialog':
      preview = <SearchDialogPreview />;
      previewClassName = 'gallery-preview-dialog';
      break;
    case 'color-swatch':
      preview = <div className="gallery-color-palette">{colorGroups.map(group => <section className="gallery-color-group" key={group.title}>
        <h3>{group.title}</h3>
        <div className="gallery-color-grid">{group.colors.map(([token, label]) => <ColorSwatch key={token} token={token} label={label} />)}</div>
      </section>)}</div>;
      previewClassName = 'gallery-preview-colors';
      break;
  }

  const sections: DocSection[] = selected ? [
    {
      id: 'preview',
      title: 'Preview',
      content: <>
        {previewAction && <div className="gallery-preview-action">{previewAction}</div>}
        <div className={`gallery-preview ${previewClassName}`} data-component={selected.name}>{preview}</div>
      </>,
    },
    {
      id: 'import',
      title: 'Import',
      content: <pre><code>{selected.name === 'Icon'
        ? "import { Icon } from '@searsuite/sear-components';\n\n<Icon name=\"arrows-001\" size={20} />"
        : `import { ${selected.name} } from '@searsuite/sear-components';`}</code></pre>,
    },
  ] : componentId ? [] : [
    { id: 'component-model', title: 'Component model', content: <p>Small components provide controls, links, navigation, and content pieces. Page assembles Header, Breadcrumbs, Sidebar, Article, TableOfContents, and Footer.</p> },
    { id: 'color-system', title: 'Color system', content: <p>Primary 500 is the SearSuite brand color. The palette includes Primary and Neutral scales, status colors, and semantic roles for text, surfaces, borders, links, and focus states. Component styles reference those shared tokens.</p> },
    { id: 'integration', title: 'Integration', content: <><p>Import the stylesheet once, then use individual components or compose them into a page.</p><pre><code>{`import '@searsuite/sear-components/styles.css';
import { Button, ColorSwatch } from '@searsuite/sear-components';`}</code></pre></> },
  ];

  return (
    <div className="searsuite gallery">
      <SkipLink href="#gallery-main" />
      <Header brand="SearSuite Components" brandHref="/" onMenu={() => setMenuOpen(true)} menuExpanded={menuOpen} />

      <div className="gallery-shell">
        <Sidebar title="Components" ariaLabel="Component navigation" links={galleryLinks} currentHref={selected ? `/components/${selected.id}` : componentId ? undefined : '/'} open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={() => setMenuOpen(false)} />

        <main className="gallery-main" id="gallery-main">
          <Article
            title={selected?.name ?? (componentId ? 'Component not found' : 'Overview')}
            intro={componentId && !selected ? <p><Link href="/">Back to overview</Link></p> : undefined}
            sections={sections}
          />
          {selected && <nav className="gallery-pager" aria-label="Component pages">
            {selectedIndex > 0 ? <Link href={`/components/${components[selectedIndex - 1].id}`}><span>Previous</span><strong>{components[selectedIndex - 1].name}</strong></Link> : <span />}
            {selectedIndex < components.length - 1 ? <Link href={`/components/${components[selectedIndex + 1].id}`}><span>Next</span><strong>{components[selectedIndex + 1].name}</strong></Link> : <span />}
          </nav>}
        </main>
        <Footer brand="SearSuite Components" links={[{ label: 'GitHub', href: 'https://github.com/SearSuite/searsuite-components' }]} />
      </div>
      {menuOpen && <Button className="searsuite-mobile-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      {message && <div className="gallery-toast" role="status">{message}<IconButton aria-label="Dismiss notification" onClick={() => setMessage('')}><UiIcon name="close" size={16} /></IconButton></div>}
    </div>
  );
}
