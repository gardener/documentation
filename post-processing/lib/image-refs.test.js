import { test } from 'node:test';
import assert from 'node:assert/strict';

import { lowercaseImageRefs } from './image-refs.js';

// 1. Lowercases the filename of a local absolute image reference.
test('lowercases filename of local absolute image reference', () => {
  const input = '![alt](/docs/proposals/assets/03-scale-up-sequenceDiagram.png)';
  const out = lowercaseImageRefs(input);
  assert.equal(out, '![alt](/docs/proposals/assets/03-scale-up-sequencediagram.png)');
});

// 2. Leaves external http(s) URLs untouched.
test('leaves external URLs untouched', () => {
  const input = '![alt](https://apeirora.eu/assets/img/BMWK-EU.png)';
  const out = lowercaseImageRefs(input);
  assert.equal(out, input);
});

// 3. Leaves uppercase in directory segments untouched, lowercases only the filename.
test('lowercases only filename, not directory segments', () => {
  const input = '![alt](/docs/MyDir/SubDir/Image.png)';
  const out = lowercaseImageRefs(input);
  assert.equal(out, '![alt](/docs/MyDir/SubDir/image.png)');
});

// 4. Already lowercase stays unchanged (idempotency / fixed point).
test('already lowercase is a no-op', () => {
  const input = '![alt](/docs/assets/diagram.png)';
  const out = lowercaseImageRefs(input);
  assert.equal(out, input);
});

// 5. Covers all image extensions (png/jpg/jpeg/svg/webp).
test('covers all image extensions', () => {
  const input = [
    '![](/a/File.png)',
    '![](/a/File.jpg)',
    '![](/a/File.jpeg)',
    '![](/a/File.svg)',
    '![](/a/File.webp)',
  ].join('\n');
  const out = lowercaseImageRefs(input);
  assert.equal(out, [
    '![](/a/file.png)',
    '![](/a/file.jpg)',
    '![](/a/file.jpeg)',
    '![](/a/file.svg)',
    '![](/a/file.webp)',
  ].join('\n'));
});

// 6. Does not touch non-image links.
test('leaves non-image links untouched', () => {
  const input = '[Link](/docs/SomePage.md)';
  const out = lowercaseImageRefs(input);
  assert.equal(out, input);
});

// 7. Multiple references in one document.
test('processes multiple references', () => {
  const input = '![a](/x/Overlay-Network.drawio.png) and ![b](/x/No-Overlay-Network.drawio.png)';
  const out = lowercaseImageRefs(input);
  assert.equal(out, '![a](/x/overlay-network.drawio.png) and ![b](/x/no-overlay-network.drawio.png)');
});
