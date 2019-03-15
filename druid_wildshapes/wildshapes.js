/**Import the monster creation and loading module */
const monster = require('../lib/monster');
/**Load the file IO module */
const fs = require('fs');
/**Load the template file for the monsters */
const template = fs.readFileSync('template.md', 'utf-8');
/**The wildshape dictionary */
const ws = parseWildshapes();
const intro = 
`# Druid Wildshapes
This document contains most, if not all, of the available wildshapes for a druid in fifth edition Dungeons and Dragons.
The monsters have been ordered by their challenge rating. Please keep in mind the rules for Wild Shape, as written in
the Player's Handbook (PHB 66)

For a brief overview you may consult the tables below, but please remember that the Player's Handbook, and ultimately
the DM has the final say. 

##### Beast Shapes (Normal Druid)
| Level | Max. CR | Limitations |
|:----:|:-------------|:--------|
| 2nd | 1/4 | No flying or swimming speed |
| 4th | 1/2 | No flying speed |
| 8th | 1 | None |


##### Beast Shapes (Moon Druid)
| Level | Max. CR | Limitations |
|:----:|:-------------|:--------|
| 2nd | 1 | No flying or swimming speed |
| 4th | 1 | No flying speed |
| 6th | 2 | No flying speed |
| 8th | 2 | None |
| 9th | 3 | None |
| 12th | 4 | None |
| 15th | 5 | None |
| 18th | 6 | None |

`;
/**Prints the wildshapes content */
const contents = intro + printWildshapes();
//Finally write the file contents to the disk
fs.writeFileSync('wildshapes.md', contents, 'utf-8');

/**
 * Prints all the wildhsapes to a single merged string with headers
 */
function printWildshapes(){
    //The set of lines that will be joined
    let lines = [];
    //Get all the animal names
    let names = Object.keys(ws);
    //The last CR category
    let lastCR = "";
    //Go through all the names
    names.forEach(name =>{
        //Retrieve this entry
        let entry = ws[name];
        //If this cr is a new category, add a header
        if(entry.cr != lastCR){
            //Add a header for every CR category
            lines.push("\n## Challenge Rating " + entry.cr);
            lastCR = entry.cr;
        }
        //Now add the template
        lines.push(entry.md);
    });
    //Join all content on a new line
    return lines.join("\n");
}

/**
 * Parses all the wildshape lines into a dictionary object
 */
function parseWildshapes() {
    //This will hold all the result
    let ws = {};
    //Load the file
    let lines = openWildshapesFile();
    //Parse every line
    lines.forEach(line => {
        //Split csv line into parts
        let parts = line.split(',');
        let name = parts[0].trim().toLowerCase().replace(/\s/g, '-');
        let def = monster.loadMonster(name);
        if (def != undefined) {
            ws[name] = {md: fillTemplate(monster.loadMonster(name)), cr: def.cr};
        }else{
            console.log("Could not load monster of type: " + name);
        }
    });

    //Return the filled wildshape dictionary
    return ws;
}

/**
 * Fills the monstertemplate using the provided monster definition
 * @param {Object} monsterDef 
 */
function fillTemplate(monsterDef) {
    //This will hold the result
    let result = template.replace(/%NAME%/g, titleize(monsterDef.name));
    result = result.replace(/%SIZE%/g, monsterDef.size);
    result = result.replace(/%TYPE%/g, monsterDef.type);
    result = result.replace(/%ALIGNMENT%/g, monsterDef.alignment);
    result = result.replace(/%AC%/g, monsterDef.ac);
    result = result.replace(/%HP%/g, monsterDef.hp);
    result = result.replace(/%SPEED%/g, monsterDef.speed);
    result = result.replace(/%MISC%/g, getMisc(monsterDef));
    result = result.replace(/%ACTIONS%/g, getActions(monsterDef));
    result = result.replace(/%ABILITIES%/g, getAbilities(monsterDef));
    result = result.replace(/%STR%/g, abilityScore(monsterDef.str));
    result = result.replace(/%DEX%/g, abilityScore(monsterDef.dex));
    result = result.replace(/%CON%/g, abilityScore(monsterDef.con));
    result = result.replace(/%INT%/g, abilityScore(monsterDef.int));
    result = result.replace(/%WIS%/g, abilityScore(monsterDef.wis));
    result = result.replace(/%CHR%/g, abilityScore(monsterDef.chr));
    result = result.replace(/%LANGUAGES%/g, monsterDef.languages);
    result = result.replace(/%CR%/g, monsterDef.cr);

    //Return the filled-out template
    return result;
}

/**
 * Returns the abilities part of the monster md part
 * @param {Object} mDef 
 */
function getAbilities(mDef){
    //The resulting line array
    let result = [];
    //Go thoruhg all abilities
    mDef.abilities.forEach(ability =>{
        let line = "> ***" + ability.name + "*** " + ability.desc + "   ";
        result.push(line);
    });
    //Rturn the joined array 
    if(result.length == 0) result.push(">");
    return result.join('\n');
}

/**
 * Returns the actions part of the monster md part
 * @param {Object} mDef 
 */
function getActions(mDef){
    //The resulting line array
    let result = [];
    //Go thoruhg all abilities
    mDef.actions.forEach(action =>{
        let line = "> ***" + action.name + "*** " + action.desc + "   ";
        result.push(line);
    });
    //Rturn the joined array 
    if(result.length == 0) result.push(">");
    return result.join('\n');
}

/**
 * Returns all the possible extras (damage resistances etc) for ths monster
 * @param {Object} mDef 
 */
function getMisc(mDef){
    //The resulting line array
    let result = [];
    if(mDef.savingThrows.length > 0) result.push("> - **Saving Throws** " + mDef.savingThrows + "   ");
    if(mDef.skills.length > 0) result.push("> - **Skills** " + mDef.skills + "   ");
    if(mDef.damageResistances.length > 0) result.push("> - **Damage Resistances** " + mDef.damageResistances + "   ");
    if(mDef.damageImmunities.length > 0) result.push("> - **Damage Immunities** " + mDef.damageImmunities + "   ");
    if(mDef.damageVulnerabilities > 0) result.push("> - **Damage Vulnerabilities** " + mDef.damageVulnerabilities + "   ");
    if(mDef.conditionImmunities > 0) result.push("> - **Condition Immunities** " + mDef.conditionImmunities + "   ");
    if(mDef.senses > 0) result.push("> - **Senses** " + mDef.senses + "   ");

    //Rturn the joined array 
    if(result.length == 0) result.push(">");
    return result.join('\n');
}

/**
 * Turns a name into a capitalized per letter string
 * @param {String} name 
 */
function titleize(name){
    let words = name.split('-');
    for(let i = 0; i < words.length; i++){
        //Capitalize the first word
        words[i] = words[i].substring(0, 1).toUpperCase() + words[i].substring(1);
    }
    //Return the words array
    return words.join(' ');
}

/**
 * Converts a ability score string into a string
 * that also shows the modifier
 */
function abilityScore(str) {
    //The numeric value
    let num = parseInt(str);
    //Convert into modifier
    num -= 10;
    num /= 2;
    num = Math.floor(num);
    //Return the formatted string
    return str + " (" + num + ")";
}

/**
 * Loads the wildshapes csv file and returns it as a string array
 */
function openWildshapesFile() {
    let contents = fs.readFileSync('wildshapes.csv', 'utf-8');
    let lines = contents.split('\n');
    return lines;
}

/**
 * This function opens a tab on the aidedd site for every monster in the
 * wildshape document
 */
function openTabsForAllWildshapes() {
    const exec = require('child_process').execSync;
    let lines = openWildshapesFile();
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