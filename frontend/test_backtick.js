import fs from 'fs';
const content = fs.readFileSync('C:/xampp/htdocs/pojekpw2/frontend/src/FigmaUI.tsx', 'utf8');
let res = [];
let lines = content.split('\n');
let bt = String.fromCharCode(96);
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(bt)) {
        res.push((i+1) + ': ' + lines[i].trim());
    }
}
console.log(res.join('\n'));
