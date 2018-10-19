/**Import chalk color library */
const chalk = require('chalk');

const gold = chalk.rgb(255, 215, 0);
const silver = chalk.rgb(192, 192, 192);
const platinum = chalk.rgb(225, 225, 225);
const electrum = chalk.rgb(160, 170, 190);
const copper = chalk.rgb(184, 115, 51);

//Currency const
const GP = gold("Gp");
const PP = platinum("Pp");
const SP = silver("Sp");
const EP = electrum("Ep");
const CP = copper("Cp");
//Also export these currencies
exports.GP = GP;
exports.PP = PP;
exports.SP = SP;
exports.EP = EP;
exports.CP = CP;