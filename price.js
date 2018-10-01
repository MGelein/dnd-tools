/**Import the prices table */
const {price} = require('./lib/prices');

/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);

//Join all pieces of args together
price(args.join(" "), true);