"use client";

import { Link } from './Link.js';

export interface TocLinkProps {
  id: string;
  title: string;
  active?: boolean;
}

export function TocLink({ id, title, active = false }: TocLinkProps) {
  return <Link variant="toc" href={`#${id}`} className={active ? 'searsuite-toc-active' : undefined} aria-current={active ? 'location' : undefined}>{title}</Link>;
}
