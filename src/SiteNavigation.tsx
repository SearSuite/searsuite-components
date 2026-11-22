"use client";

import { Link } from './Link.js';
import type { NavLink } from './types.js';

export interface SiteNavigationProps {
  items: (NavLink & { current?: boolean })[];
  label?: string;
}

export function SiteNavigation({ items, label = 'Main navigation' }: SiteNavigationProps) {
  return <nav className="site-nav searsuite-site-navigation" aria-label={label} data-searsuite-component="SiteNavigation">
    {items.map(item => <Link key={item.href} href={item.href} className={item.current ? 'is-current' : undefined} aria-current={item.current ? 'page' : undefined}>{item.label}</Link>)}
  </nav>;
}
