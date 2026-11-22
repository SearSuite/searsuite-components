"use client";

import { useId, useState } from 'react';
import { GroupToggle } from './GroupToggle.js';
import { NavItem } from './NavItem.js';
import type { NavGroup } from './types.js';

export interface SidebarGroupProps {
  group: NavGroup;
  currentHref?: string;
  onNavigate?: () => void;
}

export function SidebarGroup({ group, currentHref, onNavigate }: SidebarGroupProps) {
  const [open, setOpen] = useState(group.defaultOpen ?? true);
  const regionId = useId();
  return (
    <div className="searsuite-sidebar-group">
      <GroupToggle label={group.label} open={open} controls={regionId} onClick={() => setOpen(value => !value)} />
      <div className="searsuite-group-links" id={regionId} hidden={!open}>
        {group.links.map(link => <NavItem key={`${link.href}-${link.label}`} link={link} current={link.href === currentHref} onNavigate={onNavigate} />)}
      </div>
    </div>
  );
}
