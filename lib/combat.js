/**
 * Combat module, takes care of health and initiative tracking
 */

/**We need fs access */
const fs = require('fs');
//Load the monster loading module
const { loadMonster, getMonsterList, printInfo, prettyDesc } = require('./monster');
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
//Use the opn library to easily open stuff in default browser
const open = require('opn');

//Denotes player controlled characters
const PC = "PC";
//Denotes non player controlled characters
const NPC = "NPC";
//The letters of the alphabet, maybe a bit hacky, but who cares? Used in the naming of enemies.
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYΖ";
//If we are in combat creation mode
var CREATE_MODE = false;
//The file we're going to save to, if we're in create mode only
var OUTPUT_FILE;

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
    //Then read the first word
    let words = args.split(' ');
    if (words[0] === 'start') {//If we want to start a combat
        args = words.splice(1).join(" ");
        //Check to see if we should try adding .cbmt extension
        if (fs.existsSync(args.trim() + ".cmbt")) args = args.trim() + ".cmbt";
        //Now try to load the file
        if (fs.existsSync(args.trim())) {
            //Load the file, and remove carriage returns
            let lines = fs.readFileSync(args, "utf-8").replace('\r', '');
            //Then replace four spaces and two spaces with a tab
            lines = lines.replace("    ", "\t").replace("  ", "").split("\n");
            parseLines(lines);
            //Now that we have parsed the list, we're ready to prepare combat
            prepareCombat();
        } else {
            console.log("Could not start  combat. File does not exist: '" + args + "'");
        }
    } else if (words[0] === 'create' || words[0] === 'edit') {//Edit and create are the same
        //Remove the word create from the command line arguments and see if we set a file
        args = words.splice(1).join(" ").trim();
        //Start creating a combat and check if we pass it a file to save to
        createCombat(args.length > 0 ? args : undefined);
    } else if (words[0] === 'help' || words[0] === '?') {
        showHelp();
    } else {//On all other cases show unrecognized
        console.log("Unrecognized command '" + words[0] + "'");
        console.log("Use the 'help' or '?' option to show the help of this module.");
    }
}

/**
 * Starts the creation of a combat scenario file
 * @param {String} outputFile 
 */
function createCombat(outputFile) {
    //First make sure a file was actually provided, if not ask for one
    if (!outputFile) {
        outputFile = readline.question("What should we name the save file? ");
    }
    //Make the output correct by adding extension if not specified
    if (outputFile.indexOf(".cmbt") == -1) outputFile += ".cmbt";
    //If the file already exists, we're in edit mode, if it doesn't were in create mode
    if (fs.existsSync(outputFile)) {
        //Do nothing, we don't need to create anything
    } else {
        //Create the file, this should be empty now
        fs.writeFileSync(outputFile, "", "utf-8");
    }
    //Next put the module in createmode and load the file
    CREATE_MODE = true;
    //Save the output file reference;
    OUTPUT_FILE = outputFile;
    //Load the file
    parseLines(fs.readFileSync(outputFile, "utf-8").split("\n"));
    //And prepare combat
    prepareCombat();
}

/**
 * Prints the help menu to the screen. This menu shows all possible options for this module
 */
function showHelp() {
    console.log(
        `=======================================
| Combat Tracker, made by Mees Gelein |
=======================================

This module allows the user to run combat easily using the command line. 
You can create new combat files as well as run premade combat files.

The module supports the following options:

start FILE      Starts combat using the provided file as startpoint. By default will look for a 
                .cmbt file. F.e. 'combat start test' will look for a local file named 'test.cmbt'.
create [FILE]   Creates a combat file using an interactive questionnaire. The optional file 
                parameter allows you to predefine an output file. If undefined, this will be asked 
                for at the end of the questionnaire.
edit [FILE]     Edits an existing combat file. Opens the provided file in create mode.
help/?          Shows this screen, the help menu for the module.
`
    );
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
            if (!CREATE_MODE) {
                let init = parseInt(readline.questionInt("Initiative for " + item.name + "? "));
                item.initiative = init;
            } else {
                //Don't ask for initiative in CREATE_MODE 
                item.initiative = -1;
            }
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
    if (showGraphics) startCombat();
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
        if (initiativeOrder.length == 0 && !CREATE_MODE) {
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
                let actorInit;
                if (!CREATE_MODE) {
                    actorInit = readline.questionInt("Initiative for " + actorName + "? ");
                } else {
                    actorInit = -1;
                }
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
                        if (readline.keyInYNStrict("Do you want to search in the database? ")) {
                            monsterType = searchDatabase();
                            console.log(monsterType);
                            readline.keyInPause();
                            monster = loadMonster(monsterType);
                        }
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
            if (actorIndex == -1) actorIndex = 0;
        } else if (keyIn === 'r') {
            //Rename the actor
            //Clear screen and show what we're doing using the header
            cls();
            console.log(header("RENAME ACTOR"));
            //Make a list of possible targets
            let targets = getNameList(true);
            if (targets.length > 0) {
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
            }
        } else if (keyIn === 'x') {//Remove an actor
            //Set the screen clear and show header
            cls();
            console.log(header("REMOVING ACTOR"));
            let targets = getNameList(true);
            if (targets.length > 0) {
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
            }
        } else if (keyIn === 'd' && !CREATE_MODE) {
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
        } else if (keyIn === 'h' && !CREATE_MODE) {
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
        } else if (keyIn === 'l' && !CREATE_MODE) {
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
            if (targets.length > 0) {
                let index = readline.keyInSelect(targets, "Who do you want info on? ");
                if (index != -1) {//If we didn't cancel
                    //Retrieve the monsterType of the actor we're working on
                    let type = monsters[getActorByName(targets[index]).monsterType];
                    cls();
                    printInfo(type);
                    readline.keyInPause();
                }
            }
        } else if (keyIn === 'w') {
            //Do the web search
            cls();
            console.log(header("WEB SEARCH"));
            //Possible search targets
            let targets = ["Spells (Wiki)", "Monsters (AideDD)", "Magic Items (AideDD)", "Wiki", "Roll20", "Google"];
            let index = readline.keyInSelect(targets, "What do you want to search? ");
            if (index != -1) {//If we didn't cancel the search
                //Say what we are searching
                console.log("Querying " + targets[index] + ". Leave empty to cancel.");
                //Get the search query
                let query = readline.question("Type your search query: ");
                if (query.trim().length > 0) {//Only do a search if the query was not empty
                    if (index == 0) {//Spells in the wiki
                        query = query.split(" ");
                        for (var i = 0; i < query.length; i++) {
                            //To lower case and capitalize, normalizing capitalization
                            query[i] = capitalize(query[i].toLowerCase());
                        }
                        //Now open the browser
                        open("https://dnd5e.fandom.com/wiki/" + query.join("_"));
                    } else if (index == 1) {//Monsters on aidedd
                        //Normalize the query
                        query = query.replace(/[,'\s]/g, '-');
                        query = query.toLowerCase();
                        //Now open the browser
                        open("http://aidedd.org/dnd/monstres.php?vo=" + query);
                    } else if (index == 2) {//Magic items on aidedd
                        //Normalize the query
                        query = query.replace(/[,'\s]/g, '-');
                        query = query.toLowerCase();
                        //Now open the browser
                        open("https://www.aidedd.org/dnd/om.php?vo=" + query);
                    } else if (index == 3) {//Wiki search
                        //Make the query fit the search protocol for the wiki
                        query = encodeURI(query);
                        //Now open the browser
                        open("https://dnd5e.fandom.com/wiki/Special:Search?search=" + query);
                    } else if (index == 4) {//Roll 20 search
                        //Make the query fit the search protocol for the wiki
                        query = encodeURI(query);
                        //Now open the browser
                        open("https://roll20.net/compendium/dnd5e/searchbook/?terms=" + query);
                    } else if (index == 5) {
                        //Change spaces for +'s
                        query = query.replace(/\s/g, "+");
                        //Just open the browser for the query
                        open("https://www.google.nl/search?q=" + query);
                    }
                }
            }
        } else if (keyIn === 's' && CREATE_MODE) {//Saving only works in create mode
            saveCombat();
        }
    }
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
    if (!CREATE_MODE) console.log(header("TURN " + turnCounter));
    else console.log(header("COMBAT CREATION"));
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
    //Add the action list of current actor
    let currentActor = initiativeOrder[actorIndex];
    let actions = listActions(currentActor);
    let actionHeader = "| Actions for " + (currentActor ? currentActor.name : "--") + " |";
    tableHeader += "\t\t" + actionHeader;
    //Set divider length
    divider += "\t\t" + "=".repeat(actionHeader.length);
    console.log(divider);
    console.log(tableHeader);
    console.log(divider);
    //Keep track of how many items have been printed parallel
    var actionCounter = 0;
    initiativeOrder.forEach(function (actor) {
        //Print empty if no more actions are left
        let printAction = actionCounter >= actions.length ? "" : actions[actionCounter];
        //Print the print action next to the row of this actor
        let actorRow = renderActor(actor, nameLength, activeActor);
        console.log(actorRow + "\t\t" + printAction);
        //Increase the action counter
        actionCounter++;
    });
    //Now also add all leftover actions
    while (actionCounter < actions.length) {
        //Get the action to print
        let printAction = actionCounter >= actions.length ? "" : actions[actionCounter];
        //Now print the action, padded by spaces
        console.log(" ".repeat(divider.split("\t\t")[0].length) + "\t\t" + printAction);
        actionCounter++;
    }
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
    if (activeActor && activeActor.initiative == actor.initiative) {
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
        { key: "l", desc: "label" },
        { key: "w", desc: "web search" }
    ];
    //Remove some controls if we're in create mode, and add the save control
    if (CREATE_MODE) {
        for (var i = controls.length - 1; i >= 0; i--) {
            //If it is one of the blocked keys in create mode
            if ('dhl'.indexOf(controls[i].key) != -1) {
                controls.splice(i, 1);//Remove this element
            }
        }
        //Add the save command
        controls.push({ key: "s", desc: "save" });
    }
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
 * Returns the action names that this actor can do
 * @param {Object} actor 
 */
function listActions(actor) {
    //Check if the actor is defined
    if (!actor) return "";
    //Check if the actor is a PC
    if (actor.type === PC) return [chalk.gray("[PC ACTIONS]")];
    else {
        let output = [];
        let monsterType = monsters[actor.monsterType];
        monsterType.actions.forEach(function (action) {
            output.push(chalk.bold(action.name) + " " + prettyDesc(action.desc, true));
        });
        return output;
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
            let usingAlias = parts >= 3;
            let alias = "";
            if(usingAlias) alias = parts[2];
            console.log("Loading monster(" + monsterName + ")..." + (usingAlias ? " as " + alias : "" ));
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
                        name: capitalize(usingAlias ? alias: monsterName) + modifier,
                        initiative: getMonsterInitiative(monsterName),
                        type: NPC,
                        hp: monsterHp,
                        ac: monsterAC,
                        monsterType: monsterName
                    });
                }
            } else {
                initiativeOrder.push({
                    name: capitalize(usingAlias ? alias: monsterName),
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
 * Look through all available monsters by name and return the chosen one
 */
function searchDatabase() {
    //What we're looking for
    var names = getMonsterList();
    var matches = names;
    var nameLength = 0;
    //Find the max name length
    names.forEach(function (name) { if (name.length > nameLength) nameLength = name.length });
    while (true) {//Keep looping untill this breaks out
        cls();
        console.log(header("MONSTER DATABASE"));
        //Display the matches array
        let maxAmt = matches.length > 30 ? 30 : matches.length;
        let lines = [];
        let line = "";
        for (let i = 0; i < maxAmt; i++) {
            if (i % 3 == 0) {
                lines.push(line);
                line = expand(matches[i], nameLength, " ");
            }else{
                line += "\t\t" + expand(matches[i], nameLength, " ");
            }
        }
        //Add the final line
        lines.push(line);
        var query = "";
        //And print all lines we've accumulated
        if(matches.length > 9){//If we have a lot of options, display them in a table
            lines.forEach(function(ln){console.log(ln)});
            console.log();
            query = readline.question("Type your query, narrow down until <9 are left: ");
        }else{//With a small number of options, make a select
            let index = readline.keyInSelect(matches, "What monster do you want to load? ");
            if(index !=- 1){//We've selected a monster
                matches = matches.splice(index, 1);
                break;
            }
        }
        //Now find the query
        //Empty matches array
        matches = [];
        //Now go through name list
        names.forEach(function (name) {
            if (name.indexOf(query) != -1 || query.trim().length == 0) {//If part of the query matches, add to the list of matches
                matches.push(name);
            }
        });
        //Final match?
        if(matches.length == 1){
            break;
        }
    }
    //Return the first element of the list
    return matches[0];
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

//Also export the cls function
exports.cls = cls;

/**
 * Saves a list of all people in the combat to the OUTPUT_FILE,
 * this only works in create mode
 */
function saveCombat() {
    //If not in create mode, do nothing.
    if (!CREATE_MODE) return;
    //If no output file has been defined, do nothing
    if (!OUTPUT_FILE) return;
    //Create a save file from the top of the initiative order
    let counts = {};
    initiativeOrder.forEach(function (actor) {
        //Pc's get added by name
        if (actor.type === PC) {
            if (!counts[actor.name]) {//If no-one else has the same name
                //Add it to counts
                counts[actor.name] = -1;//-1 signifies PC, meaning: there can only be one.
            }
        } else {//For non pc's we add their monstertype, then concat those in the next step.
            if (!counts[actor.monsterType]) {//First monster of type?
                counts[actor.monsterType] = 1;
            } else {
                counts[actor.monsterType]++;
            }
        }
    });
    //Convert the counts into a lines array
    let participants = Object.keys(counts);
    let lines = [];
    //Add a line for each participant
    participants.forEach(function (actor) {
        if (counts[actor] == -1) {
            lines.push(actor);
        } else {
            lines.push(actor + "\t" + counts[actor]);
        }
    });
    //Now write the file to disk
    fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf-8");
    //And add a log message
    console.log("Succesfully saved the combat to: '" + OUTPUT_FILE + "'!");
    //Wait for a key input
    readline.keyInPause();
}