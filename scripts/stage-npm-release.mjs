#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const registry = 'https://registry.npmjs.org/';
const dryRun = process.argv.slice(2).includes('--dry-run');
if (process.argv.length > (dryRun ? 3 : 2)) {
  throw new Error('Usage: node scripts/stage-npm-release.mjs [--dry-run]');
}

function command(binary, args, options = {}) {
  try {
    return execFileSync(binary, args, {
      cwd: options.cwd ?? root,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch (error) {
    if (options.allowFailure) {
      return { code: error.status, output: `${error.stdout ?? ''}\n${error.stderr ?? ''}` };
    }
    throw new Error(`${binary} ${args.join(' ')} failed:\n${error.stderr ?? error.message}`);
  }
}

function main() {
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  if (manifest.name !== '@searsuite/sear-components' || manifest.private || manifest.publishConfig?.access !== 'public') {
    throw new Error('Only the public @searsuite/sear-components package may be staged here.');
  }

  const destination = mkdtempSync(join(tmpdir(), 'sear-components-stage-'));
  const [packed] = JSON.parse(command('npm', ['pack', '--json', '--pack-destination', destination]));
  if (packed.name !== manifest.name || packed.version !== manifest.version) {
    throw new Error('Packed name or version differs from package.json.');
  }
  const names = new Set(packed.files.map((file) => file.path));
  for (const name of names) {
    if (!['package.json', 'README.md', 'LICENSE'].includes(name) && !name.startsWith('dist/')) {
      throw new Error(`Unexpected file in npm package: ${name}`);
    }
    if (name.split('/').some((part) => /^(?:AGENTS|CLAUDE|SKILL)\.md$/i.test(part) || /^\.(?:env|npmrc|git|codex|cursor)$/i.test(part))) {
      throw new Error(`Forbidden file in npm package: ${name}`);
    }
  }
  for (const name of ['dist/index.js', 'dist/index.d.ts', 'dist/styles.css', 'dist/website.css']) {
    if (!names.has(name)) throw new Error(`Missing required npm package file: ${name}`);
  }

  const account = command('npm', ['whoami', '--registry', registry]);
  const staged = JSON.parse(command('npm', ['stage', 'list', '--json', '--registry', registry]));
  const existing = staged.find((item) => item.packageName === manifest.name);
  const target = `${manifest.name}@${manifest.version}`;
  console.log(`npm account: ${account}; package: ${target}; files: ${names.size}`);
  if (existing) {
    if (existing.version !== manifest.version || existing.access !== 'public' || existing.shasum !== packed.shasum) {
      throw new Error(`A different ${manifest.name} version or tarball is already staged. Review it before retrying.`);
    }
    console.log(`${target} is already staged with matching contents (${existing.id}).`);
    return;
  }

  const published = command('npm', ['view', target, 'version', '--json', '--registry', registry], { allowFailure: true });
  if (typeof published === 'string') {
    if (JSON.parse(published) !== manifest.version) throw new Error(`Unexpected published version for ${target}.`);
    console.log(`${target} is already published.`);
    return;
  }
  if (!/E404|404 Not Found/.test(published.output)) {
    throw new Error(`Could not check ${target}:\n${published.output.slice(-700)}`);
  }
  if (dryRun) {
    console.log(`Dry run: ${target} is ready to stage; no package was uploaded.`);
    return;
  }

  const result = command('npm', ['stage', 'publish', join(destination, packed.filename), '--access', 'public', '--registry', registry]);
  console.log(result);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
