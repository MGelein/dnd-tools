/**Import roll functionality from the dice library */
const {roll} = require('./lib/dice');

/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);
if(args.length < 1) {
	showHelp();
	return;
}

//Join the input and assess what it means
roll(args.join(""), true);

/**
Shows the help menu to the user
**/
function showHelp(){
	console.log("A very small utility to help you with dice rolls.");
	console.log("Syntax: DICE_NUMBER + 'd' + DICE_SIDES + '[+/-]' + MODIFIER");
	console.log("Examples: 3d8+2	d20-1	2d100+20	6d4+3");
	console.log("----");
	console.log("Note: The modifier is optional, as is the number of dice. When you don't specify the no. of dice");
	console.log("		It is presumed you want to roll 1 dice only. No modifier specified means without a modifier");
	console.log("Advantage/Disadvantage: Both can be handled manually by repeating the command multiple times and taking");
	console.log("		the higher/lower value of the two");
	console.log("----");
	console.log("Author: Mees Gelein");
	return;
}