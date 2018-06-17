//first remove the first two arguments as they are useless
var arguments = process.argv.splice(2);
if(arguments.length == 0){
	showHelp();
	return;
}
//clean the input to determine what we're rolling
arguments = arguments.join("");

//turn the 'd' into a @
arguments = arguments.replace(/[^d\+\-0-9]/g, "");
if(arguments.indexOf('d') == -1){
	console.log("No dice type found: I.e. No letter 'd' in your query");
	console.log("Aborting roll...");
	return;
}

console.log("Rolling: " + arguments);

//Determine what to do based onthe arguments
var numDice = arguments.split('d')[0];
if(numDice.length == 0) numDice = 1;
var diceParts = arguments.split('d')[1];
var modifier = 0;
var numSides = -1;
//add the modifier if it is present
if(diceParts.indexOf("+") != -1){
	modifier = diceParts.split("+")[1];
	numSides = diceParts.split("+")[0];
}else if(diceParts.indexOf("-") != -1){
	modifier -= diceParts.split("-")[1];
	numSides = diceParts.split("-")[0];
}else{
	numSides = diceParts;
}

var max = parseInt(numDice);
var rolled = "";
var sum = 0;
for(var i = 0; i < max; i++){
	var value = rollDice(numSides);
	rolled+= value + ", "
	sum += value;
}
sum += parseInt(modifier);
console.log("Dice: " + numDice + " dice with " + numSides + " sides")
console.log("Rolled numbers: " + rolled.substr(0, rolled.length - 2));
console.log("Modifier: " + modifier);
console.log("----------------------");
console.log("Result: " + sum);


/**
Rolls a die with the specified amount of sides
**/
function rollDice(sides){
	return Math.floor(Math.random() * parseInt(sides)) + 1;
}

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