"use client";

import { BreadcrumbItem } from './BreadcrumbItem.js';
import { IconButton } from './IconButton.js';
import type { NavLink } from './types.js';
import { UiIcon } from './UiIcon.js';

export interface BreadcrumbsProps {
  items: NavLink[];
  current: string;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

export function Breadcrumbs({ items, current, onToggleSidebar, sidebarCollapsed = false }: BreadcrumbsProps) {
  return (
    <div className="searsuite-subbar">
      <div className="searsuite-subbar-inner">
        {onToggleSidebar && (
          <IconButton
            className="searsuite-sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <UiIcon name={sidebarCollapsed ? 'panelLeftOpen' : 'panelLeftClose'} size={18} />
          </IconButton>
        )}
        <nav className="searsuite-breadcrumbs" aria-label="Breadcrumb">
          {items.map(item => <BreadcrumbItem key={`${item.href}-${item.label}`} item={item} />)}
          <span className="searsuite-crumb-current" aria-current="page">{current}</span>
        </nav>
      </div>
    </div>
  );
}
