/**
 * Monster creation and storage
 */
const readline = require('readline-sync');
const readline2 = require('readline');
const fs = require('fs');

/**
 * Starts the monster module according to the passed arguments
 */
exports.monster = function (arguments) {
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
    }
}

/**
 * Tries to load the monster by name
 * @param {String} name the name of the monster to load
 */
exports.loadMonster = function(name){
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
    if(fs.existsSync(fileLocation)){
        return JSON.parse(fs.readFileSync(fileLocation, "utf-8"));
    }else{
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
    m.skills = readline.question("Skills: ");
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
exports.getMonsterList = function(){
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
    files.forEach(function(file){
        if(file.indexOf(".json") != -1) names.push(file.replace(/.json/gi, ""));
    });
    return names;
}