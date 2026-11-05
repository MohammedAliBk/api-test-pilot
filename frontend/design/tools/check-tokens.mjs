#!/usr/bin/env node

/**
 * Token Linter: check-tokens.mjs
 * Validates that frontend files do not use raw hex colors, raw rgb/hsl values,
 * or arbitrary Tailwind bracket values instead of the official design tokens.
 *
 * Usage: node design/tools/check-tokens.mjs [directory]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FE_ROOT = path.resolve(__dirname, '../../');

const cliArgs = process.argv.slice(2);
const TARGET_DIRS = cliArgs.length > 0 
  ? cliArgs.map(arg => path.resolve(process.cwd(), arg))
  : [
      path.join(FE_ROOT, 'design/prototypes'),
      path.join(FE_ROOT, 'design/reference/reference.html'),
      path.join(FE_ROOT, 'src'),
    ];

// Files explicitly allowed to define raw values (the source of truth)
const ALLOWED_FILES = new Set([
  path.join(FE_ROOT, 'design/reference/tokens.css'),
  path.join(FE_ROOT, 'design/tools/check-tokens.mjs'),
]);

const EXTENSIONS = new Set(['.html', '.css', '.js', '.jsx', '.ts', '.tsx']);

// Patterns for violations
const PATTERNS = [
  {
    name: 'Raw Hex Color',
    regex: /#(?:[0-9a-fA-F]{3,4}){1,2}\b(?!-)/g,
    description: 'Raw hex color detected. Use var(--color-*) or Tailwind semantic class.',
  },
  {
    name: 'Raw RGB/RGBA/HSL',
    regex: /\b(?:rgb|rgba|hsl|hsla)\s*\([^)]+\)/g,
    description: 'Raw rgb/hsl function detected. Use token custom properties.',
  },
  {
    name: 'Arbitrary Tailwind Dimension/Color Bracket',
    regex: /\b(?:bg|text|border|p|px|py|m|mx|my|w|h|min-w|min-h|max-w|max-h)-\[#?[0-9a-zA-Z._-]+\]/g,
    description: 'Arbitrary bracket utility detected. Use standard token utility or standard control metric.',
    // Allow known valid token brackets e.g. text-[13px], min-h-[36px], rounded-[var(--...)]
    whitelist: [
      'text-[13px]',
      'text-[11px]',
      'text-[12px]',
      'text-[10px]',
      'min-h-[36px]',
      'px-3.5',
      'py-2.5',
      'min-[901px]:p-5',
    ]
  }
];

function scanTarget(targetPath, fileList = []) {
  if (!fs.existsSync(targetPath)) return fileList;
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    if (EXTENSIONS.has(path.extname(targetPath))) {
      fileList.push(targetPath);
    }
    return fileList;
  }
  const entries = fs.readdirSync(targetPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanTarget(fullPath, fileList);
      }
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

let totalViolations = 0;
const filesToScan = TARGET_DIRS.flatMap(d => scanTarget(d));

console.log(`[Token Linter] Scanning ${filesToScan.length} files for token violations...`);

for (const filePath of filesToScan) {
  if (ALLOWED_FILES.has(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    // Skip comments
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    for (const rule of PATTERNS) {
      const matches = line.match(rule.regex);
      if (matches) {
        for (const match of matches) {
          if (rule.whitelist && rule.whitelist.some(w => match.includes(w) || line.includes(w))) {
            continue;
          }
          // Also ignore if it is inside var(...) in a template
          if (line.includes(`var(`) && match.startsWith('#')) {
            // Check if it's not a var fallback
          }
          console.error(`❌ Violation in ${path.relative(FE_ROOT, filePath)}:${lineIndex + 1}`);
          console.error(`   Rule: ${rule.name} -> "${match}"`);
          console.error(`   Line: ${line.trim()}`);
          totalViolations++;
        }
      }
    }
  });
}

if (totalViolations === 0) {
  console.log(`✅ [Token Linter] All scanned files comply with the Design Token System! (0 violations)`);
  process.exit(0);
} else {
  console.error(`🚨 [Token Linter] Failed with ${totalViolations} token violation(s).`);
  process.exit(1);
}
