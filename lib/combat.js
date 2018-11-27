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
        //Now wait for a key in
        let keyIn = readline.keyIn();
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
        }else if(keyIn === 'r'){
            //Rename the actor
            let currentActor = initiativeOrder[actorIndex];
            //Clear screen and show what we're doing using the header
            cls();
            console.log(header("RENAME ACTOR"));
            console.log("Renaming " + currentActor.name + "... Leave empty to cancel")
            let newName = readline.question("What should the name be? ")
            //Trim the input
            newName = newName.trim();
            if(newName.length > 0){
                //Only do renaming if an actual name was input
                currentActor.name = capitalize(newName);
            }
        }
    }
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
    let tableHeader = expand("| NAME", nameLength + 2) + " | INITIATIVE | HP    |";
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
    line += init + " | ";
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
        { key: "q", desc: "quit combat" },
        { key: "n", desc: "next actor" },
        { key: "p", desc: "previous actor" },
        { key: "a", desc: "add actor" },
        { key: "x", desc: "remove actor" },
        { key: "r", desc: "rename actor"}
    ];
    console.log(table(controls, ["key", "desc"]));
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
                        hp: monsterHp
                    });
                }
            } else {
                initiativeOrder.push({
                    name: capitalize(monsterName),
                    initiative: getMonsterInitiative(monsterName),
                    type: NPC,
                    hp: monsterHp
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