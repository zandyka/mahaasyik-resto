const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'ui');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Button') && f.endsWith('.tsx'));

for (const file of files) {
  const fullPath = path.join(dir, file);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Replace the component signature to accept and spread ...props
  content = content.replace(
    /export function ([A-Za-z]+)\(\{\r?\n  children,\r?\n  size = "md",\r?\n  className = "",\r?\n\}: \{\r?\n  children: React\.ReactNode;\r?\n  size\?: BtnSize;\r?\n  className\?: string;\r?\n\}\)/g,
    import { ButtonHTMLAttributes } from 'react';\n\ninterface  extends ButtonHTMLAttributes<HTMLButtonElement> {\n  size?: BtnSize;\n}\n\nexport function ({\n  children,\n  size = "md",\n  className = "",\n  ...props\n}: )
  );
  
  // Also need to inject {...props} into the <button> tag
  content = content.replace(/<button\r?\n      className=/g, '<button\n      {...props}\n      className=');
  
  fs.writeFileSync(fullPath, content);
  console.log('Fixed', file);
}
