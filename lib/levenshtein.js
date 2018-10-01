/**
 * Computes the edit distance between two strings
 * @param {String} sA string A
 * @param {String} sB string B
 */
exports.levenshtein = function (sA, sB) {
    //instantiate vars and cache length
    let aMax = sA.length;
    let bMax = sB.length;
    let matrix = [];

    //increment the first cell of each row and each column
    for (let i = 0; i <= bMax; i++) { matrix[i] = [i]; }
    for (let j = 0; j <= aMax; j++) { matrix[0][j] = j; }

    //calculate the rest of the matrix
    for (let i = 1; i <= bMax; i++) {
        for (let j = 1; j <= aMax; j++) {
            if (sA.charAt(i - 1) == sB.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    //0 for no likeness. 1 for complete likeness
    return (matrix[bMax][aMax]);
}