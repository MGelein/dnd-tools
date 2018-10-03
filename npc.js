const {npc} = require('./lib/npcs');

/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);

//Log the result from the npc creation call
console.log(npc(args.join(" ")));