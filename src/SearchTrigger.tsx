"use client";

import { Keycap } from './Keycap.js';
import { UiIcon } from './UiIcon.js';

export interface SearchTriggerProps {
  label?: string;
  onClick: () => void;
}

export function SearchTrigger({ label = 'Search documentation', onClick }: SearchTriggerProps) {
  return <button className="searsuite-header-search" type="button" onClick={onClick} aria-label={label}>
    <UiIcon name="search" size={17} aria-hidden="true" /><span>{label}</span><Keycap>/</Keycap>
  </button>;
}
