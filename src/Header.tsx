"use client";

import type { ReactNode } from 'react';
import { BrandMark } from './BrandMark.js';
import { IconButton } from './IconButton.js';
import { Link } from './Link.js';
import { SearchTrigger } from './SearchTrigger.js';
import { UiIcon } from './UiIcon.js';

export interface HeaderProps {
  brand?: ReactNode;
  brandHref?: string;
  brandMark?: ReactNode;
  searchLabel?: string;
  onSearch?: () => void;
  onMenu?: () => void;
  menuExpanded?: boolean;
  navigation?: ReactNode;
}

export function Header({
  brand = 'SearSuite',
  brandHref = '/',
  brandMark,
  searchLabel = 'Search documentation',
  onSearch,
  onMenu,
  menuExpanded = false,
  navigation,
}: HeaderProps) {
  return (
    <header className="searsuite-header">
      <div className="searsuite-header-inner">
        <Link variant="brand" href={brandHref}>
          <BrandMark mark={brandMark} />
          <span>{brand}</span>
        </Link>
        {onSearch && <SearchTrigger label={searchLabel} onClick={onSearch} />}
        {onMenu && (
          <IconButton className="searsuite-menu-button" onClick={onMenu} aria-label="Open navigation" aria-expanded={menuExpanded}>
            <UiIcon name="menu" size={21} aria-hidden="true" />
          </IconButton>
        )}
        {navigation}
      </div>
    </header>
  );
}
