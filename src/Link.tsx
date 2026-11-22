"use client";

import type { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'brand' | 'source' | 'sidebar' | 'toc' | 'search';
}

export function Link({ variant = 'default', className = '', ...props }: LinkProps) {
  const variantClass = {
    default: '',
    brand: 'searsuite-brand',
    source: 'searsuite-source-link',
    sidebar: 'searsuite-nav-link',
    toc: 'searsuite-toc-link',
    search: 'searsuite-search-result',
  }[variant];
  return <a {...props} className={[variantClass, className].filter(Boolean).join(' ') || undefined} />;
}
