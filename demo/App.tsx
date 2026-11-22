import { Page, type DocSection, type NavGroup } from '../src/index.js';

const sections: DocSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    content: <p>SearSuite provides TypeScript modules for building spreadsheet and rich-document editors. Use the browser example to explore an assembled editor, or run the headless assembly to work with commands without a UI host.</p>,
  },
  {
    id: 'requirements',
    title: 'Requirements',
    content: <p>From a checkout of the SearSuite repository, use Node.js 22 and pnpm 9.11.</p>,
  },
  {
    id: 'browser-example',
    title: 'Run the browser example',
    searchText: 'pnpm dev sheet editor',
    content: <><p>Install workspace dependencies and start the example host with its local collaboration server.</p><pre><code>{'pnpm install\npnpm dev'}</code></pre><p>Use <code>pnpm svg</code> or <code>pnpm webgl</code> to try the other rendering hosts.</p></>,
  },
  {
    id: 'headless-editor',
    title: 'Create a headless Sheet editor',
    searchText: 'createHeadlessEditor ExportSheetStateCommand',
    content: <><p>The headless assembly runs Sheet commands and document contracts without browser input or rendering adapters.</p><pre><code>{`import { createHeadlessEditor } from '@searsuite/sear-assembly-headless';
import {
  createEmptySheetDocumentState,
  ExportSheetStateCommand,
} from '@searsuite/sear-assembly-setup';

const editor = createHeadlessEditor({
  sheetState: createEmptySheetDocumentState(4, 4),
});

try {
  const snapshot = editor.commands.run(ExportSheetStateCommand, undefined).sheetState;
  console.log(snapshot);
} finally {
  editor.destroy();
}`}</code></pre><p>Commands are the public mutation and export entry point. Call <code>destroy()</code> to release the editor's services.</p></>,
  },
  {
    id: 'next-steps',
    title: 'Next steps',
    content: <p>Continue with the <a href="https://searsuite.com/docs/guide/">library guide</a> or browse the <a href="https://searsuite.com/docs/ref/">API reference</a>.</p>,
  },
];

const navigation: NavGroup[] = [
  { label: 'Guide', links: [
    { label: 'Overview', href: '#overview' },
    { label: 'Requirements', href: '#requirements' },
    { label: 'Browser example', href: '#browser-example' },
    { label: 'Headless editor', href: '#headless-editor' },
    { label: 'Next steps', href: '#next-steps' },
  ] },
];

const markdown = `# SearSuite developer guide

SearSuite provides TypeScript modules for spreadsheet and rich-document editors.

## Run the browser example

pnpm install
pnpm dev

## Create a headless Sheet editor

Use createHeadlessEditor from @searsuite/sear-assembly-headless.`;

export function App() {
  return <Page
    brandHref="#overview"
    breadcrumbs={[{ label: 'Home', href: '#overview' }, { label: 'Documentation', href: '#overview' }]}
    sidebarTitle="SearSuite Docs"
    navigation={navigation}
    title="SearSuite developer guide"
    intro={<p>Explore the browser editor and the headless command API.</p>}
    sections={sections}
    markdown={markdown}
    feedback
    footer="SearSuite Docs · Component library preview"
    footerLinks={[{ label: 'Components', href: '/components' }, { label: 'Back to top', href: '#overview' }]}
  />;
}
