/**
 * Combat module, takes care of health and initiative tracking
 */

/**We need fs access */
const fs = require('fs');
//Load the monster loading module
const { loadMonster } = require('./monster');
//Synchronous readline stuff
const readline = require('readline-sync');
//The normal readline lib
const rl = require('readline');
//How much room do we need to make the screen blank?
const blank = '\n'.repeat(process.stdout.rows);
//Import the header functionality
const { header, expand, table } = require("./table");
//Use Chalk to color the command line output
const chalk = require('chalk');

//Denotes player controlled characters
const PC = "PC";
//Denotes non player controlled characters
const NPC = "NPC";
//The letters of the alphabet, maybe a bit hacky, but who cares?
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYΖ";

//The list of people in the initiative order
var initiativeOrder = [];
//What actor is currently doing something?
var actorIndex = 0;
//At what turn are we in combat?
var turnCounter = 1;
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
        //Now that we have parsed the list, we're ready to prepare combat
        prepareCombat();
    } else {
        console.log("Could not find file: " + args);
    }
}

/**
 * Prepares combat
 */
function prepareCombat(hideGraphics) {
    let showGraphics = !hideGraphics;
    //Clear screen
    if (showGraphics) cls();
    //Add a header explaining what we're doing
    if (showGraphics) console.log(header("Initiative"));
    //Go through initiative list and ask for manual input for those who have no initiative yet
    initiativeOrder.forEach(function (item) {
        if (item.initiative == undefined) {
            //Ask for initiative
            item.initiative = parseInt(readline.questionInt("Initiative for " + item.name + "? "));
        }
    });
    //Now sort the initiative order based on initiative bonus
    initiativeOrder.sort(function (a, b) {
        //Check if we have a PC-NPC tie
        if (a.initiative == b.initiative && a.type != b.type) {
            if (a.type === PC) return -1;
            else return 1;
        }
        return b.initiative - a.initiative;
    });
    //Initiative order has been set, now startCombat
    startCombat();
}

/**
 * Starts the actual combat mechanics
 */
function startCombat() {
    var running = true;
    while (running) {
        //Normalize the actorIndex
        actorIndex = (actorIndex + initiativeOrder.length) % initiativeOrder.length;
        //Render the initiative order for the first time, and then ask for a key-in
        renderInitiativeOrder();
        //See if we still have enough participants in combat.
        let keyIn = "";
        if (initiativeOrder == 0) {
            //Make the game quit
            keyIn = "q";
            console.log("No combatants left in the initiative order!");
            console.log("Quitting...");
        } else {
            //Actually parse the key input
            keyIn = readline.keyIn();
        }
        //Parse the key input
        if (keyIn === 'q') {
            //We now quit combat
            running = false;
        } else if (keyIn === 'n') {
            //Go to the next actor
            actorIndex++;
            //And increase the turnCounter if necessary
            if (actorIndex == initiativeOrder.length) turnCounter++;
        } else if (keyIn === 'p') {
            actorIndex--;
            //Also decrease turnCounter, since we're going back in time
            if (actorIndex < 0) turnCounter--;
        } else if (keyIn === 'a') {
            //Add a new actor, but first save the current one
            let currentActor = initiativeOrder[actorIndex];
            //Clear screen and show header
            cls();
            console.log(header("ADD ACTOR"));
            if (readline.keyInYNStrict("Is the new actor a PC? ")) {
                let actorName = readline.question("What is the name of the actor? ");
                let actorInit = readline.questionInt("Initiative for " + actorName + "? ");
                actorName = actorName.trim();
                initiativeOrder.push({
                    name: actorName,
                    type: PC,
                    initiative: actorInit
                });
            } else {
                let monster;
                let monsterType;
                while (monster == undefined) {
                    monsterType = readline.question("What is the monster-type? ");
                    monster = loadMonster(monsterType);
                    if (monster == undefined) {
                        console.log("Unrecognized monster-type: " + monsterType);
                    }
                }
                //Add the new monster to the list of loaded monsters
                monsters[monsterType] = monster;
                //Then ask how many we want to add
                let amt = readline.questionInt("How many do you want to add? ");
                //Now parse the line?
                parseLines([monsterType + "\t" + amt]);
            }
            //Reorder initiative, but hide the graphics
            prepareCombat(true);
            //After reordering, recalculate actorIndex
            actorIndex = initiativeOrder.indexOf(currentActor);
        } else if (keyIn === 'r') {
            //Rename the actor
            //Clear screen and show what we're doing using the header
            cls();
            console.log(header("RENAME ACTOR"));
            //Make a list of possible targets
            let targets = getNameList(true);
            let index = readline.keyInSelect(targets, "Who do you want to rename? ");
            //Check if we didn't cancel, if not, continue renaming
            if (index != -1) {
                console.log("Renaming " + targets[index] + "... Leave empty to cancel")
                let newName = readline.question("What should the name be? ")
                //Trim the input
                newName = newName.trim();
                if (newName.length > 0) {
                    //Only do renaming if an actual name was input
                    getActorByName(targets[index]).name = capitalize(newName);
                }
            }
        } else if (keyIn === 'x') {//Remove an actor
            //Set the screen clear and show header
            cls();
            console.log(header("REMOVING ACTOR"));
            let targets = getNameList(true);
            let index = readline.keyInSelect(targets, "Who do you want to remove? ");
            if (index != -1) {
                //Check if we really want to remove
                if (readline.keyInYNStrict("Do you really want to remove " + targets[index] + "? ")) {
                    //Do we remove the currentActor?
                    let currentIndex = initiativeOrder.indexOf(getActorByName(targets[index]));
                    var nextActor;
                    if (currentIndex == actorIndex) {
                        nextActor = initiativeOrder[(actorIndex + 1) % initiativeOrder.length];
                    } else {
                        nextActor = initiativeOrder[actorIndex];
                    }
                    //Remove the selected actor from the list
                    initiativeOrder.splice(currentIndex, 1);
                    //Set the active actor index to the next actor that was originally in line
                    actorIndex = initiativeOrder.indexOf(nextActor);
                }
            }
        } else if (keyIn === 'd') {
            //Damage any actor that can be damaged
            cls();
            console.log(header("DAMAGE ACTOR"));
            //Create list of possible targets
            let targets = getNameList(false);
            //Now ask for the target
            let index = readline.keyInSelect(targets, "Who do you want to damage? ");
            if (index != -1) {//Which means we actually selected someone
                //Ask for damage amount
                let damage = readline.questionInt("How much damage does "
                    + targets[index] + " take? ");
                getActorByName(targets[index]).hp -= damage;
            }
        } else if (keyIn === 'h') {
            //Heal any actor that can be healed
            cls();
            console.log(header("HEAL ACTOR"));
            //Create list of possible targets
            let targets = getNameList(false);
            //Now ask for the target
            let index = readline.keyInSelect(targets, "Who do you want to heal? ");
            if (index != -1) {//Which means we actually selected someone
                //Ask for heal amount
                let healed = readline.questionInt("How much does "
                    + targets[index] + " get healed? ");
                getActorByName(targets[index]).hp += healed;
            }
        } else if (keyIn === 'l') {
            //Add a label to any actor
            cls();
            console.log(header("LABEL ACTOR"));
            //List of all people in combat
            let targets = getNameList(true);
            //Now ask for the target to label
            let index = readline.keyInSelect(targets, "Who do you want to label? ");
            if (index != -1) {//If we didn't cancel
                //Retrieve the actor we're working on
                let actor = getActorByName(targets[index]);
                console.log("Working on " + actor.name);
                let label = readline.question("What label do you want to add/remove? ");
                //Adds the label to the actor
                addLabel(actor, label);
            }
        } else if (keyIn === 'i') {
            //We want information on a actor
            cls();
            console.log(header("INFORMATION"));
            //List all people we have information on
            let targets = getNameList(false);
            //Now ask for the target we want info on
            let index = readline.keyInSelect(targets, "Who do you want info on? ");
            if (index != -1) {//If we didn't cancel
                //Retrieve the monsterType of the actor we're working on
                let type = monsters[getActorByName(targets[index]).monsterType];
                cls();
                //Provide the header
                let hd = header(capitalize(type.name) + " (CR " + type.cr + ") " + type.size + " " + type.type + " " + type.alignment);
                console.log(hd.substring(0, hd.lastIndexOf("|") + 1));
                //Now print ability scores
                let abScores = [
                    { key: "AC", value: type.ac },
                    { key: "HP", value: type.hp },
                    { key: "SPD", value: type.speed },
                    { key: "STR", value: type.str + scoreToMod(type.str) },
                    { key: "DEX", value: type.dex + scoreToMod(type.dex) },
                    { key: "CON", value: type.con + scoreToMod(type.con) },
                    { key: "INT", value: type.int + scoreToMod(type.int) },
                    { key: "WIS", value: type.wis + scoreToMod(type.wis) },
                    { key: "CHR", value: type.chr + scoreToMod(type.chr) },
                ]
                //Print the table of ability scores
                let tableOutput = table(abScores, ["key", "value"], false, true);
                tableOutput = tableOutput.replace(type.ac, chalk.cyan(type.ac));
                tableOutput = tableOutput.replace(type.hp, chalk.red(type.hp));
                tableOutput = tableOutput.replace(type.speed, chalk.green(type.speed));
                console.log(tableOutput);
                //Now also output skills, senses and languages if they are present
                if (type.skills.length > 1) console.log("Skills: " + type.skills);
                if (type.senses.length > 1) console.log("Senses: " + type.senses);
                if (type.languages.length > 1) console.log("Languages: " + type.languages);
                let hd2 = header("ACTIONS");
                console.log(hd2.substring(0, hd2.length - 1));
                //Log every action separately
                type.actions.forEach(function (action) {
                    console.log(chalk.bold(action.name) + ": " + prettyDesc(action.desc));
                });
                //Empty space and ready to return
                console.log();
                readline.keyInPause();
            }
        }
    }
}

/**
 * Makes action descriptions pretty to look at
 * @param {Strings} string 
 */
function prettyDesc(string) {
    string = string.replace(/Hit: /g, chalk.red("Hit: "));
    string = string.replace("Ranged or Melee Weapon Attack:", chalk.cyan("MWA/RWA"));
    string = string.replace("Melee or Ranged Weapon Attack:", chalk.cyan("MWA/RWA"));
    string = string.replace("Melee Weapon Attack:", chalk.cyan("MWA"));
    string = string.replace("Ranged Weapon Attack:", chalk.cyan("RWA"));
    string = string.replace("to hit, reach", "");
    //Find all dice codes
    let diceCodes = string.match(/\d+\s\(\d+d\d+\s?\+?\s?\d?\d?\)/g);
    string = styleAll(string, diceCodes, chalk.bold);
    //Find all DCs
    let dcs = string.match(/DC\s\d+/g);
    string = styleAll(string, dcs, chalk.magenta);
    return string;
}

/**
 * Styles the input string using the style function parameter for all
 * instances of the provided matches array
 * @param {String} string 
 * @param {Array} matches 
 * @param {Function} style 
 */
function styleAll(string, matches, style){
    //If matches is undefined or null
    if(!matches) return string;
    //Replace all matches with style placeholder
    for(var i = 0; i < matches.length; i++){
        let match = matches[i];
        string = string.replace(match, style("@" + i + "@"));
    }
    //Now replace all placeholders with normal text
    for(var i = 0; i < matches.length; i++){
        let match = matches[i];
        string = string.replace("@" + i + "@", match);
    }
    return string;
}

/**
 * Converts the ability score to ability modifier
 * @param {Number} score 
 */
function scoreToMod(score) {
    let mod = Math.floor((score - 10) / 2);
    if (mod >= 0) mod = " (+" + mod + ")";
    else mod = " (" + mod + ")";
    return mod;
}

/**
 * Renders the overview of the initiative order
 */
function renderInitiativeOrder() {
    //Determine the active actor
    let activeActor = initiativeOrder[actorIndex];
    //Draw the header for this turn, but first clear screen
    cls();
    console.log(header("TURN " + turnCounter));
    //The maximum name length, used to determine column size
    let nameLength = 0;
    //Find the max length.
    initiativeOrder.forEach(function (item) {
        if (item.name.length > nameLength) {
            nameLength = item.name.length;
        }
    });
    //Now make the header row
    let tableHeader = expand("| NAME", nameLength + 2) + " | INITIATIVE | AC | HP    |";
    let divider = "=".repeat(tableHeader.length);
    console.log(divider);
    console.log(tableHeader);
    console.log(divider);
    initiativeOrder.forEach(function (actor) {
        console.log(renderActor(actor, nameLength, activeActor));
    });
    //Then add the initiative controls
    renderControls();
}

/**
 * Renders one single actor in the initiative order
 */
function renderActor(actor, nameMax, activeActor) {
    //Construct the output line
    let name = expand(actor.name, nameMax);
    let line = "| " + name + " | ";
    let init = expand(actor.initiative + "", 9, " ");
    line += chalk.green(init) + " | ";
    let ac = actor.ac ? actor.ac : " ";
    line += chalk.cyan(expand(ac + "", 1, " ")) + " | ";
    let hp = actor.hp ? actor.hp : " ";
    line += chalk.red(expand(hp + "", 4, " ")) + " |";
    //See if we are the actor that is currently ready to act
    if (activeActor.initiative == actor.initiative) {
        line = chalk.bold(line);
    }
    //Only add a marker to the currently active actor
    if (activeActor == actor) {
        line = line.replace("|", ">");//Add a marker in front of the active actor(s)
    }
    return line;
}

/**
 * Renders basic initiative controls
 */
function renderControls() {
    //First print the header
    console.log("\n" + header("CONTROLS"));
    //Now populate the controls array
    let controls = [
        { key: "q", desc: "quit" },
        { key: "n", desc: "next" },
        { key: "p", desc: "previous" },
        { key: "a", desc: "add new" },
        { key: "x", desc: "remove" },
        { key: "r", desc: "rename" },
        { key: "d", desc: "damage" },
        { key: "h", desc: "heal" },
        { key: "i", desc: "info" },
        { key: "l", desc: "label" }
    ];
    console.log(table(controls, ["key", "desc"]));
}

/**
 * Adds a new label to the specified actor. Commonly labels
 * are single glyph signs, f.e. a C can stand for concentration
 * @param {Object} actor 
 */
function addLabel(actor, label) {
    let activeLabels = actor.name.match(/\[.+\]/g);
    let cleanName = actor.name.replace(/\[.+\]/g, '').trim();
    if (activeLabels) {
        activeLabels = activeLabels[0].replace(/[\[\]]/g, '').split("");
    } else {
        activeLabels = [];
    }
    //Add the new label to the list, if it is not yet there, if it is, remove it
    if (activeLabels.indexOf(label) == -1) {
        //Add it to the active labels since it wasn't there
        activeLabels.push(label);
    } else {
        //Remove it from the activeLabels, since it already was there
        activeLabels.splice(activeLabels.indexOf(label), 1);
    }
    //Join back the labels and add back to name
    activeLabels = "[" + activeLabels.join("") + "]";
    if (activeLabels.length > 2) {
        //Concatenate old name with new labels
        actor.name = cleanName + " " + activeLabels;
    } else {
        //Else reset back to normal name, without any tags
        actor.name = cleanName;
    }
}

/**
 * Returns the actor in the initiative order by name
 */
function getActorByName(name) {
    //Go through the list and find the matching one
    for (var i = 0; i < initiativeOrder.length; i++) {
        if (initiativeOrder[i].name === name) return initiativeOrder[i];
    }
}

/**
 * If we should include PC's or not
 */
function getNameList(includePC) {
    //The list we're going to be returning
    let list = [];
    //Go through the list
    initiativeOrder.forEach(function (item) {
        if (item.type === PC && includePC == true || item.type === NPC) {
            list.push(item.name);
        }
    });
    //Return the finished list
    return list;
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
        if (line.length < 1) return;
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
            //Preload the hp, to prevent multiple requests
            let monsterHp = getMonsterHP(monsterName);
            let monsterAC = getMonsterAC(monsterName);
            //Now add them to the initiative order, depending on how many
            if (monsterAmt > 1) {
                //Now add each one to the list with a unique name
                for (var i = 0; i < monsterAmt; i++) {
                    //Get the name modifier from the alphabet, loop back round
                    let modifier = ALPHABET[i % ALPHABET.length];
                    initiativeOrder.push({
                        name: capitalize(monsterName) + modifier,
                        initiative: getMonsterInitiative(monsterName),
                        type: NPC,
                        hp: monsterHp,
                        ac: monsterAC,
                        monsterType: monsterName
                    });
                }
            } else {
                initiativeOrder.push({
                    name: capitalize(monsterName),
                    initiative: getMonsterInitiative(monsterName),
                    type: NPC,
                    hp: monsterHp,
                    ac: monsterAC,
                    monsterType: monsterName
                });
            }

        } else {
            //An ally, only gets added to the initiative order
            initiativeOrder.push({
                name: capitalize(line),
                initiative: undefined,
                type: PC
            });
        }
    });
}

/**
 * Returns the AC for the specified monster
 * @param {String} name 
 */
function getMonsterAC(name) {
    //Load the monster and calculate initiative modifier
    let m = monsters[name];
    //Now return the first part of the ac, parsed to integer
    return parseInt(m.ac.split(" ")[0]);
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
/**
 * Clear the screen
 */
function cls() {
    console.log(blank)
    rl.cursorTo(process.stdout, 0, 0)
    rl.clearScreenDown(process.stdout)
}