/**
 * Module provides simple dicefunctions and some shorthands
 */
/**Random module */
const {rnd, random} = require('./random');

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
 * Evaluates the provided string as a dice expression
 * and returns the result
 * @param {String} string the string to decode
 * @param {Boolean} verbal if we should return a pretty printout
 */
exports.fromString = exports.decode = exports.roll = function(string, verbal){
    //Assume we don't have to output any logging
    if(!verbal) verbal = false;
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
    //Printout what we think we have to do
    if(verbal) console.log("Rolling a " + size + " dice " + amount + " times...");
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
    if(verbal) console.log("Result: " + result);

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