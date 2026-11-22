"use client";

import { useEffect, useRef } from 'react';
import { attachSidebarResizeHandle, sidebarResizeBounds } from './sidebarResize.js';

export interface SidebarResizeHandleProps {
  label?: string;
}

export function SidebarResizeHandle({ label = 'Resize sidebar' }: SidebarResizeHandleProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current ? attachSidebarResizeHandle(ref.current) : undefined, []);

  return <div
    ref={ref}
    className="searsuite-sidebar-resize-handle"
    role="separator"
    aria-orientation="vertical"
    aria-label={label}
    aria-valuemin={sidebarResizeBounds.min}
    aria-valuemax={sidebarResizeBounds.max}
    aria-valuenow={304}
    tabIndex={0}
    title={label}
    data-searsuite-component="SidebarResizeHandle"
  />;
}
