"use client";

import type { InputHTMLAttributes } from 'react';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export function SearchField(props: SearchFieldProps) {
  return <input {...props} type="search" data-searsuite-component="SearchField" />;
}
