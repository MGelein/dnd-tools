const chalk = require('chalk');
/**
 * This module provides a simple function to print a table
 */
/**
 * Expands the given string until it is the length of the provided 
 * length number. By default it adds spaces
 * @param {String} string 
 * @param {Number} length 
 * @param {String} expandor
 */
exports.expand = function(string, length, expandor){
    if(!expandor) expandor = " ";
    while(string.length <= length){
        string += expandor;
    }
    return string;
}

//If we have multiple rows on one line, please add them together
const ROWS_ON_LINE = 3;

 /**
  * Prints a provided array with a provided header
  * @param {Array} values array of objects that have the fields of the header
  * @param {Array} header the fields the object are supposed to have
  * @param {Boolean} printHeader if the header should be printed above the table
  * @param {Boolean} addBorder if a border, made of equals signs should be added above and below
  */
 exports.table = function(values, header, printHeader, addBorder){
    //Set printHeader to false explicitly by default
    if(!printHeader) printHeader = false;
    //Check if we have a header and values
    if(!header || !values) console.error("You must provide both a header and values");

    //Initialize the maxLengths
    var maxLengths = {};
    header.forEach(function(headerVal){
        maxLengths[headerVal] = 0;
    });

    //Go through all the values and get the max length
    values.forEach(function(value){
        //Check for all the header values
        header.forEach(function(headerVal){
            //Check to see if the current field exists, if not initialize to empty string
            if(!value[headerVal]) value[headerVal] = "";
            //Else check if it is the new longest string for this cell, if so overwrite
            if(value[headerVal].length > maxLengths[headerVal]) {
                maxLengths[headerVal] = value[headerVal].length;
            }
        }); 
    });

    //Now we have the value that the longest of the strings are in each column. Expand all strings to fit
    var rows = [];
    values.forEach(function(value){
        var cells = [];
        //Print a single line
        header.forEach(function(headerVal){
            cells.push(exports.expand(value[headerVal], maxLengths[headerVal]));
        });
        rows.push(cells.join("\t"));
    });

    //Next we condense all rows if we want to show multiple next to eachother
    let output = [];
    for(let i = 0; i < rows.length; i+= ROWS_ON_LINE){
        let sum = [];
        for(let j = 0; j < ROWS_ON_LINE; j++){
            sum.push(rows[i + j]);
        }
        //Now add the new row
        output.push(sum.join(" | "));
    }
    let above = chalk.gray("=".repeat(output[0].length) + "\n");
    if(!addBorder) above = "";
    //Print the output
    return above + output.join("\n") + "\n" + above;
 }

 /**
  * Returns a header formatted string
  * @param {String} string
  */
 exports.header = function(string){
    let divider = chalk.gray(exports.expand("=", string.length + 3, "="));
    return divider + chalk.gray("\n| ") + chalk.bold(string) + chalk.gray(" |\n") + divider + "\n";
 }