/**
 * This module contains all of the gems tables from the DMG, as well as a method to grab a random one from them
 */

/**
 * GEMS
 */
const gems10 = ["Azurite (opaque mottled deep blue)", "Banded agate (translucent striped brown, blue, white or red)", "Blue quartz (transparent pale blue)", "Eye agate (translucent circles of gray, white, brown, blue or green)", "Hematite (opaque gray-black)", "Lapis lazuli (opaque light and dark blue with yellow flecks)", "Malachite (opaque striated light and dark green)", "Moss agate (translucent pink or yellow-white with mossy gray or green markings)", "Obisidian (opaque black)", "Rhodochrosite (opaque light pink)", "Tiger eye (translucent brown with golden center)", "Turquoise (opaque light blue-green)"];
const gems50 = ["Bloodstone (opaque dark gray with red flecks)", "Carnelian (opaque orange to red-brown)", "Chalcedony (opaque white)", "Chrysoprase (translucent green)", "Citrine (translucent pale yellow-brown)", "Jasper (opaque blue, black or brown)", "Moonstone (translucent white with pale blue glow)", "Onyx (opaque bands of black and white, or pure black or white)", "Quartz (transparent white, smoky gray or yellow)", "Sardonyx (opaque bands of red and white)", "Star rose quartz (translucent rosy stone with white star-shaped center)", "Zircon (transparent pale blue-green)"];
const gems100 = ["Amber (transparent watery gold to rich gold)", "Amethyst (transparent deep purple)", "Chrysoberyl (transparent yellow-green to pale green)", "Coral (opaque crimson)", "Garnet (transparent red, brown-green or violet)", "Jade (translucent light green, deep green or white)", "Jet (opaque deep black)", "Pearl (opaque lustrous white, yellow or pink)", "Spinel (transparent red, red-brown or deep green)", "Tourmaline (transparent pale green, blue, brown or red)"];
const gems500 = ["Alexandrite (transparent dark green)", "Aquamarine (transparent pale blue green)", "Black pearl (opaque pure black)", "Blue spinel (transparent deep blue)", "Peridot (transparent rich olive green)", "Topaz (transparent golden yellow)"];
const gems1000 = ["Black opal (translucent dark green with black mottling and golden flecks)", "Blue sapphire (transparent blue-white to medium blue)", "Emerald (transparent deep bright green)", "Fire opal (translucent fiery red)", "Opal (translucent pale blue with green and golden mottling)", "Star ruby (translucent red ruby with white star shaped center)", "Star sapphire (translucent blue sapphire with white star shaped center)", "Yellow sapphire (transparent fiery yellow or yellow-green)"];
const gems5000 = ["Black sapphire (translucent lustrous black with glowing highlights)", "Diamond (transparent blue-white, canary, pink, brown or blue)", "Jacinth (transparent fiery orange)", "Ruby (transparent clear red to deep crimson)"];

/**
* Returns a random option from an array
* @param {Array} array 
*/
function rnd(array) {
    return array[Math.floor((Math.random() * array.length))];
}

/**
 * Returns a string that represents what we give
 * @param {int} worth the worth of the stone
 * @param {int} amount of stones to give
 */
exports.gems = function (worth, amount) {
    //Pick the right list based on worth
    let gemList = (worth == 5000) ? gems5000 : (worth == 50) ? gems50 : (worth == 100) ? gems100 : (worth == 500) ? gems500 : (worth == 1000) ? gems1000 : gems10;
    return amount + "x " + rnd(gemList);
}