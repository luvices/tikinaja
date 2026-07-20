/**
 * Post-build obfuscator for Next.js JS chunks.
 * Run after `next build`: node scripts/obfuscate-chunks.js
 *
 * Processes every .js file in .next/static/chunks/
 * and overwrites it with an obfuscated version.
 */

const JavaScriptObfuscator = require('javascript-obfuscator');
const fs   = require('fs');
const path = require('path');

const CHUNKS_DIR = path.join(__dirname, '..', '.next', 'static', 'chunks');

// Lighter obfuscation settings — heavier ones break Next.js module system
const OPTIONS = {
  compact: true,
  controlFlowFlattening: false,   // breaks Next.js chunk loading
  deadCodeInjection: false,       // breaks tree-shaking assumptions
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,           // must be false for Next.js runtime
  selfDefending: false,           // can break minified output
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 8,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.6,
  transformObjectKeys: false,     // breaks Next.js module exports
  unicodeEscapeSequence: false,
};

function getAllJsFiles(dir) {
  var result = [];
  var entries = fs.readdirSync(dir, { withFileTypes: true });
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllJsFiles(fullPath).forEach(function(f) { result.push(f); });
    } else if (entry.name.endsWith('.js') && !entry.name.endsWith('.map')) {
      result.push(fullPath);
    }
  }
  return result;
}

if (!fs.existsSync(CHUNKS_DIR)) {
  console.error('ERROR: .next/static/chunks not found. Run `next build` first.');
  process.exit(1);
}

var files = getAllJsFiles(CHUNKS_DIR);
console.log('Found ' + files.length + ' JS chunk(s) to obfuscate...\n');

var ok = 0, fail = 0;
files.forEach(function(filePath) {
  try {
    var src = fs.readFileSync(filePath, 'utf8');
    // Skip tiny runtime polyfill files (< 200 bytes) — they may break
    if (src.length < 200) { return; }
    var result = JavaScriptObfuscator.obfuscate(src, OPTIONS);
    fs.writeFileSync(filePath, result.getObfuscatedCode(), 'utf8');
    var kb = Math.round(src.length / 1024);
    console.log('  OK  ' + path.relative(CHUNKS_DIR, filePath) + ' (' + kb + ' KB)');
    ok++;
  } catch (e) {
    console.warn('  SKIP ' + path.relative(CHUNKS_DIR, filePath) + ' — ' + e.message);
    fail++;
  }
});

console.log('\nDone: ' + ok + ' obfuscated, ' + fail + ' skipped.');
