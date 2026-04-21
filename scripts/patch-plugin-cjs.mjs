// Patches CJS builds of the docusaurus-plugin-* packages to fix a published-package
// bug where `var import_meta = {}; var currentFilePath = fileURLToPath(import_meta.url);`
// throws `fileURLToPath(undefined)` under Docusaurus's jiti-based CJS loader.
//
// Affects any of these plugins that were tsup-built from the same starter.
// The CJS module system provides __filename/__dirname, so this patch is a pure fix.
//
// Safe to re-run; the patch is idempotent.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const nodeModules = path.join(projectRoot, 'node_modules');

const packages = [
  'docusaurus-plugin-glossary',
  'docusaurus-plugin-new-post-toast',
  'docusaurus-plugin-starter',
  'docusaurus-plugin-banner',
  'docusaurus-plugin-cookie-consent',
  'docusaurus-plugin-statuspage',
];

// Variable names vary between packages (currentFilePath / currentDir,
// currentFilename / currentDirname, etc.). Capture them and rewrite generically.
const THREE_LINE =
  /var import_meta = \{\};\s*\nvar (\w+) = \(0, import_url\.fileURLToPath\)\(import_meta\.url\);\s*\nvar (\w+) = import_path\d*\.default\.dirname\(\1\);/;

const TWO_LINE =
  /var import_meta = \{\};\s*\nvar (\w+) = \(0, import_url\.fileURLToPath\)\(import_meta\.url\);/;

const MARKER = '/* patched for jiti/CJS compatibility */';

function walkDist(distDir) {
  if (!fs.existsSync(distDir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(distDir, { withFileTypes: true })) {
    const full = path.join(distDir, entry.name);
    if (entry.isDirectory()) out.push(...walkDist(full));
    else if (entry.isFile() && entry.name.endsWith('.cjs')) out.push(full);
  }
  return out;
}

let patchedCount = 0;
let skippedCount = 0;

for (const pkg of packages) {
  const distDir = path.join(nodeModules, pkg, 'dist');
  if (!fs.existsSync(distDir)) {
    console.log(`[patch-cjs] skip: ${pkg} (not installed)`);
    continue;
  }

  for (const file of walkDist(distDir)) {
    const rel = path.relative(projectRoot, file);
    const src = fs.readFileSync(file, 'utf8');

    if (src.includes(MARKER)) {
      skippedCount++;
      continue;
    }

    // Replace with genuine assignments. Avoid `var __filename = __filename;` —
    // that's self-referential and evaluates to undefined due to var hoisting.
    // When the plugin's chosen var name already is __filename/__dirname, drop
    // the redeclaration since CJS already provides those globals.
    const pickFile = (v) => (v === '__filename' ? '' : `var ${v} = __filename;`);
    const pickDir = (v) => (v === '__dirname' ? '' : `var ${v} = __dirname;`);

    let patched = src;
    const three = patched.match(THREE_LINE);
    if (three) {
      const [, fileVar, dirVar] = three;
      const replacement = [MARKER, pickFile(fileVar), pickDir(dirVar)].filter(Boolean).join(' ');
      patched = patched.replace(THREE_LINE, replacement);
    } else {
      const two = patched.match(TWO_LINE);
      if (!two) continue;
      const [, fileVar] = two;
      const replacement = [MARKER, pickFile(fileVar)].filter(Boolean).join(' ');
      patched = patched.replace(TWO_LINE, replacement);
    }

    fs.writeFileSync(file, patched);
    console.log(`[patch-cjs] patched: ${rel}`);
    patchedCount++;
  }
}

// --- Second fix: docusaurus-plugin-new-post-toast re-exports `validateOptions`,
// but that function returns { valid, errors, warnings } instead of the validated
// options. Docusaurus treats the returned value as the final `plugin.options`,
// which loses the auto-assigned `id: 'default'` and breaks downstream path.join.
// Neutralise the re-export so Docusaurus falls through to its default option
// normalisation.
const VALIDATE_EXPORT_BROKEN = 'validateOptions: () => validateOptions';
const VALIDATE_EXPORT_FIXED = `/* neutralised for docs-site compat */ _validateOptionsDisabled: () => validateOptions`;

const toastIndex = path.join(nodeModules, 'docusaurus-plugin-new-post-toast', 'dist', 'index.cjs');
if (fs.existsSync(toastIndex)) {
  let src = fs.readFileSync(toastIndex, 'utf8');
  let changed = false;

  if (src.includes(VALIDATE_EXPORT_BROKEN) && !src.includes('_validateOptionsDisabled')) {
    src = src.replace(VALIDATE_EXPORT_BROKEN, VALIDATE_EXPORT_FIXED);
    changed = true;
    console.log('[patch-cjs] neutralised validateOptions export in new-post-toast');
  }

  // Third fix: plugin implements `contentLoaded(args)` and reads `args.allContent`
  // — but that field only exists in the `allContentLoaded` hook. Rename the hook
  // so Docusaurus calls it at the right phase and `allContent` is populated.
  // The body otherwise uses only `args.actions`, which both hooks provide.
  const HOOK_BROKEN = /async contentLoaded\(args\) \{([\s\S]*?args\.allContent)/;
  if (HOOK_BROKEN.test(src) && !src.includes('/* hook-renamed */')) {
    src = src.replace(HOOK_BROKEN, '/* hook-renamed */ async allContentLoaded(args) {$1');
    changed = true;
    console.log('[patch-cjs] renamed contentLoaded → allContentLoaded in new-post-toast');
  }

  if (changed) fs.writeFileSync(toastIndex, src);
}

console.log(`[patch-cjs] done — patched ${patchedCount}, already-patched ${skippedCount}`);
