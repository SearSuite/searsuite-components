"use client";

import type { ReactNode } from 'react';

export interface ContentNoteProps {
  title: string;
  children: ReactNode;
}

export function ContentNote({ title, children }: ContentNoteProps) {
  return <aside className="docs-source-note" data-searsuite-component="ContentNote"><strong>{title}</strong><span>{children}</span></aside>;
}
