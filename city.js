/**Store all command line parameters in a separate object */
const args = process.argv.splice(2);

/**
 * Returns a random option from an array
 * @param {Array} array 
 */
function rnd(array) {
    return array[Math.floor((Math.random() * array.length))];
}

/**
 * Random number between minimum and maxmimum
 * @param {Number} min 
 * @param {Number} max 
 */
function random(min, max) {
    //Get the age-range
    var range = Math.max(0, max - min);
    //Only return whole years
    return Math.floor(Math.random() * range + min);
}