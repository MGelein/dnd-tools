/**
 * Combat module, takes care of health and initiative tracking
 */

/**We need fs access */
const fs = require('fs');
//Load the monster loading module
const { loadMonster } = require('./monster');

//Denotes player controlled characters
const PC = "PC";
//Denotes non player controlled characters
const NPC = "NPC";
//The letters of the alphabet, maybe a bit hacky, but who cares?
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYΖ";

//The list of people in the initiative order
var initiativeOrder = [];
//The list of monsters on the HP list
var hpList = [];
//Hash table for the monsters that have been loaded
var monsters = {};
/**
 * Takes the arguments and starts a combat simulation from the file that was given as an argument
 * @param {String} args 
 */
exports.combat = function (args) {
    if (fs.existsSync(args.trim())) {
        //Load the file, and remove carriage returns
        let lines = fs.readFileSync(args, "utf-8").replace('\r', '');
        //Then replace four spaces and two spaces with a tab
        lines = lines.replace("    ", "\t").replace("  ", "").split("\n");
        parseLines(lines);
        console.log(hpList);
    } else {
        console.log("Could not find file: " + args);
    }
}

/**
 * Parses the array of lines from the loaded file and turns it into a combat
 * @param {Array} lines 
 */
function parseLines(lines) {
    //Go through every line
    lines.forEach(function (line) {
        //Clean the line
        line = line.trim();
        //Skip empty lines
        if(line.length < 1) return;
        //See if this line contains a tab, it is an enemy definition
        if (line.indexOf("\t") != -1) {
            let parts = line.split("\t");
            let monsterName = parts[0];//the monster name is the first part of that line
            let monsterAmt = parseInt(parts[1]);//The monster count is the second part of the line
            console.log("Loading monster(" + monsterName + ")...");
            let monsterDef = loadMonster(monsterName);
            //Check to see if we could load the monsterDef
            if (monsterDef != undefined) {
                monsters[monsterName] = monsterDef;
            }
            //Now add them to the health order, depending on how many
            if (monsterAmt > 1) {
                //Preload the hp, to prevent multiple requests
                let monsterHp = getMonsterHP(monsterName);
                //Now add each one to the list with a unique name
                for(var i = 0; i < monsterAmt; i++){
                    //Get the name modifier from the alphabet, loop back round
                    let modifier = ALPHABET[i % ALPHABET.length];
                    hpList.push({
                        name: capitalize(monsterName) + modifier,
                        hp: monsterHp
                    });
                }
            } else {
                //Add the only monster to this list
                hpList.push({
                    name: capitalize(monsterName),
                    hp: getMonsterHP(monsterName)
                });
            }
            
            //But for every line of monster there is only one initiative tracking
            //This means that if you want to split enemies into groups, you can add multiple
            //lines of the same type, so 2 lines with 5 kobolds each, for example.
            initiativeOrder.push({
                name: capitalize(monsterName + (monsterAmt > 1 ? "s" : "")),
                initiative: getMonsterInitiative(monsterName),
                type: NPC
            });
        } else {
            //An ally, only gets added to the initiative order, not the hp list
            initiativeOrder.push({
                name: capitalize(line),
                initiative: undefined,
                type: PC
            });
        }
    });
}

/**
 * Returns the standard initiative for the specified monster
 * @param {String} name 
 */
function getMonsterInitiative(name) {
    //Load the monster and calculate initiative modifier
    let m = monsters[name];
    let initiativeBonus = Math.floor((m.dex - 10) / 2);
    //Standard initiative position is 10 + bonus
    return initiativeBonus + 10;
}

/**
 * Returns the hp for the specified monster
 * @param {String} name 
 */
function getMonsterHP(name) {
    //Load the monster and calculate initiative modifier
    let m = monsters[name];
    //Now return the first part of the health, parsed to integer
    return parseInt(m.hp.split(" ")[0]);
}

/**
 * Capitalizes the string
 * @param {String} s 
 */
function capitalize(s) {
    //Returns the capitalized string
    return s.substr(0, 1).toUpperCase() + s.substring(1);
}