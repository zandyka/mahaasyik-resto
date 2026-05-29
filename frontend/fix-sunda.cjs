const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace references from Sunda to Ayam Pecak
  content = content.replace(/Sunda/g, 'Ayam Pecak');
  content = content.replace(/sunda/g, 'ayam pecak');
  
  // Custom fixes for specific strings that might sound weird
  content = content.replace(/Masakan Ayam Pecak/g, 'Sajian Ayam Pecak');
  content = content.replace(/masakan Ayam Pecak/g, 'sajian Ayam Pecak');
  content = content.replace(/masakan ayam pecak/g, 'sajian ayam pecak');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Updated:', filePath);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
      replaceInFile(fullPath);
    }
  }
}

traverseDir(path.join(__dirname, 'src'));
replaceInFile(path.join(__dirname, 'index.html'));
