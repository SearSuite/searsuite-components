"use client";

import { Link } from './Link.js';
import { UiIcon } from './UiIcon.js';

export interface SourceLinkProps {
  href: string;
  children?: string;
}

export function SourceLink({ href, children = 'View source' }: SourceLinkProps) {
  return <Link variant="source" href={href} target="_blank" rel="noopener noreferrer">{children} <UiIcon name="externalLink" size={15} aria-hidden="true" /></Link>;
}
