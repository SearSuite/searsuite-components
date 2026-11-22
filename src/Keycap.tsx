"use client";

import type { ReactNode } from 'react';

export interface KeycapProps {
  children: ReactNode;
}

export function Keycap({ children }: KeycapProps) {
  return <kbd className="searsuite-keycap">{children}</kbd>;
}
