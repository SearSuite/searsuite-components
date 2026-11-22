"use client";

import { useEffect, useRef, useState } from 'react';
import { IconButton } from './IconButton.js';
import { Link } from './Link.js';
import type { DocSection } from './types.js';
import { UiIcon } from './UiIcon.js';

export interface SearchDialogProps {
  sections: Pick<DocSection, 'id' | 'title' | 'searchText'>[];
  onClose: () => void;
  searchLabel?: string;
}

export function SearchDialog({ sections, onClose, searchLabel = 'Search documentation' }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const results = sections.filter(section => `${section.title} ${section.searchText ?? ''}`.toLowerCase().includes(query.toLowerCase().trim()));

  return <div className="searsuite-search-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="searsuite-search-dialog" role="dialog" aria-modal="true" aria-label="Search documentation">
      <div className="searsuite-search-field">
        <UiIcon name="search" size={19} aria-hidden="true" />
        <input ref={inputRef} type="search" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && results[0]) { window.location.hash = results[0].id; onClose(); } }} placeholder={searchLabel} aria-label="Search documentation" />
        <IconButton onClick={onClose} aria-label="Close search"><UiIcon name="close" size={19} /></IconButton>
      </div>
      <div className="searsuite-search-results">
        {results.length ? results.map(section => <Link variant="search" key={section.id} href={`#${section.id}`} onClick={onClose}>{section.title}<UiIcon name="chevronRight" size={16} aria-hidden="true" /></Link>) : <p>No results in this article</p>}
      </div>
      <div className="searsuite-search-hint">Search this article</div>
    </div>
  </div>;
}
