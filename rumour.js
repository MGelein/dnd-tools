/**Import the module that does the actual work */
const {rumour} = require('./lib/rumours');

/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);

//Finally do the simple function call to the module.
console.log(rumour(args.join(" ")));