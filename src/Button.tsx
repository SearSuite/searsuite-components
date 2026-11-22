"use client";

import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'action' | 'feedback' | 'group';
  selected?: boolean;
}

export function Button({ variant = 'action', selected = false, className = '', type = 'button', ...props }: ButtonProps) {
  const variantClass = {
    action: 'searsuite-action-button',
    feedback: 'searsuite-feedback-button',
    group: 'searsuite-group-heading',
  }[variant];
  return <button {...props} type={type} className={`${variantClass}${selected ? ' searsuite-selected' : ''}${className ? ` ${className}` : ''}`} />;
}
