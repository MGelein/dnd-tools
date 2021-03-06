// Import random functionality
const { rnd } = require('./random');
// Import table functionality
const { table, header } = require('./table');
// NPC generation
const {npc} = require("./npcs");
// Import money library
const {PP, GP, SP, EP, CP} = require('./money');

// All possible shoptypes
const types = ["market|stall|marketstall", "armory|smith|weaponsmith", "bowyer|fletcher", "leatherworker|tanner", "temple|faith|priest", "general", "adventuring", "jeweler|stonecutter", "tailor|clothes|textiles", "potion|potions|alchemist|alchemy", "arcane|magic|wizard|sorcerer"];
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
    console.log("Generating a " + size + " " + type);
    //First generate a random shopkeer
    console.log(header("Owner: ") + npc("", true));
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
    else if (type === 'market') return generateMarket();//Market ignores size
    else {
        //Unrecognized type, pick a random one
        return generateShop(rnd(types).split("|")[0], size);
    }
}

/**
 * Generates a market stall.
 */
function generateMarket(){
    let things = ["Ale by the pint.", "Amulets and totems.", "Apples.",
    "Attractive young slaves (bedmates).", "Axes and hammers.", "Bearskin rugs and capes.",
    "Beer by the barrel.", "Biscuits and rolls.", "Blankets and pillows.",
    "Blessings.", "Bouquets of flowers.", "Bows and arrows.",
    "Brass candlesticks, plates, and lamps.", "Brass horns and flutes.", "Cabbages.",
    "Candles and candlesticks.", "Carrots.", "Carved stone figures.",
    "Carved wooden figures.", "Ceramic vases and cups.", "Cheap jewelry and trinkets.",
    "Cherries.", "Clay pots, bowls, cups, and vases.", "Coal.",
    "Copper bowls, spoons, kettles, cups.", "Corn on the cob.", "Cotton shirts and pants.",
    "Dogs and cats.", "Domestic slaves (maidservants).", "Dried fish.",
    "Dried herbs.", "Dried venison.", "Dried whole grain.",
    "Drums and bells.", "Exotic spices.", "Exotic teas.",
    "Firewood.", "Flower seeds.", "Foreign books.",
    "Foreign coins.", "Fresh bread.", "Fresh fish.",
    "Fruit pies.", "Glass bottles, jars, vials, and cups.", "Hardy slaves (laborers).",
    "Hot soup.", "Iron candlesticks and tools.", "Iron pots and pans.",
    "Knives, forks, spoons and cooking utensils.", "Lamps, lanterns, and oil.", "Leather boots and caps.",
    "Live poultry.", "Lutes and fiddles.", "Manure.",
    "Meat pies.", "Medicinal teas.", "Onions.",
    "Pears and plums.", "Perfumes and scented oils.", "Piglets.",
    "Poisons and remedies.", "Polished stones and crystals.", "Potatoes.",
    "Potions.", "Potted herbs.", "Quarrels and crossbows.",
    "Rats and pigeons.", "Rope.", "Rough-cut gems.",
    "Saddles and bridles.", "Salted pork.", "Saplings.",
    "Scented candles.", "Seasonal berries.", "Shields and helms.",
    "Shiny leather shoes.", "Silk shirts and scarves.", "Snakeskin boots.",
    "Soap.", "Stone-ground flour.", "Sturdy leather shoes.",
    "Swords and spears.", "Tables and chairs.", "Tankards and mugs.",
    "Tarot readings.", "Torches and rations.", "Traditional spices.",
    "Turnips.", "Used books.", "Used horses and ponies.",
    "Wagons and carts.", "Waterskins and wineskins.", "Whale oil.",
    "Wine by the barrel.", "Wine by the bottle.", "Wolfskin rugs and capes.",
    "Wooden-soled shoes.", "Wool shirts and caps.", "Woven baskets.",
    "Young horses and ponies."];
    return header("Inventory") + "This vendor sells " + rnd(things);
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
    if (size >= 2) inventory.push({ name: "Studded Leather", price: "45" + GP });
    if (size >= 0) inventory.push({ name: "Chain Shirt", price: "50" + GP });
    if (size >= 1) inventory.push({ name: "Scale Mail", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Breastplate", price: "400" + GP });
    if (size >= 2) inventory.push({ name: "Half Plate", price: "750" + GP });
    if (size >= 0) inventory.push({ name: "Ring Mail", price: "30" + GP });
    if (size >= 0) inventory.push({ name: "Chain Mail", price: "75" + GP });
    if (size >= 1) inventory.push({ name: "Splint", price: "200" + GP });
    if (size >= 2) inventory.push({ name: "Plate", price: "1500" + GP });
    if (size >= 0) inventory.push({ name: "Shield", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Dagger", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Handaxe", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Javelin", price: "5" + SP });
    if (size >= 1) inventory.push({ name: "Light Hammer", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Mace", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Sickle", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Spear", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Battleaxe", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Flail", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Glaive", price: "20" + GP });
    if (size >= 0) inventory.push({ name: "Greataxe", price: "30" + GP });
    if (size >= 0) inventory.push({ name: "Greatsword", price: "50" + GP });
    if (size >= 1) inventory.push({ name: "Halberd", price: "20" + GP });
    if (size >= 2) inventory.push({ name: "Lance", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Longsword", price: "15" + GP });
    if (size >= 1) inventory.push({ name: "Maul", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Morningstar", price: "15" + GP });
    if (size >= 0) inventory.push({ name: "Pike", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Rapier", price: "25" + GP });
    if (size >= 1) inventory.push({ name: "Scimitar", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Shortsword", price: "10" + GP });
    if (size >= 2) inventory.push({ name: "Trident", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "War Pick", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Warhammer", price: "15" + GP });
    if (size >= 1) inventory.push({ name: "Block and Tackle", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Chain (10 feet)", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Crowbar", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Grappling Hook", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Hammer", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Hammer, Sledge", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Hunting Trap", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Lantern, Bullseye", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Lantern, Hooded", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Lock", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Manacles", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Mirror, Steel", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Pick, Miner's", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Piton", price: "5" + CP });
    if (size >= 1) inventory.push({ name: "Pot, Iron", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Spikes, Iron", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Whetstone", price: "1" + CP });
    if (size >= 0) inventory.push({ name: "Smith's Tools", price: "20" + GP });
    if (size >= 2) inventory.push({ name: "Tinker's Tools", price: "50" + GP });

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
    if (size >= 0) inventory.push({ name: "Crossbow, Light", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Shortbow", price: "25" + GP });
    if (size >= 1) inventory.push({ name: "Crossbow, Hand", price: "75" + GP });
    if (size >= 0) inventory.push({ name: "Crossbow, Heavy", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Longbow", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Arrows (20)", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Crossbow Bolts (20)", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Case, Crossbow Bolt", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Quiver", price: "1" + GP });

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
    if (size >= 0) inventory.push({ name: "Alms Box", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Bell", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Blanket", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Book, Scripture", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Candle", price: "1" + CP });
    if (size >= 1) inventory.push({ name: "Case, Map or Scroll", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Censer", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Chalk (1 piece)", price: "1" + CP });
    if (size >= 0) inventory.push({ name: "Flask", price: "2" + CP });
    if (size >= 1) inventory.push({ name: "Healer's Kit", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Amulet", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Emblem", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Reliquary", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Holy Water (flask)", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Incense (1 block)", price: "1" + CP });
    if (size >= 1) inventory.push({ name: "Ink (1 ounce bottle)", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Ink Pen", price: "2" + CP });
    if (size >= 0) inventory.push({ name: "Lamp", price: "5" + SP });
    if (size >= 2) inventory.push({ name: "Lantern, Hooded", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Oil (flask)", price: "1" + SP });
    if (size >= 2) inventory.push({ name: "Paper (one sheet)", price: "2" + SP });
    if (size >= 2) inventory.push({ name: "Parchment (one sheet)", price: "1" + SP });
    if (size >= 2) inventory.push({ name: "Perfume (vial)", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Potion of Healing", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Rations (1 day)", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Torch", price: "1" + CP });
    if (size >= 0) inventory.push({ name: "Vial", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Waterskin", price: "2" + SP });
    if (size >= 1) inventory.push({ name: "Calligrapher's Supplies", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Herbalism Kit", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Flute", price: "2" + GP });
    if (size >= 2) inventory.push({ name: "Lyre", price: "30" + GP });
    if (size >= 2) inventory.push({ name: "Horn", price: "3" + GP });
    if (size >= 0) services.push({ name: "Cure Wounds (lvl 1)", price: "10" + GP });
    if (size >= 0) services.push({ name: "Gentle Repose (lvl 2)", price: "50" + GP });
    if (size >= 0) services.push({ name: "Lesser Restoration (lvl 2)", price: "50" + GP });
    if (size >= 0) services.push({ name: "Remove Curse (lvl 3)", price: "100" + GP });
    if (size >= 0) services.push({ name: "Revivify (lvl 3)", price: "400" + GP });
    if (size >= 0) services.push({ name: "Raise Dead (lvl 5)", price: "1000" + GP });

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
    if (size >= 0) inventory.push({ name: "Leather", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Studded Leather", price: "45" + GP });
    if (size >= 0) inventory.push({ name: "Hide", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Shield", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Sling", price: "1" + SP });
    if (size >= 0) inventory.push({ name: "Waterskin", price: "2" + SP });
    if (size >= 0) inventory.push({ name: "Cobbler's Tools", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Leatherworker's Tools", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Bagpipes", price: "30" + GP });
    if (size >= 1) inventory.push({ name: "Drum", price: "6" + GP });

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
}

/**
 * Generates a general store of the provided size
 * @param {String} size 
 */
function generateGeneral(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 1) inventory.push({ name: "Abacus", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Barrel", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Blanket", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Bottle, glass", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Bucket", price: "5" + CP });
    if (size >= 0) inventory.push({ name: "Candle", price: "1" + CP });
    if (size >= 1) inventory.push({ name: "Chest", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Clothes, Common", price: "5" + SP });
    if (size >= 2) inventory.push({ name: "Clothes, Fine", price: "15" + GP });
    if (size >= 0) inventory.push({ name: "Flask or Tankard", price: "2" + CP });
    if (size >= 0) inventory.push({ name: "Hammer", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Ink (1 ounce bottle)", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Ink Pen", price: "2" + CP });
    if (size >= 0) inventory.push({ name: "Jug or Pitcher", price: "2" + CP });
    if (size >= 0) inventory.push({ name: "Ladder (10-foot)", price: "1" + SP });
    if (size >= 1) inventory.push({ name: "Lantern, Hooded", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Lock", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Mess Kit", price: "2" + SP });
    if (size >= 0) inventory.push({ name: "Mirror, Steel", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Paper (one sheet)", price: "2" + SP });
    if (size >= 0) inventory.push({ name: "Parchment (one sheet)", price: "1" + SP });
    if (size >= 0) inventory.push({ name: "Pick, Miner's", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Pot, Iron", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Pouch", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Rope, Hempen (50 feet)", price: "1" + GP });
    if (size >= 2) inventory.push({ name: "Rope, Silk (50 feet)", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Sack", price: "1" + CP });
    if (size >= 1) inventory.push({ name: "Scale, Merchant's", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Shovel", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Signet Ring", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Soap", price: "2" + CP });
    if (size >= 1) inventory.push({ name: "Vial", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Carpenter's Tools", price: "15" + GP });
    if (size >= 0) inventory.push({ name: "Cobbler's Tools", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Cook's Utensils", price: "50" + GP });
    if (size >= 2) inventory.push({ name: "Glassblower's Tools", price: "30" + GP });
    if (size >= 1) inventory.push({ name: "Leatherworker's Tools", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Mason's Tools", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Potter's Tools", price: "10" + GP });
    if (size >= 2) inventory.push({ name: "Smith's Tools", price: "20" + GP });
    if (size >= 0) inventory.push({ name: "Weaver's Tools", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Woodcarver's Tools", price: "1" + GP });

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
}

/**
 * Generates an adventuring shop of the provided size
 * @param {String} size 
 */
function generateAdventuring(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 1) inventory.push({ name: "Padded", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Leather", price: "10" + GP });
    if (size >= 2) inventory.push({ name: "Studded Leather", price: "45" + GP });
    if (size >= 0) inventory.push({ name: "Hide", price: "10" + GP });
    if (size >= 2) inventory.push({ name: "Club", price: "1" + SP });
    if (size >= 0) inventory.push({ name: "Dagger", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Greatclub", price: "2" + SP });
    if (size >= 0) inventory.push({ name: "Handaxe", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Light Hammer", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Quarterstaff", price: "2" + SP });
    if (size >= 1) inventory.push({ name: "Crossbow, Light", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Dart", price: "5" + CP });
    if (size >= 0) inventory.push({ name: "Shortbow", price: "25" + GP });
    if (size >= 1) inventory.push({ name: "Sling", price: "1" + SP });
    if (size >= 0) inventory.push({ name: "Whip", price: "2" + GP });
    if (size >= 2) inventory.push({ name: "Blowgun", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Crossbow, hand", price: "75" + GP });
    if (size >= 2) inventory.push({ name: "Crossbow, heavy", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Longbow", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Arrows (20)", price: "1" + GP });
    if (size >= 2) inventory.push({ name: "Blowgun Needles (50)", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Crossbow Bolts (20)", price: "1" + GP });
    if (size >= 1) inventory.push({ name: "Sling Bullets (20)", price: "4" + CP });
    if (size >= 0) inventory.push({ name: "Backpack", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Bedroll", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Blanket", price: "5" + SP });
    if (size >= 1) inventory.push({ name: "Block and Tackle", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Bottle, glass", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Candle", price: "1" + CP });
    if (size >= 1) inventory.push({ name: "Case, Crossbow Bolt", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Case, Map or Scroll", price: "1" + GP });
    if (size >= 1) inventory.push({ name: "Chain (10 feet)", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Chest", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Climber's Kit", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Clothes, Traveler's", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Crowbar", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Flask or Tankard", price: "2" + CP });
    if (size >= 0) inventory.push({ name: "Grappling Hook", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Hammer", price: "1" + GP });
    if (size >= 2) inventory.push({ name: "Healer's Kit", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Hourglass", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Hunting Trap", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Ink (1 ounce bottle)", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Ink Pen", price: "2" + CP });
    if (size >= 0) inventory.push({ name: "Jug or Pitcher", price: "2" + CP });
    if (size >= 1) inventory.push({ name: "Ladder (10-foot)", price: "1" + SP });
    if (size >= 1) inventory.push({ name: "Lantern, Bullseye", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Lantern, Hooded", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Lock", price: "10" + GP });
    if (size >= 1) inventory.push({ name: "Mess Kit", price: "2" + SP });
    if (size >= 1) inventory.push({ name: "Mirror, Steel", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Paper (one sheet)", price: "2" + SP });
    if (size >= 1) inventory.push({ name: "Parchment (one sheet)", price: "1" + SP });
    if (size >= 0) inventory.push({ name: "Pick, Miner's", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Piton", price: "5" + CP });
    if (size >= 0) inventory.push({ name: "Pole (10-foot)", price: "5" + CP });
    if (size >= 0) inventory.push({ name: "Pot, Iron", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Pouch", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Quiver", price: "1" + GP });
    if (size >= 1) inventory.push({ name: "Rations (1 day)", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Rope, Hempen (50 feet)", price: "1" + GP });
    if (size >= 2) inventory.push({ name: "Rope, Silk (50 feet)", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Sack", price: "1" + CP });
    if (size >= 0) inventory.push({ name: "Shovel", price: "2" + GP });
    if (size >= 1) inventory.push({ name: "Signal Whistle", price: "5" + CP });
    if (size >= 2) inventory.push({ name: "Signet Ring", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Spyglass", price: "1000" + GP });
    if (size >= 0) inventory.push({ name: "Tent, Two-person", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Tinderbox", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Torch", price: "1" + CP });
    if (size >= 0) inventory.push({ name: "Vial", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Waterskin", price: "2" + SP });
    if (size >= 1) inventory.push({ name: "Cartographer's Tools", price: "15" + GP });
    if (size >= 2) inventory.push({ name: "Jeweler's Tools", price: "25" + GP });
    if (size >= 1) inventory.push({ name: "Tinker's Tools", price: "50" + GP });
    if (size >= 1) inventory.push({ name: "Herbalism Kit", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Navigator's Tools", price: "25" + GP });

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
}

/**
 * Generates a jeweler's shop of the provided size
 * @param {String} size 
 */
function generateJeweler(size) {
    //The inventory we will fill
    let inventory = [];
    let services = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 0) inventory.push({ name: "Amulet/Necklace, Exquisite", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Amulet/Necklace, Mundane", price: "5" + SP });
    if (size >= 1) inventory.push({ name: "Crystal", price: "10" + GP });
    if (size >= 2) inventory.push({ name: "Orb", price: "20" + GP });
    if (size >= 0) inventory.push({ name: "Earrings, Exquisite", price: "4" + GP });
    if (size >= 0) inventory.push({ name: "Earrings, Mundane", price: "4" + SP });
    if (size >= 0) inventory.push({ name: "Ring, Exquisite", price: "3" + GP });
    if (size >= 0) inventory.push({ name: "Ring, Mundane", price: "3" + SP });
    if (size >= 0) inventory.push({ name: "Signet Ring", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Jeweler's Tools", price: "25" + GP });
    if (size >= 0) services.push({ name: "Gemstone Appraisal (3 gems)", price: "5" + GP });
    if (size >= 0) services.push({ name: "Resizing Jewelry", price: "10" + GP });
    if (size >= 0) services.push({ name: "Set Gem (<100 gp value)", price: "45" + GP });
    if (size >= 0) services.push({ name: "Set Gem (100-1K gp value)", price: "75" + GP });
    if (size >= 0) services.push({ name: "Set Gem (1K+ gp value)", price: "150" + GP });


    //Return the filled inventory
    let iOut = table(inventory, ["name", "price"]);
    let sOut = table(services, ["name", "price"]);
    return header("Inventory: ") + iOut + header("Services: ") + sOut;
}

/**
 * Generates a tailor or textiles shop of the3 provided size
 * @param {String} size 
 */
function generateTailor(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 0) inventory.push({ name: "Backpack", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Basket", price: "4" + SP });
    if (size >= 0) inventory.push({ name: "Bedroll", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Blanket", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Clothes, Common", price: "5" + SP });
    if (size >= 2) inventory.push({ name: "Clothes, Costume", price: "5" + GP });
    if (size >= 1) inventory.push({ name: "Clothes, Fine", price: "15" + GP });
    if (size >= 0) inventory.push({ name: "Clothes, Traveler's", price: "2" + GP });
    if (size >= 2) inventory.push({ name: "Component Pouch", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Pouch", price: "5" + SP });
    if (size >= 0) inventory.push({ name: "Robes", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Sack", price: "1" + CP });
    if (size >= 1) inventory.push({ name: "Tent, Two-person", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Weaver's Tools", price: "1" + GP });

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
}

/**
 * Generate a potions or alchemist shop of the provided size
 * @param {String} size 
 */
function generatePotion(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if (size >= 0) inventory.push({ name: "Acid (vial)", price: "25" + GP });
    if (size >= 1) inventory.push({ name: "Alchemist's Fire (flask)", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Antitoxin (vial)", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Bottle, glass", price: "2" + GP });
    if (size >= 0) inventory.push({ name: "Component Pouch", price: "25" + GP });
    if (size >= 0) inventory.push({ name: "Flask", price: "2" + CP });
    if (size >= 1) inventory.push({ name: "Healer's Kit", price: "5" + GP });
    if (size >= 2) inventory.push({ name: "Ink (1 ounce bottle)", price: "10" + GP });
    if (size >= 0) inventory.push({ name: "Jug", price: "2" + CP });
    if (size >= 0) inventory.push({ name: "Oil (flask)", price: "1" + SP });
    if (size >= 2) inventory.push({ name: "Perfume (vial)", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Poison, Basic (vial)", price: "100" + GP });
    if (size >= 0) inventory.push({ name: "Potion of Healing", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Vial", price: "1" + GP });
    if (size >= 1) inventory.push({ name: "Alchemist's Supplies", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Brewer's Supplies", price: "20" + GP });
    if (size >= 1) inventory.push({ name: "Cook's Utensils", price: "1" + GP });
    if (size >= 0) inventory.push({ name: "Herbalism Kit", price: "5" + GP });
    if (size >= 0) inventory.push({ name: "Poisoner's Kit", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Common potion", price: "50" + GP });
    if (size >= 0) inventory.push({ name: "Uncommon potion", price: "250" + GP });
    if (size >= 1) inventory.push({ name: "Rare potion", price: "2500" + GP });

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
}

/**
 * Generate an arcane, magic or wizard shop of the provided size
 * @param {String} size 
 */
function generateArcane(size) {
    //The inventory we will fill
    let inventory = [];
    //Now parse the size into a number
    size = parseSize(size);
    //Next go through the list of items and add to inventory where appropriate
    if(size >= 0) inventory.push({name: "Quarterstaff", price:"2" + SP});
    if(size >= 1) inventory.push({name: "Abacus", price:"2" + GP});
    if(size >= 0) inventory.push({name: "Crystal", price:"10" + GP});
    if(size >= 1) inventory.push({name: "Orb", price:"20" + GP});
    if(size >= 0) inventory.push({name: "Rod", price:"10" + GP});
    if(size >= 0) inventory.push({name: "Staff", price:"5" + GP});
    if(size >= 0) inventory.push({name: "Wand", price:"10" + GP});
    if(size >= 0) inventory.push({name: "Bottle, glass", price:"2" + GP});
    if(size >= 0) inventory.push({name: "Candle", price:"1" + CP});
    if(size >= 0) inventory.push({name: "Case, Map or Scroll", price:"1" + GP});
    if(size >= 0) inventory.push({name: "Component Pouch", price:"25" + GP});
    if(size >= 0) inventory.push({name: "Sprig of Mistletoe", price:"1" + GP});
    if(size >= 1) inventory.push({name: "Totem", price:"1" + GP});
    if(size >= 0) inventory.push({name: "Wooden Staff", price:"5" + GP});
    if(size >= 0) inventory.push({name: "Yew Wand", price:"10" + GP});
    if(size >= 2) inventory.push({name: "Hourglass", price:"25" + GP});
    if(size >= 0) inventory.push({name: "Ink (1 ounce bottle)", price:"10" + GP});
    if(size >= 0) inventory.push({name: "Ink Pen", price:"2" + CP});
    if(size >= 1) inventory.push({name: "Paper (one sheet)", price:"2" + SP});
    if(size >= 0) inventory.push({name: "Parchment (one sheet)", price:"1" + SP});
    if(size >= 0) inventory.push({name: "Pouch", price:"5" + SP});
    if(size >= 1) inventory.push({name: "Robes", price:"1" + GP});
    if(size >= 0) inventory.push({name: "Spellbook", price:"50" + GP});
    if(size >= 0) inventory.push({name: "Vial", price:"1" + GP});
    if(size >= 0) inventory.push({name: "Alchemist's Supplies", price:"50" + GP});
    if(size >= 1) inventory.push({name: "Calligrapher's Supplies", price:"10" + GP});
    if(size >= 1) inventory.push({name: "Lute", price:"35" + GP});
    if(size >= 2) inventory.push({name: "Lyre", price:"30" + GP});
    if(size >= 0) inventory.push({name: "Common Scroll (Cantrip)", price:"50" + GP});
    if(size >= 0) inventory.push({name: "Common Scroll (Level 1)", price:"100" + GP});
    if(size >= 1) inventory.push({name: "Uncommon Scroll (Level 2)", price:"250" + GP});
    if(size >= 1) inventory.push({name: "Uncommon Scroll (Level 3)", price:"500" + GP});
    if(size >= 2) inventory.push({name: "Rare Scroll (Level 4)", price:"2500" + GP});
    if(size >= 2) inventory.push({name: "Rare Scroll (Level 5)", price:"5000" + GP});

    //Return the filled inventory
    return header("Inventory: ") + table(inventory, ["name", "price"]);
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