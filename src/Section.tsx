"use client";

import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading.js';

export interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section className="searsuite-section" id={id}>
      <SectionHeading id={id} title={title} />
      <div className="searsuite-section-content">{children}</div>
    </section>
  );
}
