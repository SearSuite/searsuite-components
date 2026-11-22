"use client";

import { Link } from './Link.js';

export interface SkipLinkProps {
  href: string;
  children?: string;
}

export function SkipLink({ href, children = 'Skip to main content' }: SkipLinkProps) {
  return <Link className="searsuite-skip-link" href={href}>{children}</Link>;
}
