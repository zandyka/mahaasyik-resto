import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('./src/FigmaUI.tsx');

const srcDir = './src';
const dirs = ['components/ui', 'components/layout', 'components/sections', 'pages', 'types', 'constants', 'utils'];

dirs.forEach(d => {
  const p = path.join(srcDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// A helper to create a file with base imports
function createFile(filePath: string) {
  const f = project.createSourceFile(filePath, '', { overwrite: true });
  f.addImportDeclaration({
    defaultImport: 'React',
    namedImports: ['useState', 'useEffect', 'useMemo', 'memo'],
    moduleSpecifier: 'react',
  });
  f.addImportDeclaration({
    namedImports: ['Menu', 'X', 'Search', 'Moon', 'Sun', 'Drumstick'],
    moduleSpecifier: 'lucide-react',
  });
  f.addImportDeclaration({
    defaultImport: 'api',
    moduleSpecifier: '@/api', // We will set up alias or just use relative later
  });
  return f;
}

const typesFile = createFile('./src/types/index.ts');
const constantsFile = createFile('./src/constants/index.ts');
const utilsFile = createFile('./src/utils/helpers.ts');
const componentsUiDir = './src/components/ui';
const componentsLayoutDir = './src/components/layout';
const componentsSectionsDir = './src/components/sections';
const pagesDir = './src/pages';

// 1. Move all type aliases and interfaces to types/index.ts
sourceFile.getTypeAliases().forEach(node => {
  typesFile.addTypeAlias({
    name: node.getName(),
    type: node.getTypeNode()?.getText() || 'any',
    isExported: true,
  });
});
sourceFile.getInterfaces().forEach(node => {
  typesFile.addInterface({
    name: node.getName(),
    properties: node.getProperties().map(p => ({ name: p.getName(), type: p.getTypeNode()?.getText() })),
    isExported: true,
  });
});

// 2. Move all top-level variable statements (constants) to constants/index.ts
// EXCEPT standard react components defined as const (if any)
sourceFile.getVariableStatements().forEach(node => {
  const decs = node.getDeclarations();
  if (decs.length > 0) {
    const text = node.getText();
    constantsFile.addStatements(text.replace(/^const /, 'export const '));
  }
});

// 3. Move functions
const functions = sourceFile.getFunctions();
for (const fn of functions) {
  const name = fn.getName();
  if (!name) continue;

  const text = fn.getText();
  
  if (name === 'mapMenuFromApi' || name === 'parsePrice' || name === 'formatRp') {
    utilsFile.addStatements(text.replace(/^function /, 'export function '));
  } else if (name.endsWith('Section')) {
    const f = createFile(`${componentsSectionsDir}/${name}.tsx`);
    f.addStatements(text.replace(/^export function /, 'export function ').replace(/^function /, 'export function '));
  } else if (name.endsWith('Page')) {
    const f = createFile(`${pagesDir}/${name}.tsx`);
    f.addStatements(text.replace(/^export function /, 'export function ').replace(/^function /, 'export function '));
  } else if (['ButtonPrimary', 'ButtonSecondary', 'ButtonWhite', 'ButtonGreen', 'Badge', 'Card', 'SectionTitle', 'ResInput', 'CounterInput', 'StepIndicator'].includes(name)) {
    const f = createFile(`${componentsUiDir}/${name}.tsx`);
    f.addStatements(text.replace(/^export function /, 'export function ').replace(/^function /, 'export function '));
  } else if (['Navbar', 'Footer', 'GununganLogo', 'FloatingActionButton', 'WhatsAppButton'].includes(name)) {
    const f = createFile(`${componentsLayoutDir}/${name}.tsx`);
    f.addStatements(text.replace(/^export function /, 'export function ').replace(/^function /, 'export function '));
  } else if (name === 'App' || name === 'FigmaUI') {
    // Leave App in FigmaUI.tsx or move to App.tsx
  } else {
    // other components like MenuCard, ColHead, BrandSection
    if (name === 'MenuCard' || name === 'ColHead') {
      const f = createFile(`${componentsUiDir}/${name}.tsx`);
      f.addStatements(text.replace(/^function /, 'export function '));
    } else if (name === 'BrandSection') {
      const f = createFile(`${componentsSectionsDir}/${name}.tsx`);
      f.addStatements(text.replace(/^function /, 'export function '));
    }
  }
}

// 4. Create an index file for UI and Layout for easier imports
// ...

project.saveSync();
console.log("Extraction complete!");
