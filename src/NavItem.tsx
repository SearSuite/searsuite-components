"use client";

import { Link } from './Link.js';
import type { NavLink } from './types.js';

export interface NavItemProps {
  link: NavLink;
  onNavigate?: () => void;
  current?: boolean;
}

export function NavItem({ link, onNavigate, current = false }: NavItemProps) {
  return <Link variant="sidebar" href={link.href} onClick={onNavigate} aria-current={current ? 'page' : undefined}>{link.label}</Link>;
}
