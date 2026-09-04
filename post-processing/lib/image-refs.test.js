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

// 8. Lowercases filename in an HTML <img src="..."> tag (double quotes).
test('lowercases filename in HTML img tag with double quotes', () => {
  const input = '<img src="/docs/proposals/assets/07-OnDelete-StateDiagram.png" alt="x" width="700">';
  const out = lowercaseImageRefs(input);
  assert.equal(out, '<img src="/docs/proposals/assets/07-ondelete-statediagram.png" alt="x" width="700">');
});

// 9. Lowercases filename in an HTML <img src='...'> tag (single quotes).
test('lowercases filename in HTML img tag with single quotes', () => {
  const input = "<img src='/docs/assets/MyDiagram.svg'>";
  const out = lowercaseImageRefs(input);
  assert.equal(out, "<img src='/docs/assets/mydiagram.svg'>");
});

// 10. HTML img: leaves directory segments and external URLs untouched.
test('HTML img preserves directories and skips external URLs', () => {
  const input = [
    '<img src="/docs/MyDir/SubDir/Image.png">',
    '<img src="https://example.com/assets/Logo.png">',
  ].join('\n');
  const out = lowercaseImageRefs(input);
  assert.equal(out, [
    '<img src="/docs/MyDir/SubDir/image.png">',
    '<img src="https://example.com/assets/Logo.png">',
  ].join('\n'));
});

// 11. HTML img already lowercase is a no-op (idempotency).
test('HTML img already lowercase is a no-op', () => {
  const input = '<img src="/docs/assets/diagram.png" width="500">';
  const out = lowercaseImageRefs(input);
  assert.equal(out, input);
});

// 12. Markdown image with a double-quoted title still lowercases the filename.
test('lowercases filename with double-quoted markdown title', () => {
  const input = '![alt](/docs/proposals/0014-reversed-cluster-vpn/CurrentClusterVPN.png "Overview Current Cluster VPN")';
  const out = lowercaseImageRefs(input);
  assert.equal(out, '![alt](/docs/proposals/0014-reversed-cluster-vpn/currentclustervpn.png "Overview Current Cluster VPN")');
});

// 13. Markdown image with a single-quoted title still lowercases the filename.
test('lowercases filename with single-quoted markdown title', () => {
  const input = "![alt](/docs/assets/MyDiagram.png 'A Title')";
  const out = lowercaseImageRefs(input);
  assert.equal(out, "![alt](/docs/assets/mydiagram.png 'A Title')");
});

// 14. Title present but filename already lowercase is a no-op (idempotency).
test('titled reference already lowercase is a no-op', () => {
  const input = '![alt](/docs/assets/diagram.png "Title")';
  const out = lowercaseImageRefs(input);
  assert.equal(out, input);
});
