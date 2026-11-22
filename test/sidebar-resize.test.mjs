import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { SidebarResizeHandle, attachSidebarResizeHandle } from '../dist/index.js';

test('renders an accessible separator for static and React pages', () => {
  const html = renderToString(React.createElement(SidebarResizeHandle));
  assert.match(html, /role="separator"/);
  assert.match(html, /aria-orientation="vertical"/);
  assert.match(html, /tabindex="0"/);
});

test('resizes with pointer and keyboard, resets, and cleans up listeners', () => {
  const dom = new JSDOM('<div class="searsuite-shell searsuite-resizable-shell"><aside class="searsuite-sidebar"></aside><div class="searsuite-sidebar-resize-handle"></div></div>', { pretendToBeVisual: true });
  const previous = Object.fromEntries(['window', 'document', 'getComputedStyle'].map(key => [key, globalThis[key]]));
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);

  const shell = dom.window.document.querySelector('.searsuite-shell');
  const sidebar = shell.querySelector('.searsuite-sidebar');
  const handle = shell.querySelector('.searsuite-sidebar-resize-handle');
  shell.getBoundingClientRect = () => ({ width: 1000 });
  sidebar.getBoundingClientRect = () => ({ width: Number.parseInt(shell.style.getPropertyValue('--searsuite-sidebar-width'), 10) || 304 });
  const pointer = (type, clientX) => {
    const event = new dom.window.MouseEvent(type, { bubbles: true, button: 0, clientX });
    Object.defineProperty(event, 'pointerId', { value: 1 });
    handle.dispatchEvent(event);
  };
  const key = (name) => handle.dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, key: name, cancelable: true }));

  try {
    const detach = attachSidebarResizeHandle(handle);
    assert.equal(handle.getAttribute('aria-valuenow'), '304');
    pointer('pointerdown', 300);
    pointer('pointermove', 390);
    pointer('pointerup', 390);
    assert.equal(shell.style.getPropertyValue('--searsuite-sidebar-width'), '394px');
    assert.equal(dom.window.document.documentElement.classList.contains('searsuite-resizing-sidebar'), false);
    key('End');
    assert.equal(shell.style.getPropertyValue('--searsuite-sidebar-width'), '480px');
    key('ArrowLeft');
    assert.equal(shell.style.getPropertyValue('--searsuite-sidebar-width'), '464px');
    key('Home');
    assert.equal(shell.style.getPropertyValue('--searsuite-sidebar-width'), '220px');
    handle.dispatchEvent(new dom.window.MouseEvent('dblclick', { bubbles: true }));
    assert.equal(shell.style.getPropertyValue('--searsuite-sidebar-width'), '');
    detach();
    key('ArrowRight');
    assert.equal(shell.style.getPropertyValue('--searsuite-sidebar-width'), '');
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
    dom.window.close();
  }
});
