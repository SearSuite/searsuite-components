"use client";

import { IconButton } from './IconButton.js';
import { NavItem } from './NavItem.js';
import { SidebarGroup } from './SidebarGroup.js';
import type { NavGroup, NavLink } from './types.js';
import { UiIcon } from './UiIcon.js';

export interface SidebarProps {
  title: string;
  groups?: NavGroup[];
  links?: NavLink[];
  currentHref?: string;
  ariaLabel?: string;
  open?: boolean;
  onClose?: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ title, groups = [], links = [], currentHref, ariaLabel = 'Documentation navigation', open = false, onClose, onNavigate }: SidebarProps) {
  return (
    <aside className={`searsuite-sidebar${open ? ' searsuite-sidebar-open' : ''}`} aria-label={ariaLabel}>
      <div className="searsuite-mobile-sidebar-head">
        <strong>{title}</strong>
        {onClose && <IconButton aria-label="Close navigation" onClick={onClose}><UiIcon name="close" size={20} /></IconButton>}
      </div>
      <div className="searsuite-sidebar-scroll">
        <div className="searsuite-sidebar-title">{title}</div>
        <nav aria-label={title}>
          {links.map(link => <NavItem key={`${link.href}-${link.label}`} link={link} current={link.href === currentHref} onNavigate={onNavigate} />)}
          {groups.map(group => <SidebarGroup key={group.label} group={group} currentHref={currentHref} onNavigate={onNavigate} />)}
        </nav>
      </div>
    </aside>
  );
}
