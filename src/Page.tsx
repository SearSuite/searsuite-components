"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Article, type ArticleProps } from './Article.js';
import { Breadcrumbs } from './Breadcrumbs.js';
import { Footer } from './Footer.js';
import { Header } from './Header.js';
import { SearchDialog } from './SearchDialog.js';
import { Sidebar } from './Sidebar.js';
import { SkipLink } from './SkipLink.js';
import { TableOfContents } from './TableOfContents.js';
import type { NavGroup, NavLink } from './types.js';

export interface PageProps extends ArticleProps {
  brand?: ReactNode;
  brandHref?: string;
  brandMark?: ReactNode;
  breadcrumbs?: NavLink[];
  sidebarTitle: string;
  navigation: NavGroup[];
  searchLabel?: string;
  tocHeading?: string;
  footer?: ReactNode;
  footerLinks?: NavLink[];
}

export function Page({
  brand,
  brandHref,
  brandMark,
  breadcrumbs = [],
  sidebarTitle,
  navigation,
  searchLabel,
  tocHeading,
  footer,
  footerLinks,
  title,
  intro,
  sections,
  markdown,
  sourceHref,
  feedback,
}: PageProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const searchButtonRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
      const target = event.target as HTMLElement | null;
      const editable = target?.matches('input, textarea, [contenteditable="true"]');
      if ((event.key === '/' && !editable) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        searchButtonRef.current = target;
        setSearchOpen(true);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function openSearch() {
    searchButtonRef.current = document.activeElement as HTMLElement;
    setSearchOpen(true);
  }
  function closeSearch() {
    setSearchOpen(false);
    searchButtonRef.current?.focus();
  }

  return (
    <div className={`searsuite${sidebarCollapsed ? ' searsuite-collapsed' : ''}`}>
      <SkipLink href="#searsuite-main" />
      <Header brand={brand} brandHref={brandHref} brandMark={brandMark} searchLabel={searchLabel} onSearch={openSearch} onMenu={() => setMenuOpen(true)} menuExpanded={menuOpen} />
      <Breadcrumbs items={breadcrumbs} current={title} onToggleSidebar={() => setSidebarCollapsed(value => !value)} sidebarCollapsed={sidebarCollapsed} />
      <div className="searsuite-shell">
        <Sidebar title={sidebarTitle} groups={navigation} open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={() => setMenuOpen(false)} />
        <main className="searsuite-main" id="searsuite-main">
          <div className="searsuite-article-layout">
            <Article title={title} intro={intro} sections={sections} markdown={markdown} sourceHref={sourceHref} feedback={feedback} />
            <TableOfContents sections={sections} heading={tocHeading} />
          </div>
        </main>
      </div>
      <Footer brand={footer} links={footerLinks} />
      {menuOpen && <button className="searsuite-mobile-scrim" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      {searchOpen && <SearchDialog sections={sections} searchLabel={searchLabel} onClose={closeSearch} />}
    </div>
  );
}
