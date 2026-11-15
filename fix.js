const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'artifacts/my-visit-prep/src/pages/Home.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const wrongEnding = `          {/* Condition-specific sections wrapper */}
          <section className="no-print" aria-labelledby="select-label">
            <span id="select-label" className="sr-only">Condition configuration</span>`;

const correctEnding = `        {/* Questions panel */}
        {selected && (`;

content = content.replace(wrongEnding, correctEnding);
fs.writeFileSync(filePath, content);
console.log('Fixed ending');
