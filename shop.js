//Import shop module
const {shop} = require('./lib/shops');

/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);

//Pass forward the command and log the output
console.log(shop(args.join(" ")));
