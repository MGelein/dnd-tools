/**
 * Monster creation and storage
 */
const readline = require('readline-sync');
const readline2 = require('readline');
const fs = require('fs');

//Import the header functionality
const { header, expand, table } = require("./table");
//Use Chalk to color the command line output
const chalk = require('chalk');

/**
 * Starts the monster module according to the passed arguments
 */
exports.monster = function (arguments) {
    let trimmed = arguments.trim();
    //If no arguments, or if help is specified, show help
    if (trimmed.length < 1 || trimmed === '?' || trimmed === 'help' || trimmed === '-h' || trimmed === '--help') {
        showHelp();
        return;
    }
    //Split on spaces
    let args = arguments.toLowerCase().split(" ");
    //Now check the first argument
    if (args[0] === 'create') {
        return createMonster();
    } else if (args[0] === 'parse') {
        if (args.length < 2) {
            console.log("Paste your text here, add a NEWLINE and press CTRL+C to continue");
            var input = [];
            //Create input interface
            var rl = readline2.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            //Prompt for input
            rl.prompt();
            //On newlines, add more to input
            rl.on('line', function (cmd) {
                input.push(cmd);
            });
            //When the input closes start parsing the monster
            rl.on('close', function (cmd) {
                parseMonster(input.join("\n").replace(/\r/g, '').split("\n"));
            });
        } else {
            parseMonster(fs.readFileSync(args[1], "utf-8").replace(/\r/g, '').split("\n"));
        }
    } else if (args[0] === 'info') {
        //Join all arguments on a hyphen
        let name = args.splice(1).join("-");
        //(Try to)load the mosnter from the DB
        let type = exports.loadMonster(name);
        //If it was loaded, show the info, else show warning
        if (type != undefined) {
            exports.printInfo(type);
        } else {
            console.log("Could not find monster: " + args.splice(1).join(' '));
        }
    }
}

/**
 * Prints a monster from its typedefinition.
 */
exports.printInfo = function (type) {
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
    let b = chalk.bold;
    //Now also output skills, senses and languages if they are present
    if (type.savingThrows.length > 1) console.log(b("Saving Throws: ") + type.savingThrows);
    if (type.skills.length > 1) console.log(b("Skills: ") + type.skills);
    if (type.damageResistances.length > 1) console.log(b("Damage Resistances: ") + type.damageResistances);
    if (type.damageVulnerabilities.length > 1) console.log(b("Damage Vulnerabilities: ") + type.damageVulnerabilities);
    if (type.damageImmunities.length > 1) console.log(b("Damage Immunities: ") + type.damageImmunities);
    if (type.conditionImmunities.length > 1) console.log(b("Condition Immunities: ") + type.conditionImmunities);
    if (type.senses.length > 1) console.log(b("Senses: ") + type.senses);
    if (type.languages.length > 1) console.log(b("Languages: ") + type.languages);
    //Output the list of abilities (if it has any)
    if (type.abilities.length > 0) {
        console.log();
        let abHeader = header("ABILITIES");
        console.log(abHeader.substring(0, abHeader.length - 1));
        //Log every ability
        type.abilities.forEach(function (ability) {
            console.log(chalk.bold(ability.name) + ": " + prettyDesc(ability.desc));
        });
    }
    console.log();
    //Output the actions list
    let hd2 = header("ACTIONS");
    console.log(hd2.substring(0, hd2.length - 1));
    //Log every action separately
    type.actions.forEach(function (action) {
        console.log(chalk.bold(action.name) + ": " + prettyDesc(action.desc));
    });
    //Empty space and ready to return
    console.log();

}

/**
 * Tries to load the monster by name
 * @param {String} name the name of the monster to load
 */
exports.loadMonster = function (name) {
    //Normalize the name, to make sure it is compatible with the file save name
    name = name.trim().toLowerCase().replace(/\s/g, '-');
    //Now see if we have it saved.
    let executableLocation = process.argv[0];
    var fileLocation = "";//Create empty location
    if (executableLocation.indexOf("dnd.exe") > -1) {
        fileLocation = executableLocation.replace(/dnd.exe/g, '') + "/data/monsters/" + name + ".json";
    } else {
        //This only happens in debug
        fileLocation = "C:/PATH/DND/data/monsters/" + name + ".json";
    }
    //Now fileLocation contains the correct path to the monster save, see if it exists
    if (fs.existsSync(fileLocation)) {
        return JSON.parse(fs.readFileSync(fileLocation, "utf-8"));
    } else {
        //Return undefined, the monster was not found
        return undefined;
    }
}

/**
 * Parses an array of lines that is read from a text file.
 * This is assumed to be a pasted .txt file from aidedd.
 * @param {StringArray} lines 
 */
function parseMonster(lines) {
    //The monster holder object
    let m = {};
    //Get the name, size and type of the monster
    m.name = lines[0];//First sentence
    m.size = lines[2].split(" ")[0];//First word of third sentence
    m.type = lines[2].split(" ")[1]//Second word of third sentence
    m.alignment = lines[2].split(", ")[1];//Everything after comma on third sentence
    //And make it fit for a file name
    m.name = m.name.trim().toLowerCase().replace(/\s/g, '-');
    //Get the AC & HP of the monster
    m.ac = lines[3].replace('Armor Class ', '').trim();//Fourth line, replace name of category
    m.hp = lines[4].replace('Hit Points ', '').trim();//Fifth line, replace name of category
    //Ask the speed of the monster, this is a string
    m.speed = lines[5].replace('Speed ', '').trim()//Sixth line, replace name of category
    //Prompt the 6 ability scores
    m.str = lines[7].split(" ")[0];//First part of the seventh line
    m.dex = lines[8].split(" ")[0];//First part of the eight line
    m.con = lines[9].split(" ")[0];//First part of the ninth line
    m.int = lines[10].split(" ")[0];//First part of the tenth line
    m.wis = lines[11].split(" ")[0];//First part of the eleventh line
    m.chr = lines[12].split(" ")[0];//First part of the twelfth line
    //Prompt skills line
    m.savingThrows = findLine(lines, "Saving Throws").replace(/Saving Throws /i, "").trim();
    m.skills = findLine(lines, "Skills").replace(/Skills /i, "").trim();//Second part of the skills
    m.damageResistances = findLine(lines, "Damage Resistances").replace(/Damage Resistances /i, "").trim();
    m.damageImmunities = findLine(lines, "Damage Immunities").replace(/Damage Immunities /i, "").trim();
    m.damageVulnerabilities = findLine(lines, "Damage Vulnerabilities").replace(/Damage Vulnerabilities /i, "").trim();
    m.conditionImmunities = findLine(lines, "Condition Immunities").replace(/Condition Immunities /i, "").trim();
    m.senses = findLine(lines, "Senses").replace(/Senses /i, "").trim();//2nd part of the senses
    m.languages = findLine(lines, "Languages").replace(/Languages /i, "").trim()//Rest of langs.
    m.cr = findLine(lines, "Challenge").split(" ")[1];//Second word of the challenge rating (num).
    m.abilities = [];//Prepare list of abilities
    m.actions = [];//Idem for actions

    //The index of the last line that can be parsed easily
    let challengeIndex = lines.indexOf(findLine(lines, "Challenge"));
    //Now paste them back together and parse them differently
    let lastLines = lines.splice(challengeIndex + 1);
    //Check if we should also remove the first line from it
    if (lastLines[0].indexOf("Challenge") == 0) lastLines = lastLines.splice(1);
    //Create holder for both types.
    let abilityLines = [];
    let actionLines = [];
    let foundActions = false;
    for (var i = 0; i < lastLines.length; i++) {
        //First check if we have found the actions head yet.
        if (lastLines[i] === 'ACTIONS') {
            foundActions = true;
            continue;
            //Skip empty lines;
        } else if (lastLines[i].trim().length < 1) continue;
        //Now do something based on if we found the header yet
        if (foundActions) actionLines.push(lastLines[i]);
        else abilityLines.push(lastLines[i]);
    }
    //Now we have parsed that, go through both arrays and add to the object
    abilityLines.forEach(function (line) {
        m.abilities.push(parseLine(line));
    });
    //Also go through action list
    actionLines.forEach(function (line) {
        m.actions.push(parseLine(line));
    });

    //When everything is done, save file as 'name.json'
    const json = JSON.stringify(m, null, "\t");
    //Save the data to disk, depending on if we are on a debug build or not
    let executableLocation = process.argv[0];
    var fileLocation = "";
    if (executableLocation.indexOf("dnd.exe") > -1) {
        fileLocation = executableLocation.replace(/dnd.exe/g, '') + "/data/monsters/" + m.name + ".json";
    } else {
        //This only happens in debug
        fileLocation = "C:/PATH/DND/data/monsters/" + m.name + ".json";
    }
    //Now write the file to disk
    console.log("Saving file to: " + fileLocation);
    fs.writeFileSync(fileLocation, json);
}

/**
 * Parses an ability or action string into an object
 * @param {String} line 
 */
function parseLine(line) {
    let nameLine = line.split('. ')[0];//Everything before the first dot
    let descLine = line.substring(nameLine.length + 2);//Everything after that point
    return { name: nameLine, desc: descLine };
}

/**
 * Returns the item in the array of lines that holds the information on the
 * specified category.
 * @param {Array} lines 
 * @param {String} category 
 */
function findLine(lines, category) {
    //Go through all lines, until you find the matching one
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().indexOf(category.toLowerCase()) == 0) return lines[i];
    }
    //If we make it to here, this was not a valid category, return empty string
    return "";
}

/**
 * Fill out a questionnaire and create a monster
 */
function createMonster() {
    //The monster holder object
    let m = {};
    //Get the name, size and type of the monster
    m.name = readline.question("Name: ");
    m.size = readline.question("Size: ");
    m.type = readline.question("Type: ");
    m.alignment = readline.question("Alignment: ");
    //And make it fit for a file name
    m.name = m.name.trim().toLowerCase().replace(/\s/g, '-');
    //Get the AC & HP of the monster
    m.ac = readline.question("AC: ");
    m.hp = readline.question("HP: ");
    //Ask the speed of the monster, this is a string
    m.speed = readline.question("Speed: ");
    //Prompt the 6 ability scores
    m.str = readline.questionInt("STR (score): ");
    m.dex = readline.questionInt("DEX (score): ");
    m.con = readline.questionInt("CON (score): ");
    m.int = readline.questionInt("INT (score): ");
    m.wis = readline.questionInt("WIS (score): ");
    m.chr = readline.questionInt("CHR (score): ");
    //Prompt skills line
    m.savingThrows = readline.question("Saving Throws: ");
    m.skills = readline.question("Skills: ");
    m.damageResistances = readline.question("Damage Resistances: ");
	m.damageImmunities = readline.question("Damage Immunities: ");
	m.damageVulnerabilities = readline.question("Damage Vulnerabilities: ");
	m.conditionImmunities = readline.question("Condition Immunities: ");
    m.senses = readline.question("Senses: ");
    m.languages = readline.question("Languages: ");
    m.cr = readline.question("CR: ");
    m.abilities = [];
    //Now add abilities
    let addAbility = readline.keyInYNStrict("Add Ability? ");
    while (addAbility) {
        let ability = {};
        ability.name = readline.question("Ability Name: ");
        ability.desc = readline.question("Ability Desc: ");
        m.abilities.push(ability);
        addAbility = readline.keyInYNStrict("Another Ability? ");
    }
    //Now add actions
    m.actions = [];
    do {
        let action = {};
        action.name = readline.question("Action Name: ");
        action.desc = readline.question("Action Desc: ");
        m.actions.push(action);
        var addAction = readline.keyInYNStrict("Another Action? ");
    } while (addAction);

    //When everything is done, save file as 'name.json'
    const json = JSON.stringify(m, null, "\t");
    //Save the data to disk, depending on if we are on a debug build or not
    let executableLocation = process.argv[0];
    var fileLocation = "";
    if (executableLocation.indexOf("dnd.exe") > -1) {
        fileLocation = executableLocation.replace(/dnd.exe/g, '') + "/data/monsters/" + m.name + ".json";
    } else {
        //This only happens in debug
        fileLocation = "C:/PATH/DND/data/monsters/" + m.name + ".json";
    }
    //Now write the file to disk
    console.log("Saving file to: " + fileLocation);
    fs.writeFileSync(fileLocation, json);
}

/**
 * List of all monster names
 */
exports.getMonsterList = function () {
    //Save the data to disk, depending on if we are on a debug build or not
    let executableLocation = process.argv[0];
    //Check if we're running from the dnd.exe or in debug
    if (executableLocation.indexOf("dnd.exe") > -1) {
        fileLocation = executableLocation.replace(/dnd.exe/g, '') + "/data/monsters/";
    } else {
        //This only happens in debug
        fileLocation = "C:/PATH/DND/data/monsters/";
    }
    //Now we have the folder location
    let files = fs.readdirSync(fileLocation);
    let names = [];
    //Add each file to the name list, if it is a json
    files.forEach(function (file) {
        if (file.indexOf(".json") != -1) names.push(file.replace(/.json/gi, ""));
    });
    return names;
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
 * Styles the input string using the style function parameter for all
 * instances of the provided matches array
 * @param {String} string 
 * @param {Array} matches 
 * @param {Function} style 
 */
function styleAll(string, matches, style) {
    //If matches is undefined or null
    if (!matches) return string;
    //Replace all matches with style placeholder
    for (var i = 0; i < matches.length; i++) {
        let match = matches[i];
        string = string.replace(match, style("@" + i + "@"));
    }
    //Now replace all placeholders with normal text
    for (var i = 0; i < matches.length; i++) {
        let match = matches[i];
        string = string.replace("@" + i + "@", match);
    }
    return string;
}

/**
 * Makes action descriptions pretty to look at
 * @param {Strings} string 
 * @param {Boolean} shorten if set to true, will shorten the desc
 */
prettyDesc = exports.prettyDesc = function (string, shorten) {
    //First try all shortening tricks, if necessary
    if (shorten) string = string.replace(/to hit, reach/g, "");
    if (shorten) string = string.replace(/to hit, range/g, "");
    if (shorten) string = string.replace(/to hit,/g, "");
    if (shorten) string = string.replace(/one target\.?/g, "");
    if (shorten) string = string.replace(/ ft./g, "ft");
    if (shorten) string = string.replace(/bludgeoning damage/gi, "bld");
    if (shorten) string = string.replace(/piercing damage/gi, "prc");
    if (shorten) string = string.replace(/slashing damage/gi, "sls");
    if (shorten) string = string.replace(/\sdamage\./gi, "");
    //Then shorten if necessary, because the style also counts as characters
    if (shorten && string.length > 100) string = string.substring(0, 97) + "...";
    //Now go and style it
    string = string.replace(/Hit: /g, chalk.red("Hit: "));
    string = string.replace("Ranged or Melee Weapon Attack:", chalk.cyan("MWA/RWA"));
    string = string.replace("Melee or Ranged Weapon Attack:", chalk.cyan("MWA/RWA"));
    string = string.replace("Melee Weapon Attack:", chalk.cyan("MWA"));
    string = string.replace("Ranged Weapon Attack:", chalk.cyan("RWA"));
    string = string.replace(/\s\s/g, " ");
    //Find all dice codes
    let diceCodes = string.match(/\d+\s\(\d+d\d+\s?\+?\s?\d?\d?\)/g);
    string = styleAll(string, diceCodes, chalk.bold);
    //Find all DCs
    let dcs = string.match(/DC\s\d+/g);
    string = styleAll(string, dcs, chalk.magenta);
    return string;
}

/**
 * This shows the help for the monster module
 */
function showHelp() {
    console.log(`=======================================
| Monster Database, made by Mees Gelein |
=======================================

This module allows the user to parse monster files from the internet,
and find info on monsters from the command line.

The module supports the following options:

parse           This will start parsing the following input from aidedd site. This input should be
                pasted using the right mouse button, given a new line and then terminated with
                CTRL + C.
create          Creates a new monster from a series of questions about the monster. This allows
                for easy monster creation.
info            Gives the info overview for a specified monster
help/?          Shows this screen, the help menu for the module.

`);
}