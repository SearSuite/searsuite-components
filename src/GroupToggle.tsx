"use client";

import { Button } from './Button.js';
import { UiIcon } from './UiIcon.js';

export interface GroupToggleProps {
  label: string;
  open: boolean;
  controls: string;
  onClick: () => void;
}

export function GroupToggle({ label, open, controls, onClick }: GroupToggleProps) {
  return <Button variant="group" aria-expanded={open} aria-controls={controls} onClick={onClick}>
    <span>{label}</span><UiIcon name="chevronDown" size={16} aria-hidden="true" className={open ? '' : 'searsuite-chevron-closed'} />
  </Button>;
}
