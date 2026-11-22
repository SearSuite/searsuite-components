"use client";

import type { ReactNode } from 'react';

export interface BrandMarkProps {
  mark?: ReactNode;
}

export function BrandMark({ mark }: BrandMarkProps) {
  if (mark === null) return null;
  return mark === undefined
    ? <span className="searsuite-brand-mark searsuite-brand-mark-searsuite" aria-hidden="true" />
    : <span className="searsuite-brand-mark">{mark}</span>;
}
