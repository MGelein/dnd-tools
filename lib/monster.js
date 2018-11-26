/**
 * Monster creation and storage
 */
const readline = require('readline-sync');
const { header } = require('./table');
const chalk = require('chalk');
const fs = require('fs');

/**
 * Starts the monster module according to the passed arguments
 */
exports.monster = function(args){
    if(args.trim().toLowerCase() === 'create'){
        return createMonster();
    }
}

/**
 * Fill out a questionnaire and create a monster
 */
function createMonster(){
    //The monster holder object
    let m = {};
    //Get the name, size and type of the monster
    m.name = readline.question("Name: ");
    m.size = readline.question("Size: ");
    m.type = readline.question("Type: ");
    //And make it fit for a file name
    m.name = m.name.trim().toLowerCase().replace(/\s/g, '-');
    //Get the AC & HP of the monster
    m.ac = readline.questionInt("AC: ");
    m.hp = readline.questionInt("HP: ");
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
    while(addAbility){
        let ability = {};
        ability.name = readline.question("Ability Name: ");
        ability.desc = readline.question("Ability Desc: ");
        m.abilities.push(ability);
        addAbility = readline.keyInYNStrict("Another Ability? ");
    }
    //Now add actions
    m.actions = [];
    do{
        let action = {};
        action.name = readline.question("Action Name: ");
        action.desc = readline.question("Action Desc: ");
        m.actions.push(action);
        var addAction = readline.keyInYNStrict("Another Action? ");
    }while(addAction);

    //When everything is done, save file as 'name.json'
    const json = JSON.stringify(m, null, "\t");
    //Save the data to disk
    fs.writeFileSync("./" + m.name + ".json", json);
}