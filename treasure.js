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

//This variable will hold the size specification, by default individual
let size = "individual";
//This variable will hold the rating of the treasure, by default random
let rating = "random";

//Go through all arguments to see if we recognize them
args.forEach(function(argument){
    //Check if it is recognized
    if(isSize(argument)){
        size = argument;
    }else if(isRating(argument)){
        rating = getRating(argument);
    }
});

/**
 * The line that does the actual work
 */
console.log(generateTreasure());


/**
 * Generates the actual treasure
 */
function generateTreasure(){
    //First see if the rating has been established, otherwise pick one
    if(rating === 'random') rating = rnd(["uncommon", "rare", "very-rare", "legendary"]);
    //Now say what we're doing
    console.log("Generating a " + rating + " " + ((size === 'hoard') ? "treasure hoard..." : "individual treasure..."));
    //Return the individual treasure rolls
    if(size == 'individual') return individualTreasure();
    //Or the hoard
    if(size == 'hoard') return hoardTreasure();
}

/**
 * Generates a treasure hoard
 */
function hoardTreasure(){
    //PLACEHOLDER
    return "hoard";
}

/**
 * Generates individual treasure
 */
function individualTreasure(){
    //Roll percentile, and based on that and size, roll the rest
    let chance = d100();
    if(rating  === 'rare') return individualRare(chance);
    else if(rating === 'very-rare') return individualVeryRare(chance);
    else if(rating === 'legendary') return individualLegendary(chance);
    else return individualUncommon(chance);
}

/**
 * Roll individual uncommon treasure
 * @param {int} chance 
 */
function individualUncommon(chance){
    if(chance >= 96){
        return d6() + "PP";
    }else if(chance >= 71){
        return d6(3) + GP;
    }else if(chance >= 61){
        return d6(3) + EP;
    }else if(chance >= 31){
        return d6(4) + SP;
    }else{
        return d6(5) + CP;
    }
}

/**
 * Roll individual rare treasure
 * @param {int} chance 
 */
function individualRare(chance){
    if(chance >= 96){
        return d6(3) + PPn + (d6(2) * 10) + GP;
    }else if(chance >= 71){
        return (d6(4) * 10) + GP;
    }else if(chance >= 61){
        return (d6(2) * 10) + GPn + (d6(3) * 10) + EP;
    }else if(chance >= 31){
        return (d6(2) * 10) + GPn + (d6(6) * 10) + SP;
    }else{
        return (d6() * 10) + EPn + (d6(4) * 100) + CP;
    }
}

/**
 * Roll individual very rare treasure
 * @param {int} chance 
 */
function individualVeryRare(chance){
    if(chance >= 76){
        return (d6(2) * 10) + PPn + (d6(2) * 100) + GP;
    }else if(chance >= 36){
        return (d6() * 10) + PPn + (d6(2) * 100) + GP;
    }else if(chance >= 21){
        return (d6() * 100) + GPn + (d6() * 100) + EP;
    }else{
        return (d6() * 100) + GPn + (d6(4) * 100) + SP;
    }
}

/**
 * Roll individual legendary treasure
 * @param {int} chance 
 */
function individualLegendary(chance){
    if(chance >= 56){
        return (d6(2) * 100) + PPn + (d6() * 1000) + GP;
    }else if(chance >= 16){
        return (d6() * 100) + PPn + (d6() * 1000) + GP;
    }else{
        return (d6(8) * 100) + GPn + (d6(2) * 1000) + SP;
    }
}

/**
 * Check if the prvoided argument contains a treasure
 * rating (CR)
 * @param {String} choice 
 */
function isRating(choice){
    //Clean input
    choice = choice.toLowerCase().trim();
    //Check if it contains CR
    if(choice.indexOf("cr") > -1){
        //remove the cr part
        let number = choice.replace("cr", "");
        //Now see if when we remove that part it is now a parsable number
        number = parseInt(number);
        //If the number is NaN, return false
        if(isNaN(number)) return false;
        //Yes we can parse the number, valid CR
        else return true;
    }else{//Without CR, this is no treasure rating, maybe it is a other descriptor
        if(["uncommon", "legendary", "very-rare", "rare"].indexOf(choice) > -1) return true;
        else return false;        
    }
}

/**
 * Parses the CR rating into a recognized category
 */
function getRating(choice){
    //Clean input
    choice = choice.toLowerCase().trim().replace("cr", "");
    //Test if it is a known category
    if(["uncommon", "legendary", "very-rare", "rare"].indexOf(choice) > -1){
        return choice;
    }
    //Parse the number
    let number = parseInt(choice);
    //Now depending on the number set rating
    if(number >= 17) return "legendary";
    else if(number >= 11) return "very-rare";
    else if(number >= 5) return "rare";
    else if(number >= 0) return "uncommon";

}

/**
 * See if the provided argument contains a size
 * (individual or hoard), if not, assume individual
 * @param {String} choice the option to check
 */
function isSize(choice){
    choice = choice.toLowerCase().trim();
    let sizes = ["individual", "hoard"];
    if(sizes.indexOf(choice) > -1) return true;
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
function dice(size, times){
    //If no times is passed, assume 1
    if(!times) times = 1;
    let sum = 0;
    while(times > 0){
        sum += random(1, size);
        times --;
    }
    return sum;
}

/**
 * DICE functions
 */
function d3(times){return dice(3, times)};
function d4(times){return dice(4, times)};
function d6(times){return dice(6, times)};
function d8(times){return dice(8, times)};
function d10(times){return dice(10, times)};
function d12(times){return dice(12, times)};
function d20(times){return dice(20, times)};
function d100(times){return dice(100, times)};

/**
 * GEMS
 */
const gems10 = ["Azurite (opaque mottled deep blue)","Banded agate (translucent striped brown, blue, white or red)","Blue quartz (transparent pale blue)","Eye agate (translucent circles of gray, white, brown, blue or green)","Hematite (opaque gray-black)","Lapis lazuli (opaque light and dark blue with yellow flecks)","Malachite (opaque striated light and dark green)","Moss agate (translucent pink or yellow-white with mossy gray or green markings)","Obisidian (opaque black)","Rhodochrosite (opaque light pink)","Tiger eye (translucent brown with golden center)","Turquoise (opaque light blue-green)"];
const gems50 = ["Bloodstone (opaque dark gray with red flecks)","Carnelian (opaque orange to red-brown)","Chalcedony (opaque white)","Chrysoprase (translucent green)","Citrine (translucent pale yellow-brown)","Jasper (opaque blue, black or brown)","Moonstone (translucent white with pale blue glow)","Onyx (opaque bands of black and white, or pure black or white)","Quartz (transparent white, smoky gray or yellow)","Sardonyx (opaque bands of red and white)","Star rose quartz (translucent rosy stone with white star-shaped center)","Zircon (transparent pale blue-green)"];
const gems100 = ["Amber (transparent watery gold to rich gold)","Amethyst (transparent deep purple)","Chrysoberyl (transparent yellow-green to pale green)","Coral (opaque crimson)","Garnet (transparent red, brown-green or violet)","Jade (translucent light green, deep green or white)","Jet (opaque deep black)","Pearl (opaque lustrous white, yellow or pink)","Spinel (transparent red, red-brown or deep green)","Tourmaline (transparent pale green, blue, brown or red)"];
const gems500 = ["Alexandrite (transparent dark green)","Aquamarine (transparent pale blue green)","Black pearl (opaque pure black)","Blue spinel (transparent deep blue)","Peridot (transparent rich olive green)","Topaz (transparent golden yellow)"];
const gems1000 = ["Black opal (translucent dark green with black mottling and golden flecks)","Blue sapphire (transparent blue-white to medium blue)","Emerald (transparent deep bright green)","Fire opal (translucent fiery red)","Opal (translucent pale blue with green and golden mottling)","Star ruby (translucent red ruby with white star shaped center)","Star sapphire (translucent blue sapphire with white star shaped center)","Yellow sapphire (transparent fiery yellow or yellow-green)"];
const gems5000 = ["Black sapphire (translucent lustrous black with glowing highlights)", "Diamond (transparent blue-white, canary, pink, brown or blue)", "Jacinth (transparent fiery orange)", "Ruby (transparent clear red to deep crimson)"];