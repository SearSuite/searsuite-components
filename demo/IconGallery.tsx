import { useState } from 'react';
import { Icon, iconGroups, type IconName } from '../src/index.js';

export function IconGallery() {
  const [category, setCategory] = useState<string>(iconGroups[0].title);
  const [query, setQuery] = useState('');
  const group = iconGroups.find(item => item.title === category) ?? iconGroups[0];
  const search = query.trim().toLowerCase();
  const names = search
    ? iconGroups.flatMap(item => item.icons).filter(name => name.includes(search))
    : group.icons;

  return <div className="gallery-icon-catalog">
    <div className="gallery-icon-filters">
      <label>Category
        <select value={category} onChange={event => setCategory(event.target.value)}>
          {iconGroups.map(item => <option key={item.title} value={item.title}>{item.title} ({item.icons.length})</option>)}
        </select>
      </label>
      <label>Find icon
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="e.g. arrows-001" />
      </label>
    </div>
    <div className="gallery-icon-grid">
      {names.map(name => <div className="gallery-icon-item" key={name} title={name}>
        <Icon name={name as IconName} size={24} />
        <span>{name}</span>
      </div>)}
    </div>
    {names.length === 0 && <p>No matching icons.</p>}
  </div>;
}
