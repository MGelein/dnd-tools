/**
 * Contains all the magic item tables from the DMG
 */

/**
 * Rolls a d100 and returns chance
 */
function roll() {
    return Math.floor(Math.random() * 100) + 1;
}

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

/**
 * Lookup of one item roll on magic table F
 * @param {int} chance 
 */
function tableF(chance) {
    if (chance >= 100) return "Winged boots"
    else if (chance >= 99) return "Wind fan"
    else if (chance >= 98) return "Stone of good luck"
    else if (chance >= 97) return "Quiver of Ehlonna"
    else if (chance >= 96) return "Ring of water walking"
    else if (chance >= 95) return "Ring of warmth"
    else if (chance >= 94) return "Ring of mind shielding"
    else if (chance >= 93) return "Ring of jumping"
    else if (chance >= 92) return "Pipes of the sewers"
    else if (chance >= 91) return "Pipes of haunting"
    else if (chance >= 90) return "Periapt of wound closure"
    else if (chance >= 89) return "Necklace of adaptation"
    else if (chance >= 88) return "Medaillon of thoughts"
    else if (chance >= 87) return "Instrument of the bards (Mac-Fuimidh cittern)"
    else if (chance >= 86) return "Instrument of the bards (Fochlucan bandore)"
    else if (chance >= 85) return "Instrument of the bards (Doss lute)"
    else if (chance >= 84) return "Helm of telepathy"
    else if (chance >= 83) return "Headband of intellect"
    else if (chance >= 82) return "Gloves of thievery"
    else if (chance >= 81) return "Gloves of swimming and climbing"
    else if (chance >= 80) return "Gloves of missile snaring"
    else if (chance >= 79) return "Gem of brightness"
    else if (chance >= 78) return "Figurine of wondrous power (silver raven)"
    else if (chance >= 77) return "Eyes of the eagle"
    else if (chance >= 76) return "Eyes of charming"
    else if (chance >= 75) return "Eversmoking bottle"
    else if (chance >= 74) return "Deck of illusions"
    else if (chance >= 73) return "Circlet of blasting"
    else if (chance >= 72) return "Boots of the winterlands"
    else if (chance >= 71) return "Bag of tricks (tan)"
    else if (chance >= 70) return "Bag of tricks (rust)"
    else if (chance >= 69) return "Bag of tricks (gray)"
    else if (chance >= 68) return "Adamantine armor (scale mail)"
    else if (chance >= 67) return "Adamantine armor (chain shirt)"
    else if (chance >= 66) return "Adamantine armor (chain mail)"
    else if (chance >= 64) return "Weapon of warning"
    else if (chance >= 62) return "Wand of web"
    else if (chance >= 60) return "Wand of the war mage, +1"
    else if (chance >= 58) return "Wand of magic missiles"
    else if (chance >= 56) return "Trident of fish command"
    else if (chance >= 54) return "Sword of vengeance"
    else if (chance >= 52) return "Staff of the python"
    else if (chance >= 50) return "Staff of the adder"
    else if (chance >= 48) return "Slippers of spider climbing"
    else if (chance >= 46) return "Rod of the pact keeper, +1"
    else if (chance >= 44) return "Pearl of power"
    else if (chance >= 42) return "Javelin of lightning"
    else if (chance >= 40) return "Hat of disguise"
    else if (chance >= 38) return "Gauntlets of ogre power"
    else if (chance >= 36) return "Cloak of protection"
    else if (chance >= 34) return "Cloak of elvenkind"
    else if (chance >= 32) return "Broom of flying"
    else if (chance >= 30) return "Brooch of shielding"
    else if (chance >= 28) return "Bracers of archery"
    else if (chance >= 26) return "Boots of striding and springing"
    else if (chance >= 24) return "Boots of elvenkind"
    else if (chance >= 22) return "Amulet of proof aginst detection and location"
    else if (chance >= 19) return "Sentinel shielding"
    else if (chance >= 16) return "Shield, +1"
    else if (chance >= 1) return "Weapon, +1"
}
/**
 * Lookup of one item roll on magic table F
 * @param {int} chance 
 */
function tableG(chance) {
    if (chance >= 100) return "Wings of flying"
    else if (chance >= 99) return "Wand of wonder"
    else if (chance >= 98) return "Wand of the war mage, +2"
    else if (chance >= 97) return "Wand of paralysis"
    else if (chance >= 96) return "Wand of lightning bolts"
    else if (chance >= 95) return "Wand of fireballs"
    else if (chance >= 94) return "Wand of fear"
    else if (chance >= 93) return "Wand of enemy detection"
    else if (chance >= 92) return "Wand of binding"
    else if (chance >= 91) return "Vicious weapon"
    else if (chance >= 90) return "Tentacle rod"
    else if (chance >= 89) return "Sword of wounding"
    else if (chance >= 88) return "Sword of life stealing"
    else if (chance >= 87) return "Sun blade"
    else if (chance >= 86) return "Stone of controlling earth elementals"
    else if (chance >= 85) return "Staff of withering"
    else if (chance >= 84) return "Staff of the woodlands"
    else if (chance >= 83) return "Staff of swarming insects"
    else if (chance >= 82) return "Staff of healing"
    else if (chance >= 81) return "Staff of charming"
    else if (chance >= 80) return "Shield of missile attraction"
    else if (chance >= 79) return "Shield, +2"
    else if (chance >= 78) return "Armor of resistance (scale mail)"
    else if (chance >= 77) return "Armor, +1 (scale mail)"
    else if (chance >= 76) return "Rope of entanglement"
    else if (chance >= 75) return "Rod of the pact keeper, +2"
    else if (chance >= 74) return "Rod of rulership"
    else if (chance >= 73) return "Robe of eyes"
    else if (chance >= 72) return "Ring of X-ray vision"
    else if (chance >= 71) return "Ring of the ram"
    else if (chance >= 70) return "Ring of spell storing"
    else if (chance >= 69) return "Ring of resistance"
    else if (chance >= 68) return "Ring of protection"
    else if (chance >= 67) return "Ring of free action"
    else if (chance >= 66) return "Ring of feather falling"
    else if (chance >= 65) return "Ring of evasion"
    else if (chance >= 64) return "Ring of animal influence"
    else if (chance >= 63) return "Periapt of proof against poison"
    else if (chance >= 62) return "Necklace of prayer beads"
    else if (chance >= 61) return "Mantle of spell resistance"
    else if (chance >= 60) return "Mace of terror"
    else if (chance >= 59) return "Mace of smiting"
    else if (chance >= 58) return "Mace of disruption"
    else if (chance >= 57) return "Armor of resistance (leather)"
    else if (chance >= 56) return "Armor, +1 (leather)"
    else if (chance >= 55) return "Irond bands of Bilarro"
    else if (chance >= 54) return "Ioun stone (sustenance)"
    else if (chance >= 53) return "Ioun stone (reserve)"
    else if (chance >= 52) return "Ioun stone (protection)"
    else if (chance >= 51) return "Ioun stone (awareness)"
    else if (chance >= 50) return "Instrument of the bards (Cli lyre)"
    else if (chance >= 49) return "Instrument of the bards (Canaith mandolin)"
    else if (chance >= 48) return "Horn of Valhalla (silver or brass)"
    else if (chance >= 47) return "Horn of blasting"
    else if (chance >= 46) return "Helm of teleportation"
    else if (chance >= 45) return "Glamoured studded leather"
    else if (chance >= 44) return "Giant slayer"
    else if (chance >= 43) return "Gem of seeing"
    else if (chance >= 42) return "Flame tongue"
    else if (chance >= 41) return "Elven chain"
    else if (chance >= 40) return "Dragon slayer"
    else if (chance >= 39) return "Dimensional shackles"
    else if (chance >= 38) return "Dagger of venom"
    else if (chance >= 37) return "Daern's instant fortress"
    else if (chance >= 36) return "Cube of force"
    else if (chance >= 35) return "Cloak of the bat"
    else if (chance >= 34) return "Cloak of displacement"
    else if (chance >= 33) return "Armor of resistance (chain shirt)"
    else if (chance >= 32) return "Armor, +1, (chain shirt)"
    else if (chance >= 31) return "Armor of resistance (chain mail)"
    else if (chance >= 30) return "Armor, +1 (chain mail)"
    else if (chance >= 29) return "Censer of controlling air elementals"
    else if (chance >= 28) return "Cape of the mountebank"
    else if (chance >= 27) return "Brazier of commanding fire elementals"
    else if (chance >= 26) return "Bracers of defense"
    else if (chance >= 25) return "Bowl of commanding water elementals"
    else if (chance >= 24) return "Boots of speed"
    else if (chance >= 23) return "Boots of levitation"
    else if (chance >= 22) return "Berserker axe"
    else if (chance >= 21) return "Belt of hill giant strength"
    else if (chance >= 20) return "Belt of dwarvenkind"
    else if (chance >= 19) return "Arrow-catching shield"
    else if (chance >= 18) return "Armor of vulnerability"
    else if (chance >= 17) return "Amulet of health"
    else if (chance >= 16) return "Adamantine armor (splint)"
    else if (chance >= 15) return "Adamantine armor (breastplate)"
    else if (chance >= 12) return "Figurine of wondrous power (roll d8)"
    else if (chance >= 1) return "Weapon, +2"

}
/**
 * Lookup of one item roll on magic table F
 * @param {int} chance 
 */
function tableH(chance) {
    if (chance >= 100) return "Tome of understanding"
    else if (chance >= 99) return "Tome of leadership and influence"
    else if (chance >= 98) return "Tome of clear thought"
    else if (chance >= 97) return "Armor of resistance (studded leather)"
    else if (chance >= 96) return "Armor, +1 (studded leather)"
    else if (chance >= 95) return "Armor of resistance"
    else if (chance >= 94) return "Armor, +1 (splint)"
    else if (chance >= 93) return "Spellguard shield"
    else if (chance >= 92) return "Armor, +2 (scale mail)"
    else if (chance >= 91) return "Oathbow"
    else if (chance >= 90) return "Nine lives stealer"
    else if (chance >= 89) return "Mirror of live trapping"
    else if (chance >= 88) return "Manual of quickness of action"
    else if (chance >= 87) return "Manual of golems"
    else if (chance >= 86) return "Manual of gainful exercise"
    else if (chance >= 85) return "Manual of bodily health"
    else if (chance >= 84) return "Armor, +2 (leather)"
    else if (chance >= 83) return "Ioun stone (strength)"
    else if (chance >= 82) return "Ioun stone (leadership)"
    else if (chance >= 81) return "Ioun stone (intellect)"
    else if (chance >= 80) return "Ioun stone (insigh)"
    else if (chance >= 79) return "Ioun stone (fortitude)"
    else if (chance >= 78) return "Ioun stone (agility)"
    else if (chance >= 77) return "Ioun stone (absorption)"
    else if (chance >= 76) return "Instrument of the bards (Anstruth harp)"
    else if (chance >= 75) return "Horn of Valhalla (bronze)"
    else if (chance >= 74) return "Helm of brilliance"
    else if (chance >= 73) return "Frost brand"
    else if (chance >= 72) return "Figurine of wondrous power (obsidian steed)"
    else if (chance >= 71) return "Efreeti bottle"
    else if (chance >= 70) return "Dwarven thrower"
    else if (chance >= 69) return "Dwarven plate"
    else if (chance >= 68) return "Dragon scale mail"
    else if (chance >= 67) return "Demon armor"
    else if (chance >= 66) return "Dancing sword"
    else if (chance >= 65) return "Cloak of arachnida"
    else if (chance >= 64) return "Armor, +2 (chain shirt)"
    else if (chance >= 63) return "Armor, +2 (chain mail)"
    else if (chance >= 62) return "Candle of invocation"
    else if (chance >= 61) return "Armor of resistance (breastplate)"
    else if (chance >= 60) return "Armor, +1 (breastplate)"
    else if (chance >= 59) return "Belt of frost (or stone) giant strength"
    else if (chance >= 58) return "Belt of fire giant strength"
    else if (chance >= 57) return "Animated shield"
    else if (chance >= 56) return "Adamantine armor (plate)"
    else if (chance >= 55) return "Adamantine armor (half plate)"
    else if (chance >= 53) return "Wand of the war mage, +3"
    else if (chance >= 51) return "Wand of polymorph"
    else if (chance >= 49) return "Sword of sharpness"
    else if (chance >= 47) return "Staff of thunder and lightning"
    else if (chance >= 45) return "Staff of striking"
    else if (chance >= 43) return "Staff of power"
    else if (chance >= 41) return "Staff of frost"
    else if (chance >= 39) return "Staff of fire"
    else if (chance >= 37) return "Shield, +3"
    else if (chance >= 35) return "Scimitar of speed"
    else if (chance >= 33) return "Rod of the pact keeper, +3"
    else if (chance >= 31) return "Rod of security"
    else if (chance >= 29) return "Rod of alertness"
    else if (chance >= 27) return "Rod of absorption"
    else if (chance >= 25) return "Robe of stars"
    else if (chance >= 23) return "Robe of scintillating colors"
    else if (chance >= 21) return "Ring of telekinesis"
    else if (chance >= 19) return "Ring of shooting stars"
    else if (chance >= 17) return "Ring of regeneration"
    else if (chance >= 15) return "Crystal ball (very rare version)"
    else if (chance >= 13) return "Carpet of flying"
    else if (chance >= 11) return "Amulet of the planes"
    else if (chance >= 1) return "Weapon, +3"
}
/**
 * Lookup of one item roll on magic table F
 * @param {int} chance 
 */
function tableI(chance) {
    if (chance >= 100) return "Tome of the stilled tongue"
    else if (chance >= 99) return "Talisman of ultimate evil"
    else if (chance >= 98) return "Talisman of the sphere"
    else if (chance >= 97) return "Talisman of pure good"
    else if (chance >= 96) return "Sphere of annihilation"
    else if (chance >= 95) return "Ring of water elemental command"
    else if (chance >= 94) return "Ring of three wishes"
    else if (chance >= 93) return "Ring of fire elemental command"
    else if (chance >= 92) return "Ring of earth elemental command"
    else if (chance >= 91) return "Ring of air elemental command"
    else if (chance >= 90) return "Plate armor of resistance"
    else if (chance >= 89) return "Plate armor of etherealness"
    else if (chance >= 88) return "Ioun stone (regeneration)"
    else if (chance >= 87) return "Ioun stone (mastery)"
    else if (chance >= 86) return "Ioun stone (greater absorption)"
    else if (chance >= 85) return "Instrument of the bards (Oilamh harp)"
    else if (chance >= 84) return "Horn of Valhalla (iron)"
    else if (chance >= 83) return "Armor of resistance (half plate)"
    else if (chance >= 82) return "Efreeti chain"
    else if (chance >= 81) return "Deck of many things"
    else if (chance >= 80) return "Cubic gate"
    else if (chance >= 79) return "Belt of storm giant strength"
    else if (chance >= 78) return "Armor of invulnerability"
    else if (chance >= 77) return "Apparatus of Kwalish"
    else if (chance >= 76) return "Magic amor (roll d12)"
    else if (chance >= 74) return "Well of many worlds"
    else if (chance >= 72) return "Armor, +2 (studded leather)"
    else if (chance >= 70) return "Armor, +2 (splint)"
    else if (chance >= 68) return "Scarab of protection"
    else if (chance >= 66) return "Armor, +1 (scale mail)"
    else if (chance >= 64) return "Rod of resurrection"
    else if (chance >= 62) return "Robe of the archmagi"
    else if (chance >= 60) return "Armor, +1 (plate)"
    else if (chance >= 58) return "Armor, +3 (leather)"
    else if (chance >= 56) return "Iron flask"
    else if (chance >= 54) return "Armor, +1 (half plate)"
    else if (chance >= 52) return "Crystal ball (legendary version)"
    else if (chance >= 50) return "Cloak of invisibility"
    else if (chance >= 48) return "Armor, +3 (chain shirt)"
    else if (chance >= 46) return "Armor, +3 (chain mail)"
    else if (chance >= 44) return "Armor, +2 (breastplate)"
    else if (chance >= 42) return "Belt of cloud giant strength"
    else if (chance >= 39) return "Vorpal sword"
    else if (chance >= 36) return "Staff of the magi"
    else if (chance >= 33) return "rod of lordly might"
    else if (chance >= 30) return "Ring of spell turning"
    else if (chance >= 27) return "Ring of invisibility"
    else if (chance >= 24) return "Ring of djinni summoning"
    else if (chance >= 21) return "Holy avenger"
    else if (chance >= 16) return "Sword of answering"
    else if (chance >= 11) return "Luck blade"
    else if (chance >= 6) return "Hammer of thunderbolts"
    else if (chance >= 1) return "Defender"
}

/**
 * EXPORT METHODS
 */

/**
 * Rolls the provided amount of times on table A
 * @param {int} amount 
 */
exports.rollA = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableA(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table B
 * @param {int} amount 
 */
exports.rollB = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableB(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table C
 * @param {int} amount 
 */
exports.rollC = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableC(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table D
 * @param {int} amount 
 */
exports.rollD = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableD(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table E
 * @param {int} amount 
 */
exports.rollE = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableE(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table F
 * @param {int} amount 
 */
exports.rollF = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableF(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table G
 * @param {int} amount 
 */
exports.rollG = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableG(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table H
 * @param {int} amount 
 */
exports.rollH = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableH(roll()));
        amount--;
    }
    return items.join("\n");
}

/**
 * Rolls the provided amount of times on table I
 * @param {int} amount 
 */
exports.rollI = function (amount) {
    let items = [];
    while (amount > 0) {
        items.push(tableI(roll()));
        amount--;
    }
    return items.join("\n");
}
