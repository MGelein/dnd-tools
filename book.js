/**Import the book generator */
const {book} = require('./lib/books');

//Join all pieces of args together
console.log(book(process.argv.splice(2).join(" ")));