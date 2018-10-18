/**We need the random module */
const {rnd} = require("./random");

/**
 * When the rumour has happened
 */
const whens = ["a year ago from tonight", "one night last month", "twice last month",
"twice last week", "one day last week", "one night last week",
"three nights ago", "the day before yesterday", "the night before last",
"yesterday morning", "yesterday afternoon", "just before sunset",
"after sunset", "after nightfall", "before midnight",
"past midnight", "in the wee hours", "just before dawn",
"at daybreak", "earlier today"];

/**
 * Who is involved in the rumour
 */
const whos = ["the king/queen", "a farmer", "a merchant", "a wizard", "a soldier", "a cleric",
"a druid", "an orphan", "a sailor", "a thief", "a miner", "a lord",
"a knight", "the mayor", "an innkeeper", "a dwarf", "an elf", "a singer", "a pirate", "a witch"];

/**
 * Was seen with
 */
const withs = ["a prostitute", "a drunk", "an artefact", "a talking sword", "a Drow", "an escaped convict",
"a vial of poison", "a book of spells", "a talking animal", "a sack of coins", "the prince/princess", "a fortune teller",
"an alchemist", "an assassin", "a barmaid", "a beggar", "a saddled horse", "a hunting hound",
"a mule and cart", "a fake mustache"];

/**
 * Where this happened
 */
const wheres = ["the docks", "the palace", "the crafts guild", "the mages guild", "the brothel", "the merchant quarter",
"the tavern", "the prison", "the museum", "the asylum", "the library", "the barracks",
"the gatehouse", "the bridge", "the temple", "the market square", "the warehouse district", "the garden district",
"the lighthouse", "the riverfront"];

/**
 * What was nearby
 */
const nearbys = ["a dead commoner", "a dead monster", "an explosion", "a bloody weapon", "a planar gate", "a demon",
"a vampire", "an angry mob", "a dead noble", "an arcane sigil", "a frightened crowd", "an angel",
"a devil", "a series of claw marks", "a series of scorch marks", "an empty vial", "a burned book", "a werewolf",
"a ghost", "a horde of zombies"];

/**
 * Source of the rumour
 */
const froms = ["a shopkeeper", "a basketweaver", "a grocer", "a peddler", "a beggar", "an urchin",
"a barkeep", "a serving girl", "a squire", "a musician", "a madame", "a watchman",
"a ship's captain", "a peasant woman", "a fisherman's wife",
"a monk", "a sellsword", "a gambler", "some guy in a pub", "a little bird"];

/**
 * How likely it is to be true
 */
const truths = ["might be true", "must be true", "has to be true", "can't be true", "could be true", "is definitely true",
"may be true", "is likely true", "is possibly true", "is certainly true", "is absolutely true", "is probably true",
"is likely partially true", "is definitely not true", "can't be entirely false",
"isn't likely false", "isn't likely entirely false", "might not be true",
"isn't likely the whole story", "is probably just idle gossip"];

/**
 * Generating a random rumour. The argumentString may not be used?
 * @param {String} argumentString the string of arguments joined by spaces
 */
exports.rumour = function(argumentString){
    let result = `I heard that, ${rnd(whens)}, ${rnd(whos)} was seen with ${rnd(withs)}\n`;
    result += `down near ${rnd(wheres)} and nearby there was ${rnd(nearbys)}.\n`;
    result += `I heard it from ${rnd(froms)}, so it ${rnd(truths)}.`;
    return result;
}