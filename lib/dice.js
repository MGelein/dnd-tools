/**
 * Module provides simple dicefunctions and some shorthands
 */
/**Random module */
const {random} = require('./random');
const chalk = require('chalk');

/**
 * Rolls dice of size amt times. Returns the sum of all rows
 * @param {Number} size the amount of faces on the dice
 * @param {Number} amt the amoutn of times it needs to be rolled
 * @returns the sum of all the rolls
 */
function roll(size, amt){
    //Assume 1 by default
    if(!amt) amt = 1;
    //Make the sum holder
    let sum = 0;
    //Keep on rolling untill we rolled all
    while(amt > 0){
        sum += random(1, size + 1);
        amt --;
    }
    return sum;
}

/**
 * Rolls dice of size amt times. Returns array with all the results
 * @param {Number} size the amount of faces on the dice
 * @param {Number} amt the amtoun of times it needs to be rolled
 */
function rollArray(size, amt){
   //Assume 1 by default
   if(!amt) amt = 1;
   //Make the sum holder
   let sum = [];
   //Keep on rolling untill we rolled all
   while(amt > 0){
       sum.push(random(1, size + 1));
       amt --;
   }
   return sum; 
}

/**
 * Calculates the average result for this dice roll
 * @param {Integer} size 
 * @param {Integer} amt 
 * @param {Integer} modifier 
 * @param {Integer} multiplier 
 */
function average(size, amt, modifier, multiplier){
    //Add 1, divide by two and round up, this is the average for this die-size
    let sizeAvg = Math.ceil((size + 1) / 2);
    return sizeAvg * amt * multiplier + modifier;
}

/**
 * Parses dice notation and returns an object 
 * that holds the dice size, amount and multiplier
 * @param {String} string 
 */
function parseNotation(string){
    //Input validation
    if(!string || string.length < 2) return undefined;
    //Clean the string;
    string = string.trim().toLowerCase()
    //Check if there is a d in there, if not return 0
    if(string.indexOf('d') == -1) return undefined;

    //Now start analysing the expression now that we're done cleaning and formatting
    let parts = string.split('d');
    let multiplier = 1;//Default mulitplier is 1
    let modifier = 0;
    //Parse the amount of dice
    let amount = parseInt(parts[0]);
    amount = isNaN(amount) ? 1 : amount;
    //Store the remainder
    let rest = parts[1];

    //Next, try to see if there is a multiplier or modifier (only one is allowed)
    if(rest.indexOf('x') > -1){//Multiplier found
        let parts = rest.split('x');
        multiplier = parseInt(parts[1]);
        multiplier = isNaN(multiplier) ? 1 : multiplier;
        //Store the dice size in the remainder
        rest = parts[0];
    }else if(rest.indexOf('+') > -1){//Modifier found
        let parts = rest.split('+');
        modifier = parseInt(parts[1]);
        modifier = isNaN(modifier) ? 0 : modifier;
        //Store the dice size in the remainder
        rest = parts[0];
    }else{//No modifier or multiplier
        //Do nothing, just continue with the calculations
    }

    //By now rest contains only the dice size (at least, that should be the case)
    let size = parseInt(rest);
    if(isNaN(size)) return undefined;
    
    //Return the dice info object
    return {
        'size' : size,
        'amount' : amount,
        'modifier' : modifier,
        'multiplier' : multiplier
    }
}

/**
 * Returns the average number from the provided dice expression
 * @param {String} string the dice notation to decode
 */
exports.average = function(string){
    //Parse the dice notation
    let parsed = parseNotation(string);
    //Return the average calculation
    return average(parsed.size, parsed.amount, parsed.modifier, parsed.multiplier);
}

/**
 * Evaluates the provided string as a dice expression
 * and returns the result
 * @param {String} string the string to decode
 * @param {Boolean} verbal if we should return a pretty printout
 */
exports.fromString = exports.decode = exports.roll = function(string, verbal){
    //Assume we don't have to output any logging
    if(!verbal) verbal = false;
    //Parse the notation and assign to local variables
    let parsed = parseNotation(string);
    let size = parsed.size;
    let amount = parsed.amount;
    let modifier = parsed.modifier;
    let multiplier = parsed.multiplier;

    //Printout what we think we have to do
    if(verbal) console.log("Rolling a " + size + " dice " + amount + " times...");
    if(verbal) console.log("Average result: " + average(size, amount, modifier, multiplier));
    if(multiplier != 1 && verbal) console.log("Multiplier: x" + multiplier);
    if(modifier != 0 && verbal) console.log("Modifier: " + ((modifier >= 0) ? "+" : "-") + modifier);
    
    //Do the roll and save the result in the array
    let results = rollArray(size, amount);
    let resultString = "Rolled numbers: " + results.join(", ");
    let sum = 0;
    results.forEach(function(result){
        sum += result;
    });
    if(verbal) console.log(resultString);
    if(verbal) console.log("-------------------");
    
    //Calculate the result
    let result = sum * multiplier + modifier;
    let color = chalk.white;
    if(result >  average(size, amount, modifier, multiplier)) color = chalk.green;
    else if(result < average(size, amount, modifier, multiplier)) color = chalk.red;
    if(verbal) console.log(color("Result: " + result));

    //Now that we have the results, calculate
    return result;
}

/**
 * SHORTHANDS
 */
/**
 * Rolls a d4 the provided amount of times
 * @param {Number} amount 
 */
exports.d4 = function(amount){ return roll(4, amount);}
/**
 * Rolls a d6 the provided amount of times
 * @param {Number} amount 
 */
exports.d6 = function(amount){ return roll(6, amount);}
/**
 * Rolls a d8 the provided amount of times
 * @param {Number} amount 
 */
exports.d8 = function(amount){ return roll(8, amount);}
/**
 * Rolls a d10 the provided amount of times
 * @param {Number} amount 
 */
exports.d10 = function(amount){ return roll(10, amount);}
/**
 * Rolls a d12 the provided amount of times
 * @param {Number} amount 
 */
exports.d12 = function(amount){ return roll(12, amount);}
/**
 * Rolls a d20 the provided amount of times
 * @param {Number} amount 
 */
exports.d20 = function(amount){ return roll(20, amount);}
/**
 * Rolls a d100 the provided amount of times
 * @param {Number} amount 
 */
exports.d100 = function(amount){ return roll(100, amount);}