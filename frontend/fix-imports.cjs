const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, filesList);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const allFiles = getFiles(srcDir);

// Collect all exports
const exportsMap = {};

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match export function X, export const X, export type X, export interface X
  const exportRegex = /export\s+(?:function|const|type|interface)\s+([A-Za-z0-9_]+)/g;
  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    let relPath = path.relative(srcDir, file).replace(/\\/g, '/').replace(/\.tsx?$/, '');
    if (relPath.endsWith('/index')) {
      relPath = relPath.replace(/\/index$/, '');
    }
    exportsMap[name] = `@/${relPath}`;
  }
});

// Now inject imports
allFiles.forEach(file => {
  if (file.endsWith('index.ts')) return; // skip index files
  let content = fs.readFileSync(file, 'utf8');
  let newImports = [];
  
  for (const [name, importPath] of Object.entries(exportsMap)) {
    // Check if name is used in the file and NOT exported from this same file
    const regex = new RegExp(`\\b${name}\\b`, 'g');
    if (regex.test(content)) {
      const isExportedHere = new RegExp(`export\\s+(?:function|const|type|interface|default(?:\\s+function)?)\\s+${name}\\b`).test(content);
      const isAlreadyImported = new RegExp(`import\\s+.*?\\b${name}\\b.*?from`).test(content);
      if (!isExportedHere && !isAlreadyImported) {
        newImports.push(`import { ${name} } from '${importPath}';`);
      }
    }
  }
  
  if (newImports.length > 0) {
    content = newImports.join('\n') + '\n' + content;
    fs.writeFileSync(file, content);
  }
});

console.log('Imports fixed!');
