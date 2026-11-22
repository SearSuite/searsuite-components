"use client";

import { Link } from './Link.js';
import type { NavLink } from './types.js';
import { UiIcon } from './UiIcon.js';

export interface BreadcrumbItemProps {
  item: NavLink;
}

export function BreadcrumbItem({ item }: BreadcrumbItemProps) {
  return <span className="searsuite-crumb"><Link href={item.href}>{item.label}</Link><UiIcon name="chevronRight" size={14} aria-hidden="true" /></span>;
}
