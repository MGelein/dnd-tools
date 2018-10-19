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


/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);
//Remove the first argument, since that only determine module
const forwardArgs = args.splice(1).join(" ");

/**See to what module we have to forward the call*/
const moduleName = args[0].trim().toLowerCase();

/**Forward the arguments to the right module */
if(moduleName === 'npc') console.log(npc(forwardArgs));
else if(moduleName === 'book') console.log(book(forwardArgs));
else if(moduleName === 'city') console.log(city());
else if(moduleName === 'event') console.log(event());
else if(moduleName === 'price') console.log(price(forwardArgs, true));
else if(moduleName === 'roll') console.log(roll(forwardArgs, true));
else if(moduleName === 'rumour') console.log(rumour());
else if(moduleName === 'shop') console.log(shop(forwardArgs));
else if(moduleName === 'treasure') console.log(treasure(forwardArgs));