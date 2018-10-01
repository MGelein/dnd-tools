/**
 * Contains all the art tables from the DMG
 */
/**Random module */
const {rnd, random} = require('./random');

/**
 * ART
 */
const art25 = ["Silver ewer", "Carved bone statuette", "Small gold bracelet", "Cloth-of-gold vestments", "Black velvet mask stitched with silver thread", "Copper chalice with silver filligree", "Pair of engraved bone dice", "Small mirror set in a painted wooden frame", "Embroidered silk handkerchief", "Gold locket with a painted portrait inside"];
const art250 = ["Gold ring set with bloodstones", "Carved ivory statuette", "Large gold bracelet", "Silver necklace with a gemstone pendant", "Bronze crown", "Silk robe", "Large well-made tapestry", "Brass mug with a jade inlay", "Box of turquoise animal figurines", "Gold bird cage with electrum filigree"];
const art750 = ["Silver chalice set with moonstones", "Silver-plated steel longsword with jet set in hilt", "Carved harp of exotic wood with ivory inlay and zircon gems", "Small gold idol", "Gold dragon comb set with red garnets as eyes", "Bottle stopper cork embossed with gold leaf and set with amethysts", "Ceremonial electrum dagger with a black pearl in the pommel", "Silver and gold brooch", "Obsidian statuette with gold fittings and inlay", "Painted gold war mask"];
const art2500 = ["Fine gold chain set with a fire opal", "Old masterpiece painting", "Embroidered silk and velvet mantle set with numerous moonstones", "Platinum bracelet set with a sapphire", "Embroidered glove set with jewel chips", "Jeweled anklet", "Gold music box", "Gold circlet set with four aquamarines", "Eye patch with a mock eye set in blue sapphire and moonstone", "A necklace string of small pink pearls"];
const art7500 = ["Jeweled gold crown", "Jeweled platinum ring", "Small gold statuette set with rubies", "Gold cup set with emerals", "Gold jewelry box with platinum filigree", "Painted gold child's sarcophagus", "Jade game board with solid gold playing pieces", "Bejeweled ivory drinking horn with gold filigree"];

/**
 * Returns a string that represents what we give
 * @param {int} worth 
 * @param {int} amount 
 */
exports.art = function(worth, amount){
    //All the parts of the art stuff together
    let parts = [];
    //Pick the right artList based on worth
    let artList = (worth == 7500) ? art7500 : (worth == 2500) ? art2500 : (worth == 750) ? art750 : (worth == 250) ? art250 : art25;
    //Now pick untill amount < 0
    while(amount > 0){
        parts.push(rnd(artList));
        amount --;
    }
    return parts.join("\n");
}