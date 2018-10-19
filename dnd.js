/**
 * One script to load them all, one script to use them.
 * One script to use them all and in one app bind them.
 */

/**Import the book generator */
const {book} = require('./lib/books');
/**Import the city generator */
const {city} = require('./lib/cities');
/**Import events module */
const {event} = require("./lib/events");
/**Import NPC module */
const {npc} = require('./lib/npcs');
/**Import the prices table */
const {price} = require('./lib/prices');
/**Import roll functionality from the dice library */
const {roll} = require('./lib/dice');
/**Import the module that holds the rumours */
const {rumour} = require('./lib/rumours');
/**Import shop module */
const {shop} = require('./lib/shops');
/**Import treasure module */
const {treasure} = require('./lib/treasures');
/**Import cr calculation module */
const {cr} = require('./lib/cr');

/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);
//Remove the first argument, since that only determine module
const forwardArgs = args.splice(1).join(" ");

/**See to what module we have to forward the call*/
const moduleName = (args.length > 0) ? args[0].trim().toLowerCase() : "help";

/**Forward the arguments to the right module */
if(moduleName === 'npc') console.log(npc(forwardArgs));
else if(moduleName === 'book') console.log(book(forwardArgs));
else if(moduleName === 'city') console.log(city());
else if(moduleName === 'event') console.log(event());
else if(moduleName === 'price') price(forwardArgs, true);
else if(moduleName === 'roll') roll(forwardArgs, true);//Don't console log the returned number result
else if(moduleName === 'rumour') console.log(rumour());
else if(moduleName === 'shop') console.log(shop(forwardArgs));
else if(moduleName === 'treasure') console.log(treasure(forwardArgs));
else if(moduleName === 'cr') cr();//Don't log the returned value
//Else check if we need to display the help option
else if(moduleName === 'help') console.log(displayHelp());
else if(moduleName === '?') console.log(displayHelp());
//Unrecognized module
else {
let s = `Unrecognized module name: ${moduleName}. 
Try 'help' for an overview of all options
`;
console.log(s);
}

/**
 * Returns the help options
 */
function displayHelp(){
let s =  
`----------
DND Tools
----------
Welcome to my DND tool suite. In this suite you will find a list of possibly useful tools 
that all should help you generate random results from the command line. We have the following
tools:

npc         generates random npcs, complete with names, flaws, and ideals.
book        generates books, titles and contents.
city        generates a city description. No contents, just a bit of lore to get started.
event       generates a random event to happen during a long rest.
price       used to look up the price of an item. f.e. 'price dagger'
roll        used to do dice rolls using text notation. f.e. 3d6+3 or 1d4x100
rumour      generates a random rumour or hearsay.
shop        generates a random shop, size, location and inventory.
treasure    generates random treasure hoards as well as individual treasure.
cr          calculates the Challenge Rating of an enemy based on a questionairre.
help/?      shows this command

Use 'help' after a module name to see the help for that module.
`
return s;
}