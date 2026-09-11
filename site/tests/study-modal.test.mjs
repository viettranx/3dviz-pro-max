// The Show 3D dialog's phone contract is in the component source: a short loading line, the
// embed flag on the iframe, and a full-viewport dialog below the `md` breakpoint.
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/components/study-modal.tsx', import.meta.url), 'utf8');

test('the study modal iframe asks for embed chrome and a single-line Loading… status', () => {
  assert.match(source, /searchParams\.set\('embed', '1'\)/);
  assert.match(source, />\s*Loading…\s*</);
  assert.equal(source.includes('Preparing the study'), false);
});

test('the study modal fills the viewport on small screens instead of a 16:9 letterbox', () => {
  assert.match(source, /max-md:h-dvh/);
  assert.match(source, /max-md:aspect-auto/);
  assert.match(source, /max-md:flex-1/);
});
