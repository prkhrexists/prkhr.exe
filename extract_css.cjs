const fs = require('fs');

const oldIndex = fs.readFileSync('temp_old_index.css', 'utf16le'); // PS Out-File default
let startIndex = oldIndex.indexOf('/* ============================================================');
let lines = oldIndex.split('\n');

let insideCodeCave = false;
let codecaveLines = [];

for (let line of lines) {
  if (line.includes('CODE CAVE — ZONE 1')) {
    insideCodeCave = true;
    codecaveLines.push('/* === CODE CAVE — ZONE 1 === */');
    continue;
  }
  if (insideCodeCave && line.includes('YELLOWDUCK HQ')) {
    insideCodeCave = false;
    break;
  }
  if (insideCodeCave) {
    codecaveLines.push(line);
  }
}

fs.writeFileSync('src/styles/codecave.css', codecaveLines.join('\n'));
console.log('Extracted ' + codecaveLines.length + ' lines to codecave.css');
