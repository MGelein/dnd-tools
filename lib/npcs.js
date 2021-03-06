/**
 * This module controls npc generation
 */
const { rnd, random } = require('./random');
const chalk = require('chalk');
const { cls } = require('./combat');
const { header, table } = require('./table');
//Synchronous readline stuff
const readline = require('readline-sync');
const fs = require('fs');
const path = require('path');

/**One word description of character */
const character = ['energetic', 'jumpy', 'flirty', 'grumpy', 'paranoid', 'happy', 'funny', 'sad', 'melancholic', 'drunk', 'smitten', 'haughty',
    'intimidating', 'sympathetic', 'hippy', 'religious', 'superstitious', 'dumb', 'patient', 'impatient', 'scholarly', 'cowardly', 'quick-witted',
    'evil', 'sinister', 'trustworthy', 'untrustworthy'];

/**The object that holds all race information */
var races = {};


/**Holds the race of the generated NPC */
var race = "all";
/**Holds the gender of the generated NPC */
var gender = "all";
/**Holds the age of the generated NPC */
var age = "normal";

/**Contains all names from the players handbook */
const names = {
    'dwarf': {
        male: ["Adrik", 'Alberich', 'Baern', 'Barend', 'Brottor', 'Bruenor', 'Dain', 'Darrek', 'Delg', 'Eberk', 'Einkil', 'Fargrim', 'Flint', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Oskar', 'Rangrim', 'Rurik', 'Taklinn', 'Toradin', 'Thorin', 'Tordek', 'Thrain', 'Traubon', 'Travok', 'Ulfgar', 'Veit', 'Vondal'],
        female: ['Amber', 'Artin', 'Aaudhild', 'Bardryn', 'Dagnal', 'Diesa', 'Eldeth', 'Falkrunn', 'Finellen', 'Gunnloda', 'Gurdis', 'Helja', 'Hlin', 'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn', 'Sannl', 'Torbera', 'Torgga', 'Vistra'],
        surname: ['Balderk', 'Battlehammer', 'Brawnhammer', 'Dankil', 'Dankil', 'Fireforge', 'Frostbeard', 'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Lutgehr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart']
    },
    'elf': {
        male: ['Adran', 'Aelar', 'Aramil', 'Arannis', 'Aust', 'Beiro', 'Berrian', 'Carric', 'Enialis', 'Erdan', 'Erevan', 'Galinndan', 'Hadarai', 'Heian', 'Himo', 'Immeral', 'Ivellios', 'Laucian', 'Mindartis', 'Paelias', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Soveliss', 'Thamior', 'Tharivol', 'Theren', 'Varis'],
        female: ['Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna', 'Birel', 'Caelynn', 'Drusilia', 'Enna', 'Felosial', 'Ielenia', 'Jelenneth', 'Keyleth', 'Leshanna', 'Lia', 'Meriele', 'Mialee', 'Naivara', 'Quelenna', 'Quilathe', 'Sariel', 'Shanairra', 'Shava', ' Silaqui', 'Theirastra', 'Thia', 'Vadania', 'Valanthe', 'Xanaphia'],
        surname: ['Amakiir', 'Amastacia', 'Galanodel', 'Holimion', 'Ilphelkiir', 'Liadon', 'Meliamne', 'Naïlo', 'Siannodel', 'Xiloscient']
    },
    'halfling': {
        male: ['Alton', 'Ander', 'Cade', 'Corrin', 'Stery', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe', 'Wellby'],
        female: ['Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jilian', 'Kithri', 'Lavinia', 'Lidda', 'Merla', 'Nedda', 'Paela', 'Portia', 'Seraphina', 'Shaena', 'Trym', 'Vani', 'Verna'],
        surname: ['Brushgather', 'Goodbarrel', 'Greenbottle', 'High-hill', 'Hilltopple', 'Leagallow', 'Tealeaf', 'Thorngage', 'Tosscobble', 'Underbough']
    },
    'human': {
        male: ['Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir', 'Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn', 'Randal', 'Stedd', 'Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef', 'Mival', 'Orel', 'Pavel', 'Sergor', 'Ander', 'Blath', 'Bran', 'Frath', 'Geth', 'Lander', 'Luth', 'Malcer', 'Stor', 'Taman', 'Urth', 'Aoth', 'Bareris', 'Ephut-Ki', 'Kethoth', 'Mumed', 'Ramas', 'So-Kehur', 'Thazar-De', 'Urthur', 'Borivik', 'Faurgar', 'Jandar', 'Kanithar', 'Madislak', 'Ralmevik', 'Shaumar', 'Vladislak', 'Anton', 'Diero', 'Marcon', 'Pieron', 'Rimardo', 'Romero', 'Salazar', 'Umbero'],
        female: ['Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida', 'Arveene', 'Esvele', 'Jhessai', 'Kerri', 'Lureene', 'Miri', 'Rowan', 'Shandri', 'Tessele', 'Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma', 'Tana', 'Zora', 'Arizima', 'Chathi', 'Nephis', 'Nulara', 'Murithi', 'Sefris', 'Thola', 'Umara', 'Zolis', 'Fyevarra', 'Hulmarra', 'Immith', 'Imzel', 'Navarra', 'Shevarra', 'Tammith', 'Yuldra', 'Balama', 'Dona', 'Faila', 'Jalana', 'Luisa', 'Marta', 'Quara', 'Selise', 'Vonda'],
        surname: ['Basha', 'Dumein', 'Jassan', 'Khalid', 'Mostana', 'Pashar', 'Rein', 'Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag', 'Brightwood', 'Helder', 'Hornraven', 'Lackman', 'Stormwind', 'Windrivver', 'Ankhalab', 'Anskuld', 'Fezim', 'Hahpet', 'Nathandem', 'Sepret', 'Uuthrakt', 'Chergoba', 'Dyernina', 'Iltazyara', 'Murnyethara', 'Stayanoga', 'Ulmokina', 'Agosto', 'Astorio', 'Calabra', 'Domine', 'Falone', 'Marivaldi', 'Pisacar', 'Ramondo']
    },
    'half-elf': {
        male: ['Aseir', 'Bardeid', 'Haseid', 'Khemed', 'Mehmen', 'Sudeiman', 'Zasheir', 'Darvin', 'Dorn', 'Evendur', 'Gorstag', 'Grim', 'Helm', 'Malark', 'Morn', 'Randal', 'Stedd', 'Bor', 'Fodel', 'Glar', 'Grigor', 'Igan', 'Ivor', 'Kosef', 'Mival', 'Orel', 'Pavel', 'Sergor', 'Ander', 'Blath', 'Bran', 'Frath', 'Geth', 'Lander', 'Luth', 'Malcer', 'Stor', 'Taman', 'Urth', 'Aoth', 'Bareris', 'Ephut-Ki', 'Kethoth', 'Mumed', 'Ramas', 'So-Kehur', 'Thazar-De', 'Urthur', 'Borivik', 'Faurgar', 'Jandar', 'Kanithar', 'Madislak', 'Ralmevik', 'Shaumar', 'Vladislak', 'Anton', 'Diero', 'Marcon', 'Pieron', 'Rimardo', 'Romero', 'Salazar', 'Umbero'],
        female: ['Atala', 'Ceidil', 'Hama', 'Jasmal', 'Meilil', 'Seipora', 'Yasheira', 'Zasheida', 'Arveene', 'Esvele', 'Jhessai', 'Kerri', 'Lureene', 'Miri', 'Rowan', 'Shandri', 'Tessele', 'Alethra', 'Kara', 'Katernin', 'Mara', 'Natali', 'Olma', 'Tana', 'Zora', 'Arizima', 'Chathi', 'Nephis', 'Nulara', 'Murithi', 'Sefris', 'Thola', 'Umara', 'Zolis', 'Fyevarra', 'Hulmarra', 'Immith', 'Imzel', 'Navarra', 'Shevarra', 'Tammith', 'Yuldra', 'Balama', 'Dona', 'Faila', 'Jalana', 'Luisa', 'Marta', 'Quara', 'Selise', 'Vonda'],
        surname: ['Basha', 'Dumein', 'Jassan', 'Khalid', 'Mostana', 'Pashar', 'Rein', 'Amblecrown', 'Buckman', 'Dundragon', 'Evenwood', 'Greycastle', 'Tallstag', 'Brightwood', 'Helder', 'Hornraven', 'Lackman', 'Stormwind', 'Windrivver', 'Ankhalab', 'Anskuld', 'Fezim', 'Hahpet', 'Nathandem', 'Sepret', 'Uuthrakt', 'Chergoba', 'Dyernina', 'Iltazyara', 'Murnyethara', 'Stayanoga', 'Ulmokina', 'Agosto', 'Astorio', 'Calabra', 'Domine', 'Falone', 'Marivaldi', 'Pisacar', 'Ramondo']
    },
    'dragonborn': {
        male: ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Kriv', 'Medrash', 'Mehen', 'Nadarr', 'Pandjed', 'Patrin', 'Rhogar', 'Shamash', 'Shedinn', 'Tarhun', 'Torinn'],
        female: ['Akra', 'Biri', 'Daar', 'Farideh', 'Harann', 'Havilar', 'Jheri', 'Kava', 'Korinn', 'Mishann', 'Nala', 'Perra', 'Raiann', 'Sora', 'Surina', 'Thava', 'Uadjit'],
        surname: ['Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Drachedandion', 'Fenkenkabradon', 'Kepeshkmolik', 'Kerrhylon', 'Kimbatuul', 'Linxakasendalor', 'Myastan', 'Nemmonis', 'Norixius', 'Ophinshtalajiir', 'Prexijandilin', 'Shestendeliath', 'Turnuroth', 'Verthisathurgiesh', 'Yarjerit']
    },
    'gnome': {
        male: ['Alston', 'Alvyn', 'Boddynock', 'Brocc', 'Burgell', 'Dimble', 'Eldon', 'Erky', 'Fonkin', 'Frug', 'Gerbo', 'Gimble', 'Glim', 'Jebeddo', 'Kellen', 'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri', 'Warryn', 'Wrenn', 'Zook'],
        female: ['Bimpnottin', 'Breena', 'Caramip', 'Carlin', 'Donella', 'Duvamil', 'Ella', 'Ellyjobell', 'Ellywick', 'Lilli', 'Loopmottin', 'Lorilla', 'Mardnab', 'Nissa', 'Nyx', 'Oda', 'Orla', 'Roywyn', 'Shamil', 'Tana', 'Waywocket', 'Zanna'],
        surname: ['Beren', 'Daergel', 'Folkor', 'Garrick', 'Nackle', 'Murnig', 'Ningel', 'Raulnor', 'Scheppen', 'Timbers', 'Turen']
    },
    'half-orc': {
        male: ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk'],
        female: ['Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen', 'Yevelda'],
        surname: ['']
    },
    'tiefling': {
        male: ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon', 'Leucis', 'Melech', 'Mordai', 'Morthos', 'Pelaios', 'Skamos', 'Therai'],
        female: ['Akta', 'Anakis', 'Bryseis', 'Criella', 'Damaia', 'Ea', 'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta'],
        surname: ['Art', 'Carrion', 'Chant', 'Creed', 'Despair', 'Excellence', 'Fear', 'Glory', 'Hope', 'Ideal', 'Music', 'Nowhere', 'Open', 'Poetry', 'Music', 'Quest', 'Random', 'Reverence', 'Sorrow', 'Temerity', 'Torment', 'Weary']
    }
}

/**Character traits from the DMG */
const appearances = ['distinctive jewelry: earrings, necklace, circlet, bracelets, etc.',
    'piercings', 'flamboyant or outlandish clothes',
    'formal, clean clothes', 'ragged, dirty clothes',
    'a pronounced scar', 'missing teeth', 'missing fingers',
    'an unusual eye color', 'tattoos', 'a birthmark', 'a bald head',
    'an unusual skin color', 'a braided beard or hair',
    'an unusual hair color', 'a nervous eye twitch',
    'a distinctive nose', 'a distinctive posture',
    'an exceptionally beautiful face', 'an exceptionally ugly face'];

/** High ability score */
const abilities_h = ['STR: powerful, brawny, strong as an ox', 'DEX: lithe, agile, graceful',
    'CON: hardy, hale, healthy', 'INT: studious learned, inquisitive',
    'WIS: perceptive, spiritual, insightful', 'CHR: persuasive, forceful, born leader'];

/** Low ability score */
const abilities_l = ['STR: feeble, scrawny', 'DEX: clumsy, fumbling', 'CON: sickly, pale',
    'INT: dim-witted, slow, uneducated', 'WIS: oblivious, absent-minded', 'CHR: dull, boring, abrasive'];

/** Talents an NPC can have*/
const talents = ['Plays a musical instrument', 'Speaks several languages fluently', 'Unbelievably lucky', 'Perfect memory',
    'Great with animals', 'Great with children', 'Great at solving puzzles', 'Great at one game', 'Great at impersonations',
    'Draws beautifully', 'Paints beautifully', 'Sings beautifully', 'Drinks everyone under the table',
    'Expert carpenter', 'Expert cook', 'Expert dart thrower and rock skipper', 'Expert juggler',
    'Skilled actor and master of disguise', 'Skilled dancer', 'Knows thieves\' cant'];

/** NPC mannerisms */
const mannerisms = ['Prone to singing, whistling or humming quietly', 'Speaks in rhyme or some other peculiar way',
    'Particularly high or low voice', 'Slurs words, lisps or stutters', 'Enunciates words overly clearly',
    'Speaks loudly', 'Whispers', 'Uses flowery speech or long words', 'Frequently uses the wrong word',
    'Uses colourful oaths and exclamations', 'Makes constant jokes or puns', 'Prone to prediction of doom',
    'Fidgets', 'Squints', 'Stares into the distance', 'Chews something', 'Paces', 'Taps fingers',
    'Bites fingernails', 'Twirls hair or tugs beard'];

/** The traits the NPC uses in interactions */
const interactionTraits = ['Argumentative', 'Arrogant', 'Blustering', 'Rude', 'Curious', 'Friendly', 'Honest', 'Hot tempered', 'Irritable', 'Ponderous', 'Quiet', 'Suspicious'];

/** Ideals for our NPC, this is for all alignements*/
const ideals = ['Beauty', 'Charity', 'Greater Good', 'Life', 'Respect', 'Self-sacrifice',
    'Domination', 'Greed', 'Pain', 'Might', 'Retribution', 'Slaughter',
    'Community', 'Fairness', 'Honor', 'Logic', 'Responsibility', 'Tradition',
    'Change', 'Creativity', 'Freedom', 'Indepence', 'No Limits', 'Whimsy',
    'Balance', 'Knowledge', 'Live and let live', 'Moderation', 'Neutrality', 'People',
    'Aspiration', 'Discovery', 'Glory', 'Nation', 'Redemption', 'Self-knowledge'];

/** NPC bonds */
const bonds = ['Dedicated to fulfilling a personal life goal', 'Protective of close family members',
    'Protective of colleagues or compatriots', 'Loyal to a benefactor, patron or employer',
    'Captivated by a romantic interest', 'Drawn to a special place', 'Protective of a sentimental keepsake',
    'Protective of a valuable possesion', 'Out for revenge'];

/**NPC flaws */
const flaws = ['Forbidden love or susceptibility to romance', 'Enjoys decadent pleasures', 'Arrogance',
    'Envies another creature\'s possesions or station', 'Overpowering greed', 'Prone to rage',
    'Has powerful enemy', 'Specific phobia', 'Shameful or scandalous history', 'Secret crime or misdeed',
    'Possesion of forbidden lore', 'Foolhardy bravery'];

/**Now add all race information */
addRace('dwarf', 'common', ['hill', 'mountain'], 30, 250, 350);
addRace('elf', 'common', ['high', 'wood'], 40, 500, 800);
addRace('human', 'common', [], 18, 60, 90);
addRace('halfling', 'common', ['stout', 'lightfoot'], 25, 80, 120);
addRace('gnome', 'uncommon', ['rock', 'forest'], 25, 90, 130);
addRace('tiefling', 'uncommon', [], 20, 70, 110);
addRace('half-orc', 'uncommon', [], 14, 55, 75);
addRace('half-elf', 'uncommon', [], 20, 100, 180);
addRace('dragonborn', 'uncommon', [], 15, 60, 80);


/**
* Checks if the provided option counts as a gender option
* @param {String} choice 
*/
function isAge(choice) {
    //If this is an age choice
    return ['old', 'young', 'child'].indexOf(choice.toLowerCase().trim() > -1);
}

/**
 * Checks if the provided option counts as a gender option
 * @param {String} choice a choice of gender
 */
function isGender(choice) {
    //See if it is a valid choice
    return ['female', 'male'].indexOf(choice.toLowerCase().trim()) > -1;
}

/**
 * Check to see if this is a choice about race
 * @param {String} choice the cmd line param we're checking
 */
function isRace(choice) {
    //First sanitize input
    choice = choice.toLowerCase().trim();
    //Get a list of all possible races
    const raceNames = Object.keys(races);
    //Go throug every race to see if it matches
    for (var i = 0; i < raceNames.length; i++) {
        //First see if it is a race name
        if (raceNames[i] === choice) return true;
        //Else see if it is a subgroup
        if (races[raceNames[i]].group === choice) return true;
    }
    //If nothing was found, return false
    return false;
}

/**
 * Returns a random name using the now know parameters of gender and race
 */
function getName() {
    //First get the set of names for this race
    const raceSet = names[race.name];
    //See if it is populated, else return 'Nobody'
    if (!raceSet) return 'Nobody';
    //Now get a surname
    const surname = rnd(raceSet.surname);
    //And get the appropriate first name depeding on gender
    const name = rnd(raceSet[gender]);
    //Construct one result
    const result = name + " " + surname;
    //Now return the constrcuted name
    return result.trim();
}

/**
 * Returns a random age from the provided range and already chosen race
 */
function getAge() {
    /**Next see what kind of range we're dealing with and create a random number from that ranges */
    if (age === 'child' || age === 'young') {
        return random(3, race.age[0]);//Youngest possible NPC is 3
    } else if (age == 'old') {
        return random(race.age[1], race.age[2]);
    } else {//Normal age, return by default
        return random(race.age[0], race.age[1]);
    }
}

/**
 * Returns a list of possible genders for the provided gender oriented command line parameter
 */
function getGenders() {
    //Then check if it is set, or leave it
    if (gender === 'all') return ['female', 'male'];
    //If not, it is already set, return that choice
    else return [gender];
}


/**
* Returns an array with the possible types of races that can be had with the provided
* race-oriented command line parameter
* @param {String} choice the choice of race targeted parameter (common / gnome / all);
*/
function getRaces() {
    //First sanitize input
    choice = race.toLowerCase().trim();
    //Get a list of all possible races
    const raceNames = Object.keys(races);
    /**The list of possible races */
    var result = [];
    //Go throug every race to see if it matches
    for (var i = 0; i < raceNames.length; i++) {
        //Special case for 'all', default option
        if (choice == 'all') result.push(races[raceNames[i]]);
        //First see if it is a race name, then just return that one race
        if (raceNames[i] === choice) return [races[raceNames[i]]];
        //Else see if it is a subgroup, and start appending to selection
        if (races[raceNames[i]].group === choice) {
            result.push(races[raceNames[i]]);
        }
    }
    //Return the result of the query
    return result;
}


/**
 * Adds a new race with the following data to the races collection
 * @param {String} name the name of the race
 * @param {String} racegroup the set of the race, i.e. 'common', 'uncommon', 'evil'
 * @param {Array}  subraces an array of possible subraces, pass empty array if no subraces
 * @param {Number} youngAge the age up to which you are considered a child
 * @param {Number} oldAge the age after which you are considered old
 * @param {Number} maxAge the age after which most of this race die
 */
function addRace(name, racegroup, subraces, youngAge, oldAge, maxAge) {
    races[name] = {
        'name': name,
        'group': racegroup,
        'subs': subraces,
        'age': [youngAge, oldAge, maxAge]
    }
}

/**
 * Returns if the shorted option falg was found
 * @param {String} choice the choice we want to check
 */
function isShortened(choice) {
    choice = choice.toLowerCase();
    return ["-s", "-short", "--s", "--short", "short", "shortened", "-shortened", "--shortened"].indexOf(choice) != -1;
}

/**
 * Resets variables for re-generation
 */
function resetInit() {
    age = "normal";
    race = "all";
    gender = "all";
}

/**
 * Tries to build and return an NPC from the provided argument string
 * @param {String} argumentString
 * @param {Boolean} shorted if true, then it means we only want basic info 
 * @param {Boolean} interactive if true, keep asking for more
 */
exports.npc = function (argumentString, shortened, interactive) {
    //Explicitly set to false if not set
    if (!interactive) interactive = false;
    //Now depending on mode, run
    if (interactive) {
        //If we need generation
        var needsGeneration = false;
        //The cache of what we last generated
        var npcString = generate(argumentString, shortened);
        //If we are interactive, keep on generating
        while (interactive) {
            //If we need generation, regenerate
            if (needsGeneration) npcString = generate(argumentString, shortened);
            //Then clear screen and show
            cls();
            console.log(header("NPC: " + argumentString))
            console.log(npcString.pretty + "\n");
            //Render the controls
            renderControls();
            //Read the key that controls what we do
            let keyIn = readline.keyIn("", { limit: 'nqsp' });
            if (keyIn === 'n') {//Generate new NPC
                resetInit();
                needsGeneration = true;
            } else if (keyIn === 'q') {//Break from the loop
                interactive = false;
                break;
            } else if (keyIn === 's') {//Save the file to local drive with his name as file-name
                //Find filename from the NPC name
                let nameLine = npcString.plain.split("\n")[0];
                let name = nameLine.replace(/Name:\s+/i, '').toLowerCase();
                name = name.replace(/\s/g, '-');
                //Then save that file, but don't overwrite, just append _ to the name
                while (fs.existsSync(name + ".npc")) {
                    name += "_";
                }
                //Now that we have a safe file name, save to it
                fs.writeFileSync(name + ".npc", npcString.plain, "utf-8");
                console.log("Succesfully saved to '" + name + ".npc'!");
                resetInint();
                readline.keyInPause();
            }else if(keyIn === 'p'){//Edit parameters
                cls();
                header("EDIT PARAMETERS");
                console.log("Existing parameter is: '" + (argumentString ? argumentString : "empty") + "'");
                argumentString = readline.question("What is the new parameter? ");
                needsGeneration = true;
                resetInit();
            }
        }
    } else {
        //If we're not interactive, just generate the npc
        return generate(argumentString, shortened).pretty;
    }
}

/**
 * Renders the controls for the NPC interactive mode
 */
function renderControls() {
    //First print the header
    console.log("\n" + header("CONTROLS"));
    //Now populate the controls array
    let controls = [
        { key: "q", desc: "quit" },
        { key: "n", desc: "new" },
        { key: "p", desc: "params" },
        { key: "s", desc: "save" }
    ];
    console.log(table(controls, ["key", "desc"]));
}

/**
 * Tries to build and return an NPC from the provided argument string
 * @param {String} argumentString
 * @param {Boolean} shorted if true, then it means we only want basic info 
 */
function generate(argumentString, shortened) {
    //Explicitly set to false if not set
    if (!shortened) shortened = false;

    //Split the argumentString into parts
    let args = argumentString.split(" ");

    /**Test each of the environment variables to see if it is already to include a range */
    for (var i = 0; i < args.length; i++) {
        //Store in a temp variable
        var choice = args[i];
        //Now check what every arg is
        if (isShortened(choice)) {
            shortened = true;
        } else if (isRace(choice)) {
            race = choice;
        } else if (isGender(choice)) {
            gender = choice;
        } else if (isAge(choice)) {
            age = choice;
        }
    }

    //Roll all attributes randomly
    var appearance = rnd(appearances);
    var highAbility = rnd(abilities_h);
    let index = abilities_h.indexOf(highAbility);
    var lowAbility = rnd(abilities_l);
    //Add a loop to prevent the two abilities being the same
    while (abilities_l.indexOf(lowAbility) == index) {
        lowAbility = rnd(abilities_l);
    }
    //Continue with character gen
    var talent = rnd(talents);
    var mannerism = rnd(mannerisms);
    var interactionTrait = rnd(interactionTraits);
    var ideal = rnd(ideals);
    var bond = rnd(bonds);
    var flaw = rnd(flaws);

    /**Now that we have checked all of our selections, we make our choices, first race*/
    race = rnd(getRaces());
    /**Then gender */
    gender = rnd(getGenders());
    /**And end with age */
    age = getAge();

    /**Add a charater trait for flavor*/
    const trait = rnd(character);
    /**Gets a name from the now known information */
    const name = getName();
    /**What pronoun to use, suck it SJW's */
    const pronoun = gender == 'male' ? 'he' : 'she';

    //Construct the output
    let output = chalk.bold("Name:\t\t") + name + chalk.bold("\nSex, Race, Age:\t") + gender + " " + race.name + " of " + age + " years old."
        + chalk.bold("\nAppearance:\t") + pronoun + " has " + appearance
    if (!shortened) output = output + chalk.bold("\nHigh Ability:\t") + highAbility + chalk.bold("\nLow Ability:\t") + lowAbility + chalk.bold("\nTalent:\t\t") + talent
    output += chalk.bold("\nMannerism:\t") + mannerism + chalk.bold("\nInteraction:\t") + interactionTrait + " and " + trait
    if (!shortened) output = output + chalk.bold("\nIdeal:\t\t") + ideal + chalk.bold("\nBond:\t\t") + bond + chalk.bold("\nFlaw:\t\t") + flaw;

    let plaintext = ("Name:\t\t") + name + ("\nSex, Race, Age:\t") + gender + " " + race.name + " of " + age + " years old."
        + ("\nAppearance:\t") + pronoun + " has " + appearance
    if (!shortened) plaintext = plaintext + ("\nHigh Ability:\t") + highAbility + ("\nLow Ability:\t") + lowAbility + ("\nTalent:\t\t") + talent
    plaintext += ("\nMannerism:\t") + mannerism + ("\nInteraction:\t") + interactionTrait + " and " + trait
    if (!shortened) plaintext = plaintext + ("\nIdeal:\t\t") + ideal + ("\nBond:\t\t") + bond + ("\nFlaw:\t\t") + flaw;
    
    //Return the pretty and plain version
    return { pretty: output, plain: plaintext };
}