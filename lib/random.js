/**
 * This module contains the code for the random functions
 */

/**
 * Returns a random option from an array
 * @param {Array} array 
 */
exports.rnd = function(array) {
    return array[Math.floor((Math.random() * array.length))];
}

/**
 * Random number between minimum and maxmimum
 * @param {Number} min  inclusive
 * @param {Number} max  exclusive
 */
exports.random = function(min, max) {
    //Get the age-range
    var range = Math.max(0, max - min);
    //Only return whole years
    return Math.floor(Math.random() * range + min);
}
