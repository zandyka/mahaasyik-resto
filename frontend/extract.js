import fs from 'fs';
const logFile = 'C:/Users/zacky/.gemini/antigravity/brain/68315ca9-ef4e-4797-b2d3-19883c5a7c23/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(logFile, 'utf8').split('\n');
for (let line of lines) {
    if (!line) continue;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            for (let call of obj.tool_calls) {
                if (call.name === 'default_api:write_to_file' && call.arguments && call.arguments.TargetFile && call.arguments.TargetFile.endsWith('FigmaUI.tsx')) {
                    fs.writeFileSync('C:/xampp/htdocs/pojekpw2/frontend/src/FigmaUI.backup.tsx', call.arguments.CodeContent);
                    console.log('Successfully wrote FigmaUI.backup.tsx');
                    process.exit(0);
                }
            }
        }
    } catch(e) {}
}
console.log('Not found');
