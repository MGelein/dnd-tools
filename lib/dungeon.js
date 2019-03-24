/**
 * Dungeon module, generates short descriptions
 * of a dungeon. Can be used to create inspiration
 * for a dungeon. Derived from DMG p99-p105
 */

const { roll } = require('./dice');
const chalk = require('chalk');

/**
 * This function is called by the dnd main process
 */
exports.dungeon = function (args, verbal) {
    //If verbal has not explicitly been set, assume we don't have to output to console, but return an object
    if(verbal == undefined) verbal = false;
    //Roll the location of this dungeon
    let dLocation = getLocation();
    //Roll for the creator of this dungeon
    let dCreator = getCreator();
    //Roll for the purpose of this dungeon
    let dPurpose = getPurpose();
    //Roll for a small amount of historic events (each extra event has a chance to added)
    let dHistory = getHistory(verbal);
    
    //If we don't need to pretty print, return an object
    if(!verbal) return {location: dLocation, creator: dCreator, purpose: dPurpose, history: dHistory};
    //Now that we have the results, pretty print them to the console
    console.log(chalk.bold('[Location]:\t') + dLocation);
    console.log(chalk.bold('[Creator]:\t') + dCreator);
    console.log(chalk.bold('[Purpose]:\t') + dPurpose);
    console.log(chalk.bold('[History]:\t') + dHistory);
}

/**
 * Rolls a history. This is done using a chance to add more history.
 * So, the longer the history gets, the smaller the chance is that it 
 * gets terminated.
 */
function getHistory(verbal) {
    //The array of historic events
    let history = [];
    //At least one event, then try to add more
    do{
        //Add one more event
        history.push(getHistoricEvent());
    }while(roll('d20') <= 10);

    //Return the raw array if we don't need a verbal representation
    if(!verbal) return history;
    //Finally, concatenate all these events and return them
    return history.join('\n\t\t');
}

/**
 * Returns a single historic event of a dungeon
 */
function getHistoricEvent() {
    //Roll a d20 for a historic event
    let d20 = roll('d20');
    //Now go through your options
    if (d20 <= 3) return "Abandoned by creators";
    else if (d20 <= 4) return "Abandoned due to plague";
    else if (d20 <= 8) return "Conquered by invaders";
    else if (d20 <= 10) return "Creators destroyed by attacking raiders";
    else if (d20 <= 11) return "Creators destroyed by discovery made within the site";
    else if (d20 <= 12) return "Creators destroyed by internal conflict";
    else if (d20 <= 13) return "Creators destroyed by magical catastrophe";
    else if (d20 <= 15) return "Creators destroyed by natural disaster";
    else if (d20 <= 16) return "Location cursed by the gods and shunned";
    else if (d20 <= 18) return "Original creator still in control";
    else if (d20 <= 19) return "Overrun by planar creatures";
    else return "Site of a great miracle";
}

/**
 * Returns a possible purpose for this dungeon
 */
function getPurpose() {
    //Roll d20 for the purpose of this dungeon
    let d20 = roll('d20');
    //Now go through all the options
    if (d20 <= 1) return "Death trap";
    else if (d20 <= 5) return "Lair";
    else if (d20 <= 6) return "Maze";
    else if (d20 <= 9) return "Mine";
    else if (d20 <= 10) return "Planar Gate";
    else if (d20 <= 14) return "Stronghold";
    else if (d20 <= 17) return "Temple or Shrine";
    else if (d20 <= 19) return "Tomb";
    else return "Treasure Vault";
}

/**
 * Rolls for a creator of this dungeon complex
 */
function getCreator() {
    //Roll 1d20 for the creator
    let d20 = roll('d20');
    //Now go thourhg all possible options
    if (d20 <= 1) return "Beholder";
    else if (d20 <= 4) return getCult();
    else if (d20 <= 8) return "Dwarves";
    else if (d20 <= 9) return "Elves (including Drow)";
    else if (d20 <= 10) return "Giants";
    else if (d20 <= 11) return "Hobgoblins";
    else if (d20 <= 15) return getHuman();
    else if (d20 <= 16) return "Kuo-Toa";
    else if (d20 <= 17) return "Lich";
    else if (d20 <= 18) return "Mind flayers";
    else if (d20 <= 19) return "Yuan-ti";
    else if (d20 <= 20) return "No creator (natural caverns)";
}

/**
 * Returns a cultist creator
 */
function getCult() {
    //Roll 1d20 for the cults and religious groups table
    let d20 = roll('d20');
    //Now go throug the options
    if (d20 <= 1) return "Demon-worshiping cult";
    else if (d20 <= 2) return "Devil-worshiping cult";
    else if (d20 <= 4) return "Elemental Air cult";
    else if (d20 <= 6) return "Elemental Earth cult";
    else if (d20 <= 8) return "Elemental Fire cult";
    else if (d20 <= 10) return "Elemental Water cult";
    else if (d20 <= 15) return "Worshipers of an evil deity";
    else if (d20 <= 17) return "Worshipers of a good deity";
    else return "Worshipers of a neutral deity";
}

/**
 * Returns a human creator
 */
function getHuman() {
    //Roll for a class
    let npcClass = getClass();
    //Roll for the npc alignment
    let npcAlignment = getAlignment();
    //Return the results
    return npcAlignment + " " + npcClass + "(s)";
}

/**
 * Returns the class of an NPC creator of a dungeon
 */
function getClass() {
    //Roll 1d20 for the class
    let d20 = roll('d20');
    //Now go through the options
    if (d20 <= 1) return "Barbarian";
    else if (d20 <= 2) return "Bard";
    else if (d20 <= 4) return "Cleric";
    else if (d20 <= 5) return "Druid";
    else if (d20 <= 7) return "Fighter";
    else if (d20 <= 8) return "Monk";
    else if (d20 <= 9) return "Paladin";
    else if (d20 <= 10) return "Ranger";
    else if (d20 <= 14) return "Rogue";
    else if (d20 <= 15) return "Sorcerer";
    else if (d20 <= 16) return "Warlock";
    else return "Wizard";
}

/**
 * Returns the alignment of a NPC creator of a dungeon
 */
function getAlignment() {
    //Roll d20 for the alignment options
    let d20 = roll('d20');
    //Now go through the options
    if (d20 <= 2) return "LG";
    else if (d20 <= 4) return "NG";
    else if (d20 <= 6) return "CG";
    else if (d20 <= 9) return "LN";
    else if (d20 <= 11) return "NN";
    else if (d20 <= 12) return "CN";
    else if (d20 <= 15) return "LE";
    else if (d20 <= 18) return "NE";
    else return "CE";
}

/**
 * Returns a location of the dungeon
 */
function getLocation() {
    //Roll 1d100 for the location
    let d100 = roll('d100');
    //Now go through all possible options
    if (d100 <= 4) return "A building in a city";
    else if (d100 <= 8) return "Catacombs or sewers beneath a city";
    else if (d100 <= 12) return "Beneath a farmhouse";
    else if (d100 <= 16) return "Beneath a graveyard";
    else if (d100 <= 22) return "Beneath a ruined castle";
    else if (d100 <= 26) return "Beneath a ruined city";
    else if (d100 <= 30) return "Beneath a temple";
    else if (d100 <= 34) return "In a chasm";
    else if (d100 <= 38) return "In a cliff face";
    else if (d100 <= 42) return "In a desert";
    else if (d100 <= 46) return "In a forest";
    else if (d100 <= 50) return "In a glacier";
    else if (d100 <= 54) return "In a gorge";
    else if (d100 <= 58) return "In a jungle";
    else if (d100 <= 62) return "In a mountain pass";
    else if (d100 <= 66) return "In a swamp";
    else if (d100 <= 70) return "Beneath or on top of a mesa";
    else if (d100 <= 74) return "In sea caves";
    else if (d100 <= 78) return "In several connected mesas";
    else if (d100 <= 82) return "On a mountain peak";
    else if (d100 <= 86) return "On a promontory";
    else if (d100 <= 90) return "On an island";
    else if (d100 <= 95) return "Underwater";
    else return getExoticLocation();
}

/**
 * There is a small chance a dungeon spawns in a small
 * exotic location
 */
function getExoticLocation() {
    //Roll 1d20 for the location
    let d20 = roll('d20');
    //Now go through all possible options
    if (d20 <= 1) return "Among the branches of a tree";
    else if (d20 <= 2) return "Around a geyser";
    else if (d20 <= 3) return "Behind a waterfall";
    else if (d20 <= 4) return "Buried in an avalanche";
    else if (d20 <= 5) return "Buried in a sandstorm";
    else if (d20 <= 6) return "Buried in volcanic ash";
    else if (d20 <= 7) return "Castle or structure sunken in a swamp";
    else if (d20 <= 8) return "Castle or structure at the bottom of a sinkhole";
    else if (d20 <= 9) return "Floating on the sea";
    else if (d20 <= 10) return "In a meteorite";
    else if (d20 <= 11) return "On a demiplane or in a pocket dimension";
    else if (d20 <= 12) return "In an area devastated by a magical catastrophe";
    else if (d20 <= 13) return "On a cloud";
    else if (d20 <= 14) return "In the Feywild";
    else if (d20 <= 15) return "In the Shadowfell";
    else if (d20 <= 16) return "On an island in an underground sea";
    else if (d20 <= 17) return "In a volcano";
    else if (d20 <= 18) return "On the back of a Gargantuan living creature";
    else if (d20 <= 19) return "Sealed inside a magical dome of force";
    else return "Inside a Mordenkainen's magnificent mansion.";
}