// Import random functionality
const { rnd } = require('./random');
// Import table functionality
const { table, header } = require('./table');

// All possible shoptypes
const types = ["armory|smith|weaponsmith", "bowyer|fletcher", "leatherworker|tanner", "temple|faith|priest", "general", "adventuring", "jeweler|stonecutter", "tailor|clothes|textiles", "potion|potions|alchemist|alchemy", "arcane|magic|wizard|sorcerer"];
const sizes = ["rural|small|tiny", "urban|medium", "premium|large"];


/**
 * Checks to see if the provided string is a shoptype description
 * @param {String} string 
 * @returns the index that was found to be matching
 */
function isType(string) {
    for (let i = 0; i < types.length; i++) {
        let subTypes = types[i].split("|");
        for (let j = 0; j < subTypes.length; j++) {
            //Go through every subtype
            if (subTypes[j] === string) return i;
        }
    }
    return -1;
}

/**
 * Checks to see if the provided string is a shop size description
 * @param {String} string 
 * @returns the index that was found to be matching
 */
function isSize(string) {
    for (let i = 0; i < sizes.length; i++) {
        let subSizes = sizes[i].split("|");
        for (let j = 0; j < subSizes.length; j++) {
            //Go through every subtype
            if (subSizes[j] === string) return i;
        }
    }
    return -1;
}

/**
 * Returns a number corresponding to size
 * @param {String} size 
 */
function parseSize(size) {
    return (size === 'rural' ? 0 : (size === 'urban') ? 1 : 2);
}

/**
 * Generates a shop of the provided size
 * @param {String} type 
 * @param {String} size 
 */
function generateShop(type, size) {
    //Forward the size to the function that generates the right type of shop
    if (type === 'armory') return generateArmory(size);
    else if (type === 'bowyer') return generateBowyer(size);
    else if (type === 'leatherworker') return generateLeatherworker(size);
    else if (type === 'temple') return generateTemple(size);
    else if (type === 'general') return generateGeneral(size);
    else if (type === 'adventuring') return generateAdventuring(size);
    else if (type === 'jeweler') return generateJeweler(size);
    else if (type === 'tailor') return generateTailor(size);
    else if (type === 'potion') return generatePotion(size);
    else if (type === 'arcane') return generateArcane(size);
    else {
        //Unrecognized type, pick a random one
        return generateShop(rnd(types).split("|")[0], size);
    }
}

/**
 * Generates an armory or smithy of the provided size
 * @param {String} size 
 */
function generateArmory(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 2) inventory.push({ name: "Studded Leather", price: "45gp" });
    if (size >= 0) inventory.push({ name: "Chain Shirt", price: "50gp" });
    if (size >= 1) inventory.push({ name: "Scale Mail", price: "50gp" });
    if (size >= 0) inventory.push({ name: "Breastplate", price: "400gp" });
    if (size >= 2) inventory.push({ name: "Half Plate", price: "750gp" });
    if (size >= 0) inventory.push({ name: "Ring Mail", price: "30gp" });
    if (size >= 0) inventory.push({ name: "Chain Mail", price: "75gp" });
    if (size >= 1) inventory.push({ name: "Splint", price: "200gp" });
    if (size >= 2) inventory.push({ name: "Plate", price: "1500gp" });
    if (size >= 0) inventory.push({ name: "Shield", price: "10gp" });
    if (size >= 0) inventory.push({ name: "Dagger", price: "2gp" });
    if (size >= 0) inventory.push({ name: "Handaxe", price: "5gp" });
    if (size >= 1) inventory.push({ name: "Javelin", price: "5sp" });
    if (size >= 1) inventory.push({ name: "Light Hammer", price: "2gp" });
    if (size >= 0) inventory.push({ name: "Mace", price: "5gp" });
    if (size >= 1) inventory.push({ name: "Sickle", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Spear", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Battleaxe", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Flail", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Glaive", price: "20gp" });
    if (size >= 0) inventory.push({ name: "Greataxe", price: "30gp" });
    if (size >= 0) inventory.push({ name: "Greatsword", price: "50gp" });
    if (size >= 1) inventory.push({ name: "Halberd", price: "20gp" });
    if (size >= 2) inventory.push({ name: "Lance", price: "10gp" });
    if (size >= 0) inventory.push({ name: "Longsword", price: "15gp" });
    if (size >= 1) inventory.push({ name: "Maul", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Morningstar", price: "15gp" });
    if (size >= 0) inventory.push({ name: "Pike", price: "5gp" });
    if (size >= 2) inventory.push({ name: "Rapier", price: "25gp" });
    if (size >= 1) inventory.push({ name: "Scimitar", price: "25gp" });
    if (size >= 0) inventory.push({ name: "Shortsword", price: "10gp" });
    if (size >= 2) inventory.push({ name: "Trident", price: "5gp" });
    if (size >= 1) inventory.push({ name: "War Pick", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Warhammer", price: "15gp" });
    if (size >= 1) inventory.push({ name: "Block and Tackle", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Chain (10 feet)", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Crowbar", price: "2gp" });
    if (size >= 1) inventory.push({ name: "Grappling Hook", price: "2gp" });
    if (size >= 0) inventory.push({ name: "Hammer", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Hammer, Sledge", price: "2gp" });
    if (size >= 0) inventory.push({ name: "Hunting Trap", price: "5gp" });
    if (size >= 2) inventory.push({ name: "Lantern, Bullseye", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Lantern, Hooded", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Lock", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Manacles", price: "2gp" });
    if (size >= 1) inventory.push({ name: "Mirror, Steel", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Pick, Miner's", price: "2gp" });
    if (size >= 0) inventory.push({ name: "Piton", price: "5cp" });
    if (size >= 1) inventory.push({ name: "Pot, Iron", price: "2gp" });
    if (size >= 1) inventory.push({ name: "Spikes, Iron", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Whetstone", price: "1cp" });
    if (size >= 0) inventory.push({ name: "Smith's Tools", price: "20gp" });
    if (size >= 2) inventory.push({ name: "Tinker's Tools", price: "50gp" });

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
}

/**
 * Generates a bowyer or fletcher of the provided size
 * @param {String} size 
 */
function generateBowyer(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 0) inventory.push({ name: "Crossbow, Light", price: "25gp" });
    if (size >= 0) inventory.push({ name: "Shortbow", price: "25gp" });
    if (size >= 1) inventory.push({ name: "Crossbow, Hand", price: "75gp" });
    if (size >= 0) inventory.push({ name: "Crossbow, Heavy", price: "50gp" });
    if (size >= 0) inventory.push({ name: "Longbow", price: "50gp" });
    if (size >= 0) inventory.push({ name: "Arrows (20)", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Crossbow Bolts (20)", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Case, Crossbow Bolt", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Quiver", price: "1gp" });

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
}

/**
 * Generates a temple or priest's shop of the provided size
 * @param {String} size 
 */
function generateTemple(size) {
    //The inventory we will fill
    let inventory = [];
    //The services this temple offers
    let services = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 0) inventory.push({ name: "Alms Box", price: "5gp" });
    if (size >= 1) inventory.push({ name: "Bell", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Blanket", price: "5sp" });
    if (size >= 0) inventory.push({ name: "Book, Scripture", price: "25gp" });
    if (size >= 0) inventory.push({ name: "Candle", price: "1cp" });
    if (size >= 1) inventory.push({ name: "Case, Map or Scroll", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Censer", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Chalk (1 piece)", price: "1cp" });
    if (size >= 0) inventory.push({ name: "Flask", price: "2cp" });
    if (size >= 1) inventory.push({ name: "Healer's Kit", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Amulet", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Emblem", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Reliquary", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Holy Water (flask)", price: "25gp" });
    if (size >= 0) inventory.push({ name: "Incense (1 block)", price: "1cp" });
    if (size >= 1) inventory.push({ name: "Ink (1 ounce bottle)", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Ink Pen", price: "2cp" });
    if (size >= 0) inventory.push({ name: "Lamp", price: "5sp" });
    if (size >= 2) inventory.push({ name: "Lantern, Hooded", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Oil (flask)", price: "1sp" });
    if (size >= 2) inventory.push({ name: "Paper (one sheet)", price: "2sp" });
    if (size >= 2) inventory.push({ name: "Parchment (one sheet)", price: "1sp" });
    if (size >= 2) inventory.push({ name: "Perfume (vial)", price: "5gp" });
    if (size >= 2) inventory.push({ name: "Potion of Healing", price: "50gp" });
    if (size >= 0) inventory.push({ name: "Rations (1 day)", price: "5sp" });
    if (size >= 0) inventory.push({ name: "Torch", price: "1cp" });
    if (size >= 0) inventory.push({ name: "Vial", price: "1gp" });
    if (size >= 0) inventory.push({ name: "Waterskin", price: "2sp" });
    if (size >= 1) inventory.push({ name: "Calligrapher's Supplies", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Herbalism Kit", price: "5gp" });
    if (size >= 2) inventory.push({ name: "Flute", price: "2gp" });
    if (size >= 2) inventory.push({ name: "Lyre", price: "30gp" });
    if (size >= 2) inventory.push({ name: "Horn", price: "3gp" });
    if (size >= 0) services.push({ name: "Cure Wounds (lvl 1)", price: "10gp" });
    if (size >= 0) services.push({ name: "Gentle Repose (lvl 2)", price: "50gp" });
    if (size >= 0) services.push({ name: "Lesser Restoration (lvl 2)", price: "50gp" });
    if (size >= 0) services.push({ name: "Remove Curse (lvl 3)", price: "100gp" });
    if (size >= 0) services.push({ name: "Revivify (lvl 3)", price: "400gp" });
    if (size >= 0) services.push({ name: "Raise Dead (lvl 5)", price: "1000gp" });

    //Return the filled inventory
    let iOut = table(inventory, ["name", "price"]);
    let sOut = table(services, ["name", "price"]);
    return header("Inventory: ") + iOut + header("Services: ") + sOut;
}

/**
 * Generates a tanner or leatherworker of the provided size
 * @param {String} size 
 */
function generateLeatherworker(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 0) inventory.push({ name: "Leather", price: "10gp" });
    if (size >= 0) inventory.push({ name: "Studded Leather", price: "45gp" });
    if (size >= 0) inventory.push({ name: "Hide", price: "10gp" });
    if (size >= 1) inventory.push({ name: "Shield", price: "10gp" });
    if (size >= 0) inventory.push({ name: "Sling", price: "1sp" });
    if (size >= 0) inventory.push({ name: "Waterskin", price: "2sp" });
    if (size >= 0) inventory.push({ name: "Cobbler's Tools", price: "5gp" });
    if (size >= 0) inventory.push({ name: "Leatherworker's Tools", price: "5gp" });
    if (size >= 2) inventory.push({ name: "Bagpipes", price: "30gp" });
    if (size >= 1) inventory.push({ name: "Drum", price: "6gp" });

    //Return the filled inventory
    return table(inventory, ["name", "price"]);
}

/**
 * Generates a general store of the provided size
 * @param {String} size 
 */
function generateGeneral(size) {

}

/**
 * Generates an adventuring shop of the provided size
 * @param {String} size 
 */
function generateAdventuring(size) {

}

/**
 * Generates a jeweler's shop of the provided size
 * @param {String} size 
 */
function generateJeweler(size) {

}

/**
 * Generates a tailor or textiles shop of the3 provided size
 * @param {String} size 
 */
function generateTailor(size) {

}

/**
 * Generate a potions or alchemist shop of the provided size
 * @param {String} size 
 */
function generatePotion(size) {

}

/**
 * Generate an arcane, magic or wizard shop of the provided size
 * @param {String} size 
 */
function generateArcane(size) {

}


/**
 * Make a shop, for example `shop("rural smith")`.
 * @param {String} command 
 */
exports.shop = function (command) {
    //Split into arguments
    let args = command.split(" ");
    //Now for each argument check type and assign it
    var type = "random";
    //Above: type of shop. Below: size of the village it's in
    var size = "random";
    //Go through the args one by one
    args.forEach(function (arg) {
        arg = arg.toLowerCase().trim();
        //See if it is a type index
        let index = isType(arg);
        if (index != -1) {
            //Take the first name of the shopType
            type = types[index].split("|")[0];
        }
        index = isSize(arg);
        if (index != -1) {
            //Take the first name of the size
            size = sizes[index].split("|")[0];
        }
    });
    // Now see if they have been randomly set still, if so, pick one at random
    if (type === 'random') type = rnd(types).split("|")[0];
    if (size === 'random') size = rnd(sizes).split("|")[0];
    // This means both have been set, generate a shop
    return generateShop(type, size);
}