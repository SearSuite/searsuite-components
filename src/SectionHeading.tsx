"use client";

import { Link } from './Link.js';

export interface SectionHeadingProps {
  id: string;
  title: string;
}

export function SectionHeading({ id, title }: SectionHeadingProps) {
  return <h2 className="searsuite-section-heading"><Link href={`#${id}`}>{title}</Link></h2>;
}
