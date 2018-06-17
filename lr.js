/**Requires file system access */
const fs = require('fs');

/**Read file into memory */
const d100 = fs.readFileSync('data/d100.txt', 'utf-8');
/**Split into lines*/
const lines = d100.split('\n');
/**Output a random one */
console.log(lines[Math.floor((Math.random() * lines.length))]);