/**
 * Imports
 */
const readline = require('readline-sync');
const { average } = require('./dice');
const { header } = require('./table');
const chalk = require('chalk');

/**Array with CR's */
const crValues = [0, 0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

/**Display values for the CRs */
const crStrings = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13",
    "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "30+"]

/**
 * Returns the index of the hitpoints in the CR table on DMG.274
 * @param {Number} hp the number of hitpoints of the monster
 */
function getHPIndex(hp) {
    if (hp <= 6) return 0
    else if (hp <= 35) return 1
    else if (hp <= 49) return 2
    else if (hp <= 70) return 3
    else if (hp <= 85) return 4
    else if (hp <= 100) return 5
    else if (hp <= 115) return 6
    else if (hp <= 130) return 7
    else if (hp <= 145) return 8
    else if (hp <= 160) return 9
    else if (hp <= 175) return 10
    else if (hp <= 190) return 11
    else if (hp <= 205) return 12
    else if (hp <= 220) return 13
    else if (hp <= 235) return 14
    else if (hp <= 250) return 15
    else if (hp <= 265) return 16
    else if (hp <= 280) return 17
    else if (hp <= 295) return 18
    else if (hp <= 310) return 19
    else if (hp <= 325) return 20
    else if (hp <= 340) return 21
    else if (hp <= 355) return 22
    else if (hp <= 400) return 23
    else if (hp <= 445) return 24
    else if (hp <= 490) return 25
    else if (hp <= 535) return 26
    else if (hp <= 580) return 27
    else if (hp <= 625) return 28
    else if (hp <= 670) return 29
    else if (hp <= 715) return 30
    else if (hp <= 760) return 31
    else if (hp <= 805) return 32
    else if (hp <= 850) return 33
    else return 33;//Max number
}

/**
 * Return the index of the CR array that matches this damage output
 * @param {Number} dmg 
 */
function getDMGIndex(dmg) {
    if (dmg <= 1) return 0
    else if (dmg <= 3) return 1
    else if (dmg <= 5) return 2
    else if (dmg <= 8) return 3
    else if (dmg <= 14) return 4
    else if (dmg <= 20) return 5
    else if (dmg <= 26) return 6
    else if (dmg <= 32) return 7
    else if (dmg <= 38) return 8
    else if (dmg <= 44) return 9
    else if (dmg <= 50) return 10
    else if (dmg <= 56) return 11
    else if (dmg <= 62) return 12
    else if (dmg <= 68) return 13
    else if (dmg <= 74) return 14
    else if (dmg <= 80) return 15
    else if (dmg <= 86) return 16
    else if (dmg <= 92) return 17
    else if (dmg <= 98) return 18
    else if (dmg <= 104) return 19
    else if (dmg <= 110) return 20
    else if (dmg <= 116) return 21
    else if (dmg <= 122) return 22
    else if (dmg <= 140) return 23
    else if (dmg <= 158) return 24
    else if (dmg <= 176) return 25
    else if (dmg <= 194) return 26
    else if (dmg <= 212) return 27
    else if (dmg <= 230) return 28
    else if (dmg <= 248) return 29
    else if (dmg <= 266) return 30
    else if (dmg <= 284) return 31
    else if (dmg <= 302) return 32
    else if (dmg <= 320) return 33
    else return 33;
}

/**
 * Returns the matching AC for this index
 * @param {Integer} index 
 */
function getACFromIndex(index) {
    if (index <= 6) return 13;
    else if (index <= 7) return 14;
    else if (index <= 10) return 15;
    else if (index <= 12) return 16;
    else if (index <= 15) return 17;
    else if (index <= 19) return 18;
    else return 19;
}

/**
 * Returns the matching to hit bonus for the provided index (CR)
 * @param {Number} index 
 */
function getToHitFromIndex(index) {
    if (index <= 5) return 3;
    else if (index <= 6) return 4;
    else if (index <= 7) return 5;
    else if (index <= 10) return 6;
    else if (index <= 13) return 7;
    else if (index <= 18) return 8;
    else if (index <= 19) return 9;
    else if (index <= 23) return 10;
    else if (index <= 26) return 11;
    else if (index <= 29) return 12;
    else if (index <= 32) return 13;
    else return 14;
}

/**
 * This module will calculate challenge rating by asking the user
 * questions using the command line input. You will be asked to
 * enter dice notation for average damage etc. 
 */
exports.cr = function () {
    //Calculate average HP
    let hp = readline.question("Hitpoints: ");
    hp = isNaN(hp) ? average(hp) : parseInt(hp);
    //Get the HP index
    let hpIndex = getHPIndex(hp);

    //Read AC to offset hp with
    let ac = readline.questionInt("Armor Class: ");
    let matchingAC = getACFromIndex(hpIndex);
    let acDiff = ac - matchingAC;
    let defOffset = (acDiff - (acDiff % 2)) / 2;
    //Calculate the defensive Index
    let defensiveIndex = hpIndex + defOffset;

    //Calculate average DMG
    let dmg = readline.question("Damage: ");
    dmg = isNaN(dmg) ? average(dmg) : parseInt(dmg);
    let dmgIndex = getDMGIndex(dmg);

    //Read toHit to offset average dmg
    let toHit = readline.questionInt("To Hit: ");
    let matchingToHit = getToHitFromIndex(dmgIndex);
    let toHitDiff = toHit - matchingToHit;
    let offOffset = (toHitDiff - (toHitDiff % 2)) / 2;
    //Calculate offensive inde
    let offensiveIndex = dmgIndex + offOffset;

    //Get offensive and defensive CR, but clamp to array range
    if (defensiveIndex >= crValues.length) defensiveIndex = crValues.length - 1;
    if (offensiveIndex >= crValues.length) offensiveIndex = crValues.length - 1;

    //Now actually get the values from the array
    let offString = crStrings[offensiveIndex];
    let defString = crStrings[defensiveIndex];
    let crString = crStrings[Math.ceil(((offensiveIndex + defensiveIndex) / 2))];
    
    //Print the results
    let result = (header("Result:"));
    result += chalk.bold("Defensive: ") + "CR " + defString;
    result += chalk.bold("\nOffensive: ") + "CR " + offString;
    result += "\n-------------------";
    result += chalk.bold("\nTotal: ") + "CR " + crString;
    console.log(result);
}