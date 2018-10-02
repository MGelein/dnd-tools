/**Import the random functionality */
const {rnd} = require('./random');

/**
 * All the tables that we roll on
 */
const geography = ["A coastal harbor.", "A calm, coastal bay.", "A large freshwater lake.", "A wide, navigable river.", "A river navigable by small craft.", "The mouth of a river or a river delta.", "The confluence of two rivers.", "A series of natural springs.", "A well-traveled crossroads.", "A water source and a well-traveled road."];
const resources = ["Iron ore.", "Copper ore.", "Gold or silver deposits.", "Clay or granite deposits.", "Quartz or salt deposits.", "Peat or coal deposits.", "Hardwood lumber.", "Barley and oats.", "Beans and corn.", "Nuts and olives.", "Rice or wheat.", "Potatoes and leeks.", "Sugar cane.", "Tobacco.", "Cotton.", "Fruit trees.", "Cabbages and beets.", "Cattle.", "Dairy cows.", "Sheep."];
const power = ["A ruthless assassins' guild.", "A populist demagogue.", "The captain of a mercenary company.", "A champion knight or arena fighter.", "One or more crafting guilds.", "A dangerous crime boss.", "One or more criminal gangs.", "A charismatic cult leader.", "One or more merchant guilds.", "A scheming noble lord or lady.", "An outspoken philosopher or scholar.", "A celebrated poet and playwright.", "A popular priest or priestess.", "A secret society of lorekeepers.", "Smugglers and black market dealers.", "The son or daughter of a deposed ruler.", "A wealthy trader of exotic goods.", "A conniving vampire or fiend.", "A bold war hero.", "A clever witch or wizard."];
const culture = ["Architectural style.", "Architectural feats.", "Artists and poets.", "Inventive cuisine.", "Traditional cuisine.", "Suggestive dancing.", "Gladiatorial games.", "Horse races.", "Scholars and sages.", "Music and/or dance.", "Romance.", "Jousting games.", "Superior soldiers.", "Street festivals.", "Religious feasts.", "Religious fervor.", "Traditional dress.", "Unusual dress.", "Theater scene.", "Wine and/or ale."];
const government = ["The head of a noble family.", "A council of distinguished nobles.", "A council of wealthy merchants.", "A council of elected officials.", "An elected mayor.", "A benevolent sovereign.", "A wicked tyrant.", "A brutal warlord.", "A cabal of witches and wizards.", "The leaders of a religious order."];
const history = ["Mass conversions.", "An earthquake.", "An age of exploration.", "A terrible famine.", "A disastrous flood.", "A legendary storm.", "An assassination.", "A series of riots.", "A great discovery.", "A vermin infestation.", "A destructive fire.", "A deadly plague.", "A bloody rebellion.", "A lengthy siege.", "Religious wars.", "Territorial wars.", "A foreign occupation.", "An economic boom.", "A great depression.", "A dragon attack."];
const threats = ["Bandits and outlaws.", "Barbarian invasions.", "Disease outbreaks.", "A dragon or legendary beast.", "Destructive flooding.", "Food shortages.", "Occupation by a foreign empire.", "The wrath of a vengeful god.", "Magic and new inventions.", "Pirates, smugglers, and bands of thieves.", "A recently established religion.", "A rival city."];
const defense = ["A disciplined military guard.", "A standing army of devoted soldiers.", "A company of sellswords and knaves.", "An order of holy knights.", "Little: the city’s been sacked many times.", "A huge, fortress or citadel within the city.", "A series of watchtowers and forts spread throughout the region.", "Thick stone walls and impenetrable gates.", "High stone walls, catapults, and scorpions.", "A powerful magical ward or gigantic golem."];
const law = ["Enforced by a strict, orderly city watch.", "Enforced by a corrupt, roguish city watch.", "Not enforced among the wealthy elite.", "Enforced in a haphazard fashion, incomprehensible to visitors.", "Not enforced for those who pay bribes.", "More like guidelines.", "Enforced by a secret society of assassins, mages, or priests.", "Enforced by a company of mercenaries.", "Simple, easy to learn and to follow.", "Extensive and complicated, nonsensical.", "Enforced by a cheerful drunken sheriff.", "Enforced by a rigid soldier-turned-sheriff."];

/**
 * Returns a geographical origin of the city
 */
function getOrigin() {
    return "[Origin]: " + rnd(geography) + "\n";
}

/**
 * Returns a resource that is abundantly grown/grazed/mined
 */
function getResource() {
    return "[Resource]: " + rnd(resources) + "\n";
}

/**
 * Returns a distinct cultural property of this city
 */
function getCulture() {
    return "[Culture]: " + rnd(culture) + "\n";
}

/**
 * Returns who holds the power in this city
 */
function getRulers() {
    return "[Rulers]: " + rnd(government) + "\n";
}

/**
 * Returns a significant historical event for this city
 */
function getHistory() {
    return "[History]: " + rnd(history) + "\n";
}

/**
 * Returns who threatens the city (may differ on different levels)
 */
function getThreats() {
    return "[Threats]: " + rnd(threats) + "\n";
}

/**
 * What defenses does the city have?
 */
function getDefense() {
    return "[Defense]: " + rnd(defense) + "\n";
}

/**
 * Rturns who handles the law enforcement
 */
function getLaws() {
    return "[Laws]: " + rnd(law) + "\n";
}

/**
 * Returns who, besides the governement, holds power.
 */
function getPower() {
    return "[Power]: " + rnd(power) + "\n";
}

/**
 * Returns a random city, takes no argument. This is a good starting point for lore,
 * next use SPERM to make a better view of the city, and maybe generate a few shops.
 */
exports.city = function(){
    //Generate all the parts
    let result = getOrigin();
    result += getResource();
    result += getCulture();
    result += getRulers();
    result += getHistory();
    result += getThreats();
    result += getDefense();
    result += getLaws();
    result += getPower();
    //Return the result
    return result;
}