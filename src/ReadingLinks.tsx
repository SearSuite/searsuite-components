"use client";

import { Link } from './Link.js';
import type { NavLink } from './types.js';

export interface ReadingLinksProps {
  items: NavLink[];
  label?: string;
}

export function ReadingLinks({ items, label = 'Continue reading' }: ReadingLinksProps) {
  return <nav className="quickstart-links" aria-label={label} data-searsuite-component="ReadingLinks">{items.map(item => <Link key={item.href} href={item.href}>{item.label} <span aria-hidden="true">→</span></Link>)}</nav>;
}
