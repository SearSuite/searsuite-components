import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Icon, iconGroups, iconNames } from '../dist/index.js';
import { UiIcon } from '../dist/UiIcon.js';
import { uiIconData } from '../dist/uiIconData.js';
import { uiIconNames } from '../dist/uiIconNames.js';

test('exports every icon from the Stroke sheet in one category', () => {
  assert.equal(iconGroups.length, 27);
  assert.equal(iconNames.length, 2490);
  assert.equal(iconGroups.reduce((count, group) => count + group.icons.length, 0), iconNames.length);
  assert.equal(new Set(iconGroups.flatMap(group => group.icons)).size, iconNames.length);
});

test('renders source vectors with inherited color and accessible labeling', () => {
  const hidden = renderToStaticMarkup(React.createElement(Icon, { name: 'arrows-001', size: 20 }));
  assert.match(hidden, /<svg[^>]*width="20"[^>]*height="20"/);
  assert.match(hidden, /aria-hidden="true"/);
  assert.match(hidden, /stroke="currentColor"/);
  assert.doesNotMatch(hidden, /<rect[^>]*fill="white"/);

  const labeled = renderToStaticMarkup(React.createElement(Icon, { name: 'files-001', 'aria-label': 'File icon' }));
  assert.match(labeled, /role="img"/);
  assert.match(labeled, /aria-label="File icon"/);
  assert.doesNotMatch(labeled, /aria-hidden="true"/);
});

test('keeps selected UI artwork identical to the full catalog', () => {
  for (const [role, source] of Object.entries(uiIconNames)) {
    assert.equal(uiIconData[role].source, source);
    assert.equal(
      renderToStaticMarkup(React.createElement(UiIcon, { name: role })),
      renderToStaticMarkup(React.createElement(Icon, { name: source })),
      role,
    );
  }
});
