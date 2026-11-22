"use client";

import { useEffect, useRef } from 'react';
import { attachBackToTop } from './backToTopBehavior.js';
import { UiIcon } from './UiIcon.js';

export interface BackToTopProps {
  label?: string;
  showAfter?: number;
  alwaysVisible?: boolean;
}

export function BackToTop({ label = 'Back to top', showAfter = 400, alwaysVisible = false }: BackToTopProps) {
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => button.current ? attachBackToTop(button.current) : undefined, [showAfter, alwaysVisible]);

  return <button
    ref={button}
    type="button"
    className="searsuite-icon-button searsuite-back-to-top"
    aria-label={label}
    title={label}
    data-searsuite-component="BackToTop"
    data-show-after={showAfter}
    data-always-visible={alwaysVisible ? '' : undefined}
    hidden={!alwaysVisible}
  ><UiIcon name="arrowUp" size={20} aria-hidden="true" /></button>;
}
