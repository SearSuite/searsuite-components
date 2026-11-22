# SearSuite Components

React components for SearSuite documentation layouts. The package includes the SearSuite logo and uses it with the SearSuite name by default; article content and navigation are supplied by the consumer.

## Use

```tsx
import '@searsuite/sear-components/styles.css';
import { Page } from '@searsuite/sear-components';

const sections = [
  { id: 'overview', title: 'Overview', content: <p>Build spreadsheet and rich-document editors with SearSuite.</p> },
  { id: 'headless', title: 'Headless editor', content: <p>Run Sheet commands without a UI host.</p> },
];

export default function Guide() {
  return <Page
    sidebarTitle="Get started"
    breadcrumbs={[{ label: 'Home', href: '/' }]}
    navigation={[{ label: 'Quickstart', links: [{ label: 'Headless editor', href: '#headless' }] }]}
    title="Get started with SearSuite"
    sections={sections}
  />;
}
```

`Page` composes `Header`, `Breadcrumbs`, `Sidebar`, `Article`, `TableOfContents`, and `Footer`. These components, `Section`, and `SidebarGroup` are exported for custom layouts. `Header` uses the bundled SearSuite logo unless `brandMark` is supplied. `SidebarGroup` accepts a `group: NavGroup` and an optional `onNavigate` callback; it uses the same scoped stylesheet as `Sidebar`. Article content is passed as React nodes. Supply `markdown` to enable the copy button, `sourceHref` to show a source link, and `feedback` to show the local feedback state.

`TableOfContents` accepts optional `subsections: { id, title }[]` on each section. Give the matching article headings those IDs so second-level links scroll to them. `Page` passes its `DocSection` values through to the table of contents.

## Smaller components

The original nine layout components remain available. Website navigation, cards, lists, search, and reference navigation are also exported for composing the SearSuite website.

| Group | Components |
| --- | --- |
| Buttons | `Button`, `IconButton`, `BackToTop`, `CopyButton`, `SearchTrigger` |
| Links | `Link`, `SourceLink`, `SkipLink`, `TocLink` |
| Navigation | `NavItem`, `GroupToggle`, `BreadcrumbItem`, `SidebarResizeHandle` |
| Content | `BrandMark`, `Keycap`, `SectionHeading`, `Feedback`, `SearchDialog` |
| Color | `ColorSwatch` |
| Icon | `Icon` |
| Website | `SiteNavigation`, `FeatureCard`, `FeatureList`, `DestinationLink`, `DestinationList`, `BlogEntry`, `BlogList`, `ReadingLinks`, `SearchField`, `DemoFrame`, `ContentNote` |

All are available from the package root and have individual previews in the component gallery. `Button` provides action, feedback, and group variants; `Link` provides brand, source, sidebar, table-of-contents, and search-result variants. Components use the same scoped stylesheet and can be combined with the larger documentation layouts.

Place `SidebarResizeHandle` in a `.searsuite-shell.searsuite-resizable-shell` beside a `.searsuite-sidebar` to make the divider draggable. It supports pointer dragging, Left/Right and Home/End keys, and double-click to restore the default width. The desktop range is 220-480px while at least 320px remains for content; the handle is hidden on mobile. Static pages can server-render the handle and call `attachSidebarResizeHandle` from `@searsuite/sear-components/sidebar-resize` to enable it without hydrating the page.

`BackToTop` appears after 400px of page scrolling by default and respects reduced-motion preferences. Set `showAfter` to change the threshold or `alwaysVisible` to keep it shown. Static pages can server-render it and call `attachBackToTop` from `@searsuite/sear-components/back-to-top` to enable it without hydrating the page.

All fixed colors, including hover, selection, overlays, and shadows, are defined in `src/color.css`. The palette has Primary 50-900, Neutral 0-900, and Success, Warning, and Danger 50/500/700 scales. `--searsuite-primary-500` (`#3182dc`) is the brand midtone sampled from the bundled mark; links and focus use Primary 600 for text contrast. Components use semantic roles such as `--searsuite-link`, `--searsuite-selection`, and `--searsuite-text-primary`. Short aliases such as `--searsuite-fg` are also available.

The public `styles.css` imports the packaged `color.css`. `website.css` imports the base stylesheet and owns the website layouts and component presentation. The [Color gallery](http://localhost:5181/components/color-swatch) shows every token and its resolved value. `ColorSwatch` can display one of those tokens, such as `<ColorSwatch token="primary-500" label="Brand primary" />`, or a custom `color` value. Override the variables on a `.searsuite` root to theme the entire documentation interface.

The package emits ESM, TypeScript declarations, a stylesheet, and the logo asset. It uses browser APIs only in effects or event handlers, so `renderToString` works in Node. The entry has a `use client` directive for Next.js App Router; client components can still be server rendered and hydrated. Import the stylesheet once in your app's root layout so the logo resolves from the package. React and React DOM are peer dependencies.

## Local demo

```sh
npm install
npm run build
npm test
npm run dev
```

The Overview is at `http://localhost:5181/` (also available at `/components`). The gallery composes its own `Header`, `Sidebar`, and `Footer`; the sidebar lists the smaller components and composed layouts. Each component has its own preview page at `/components/<component-id>`, for example `/components/button`. The `Page` component has a full-size preview at `/preview/page`. All routes render React HTML on the server and hydrate it in the browser.

## Icon catalog

`Icon` includes the 2,490 stroke icons from `Stroke.svg`. The source is a flattened SVG sheet without individual icon names, so each ID combines its visual category and position (for example, `arrows-001`). Browse all 27 categories in the component gallery at `/components/icon`.

```tsx
import { Icon, iconGroups } from '@searsuite/sear-components';

<Icon name="arrows-001" size={20} aria-label="Arrow" />
```

`iconGroups` lists every category and its IDs. Icons inherit `currentColor`; unlabeled icons are hidden from assistive technology.

## Repository

Repository: [searsuite-components](https://github.com/SearSuite/searsuite-components).

## Community and releases

See [Contributing](CONTRIBUTING.md), the [Code of Conduct](CODE_OF_CONDUCT.md), [Support and maintainers](SUPPORT.md), the [Changelog](CHANGELOG.md), and [Versioning and compatibility](VERSIONING.md).
