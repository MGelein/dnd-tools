/**Gem generation js file */
const { gems } = require('./gems');
/**Art generation js file */
const { art } = require('./art');
/**Magic tables */
const magicTable = require('./magictable');
/**Random methods */
const { rnd, random } = require('./random');
/**Dice methods */
const { d4, d6, d8, d10, d12, d20, d100, roll } = require('./dice');
/**Currency import*/
const {PP, GP, SP, EP, CP} = require('./money');

//This variable will hold the size specification, by default individual
let size = "individual";
//This variable will hold the rating of the treasure, by default random
let rating = "random";
//This will hold an array of treasure objects which will then be spit out after being joined by a newline
let treasure = [];

/**     
 * Generates the actual treasure from a string of arguments
 * @param {String} argumentString
 */
function generateTreasure(argumentString) {
    let args = argumentString.split(" ");
    //Go through all arguments to see if we recognize them
    args.forEach(function (argument) {
        //Check if it is recognized
        if (isSize(argument)) {
            size = argument;
        } else if (isRating(argument)) {
            rating = getRating(argument);
        }
    });

    //First see if the rating has been established, otherwise pick one
    if (rating === 'random') rating = rnd(["uncommon", "rare", "very-rare", "legendary"]);
    //Now say what we're doing
    let output = "Generating a " + rating + " " + ((size === 'hoard') ? "treasure hoard..." : "individual treasure...");
    //Return the individual treasure rolls
    if (size === 'individual') treasure.push(individualTreasure());
    //Or the hoard
    if (size === 'hoard') hoardTreasure();

    //After we've generated treasure, (so wepopulate the array), print it
    let result = treasure.join("\n");
    output += "\n---------------------------------------------\n";
    output += result;
    return output;
}

/**
 * Generates a treasure hoard
 */
function hoardTreasure() {
    //Roll percentile, and based on that and size, roll the rest
    let chance = d100();
    if (rating === 'rare') hoardRare(chance);
    else if (rating === 'very-rare') hoardVeryRare(chance);
    else if (rating === 'legendary') hoardLegendary(chance);
    else hoardUncommon(chance);
}

/**
 * Roll legendary hoard treasure
 * @param {Number} chance 
 */
function hoardLegendary(chance) {
    //First roll the money and add it to the list of treasure
    let money = getMoney(0, 0, 0, roll("12d6x100"), roll("8d6x1000"));
    treasure.push(money);
    //Now decide on chance what we do
    if (chance >= 96) {
        treasure.push(gems(5000, d8()));
        treasure.push(magicTable.rollI(d4()));
    } else if (chance >= 91) {
        treasure.push(art(7500, d4()));
        treasure.push(magicTable.rollF(1));
        treasure.push(magicTable.rollG(d4()));
    } else if (chance >= 86) {
        treasure.push(magicTable.rollI(d4()));
        treasure.push(art(2500, d10()));
    } else if (chance >= 81) {
        treasure.push(magicTable.rollI(d4()));
        treasure.push(gems(1000, roll("3d6")));
    } else if (chance >= 79) {
        treasure.push(magicTable.rollH(d4()));
        treasure.push(gems(5000, d8()));
    } else if (chance >= 77) {
        treasure.push(magicTable.rollH(d4()));
        treasure.push(art(7500, d4()));
    } else if (chance >= 75) {
        treasure.push(magicTable.rollH(d4()));
        treasure.push(art(2500, d10()));
    } else if (chance >= 73) {
        treasure.push(magicTable.rollH(d4()));
        treasure.push(gems(1000, roll("3d6")));
    } else if (chance >= 72) {
        treasure.push(magicTable.rollG(d4()));
        treasure.push(gems(5000, d8()));
    } else if (chance >= 71) {
        treasure.push(magicTable.rollG(d4()));
        treasure.push(art(7500, d4()));
    } else if (chance >= 70) {
        treasure.push(magicTable.rollG(d4()));
        treasure.push(art(2500, d10()));
    } else if (chance >= 69) {
        treasure.push(magicTable.rollG(d4()));
        treasure.push(gems(1000, roll("3d6")));
    } else if (chance >= 64) {
        treasure.push(magicTable.rollE(d6()));
        treasure.push(gems(5000, d8()));
    } else if (chance >= 59) {
        treasure.push(magicTable.rollE(d6()));
        treasure.push(art(7500, d4()));
    } else if (chance >= 53) {
        treasure.push(magicTable.rollE(d6()));
        treasure.push(art(2500, d10()));
    } else if (chance >= 47) {
        treasure.push(magicTable.rollE(d6()));
        treasure.push(gems(1000, roll("3d6")));
    } else if (chance >= 39) {
        treasure.push(magicTable.rollD(d6()));
        treasure.push(gems(5000, d8()));
    } else if (chance >= 31) {
        treasure.push(magicTable.rollD(d6()));
        treasure.push(art(7500, d4()));
    } else if (chance >= 23) {
        treasure.push(magicTable.rollD(d6()));
        treasure.push(art(2500, d10()));
    } else if (chance >= 15) {
        treasure.push(magicTable.rollD(d6()));
        treasure.push(gems(1000, roll("3d6")));
    } else if (chance >= 12) {
        treasure.push(magicTable.rollC(d8()));
        treasure.push(gems(5000, d8()));
    } else if (chance >= 9) {
        treasure.push(magicTable.rollC(d8()));
        treasure.push(art(7500, d4()));
    } else if (chance >= 6) {
        treasure.push(magicTable.rollC(d8()));
        treasure.push(art(2500, d10()));
    } else if (chance >= 3) {
        treasure.push(magicTable.rollC(d8()));
        treasure.push(gems(1000, roll("3d6")));
    } else if (chance >= 1) {
        //Small chance of getting nothing but money
    }
}

/**
 * Roll very rare hoard treasure
 * @param {Number} chance
 */
function hoardVeryRare(chance) {
    //First roll the money and add it to the list of treasure
    let money = getMoney(0, 0, 0, roll("4d6x1000"), roll("5d6x100"));
    treasure.push(money);
    //Now decide on chance what we do
    if (chance >= 99) {
        treasure.push(gems(1000, roll("3d6")));
        treasure.push(magicTable.rollI(1));
    } else if (chance >= 97) {
        treasure.push(gems(1000, roll("3d6")));//CHECK
        treasure.push(magicTable.rollI(1));
    } else if (chance >= 95) {
        treasure.push(gems(500, roll("3d6")));
        treasure.push(magicTable.rollI(1));
    } else if (chance >= 93) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollI(1));
    } else if (chance >= 91) {
        treasure.push(gems(1000, roll("3d6")));
        treasure.push(magicTable.rollH(d4()));
    } else if (chance >= 89) {
        treasure.push(gems(500, roll("3d6")));
        treasure.push(magicTable.rollH(d4()));
    } else if (chance >= 86) {
        treasure.push(art(750, roll("2d4")));
        treasure.push(magicTable.rollH(d4()));
    } else if (chance >= 83) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollH(d4()));
    } else if (chance >= 81) {
        treasure.push(gems(1000, roll("3d6")));
        treasure.push(magicTable.rollF(1));
        treasure.push(magicTable.rollG(d4()));
    } else if (chance >= 79) {
        treasure.push(gems(500, roll("3d6")));
        treasure.push(magicTable.rollF(1));
        treasure.push(magicTable.rollG(d4()));
    } else if (chance >= 77) {
        treasure.push(art(750, roll("2d4")));
        treasure.push(magicTable.rollF(1));
        treasure.push(magicTable.rollG(d4()));
    } else if (chance >= 75) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollF(1));
        treasure.push(magicTable.rollG(d4()));
    } else if (chance >= 73) {
        treasure.push(gems(1000, roll("3d6")));
        treasure.push(magicTable.rollE(1));
    } else if (chance >= 71) {
        treasure.push(gems(500, roll("3d6")));
        treasure.push(magicTable.rollE(1));
    } else if (chance >= 69) {
        treasure.push(art(750, roll("2d4")));
        treasure.push(magicTable.rollE(1));
    } else if (chance >= 67) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollE(1));
    } else if (chance >= 63) {
        treasure.push(gems(1000, roll("3d6")));
        treasure.push(magicTable.rollD(d4()));
    } else if (chance >= 59) {
        treasure.push(gems(500, roll("3d6")));
        treasure.push(magicTable.rollD(d4()));
    } else if (chance >= 55) {
        treasure.push(art(750, roll("2d4")));
        treasure.push(magicTable.rollD(d4()));
    } else if (chance >= 51) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollD(d4()));
    } else if (chance >= 46) {
        treasure.push(gems(1000, roll("3d6")));
        treasure.push(magicTable.rollC(d6()));
    } else if (chance >= 41) {
        treasure.push(gems(500, roll("3d6")));
        treasure.push(magicTable.rollC(d6()));
    } else if (chance >= 36) {
        treasure.push(art(750, roll("2d4")));
        treasure.push(magicTable.rollC(d6()));
    } else if (chance >= 30) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollC(d6()));
    } else if (chance >= 27) {
        treasure.push(gems(1000, roll("3d6")));
        treasure.push(magicTable.rollA(d4()));
        treasure.push(magicTable.rollB(d6()));
    } else if (chance >= 24) {
        treasure.push(gems(500, roll("3d6")));
        treasure.push(magicTable.rollA(d4()));
        treasure.push(magicTable.rollB(d6()));
    } else if (chance >= 20) {
        treasure.push(art(750, roll("2d4")));
        treasure.push(magicTable.rollA(d4()));
        treasure.push(magicTable.rollB(d6()));
    } else if (chance >= 16) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollA(d4()));
        treasure.push(magicTable.rollB(d6()));
    } else if (chance >= 13) {
        treasure.push(gems(1000, roll("3d6")));
    } else if (chance >= 11) {
        treasure.push(gems(500, roll("3d6")));
    } else if (chance >= 7) {
        treasure.push(art(750, roll("2d4")));
    } else if (chance >= 4) {
        treasure.push(art(250, roll("2d4")));
    } else if (chance >= 1) {
        //Small chance you get nothing but money
    }
}

/**
 * Roll rare hoard treasure
 * @param {Number} chance 
 */
function hoardRare(chance) {
    //First roll the money and add it to the list of treasure
    let money = getMoney(roll("2d6x100"), roll("2d6x1000"), 0, roll("6d6x100"), roll("3d6x10"));
    treasure.push(money);
    //Now decide on chance what we do
    if (chance >= 100) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollH(1));
    } else if (chance >= 99) {
        treasure.push(gems(100, roll("3d6")));
        treasure.push(magicTable.rollH(1));
    } else if (chance >= 97) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollG(d6()));
    } else if (chance >= 95) {
        treasure.push(gems(100, roll("3d6")));
        treasure.push(magicTable.rollG(d4()));
    } else if (chance >= 92) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollF(d4()));
    } else if (chance >= 89) {
        treasure.push(gems(100, roll("3d6")));
        treasure.push(magicTable.rollF(d4()));
    } else if (chance >= 85) {
        treasure.push(gems(50, roll("3d6")));
        treasure.push(magicTable.rollF(d4()));
    } else if (chance >= 81) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollF(d4()));
    } else if (chance >= 80) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollD(1));
    } else if (chance >= 79) {
        treasure.push(gems(100, roll("3d6")));
        treasure.push(magicTable.rollD(1));
    } else if (chance >= 77) {
        treasure.push(gems(50, roll("3d6")));
        treasure.push(magicTable.rollD(1));
    } else if (chance >= 75) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollD(1));
    } else if (chance >= 73) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollC(d4()));
    } else if (chance >= 70) {
        treasure.push(gems(100, roll("3d6")));
        treasure.push(magicTable.rollC(d4()));
    } else if (chance >= 67) {
        treasure.push(gems(50, roll("3d6")));
        treasure.push(magicTable.rollC(d4()));
    } else if (chance >= 64) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollC(d4()));
    } else if (chance >= 60) {
        treasure.push(art(250, roll("2d4")));
        treasure.push(magicTable.rollB(d4()));
    } else if (chance >= 55) {
        treasure.push(gems(100, roll("3d6")));
        treasure.push(magicTable.rollB(d4()));
    } else if (chance >= 50) {
        treasure.push(gems(50, roll("3d6")));
        treasure.push(magicTable.rollB(d4()));
    } else if (chance >= 45) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollB(d4()));
    } else if (chance >= 41) {
        treasure.push(art(250, roll("2d4"))); //CHECK
        treasure.push(magicTable.rollA(d6()));
    } else if (chance >= 37) {
        treasure.push(gems(100, roll("3d6")));
        treasure.push(magicTable.rollA(d6()));
    } else if (chance >= 33) {
        treasure.push(gems(50, roll("3d6")));
        treasure.push(magicTable.rollA(d6()));
    } else if (chance >= 29) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollA(d6()));
    } else if (chance >= 23) {
        treasure.push(art(250, roll("2d4")));
    } else if (chance >= 17) {
        treasure.push(gems(100, roll("3d6")));
    } else if (chance >= 11) {
        treasure.push(gems(50, roll("3d6")));
    } else if (chance >= 5) {
        treasure.push(art(25, roll("2d4")));
    } else if (chance >= 1) {
        //There is a small chance you only get money
    }
}

/**
 * Roll uncommon hoard treasure
 */
function hoardUncommon(chance) {
    //First roll the money and add it to the list of treasure
    let money = getMoney(roll("6d6x100"), roll("3d6x100"), 0, roll("2d6x10"), 0);
    treasure.push(money);
    //Now decide on chance what we do
    if (chance == 100) {
        treasure.push(gems(50, roll("2d6")));
        treasure.push(magicTable.rollG(d6()));
    } else if (chance >= 98) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollG(d6()));
    } else if (chance >= 93) {
        treasure.push(gems(50, roll("2d6")));
        treasure.push(magicTable.rollF(d6()));
    } else if (chance >= 86) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollF(d6()));
    } else if (chance >= 81) {
        treasure.push(gems(50, roll("2d6")));
        treasure.push(magicTable.rollC(d6()));
    } else if (chance >= 79) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollC(d6()));
    } else if (chance >= 76) {
        treasure.push(gems(10, roll("2d6")));
        treasure.push(magicTable.rollC(d6()));
    } else if (chance >= 71) {
        treasure.push(gems(50, roll("2d6")));
        treasure.push(magicTable.rollB(d6()));
    } else if (chance >= 66) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollB(d6()));
    } else if (chance >= 61) {
        treasure.push(gems(10, roll("2d6")));
        treasure.push(magicTable.rollB(d6()));
    } else if (chance >= 53) {
        treasure.push(gems(50, roll("2d6")));
        treasure.push(magicTable.rollA(d6()));
    } else if (chance >= 45) {
        treasure.push(art(25, roll("2d4")));
        treasure.push(magicTable.rollA(d6()));
    } else if (chance >= 37) {
        treasure.push(gems(10, roll("2d6")));
        treasure.push(magicTable.rollA(d6()));
    } else if (chance >= 27) {
        treasure.push(gems(50, roll("2d6")));
    } else if (chance >= 17) {
        treasure.push(art(25, roll("2d4")));
    } else if (chance >= 7) {
        treasure.push(gems(10, roll("2d6")));
    } else {
        //Do nothing, small chance to get nothing but money
    }
}

/**
 * Generates individual treasure
 */
function individualTreasure() {
    //Roll   percentile, and based on that and size, roll the rest
    let chance = d100();
    if (rating === 'rare') return individualRare(chance);
    else if (rating === 'very-rare') return individualVeryRare(chance);
    else if (rating === 'legendary') return individualLegendary(chance);
    else return individualUncommon(chance);
}

/**
 * Roll individual uncommon treasure
 * @param {int} chance 
 */
function individualUncommon(chance) {
    if (chance >= 96) {
        return getMoney(0, 0, 0, 0, d6());
    } else if (chance >= 71) {
        return getMoney(0, 0, 0, roll("3d6"), 0);
    } else if (chance >= 61) {
        return getMoney(0, 0, roll("3d6"), 0, 0);
    } else if (chance >= 31) {
        return getMoney(0, roll("4d6"), 0, 0, 0);
    } else {
        return getMoney(roll("5d6"), 0, 0, 0, 0);
    }
}

/**
 * Roll individual rare treasure
 * @param {int} chance 
 */
function individualRare(chance) {
    if (chance >= 96) {
        return getMoney(0, 0, 0, roll("2d6x10"), roll("3d6"));
    } else if (chance >= 71) {
        return getMoney(0, 0, 0, roll("4d6x10"), 0);
    } else if (chance >= 61) {
        return getMoney(0, 0, roll("3d6x10"), roll("2d6x10"), 0);
    } else if (chance >= 31) {
        return getMoney(0, roll("6d6x10"), 0, roll("2d6x10"), 0);
    } else {
        return getMoney(roll("4d6x100"), 0, d6() * 10, 0, 0);
    }
}

/**
 * Roll individual very rare treasure
 * @param {int} chance 
 */
function individualVeryRare(chance) {
    if (chance >= 76) {
        return getMoney(0, 0, 0, roll("2d6x100"), roll("2d6x10"));
    } else if (chance >= 36) {
        return getMoney(0, 0, 0, roll("2d6x100"), d6() * 10);
    } else if (chance >= 21) {
        return getMoney(0, 0, d6() * 100, d6() * 100, 0);
    } else {
        return getMoney(0, roll("4d6x100"), 0, d6() * 10, 0);
    }
}

/**
 * Roll individual legendary treasure
 * @param {int} chance 
 */
function individualLegendary(chance) {
    if (chance >= 56) {
        return getMoney(0, 0, 0, d6() * 1000, roll("2d6x100"))
    } else if (chance >= 16) {
        return getMoney(0, 0, 0, d6() * 1000, d6() * 100);
    } else {
        return getMoney(0, 0, roll("2d6x1000"), roll("8d6x100"), 0);
    }
}

/**
 * Check if the prvoided argument contains a treasure
 * rating (CR)
 * @param {String} choice 
 */
function isRating(choice) {
    //Clean input
    choice = choice.toLowerCase().trim();
    //Check if it contains CR
    if (choice.indexOf("cr") > -1) {
        //remove the cr part
        let number = choice.replace("cr", "");
        //Now see if when we remove that part it is now a parsable number
        number = parseInt(number);
        //If the number is NaN, return false
        if (isNaN(number)) return false;
        //Yes we can parse the number, valid CR
        else return true;
    } else {//Without CR, this is no treasure rating, maybe it is a other descriptor
        if (["uncommon", "legendary", "very-rare", "rare"].indexOf(choice) > -1) return true;
        else return false;
    }
}

/**
 * Parses the CR rating into a recognized category
 */
function getRating(choice) {
    //Clean input
    choice = choice.toLowerCase().trim().replace("cr", "");
    //Test if it is a known category
    if (["uncommon", "legendary", "very-rare", "rare"].indexOf(choice) > -1) {
        return choice;
    }
    //Parse the number
    let number = parseInt(choice);
    //Now depending on the number set rating
    if (number >= 17) return "legendary";
    else if (number >= 11) return "very-rare";
    else if (number >= 5) return "rare";
    else if (number >= 0) return "uncommon";

}

/**
 * See if the provided argument contains a size
 * (individual or hoard), if not, assume individual
 * @param {String} choice the option to check
 */
function isSize(choice) {
    choice = choice.toLowerCase().trim();
    let sizes = ["individual", "hoard"];
    if (sizes.indexOf(choice) > -1) return true;
    else return false;
}

/**
 * Generates a money stament for the provided money amount
 * @param {int} cp 
 * @param {int} sp 
 * @param {int} ep 
 * @param {int} gp 
 * @param {int} pp 
 */
function getMoney(cp, sp, ep, gp, pp) {
    //All the money parts together
    let parts = [];
    //First generate all parts
    let copper = cp + CP;
    let silver = sp + SP;
    let electrum = ep + EP;
    let gold = gp + GP;
    let platinum = pp + PP;
    //Now see which ones should be joined
    if (pp > 0) parts.push(platinum);
    if (gp > 0) parts.push(gold);
    if (sp > 0) parts.push(silver);
    if (ep > 0) parts.push(electrum);
    if (cp > 0) parts.push(copper);
    //Finally join the parts on a combining string
    return parts.join(" and ");
}

/**Export generate treasure function */
exports.treasure = generateTreasure;
exports.money = getMoney;