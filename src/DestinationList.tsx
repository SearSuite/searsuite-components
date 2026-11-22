"use client";

import { Link } from './Link.js';

export interface DestinationLinkProps {
  href: string;
  index: string;
  title: string;
  description: string;
}

export function DestinationLink({ href, index, title, description }: DestinationLinkProps) {
  return <Link href={href} className="searsuite-destination-link" data-searsuite-component="DestinationLink"><span className="destination-index">{index}</span><span><strong>{title}</strong><small>{description}</small></span><span aria-hidden="true">→</span></Link>;
}

export interface DestinationListProps {
  items: DestinationLinkProps[];
  label?: string;
}

export function DestinationList({ items, label = 'Documentation sections' }: DestinationListProps) {
  return <nav className="docs-destinations" aria-label={label} data-searsuite-component="DestinationList">{items.map(item => <DestinationLink key={item.href} {...item} />)}</nav>;
}
