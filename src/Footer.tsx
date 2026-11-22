"use client";

import type { ReactNode } from 'react';
import { Link } from './Link.js';
import type { NavLink } from './types.js';

export interface FooterProps {
  brand?: ReactNode;
  links?: NavLink[];
  extra?: ReactNode;
}

export function Footer({ brand, links = [], extra }: FooterProps) {
  return (
    <footer className="searsuite-footer">
      <div>{brand}</div>
      <nav aria-label="Footer">{links.map(link => <Link key={`${link.href}-${link.label}`} href={link.href}>{link.label}</Link>)}</nav>
      {extra}
    </footer>
  );
}
