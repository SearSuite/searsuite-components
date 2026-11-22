"use client";

import type { ButtonHTMLAttributes } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
}

export function IconButton({ className = '', type = 'button', ...props }: IconButtonProps) {
  return <button {...props} type={type} className={`searsuite-icon-button${className ? ` ${className}` : ''}`} />;
}
