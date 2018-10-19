/**Import the treasure module */
const {treasure} = require('./lib/treasures');

/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);

/**Forward the call to the module */
console.log(treasure(args.join(" ")));