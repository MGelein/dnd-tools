/**Import the monster creation and loading module */
const { monster } = require('../lib/monster');
/**Load the file IO module */
const fs = require('fs');



/**
 * This function opens a tab on the aidedd site for every monster in the
 * wildshape document
 */
function openTabsForAllWildshapes() {
    const exec = require('child_process').execSync;
    let contents = fs.readFileSync('wildshapes.csv', 'utf-8');
    let lines = contents.split('\n');
    let baseUrl = 'http://aidedd.org/dnd/monstres.php?vo=';
    lines.forEach(function (line) {
        let parts = line.split(',');
        let monsterName = parts[0].trim().toLowerCase();
        while (monsterName.indexOf(' ') > -1) {
            monsterName = monsterName.replace(' ', '-');
        }
        exec('start ' + baseUrl + monsterName);
    });
}