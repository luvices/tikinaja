const fs = require('fs');
const path = require('path');

const dir = 'public/tools-scripts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f !== 'i18n.js' && f !== 'app.js' && f !== 'tiktok-stats-tool.js');

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the opening line
    const searchStr = "document.addEventListener('DOMContentLoaded', () => {";
    if (content.includes(searchStr)) {
        content = content.replace(searchStr, "(function() {");
        
        // Replace the very last '});' with '})();'
        const lastIndex = content.lastIndexOf('});');
        if (lastIndex !== -1) {
            content = content.substring(0, lastIndex) + '})();' + content.substring(lastIndex + 3);
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed ' + file);
    }
}
