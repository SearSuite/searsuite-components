"use client";

import { Link } from './Link.js';

export interface BlogEntryProps {
  href: string;
  date: string;
  dateLabel: string;
  title: string;
  description: string;
}

export function BlogEntry({ href, date, dateLabel, title, description }: BlogEntryProps) {
  return <Link className="blog-list-item" href={href} data-searsuite-component="BlogEntry"><time dateTime={date}>{dateLabel}</time><span><strong>{title}</strong><small>{description}</small></span><span className="blog-list-arrow" aria-hidden="true">→</span></Link>;
}

export interface BlogListProps {
  items: BlogEntryProps[];
  label?: string;
}

export function BlogList({ items, label = 'Blog posts' }: BlogListProps) {
  return <div className="blog-list" aria-label={label} data-searsuite-component="BlogList">{items.map(item => <BlogEntry key={item.href} {...item} />)}</div>;
}
