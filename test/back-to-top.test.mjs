import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { BackToTop, attachBackToTop } from '../dist/index.js';

test('renders an accessible button without browser globals', () => {
  const html = renderToString(React.createElement(BackToTop));
  assert.match(html, /aria-label="Back to top"/);
  assert.match(html, /data-searsuite-component="BackToTop"/);
  assert.match(html, /hidden=""/);
  assert.doesNotMatch(renderToString(React.createElement(BackToTop, { alwaysVisible: true })), / hidden=/);
});

test('shows on scroll, returns to the top in bounded time, respects reduced motion, and detaches', () => {
  const dom = new JSDOM('<button data-show-after="300" hidden></button>', { pretendToBeVisual: true });
  const { window } = dom;
  const button = window.document.querySelector('button');
  const scrolls = [];
  let scrollY = 0;
  let reduceMotion = false;
  let nextFrame = 1;
  const frames = new Map();
  Object.defineProperty(window, 'scrollY', { get: () => scrollY });
  window.scrollTo = (options) => {
    scrolls.push(options);
    scrollY = options.top;
  };
  window.requestAnimationFrame = (callback) => {
    const id = nextFrame++;
    frames.set(id, callback);
    return id;
  };
  window.cancelAnimationFrame = (id) => frames.delete(id);
  const runFrame = (time) => {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(time));
  };
  window.matchMedia = () => ({ get matches() { return reduceMotion; } });

  try {
    const detach = attachBackToTop(button);
    assert.equal(button.hidden, true);
    scrollY = 301;
    window.dispatchEvent(new window.Event('scroll'));
    assert.equal(button.hidden, false);
    button.click();
    runFrame(0);
    runFrame(225);
    assert.ok(scrollY > 0 && scrollY < 301);
    runFrame(450);
    assert.deepEqual(scrolls.at(-1), { top: 0, behavior: 'instant' });
    assert.equal(frames.size, 0);

    reduceMotion = true;
    scrollY = 600;
    button.click();
    assert.deepEqual(scrolls.at(-1), { top: 0, behavior: 'instant' });
    reduceMotion = false;
    scrollY = 1000;
    button.click();
    assert.equal(frames.size, 1);
    window.dispatchEvent(new window.Event('wheel'));
    assert.equal(frames.size, 0);
    button.focus();
    scrollY = 500;
    button.dispatchEvent(new window.MouseEvent('click', { detail: 1 }));
    assert.notEqual(window.document.activeElement, button);
    assert.equal(frames.size, 1);
    scrollY = 0;
    window.dispatchEvent(new window.Event('scroll'));
    assert.equal(button.hidden, true);

    detach();
    assert.equal(frames.size, 0);
    scrollY = 500;
    window.dispatchEvent(new window.Event('scroll'));
    button.click();
    assert.equal(button.hidden, true);
    assert.equal(scrolls.length, 4);
  } finally {
    dom.window.close();
  }
});
