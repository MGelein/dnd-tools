/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);
/**The executeSync command */
const exec = require("child_process").execSync;

//Currency const
const GP = "Gp";
const PP = "Pp";
const SP = "Sp";
const EP = "Ep";
const CP = "Cp";
const GPn = GP + " and ";
const PPn = PP + " and ";
const EPn = EP + " and ";
const SPn = SP + " and ";
const CPn = CP + " and ";

/**
 * GEMS
 */
const gems10 = ["Azurite (opaque mottled deep blue)", "Banded agate (translucent striped brown, blue, white or red)", "Blue quartz (transparent pale blue)", "Eye agate (translucent circles of gray, white, brown, blue or green)", "Hematite (opaque gray-black)", "Lapis lazuli (opaque light and dark blue with yellow flecks)", "Malachite (opaque striated light and dark green)", "Moss agate (translucent pink or yellow-white with mossy gray or green markings)", "Obisidian (opaque black)", "Rhodochrosite (opaque light pink)", "Tiger eye (translucent brown with golden center)", "Turquoise (opaque light blue-green)"];
const gems50 = ["Bloodstone (opaque dark gray with red flecks)", "Carnelian (opaque orange to red-brown)", "Chalcedony (opaque white)", "Chrysoprase (translucent green)", "Citrine (translucent pale yellow-brown)", "Jasper (opaque blue, black or brown)", "Moonstone (translucent white with pale blue glow)", "Onyx (opaque bands of black and white, or pure black or white)", "Quartz (transparent white, smoky gray or yellow)", "Sardonyx (opaque bands of red and white)", "Star rose quartz (translucent rosy stone with white star-shaped center)", "Zircon (transparent pale blue-green)"];
const gems100 = ["Amber (transparent watery gold to rich gold)", "Amethyst (transparent deep purple)", "Chrysoberyl (transparent yellow-green to pale green)", "Coral (opaque crimson)", "Garnet (transparent red, brown-green or violet)", "Jade (translucent light green, deep green or white)", "Jet (opaque deep black)", "Pearl (opaque lustrous white, yellow or pink)", "Spinel (transparent red, red-brown or deep green)", "Tourmaline (transparent pale green, blue, brown or red)"];
const gems500 = ["Alexandrite (transparent dark green)", "Aquamarine (transparent pale blue green)", "Black pearl (opaque pure black)", "Blue spinel (transparent deep blue)", "Peridot (transparent rich olive green)", "Topaz (transparent golden yellow)"];
const gems1000 = ["Black opal (translucent dark green with black mottling and golden flecks)", "Blue sapphire (transparent blue-white to medium blue)", "Emerald (transparent deep bright green)", "Fire opal (translucent fiery red)", "Opal (translucent pale blue with green and golden mottling)", "Star ruby (translucent red ruby with white star shaped center)", "Star sapphire (translucent blue sapphire with white star shaped center)", "Yellow sapphire (transparent fiery yellow or yellow-green)"];
const gems5000 = ["Black sapphire (translucent lustrous black with glowing highlights)", "Diamond (transparent blue-white, canary, pink, brown or blue)", "Jacinth (transparent fiery orange)", "Ruby (transparent clear red to deep crimson)"];

/**
 * ART
 */
const art25 = ["Silver ewer", "Carved bone statuette", "Small gold bracelet", "Cloth-of-gold vestments", "Black velvet mask stitched with silver thread", "Copper chalice with silver filligree", "Pair of engraved bone dice", "Small mirror set in a painted wooden frame", "Embroidered silk handkerchief", "Gold locket with a painted portrait inside"];
const art250 = ["Gold ring set with bloodstones", "Carved ivory statuette", "Large gold bracelet", "Silver necklace with a gemstone pendant", "Bronze crown", "Silk robe", "Large well-made tapestry", "Brass mug with a jade inlay", "Box of turquoise animal figurines", "Gold bird cage with electrum filigree"];
const art750 = ["Silver chalice set with moonstones", "Silver-plated steel longsword with jet set in hilt", "Carved harp of exotic wood with ivory inlay and zircon gems", "Small gold idol", "Gold dragon comb set with red garnets as eyes", "Bottle stopper cork embossed with gold leaf and set with amethysts", "Ceremonial electrum dagger with a black pearl in the pommel", "Silver and gold brooch", "Obsidian statuette with gold fittings and inlay", "Painted gold war mask"];
const art2500 = ["Fine gold chain set with a fire opal", "Old masterpiece painting", "Embroidered silk and velvet mantle set with numerous moonstones", "Platinum bracelet set with a sapphire", "Embroidered glove set with jewel chips", "Jeweled anklet", "Gold music box", "Gold circlet set with four aquamarines", "Eye patch with a mock eye set in blue sapphire and moonstone", "A necklace string of small pink pearls"];
const art7500 = ["Jeweled gold crown", "Jeweled platinum ring", "Small gold statuette set with rubies", "Gold cup set with emerals", "Gold jewelry box with platinum filigree", "Painted gold child's sarcophagus", "Jade game board with solid gold playing pieces", "Bejeweled ivory drinking horn with gold filigree"];

//This variable will hold the size specification, by default individual
let size = "individual";
//This variable will hold the rating of the treasure, by default random
let rating = "random";
//This will hold an array of treasure objects which will then be spit out after being joined by a newline
let treasure = [];

//Go through all arguments to see if we recognize them
args.forEach(function (argument) {
    //Check if it is recognized
    if (isSize(argument)) {
        size = argument;
    } else if (isRating(argument)) {
        rating = getRating(argument);
    }
});

/**
 * The line that does the actual work
 */
generateTreasure();

/**
 * Generates the actual treasure
 */
function generateTreasure() {
    //First see if the rating has been established, otherwise pick one
    if (rating === 'random') rating = rnd(["uncommon", "rare", "very-rare", "legendary"]);
    //Now say what we're doing
    console.log("Generating a " + rating + " " + ((size === 'hoard') ? "treasure hoard..." : "individual treasure..."));
    //Return the individual treasure rolls
    if (size === 'individual') treasure.push(individualTreasure());
    //Or the hoard
    if (size === 'hoard') hoardTreasure();

    //After we've generated treasure, (so wepopulate the array), print it
    let result = treasure.join("\n");
    console.log("---------------------------------------------");
    console.log(result);
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
 * Roll uncommon hoard treasure
 */
function hoardUncommon() {
    //First roll the money
}

/**
 * Generates individual treasure
 */
function individualTreasure() {
    //Roll percentile, and based on that and size, roll the rest
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
        return getMoney(0, 0, 0, d6(3), 0);
    } else if (chance >= 61) {
        return getMoney(0, 0, d6(3), 0, 0);
    } else if (chance >= 31) {
        return getMoney(0, d6(4), 0, 0, 0);
    } else {
        return getMoney(d6(5), 0, 0, 0, 0);
    }
}

/**
 * Roll individual rare treasure
 * @param {int} chance 
 */
function individualRare(chance) {
    if (chance >= 96) {
        return getMoney(0, 0, 0, d6(2) * 10, d6(3));
    } else if (chance >= 71) {
        return getMoney(0, 0, 0, d6(4) * 10, 0);
    } else if (chance >= 61) {
        return getMoney(0, 0, d6(3) * 10, d6(2) * 10, 0);
    } else if (chance >= 31) {
        return getMoney(0, d6(6) * 10, 0, d6(2) * 10, 0);
    } else {
        return getMoney(d6(4) * 100, 0, d6() * 10, 0, 0);
    }
}

/**
 * Roll individual very rare treasure
 * @param {int} chance 
 */
function individualVeryRare(chance) {
    if (chance >= 76) {
        return getMoney(0, 0, 0, d6(2) * 100, d6(2) * 10);
    } else if (chance >= 36) {
        return getMoney(0, 0, 0, d6(2) * 100, d6() * 10);
    } else if (chance >= 21) {
        return getMoney(0, 0, d6() * 100, d6() * 100, 0);
    } else {
        return getMoney(0, d6(4) * 100, 0, d6() * 10, 0);
    }
}

/**
 * Roll individual legendary treasure
 * @param {int} chance 
 */
function individualLegendary(chance) {
    if (chance >= 56) {
        return getMoney(0, 0, 0, d6() * 1000, d6(2) * 100)
    } else if (chance >= 16) {
        return getMoney(0, 0, 0, d6() * 1000, d6() * 100);
    } else {
        return getMoney(0, 0, d6(2) * 1000, d6(8) * 100, 0);
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
* Returns a random option from an array
* @param {Array} array 
*/
function rnd(array) {
    return array[Math.floor((Math.random() * array.length))];
}

/**
 * Random number whole between minimum and maxmimum
 * @param {Number} min 
 * @param {Number} max 
 */
function random(min, max) {
    //Get the age-range
    var range = Math.max(0, max - min);
    //Only return whole years
    return Math.round(Math.random() * range + min);
}

/**
 * Rolls a certain dice a certain amount of times, and 
 * adds all the results together
 * @param {int} size 
 * @param {int} times 
 */
function dice(size, times) {
    //If no times is passed, assume 1
    if (!times) times = 1;
    let sum = 0;
    while (times > 0) {
        sum += random(1, size);
        times--;
    }
    return sum;
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

/**
 * DICE functions
 */
function d3(times) { return dice(3, times) };
function d4(times) { return dice(4, times) };
function d6(times) { return dice(6, times) };
function d8(times) { return dice(8, times) };
function d10(times) { return dice(10, times) };
function d12(times) { return dice(12, times) };
function d20(times) { return dice(20, times) };
function d100(times) { return dice(100, times) };

/**
 * Returns a string that represents what we give
 * @param {int} worth the worth of the stone
 * @param {int} amount of stones to give
 */
function gems(worth, amount) {
    //Pick the right list based on worth
    let gemList = (worth == 5000) ? gems5000 : (worth == 50) ? gems50 : (worth == 100) ? gems100 : (worth == 500) ? gems500 : (worth == 1000) ? gems1000 : gems10;
    return amount + "x " + rnd(gemList);
}

/**
 * Returns a string that represents what we give
 * @param {int} worth 
 * @param {int} amount 
 */
function art(worth, amount){
    //All the parts of the art stuff together
    let parts = [];
    //Pick the right artList based on worth
    let artList = (worth == 7500) ? art7500 : (worth == 2500) ? art2500 : (worth == 750) ? art750 : (worth == 250) ? art250 : art25;
    //Now pick untill amount < 0
    while(amount > 0){
        parts.push(rnd(artList));
        amount --;
    }
    return parts.join("\n");
}