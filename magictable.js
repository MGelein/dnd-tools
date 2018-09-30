/**
 * Contains all the magic item tables from the DMG
 */

/**
 * Lookup of one item roll on magic table A
 * @param {int} chance the roll on the d100
 */
function tableA(chance) {
    if (chance >= 100) return "Driftglobe"
    else if (chance >= 99) return "Bag of holding"
    else if (chance >= 95) return "Potion of greater healing"
    else if (chance >= 91) return "Spell scroll (2nd level)"
    else if (chance >= 71) return "Spell scroll (1st level)"
    else if (chance >= 61) return "Potion of climbing"
    else if (chance >= 51) return "Spell scroll (cantrip)"
    else if (chance >= 1) return "Potion of healing"
}

/**
 * Lookup of one item roll on magic table B
 * @param {int} chance the roll on the d100
 */
function tableB(chance) {
    if (chance >= 100) return "Wand of secrets"
    else if (chance >= 99) return "Wand of magic detection"
    else if (chance >= 98) return "Saddle of the cavalier"
    else if (chance >= 97) return "Rope of climbing"
    else if (chance >= 96) return "Robe of useful items"
    else if (chance >= 95) return "Ring of swimming"
    else if (chance >= 94) return "Potion of poison"
    else if (chance >= 93) return "Mithral armor"
    else if (chance >= 92) return "Mariner's armor"
    else if (chance >= 91) return "Lantern of revealing"
    else if (chance >= 90) return "Immovable rod"
    else if (chance >= 89) return "Helm of comprehending languages"
    else if (chance >= 88) return "Goggles of night"
    else if (chance >= 87) return "Driftglobe"
    else if (chance >= 86) return "Cloak of the manta ray"
    else if (chance >= 85) return "Cap of water breathing"
    else if (chance >= 84) return "Alchemy jug"
    else if (chance >= 82) return "Philter of love"
    else if (chance >= 80) return "Elemental gem"
    else if (chance >= 78) return "Dust of sneezing and choking"
    else if (chance >= 76) return "Dust of dryness"
    else if (chance >= 74) return "Dust of disappearance"
    else if (chance >= 71) return "Oil of slipperiness"
    else if (chance >= 68) return "Keoghtom's ointment"
    else if (chance >= 65) return "Bag of holding"
    else if (chance >= 60) return "Spell scroll (3rd level)"
    else if (chance >= 55) return "Spell scroll (2nd level)"
    else if (chance >= 50) return "Potion of waterbreathing"
    else if (chance >= 45) return "Potion of growth"
    else if (chance >= 40) return "Potion of hill giant strength"
    else if (chance >= 35) return "Potion of animal friendship"
    else if (chance >= 30) return "Ammunition, +1"
    else if (chance >= 23) return "Potion of resistance"
    else if (chance >= 16) return "Potion of fire breathing"
    else if (chance >= 1) return "Potion of greater healing"
}

/**
 * Lookup of one item roll on magic table C
 * @param {int} chance the roll on the d100
 */
function tableC(chance) {
    if (chance >= 100) return "Sending stones"
    else if (chance >= 99) return "Periapt of health"
    else if (chance >= 98) return "Necklace of fireballs"
    else if (chance >= 97) return "Horseshoes of speed"
    else if (chance >= 96) return "Heward's handy haversack"
    else if (chance >= 95) return "Folding boat"
    else if (chance >= 94) return "Eyes of minute seeing"
    else if (chance >= 93) return "Decanter of endless water"
    else if (chance >= 92) return "Chime of opening"
    else if (chance >= 90) return "Bead of force"
    else if (chance >= 88) return "Bag of beans"
    else if (chance >= 85) return "Scroll of protection"
    else if (chance >= 82) return "Quaal's feather token"
    else if (chance >= 79) return "Potion of fire giant strength"
    else if (chance >= 76) return "Oil of etherealness"
    else if (chance >= 73) return "Elixir of health"
    else if (chance >= 68) return "Spell scroll (5th level)"
    else if (chance >= 63) return "Poition of mind reading"
    else if (chance >= 58) return "Potion of invulnerability"
    else if (chance >= 53) return "Potion of heroism"
    else if (chance >= 48) return "Potion of stone giant strength"
    else if (chance >= 43) return "Potion of frost giant strength"
    else if (chance >= 38) return "Potion of gaseous form"
    else if (chance >= 33) return "Potion of diminution"
    else if (chance >= 28) return "Potion of clairvoyance"
    else if (chance >= 23) return "Ammunition, +2"
    else if (chance >= 16) return "Spell scroll (4th level)"
    else if (chance >= 1) return "Potion of superior healing"
}

/**
 * Lookup of one item roll on magic table D
 * @param {int} chance 
 */
function tableD(chance) {
    if (chance >= 100) return "Portable hole"
    else if (chance >= 99) return "Bag of devouring"
    else if (chance >= 96) return "Nolzur's marvelous pigments"
    else if (chance >= 93) return "Horseshoes of a zephyr"
    else if (chance >= 88) return "Spell scroll (8th level)"
    else if (chance >= 83) return "Potion of vitality"
    else if (chance >= 78) return "Potion of longevity"
    else if (chance >= 73) return "Potion of cloud giant strength"
    else if (chance >= 68) return "Potion of flying"
    else if (chance >= 63) return "Oil of sharpness"
    else if (chance >= 58) return "Ammunition, +3"
    else if (chance >= 51) return "Spell scroll (7th level)"
    else if (chance >= 41) return "Spell scroll (6th level)"
    else if (chance >= 31) return "Potion of speed"
    else if (chance >= 21) return "Potion of invisility"
    else if (chance >= 1) return "Potion of supreme healing"
}

/**
 * Lookup of one item roll on magic table E
 * @param {int} chance 
 */
function tableE(chance) {
    if (chance >= 99) return "Sovereign glue"
    else if (chance >= 94) return "Arrow of slaying"
    else if (chance >= 86) return "Universal solvent"
    else if (chance >= 71) return "Spell scroll (9th level)"
    else if (chance >= 56) return "Potion of supreme healing"
    else if (chance >= 31) return "Potion of storm giant strength"
    else if (chance >= 1) return "Spell scroll (8th level)"
}