const { shuffle } = require("./random");
const { header } = require("./table");
const chalk = require('chalk');

/**
 * This module gives you a random three card Tarot spread either for inspiration
 * or to use during a roleplay session
 */

const majorArcana = {
    "The Fool": 'Embrace all that lies ahead of you without worry.',
    "The Magician": 'You do not need to wait, you are ready to act.',
    "The High Priestess": 'Turn to your intuition and look within yourself.',
    "The Empress": 'Be kind, enjoy beauty, and love.',
    "The Emperor": 'You hold immense power over your own life.',
    "The Hierophant": 'Follow your faith, or seek spiritual guidance.',
    "The Lovers": 'Represents close relationships, might need more attention.',
    "The Chariot": 'Follow your natural drive, you are an unstoppable force.',
    "Strength": 'You are strong enough to handle what you are facing.',
    "The Hermit": 'Be very still and listen to the answers within.',
    "Wheel of Fortune": 'Nothing is permanent, bad or good. Cherish the lessons of this moment.',
    "Justice": 'Make sure you are acting fairly, karma is real, you deserve this.',
    "The Hanged Man": 'You are in limbo, small sacrifices. Let go of what is not working.',
    "Death": 'Cycles, beginnings and endings. With every end comes a new beginning.',
    "Temperance": 'Moderation, do not force your life, but go with it.',
    "The Devil": 'You feel you are stuck, you hold the keys to your own freedom.',
    "The Tower": 'Everything is about to come crumbling down, let it happen.',
    "The Star": 'Hope and healing. The universe is working in your favor.',
    "The Moon": 'You are anxious, subconscious. Do not let your subconscious rule.',
    "The Sun": 'Happiness, joy. You are moving in the right direction.',
    "Judgement": 'It is never too late to make a change. Consequences.',
    "The World": 'You are where you should be and are ready for the next phase of your journey.'
};

const minorArcanaTemplate = [
    "Ace of", "Two of", "Three of",
    "Four of", "Five of", "Six of",
    "Seven of", "Eight of", "Nine of",
    "Ten of", "Page of", "Knight of",
    "Queen of", "King of",
];

const subDeckExplanations = {
    'wands': 'Action, initiative, and invention',
    'cups': 'Emotions, intuition, and relationships.',
    'swords': 'Challenges, thoughts, and conflicts.',
    'pentacles': 'Work, finances, and security.'
}

const numerology = {
    'Ace': 'New beginning.',
    'Two': 'Partnership, diplomacy.',
    'Three': 'Transition and drive.',
    'Four': 'Stability.',
    'Five': 'Change.',
    'Six': 'Harmony.',
    'Seven': 'Mystery.',
    'Eight': 'Strength.',
    'Nine': 'Leadership.',
    'Ten': 'Completion.',
    'Page': 'Change, Dreamer, Youth.',
    'Knight': 'Determination, Exuberance, Drive.',
    'Queen': 'Feminine, Authorative, Intuition',
    'King': 'Power, Masculinity, Order'
}

const createMinorArcanaSubDeck = (name) => {
    return minorArcanaTemplate.map(card => `${card} ${name}`);
}

const wands = createMinorArcanaSubDeck("Wands");
const cups = createMinorArcanaSubDeck("Cups");
const swords = createMinorArcanaSubDeck("Swords");
const pentacles = createMinorArcanaSubDeck("Pentacles");
const deck = [...Object.keys(majorArcana), ...wands, ...cups, ...swords, ...pentacles];

const isCardInDeck = (card, deck) => {
    return deck.indexOf(card) > -1;
}

const findNumerology = (card) => {
    const numbers = Object.keys(numerology);
    for (let number of numbers) {
        if (card.indexOf(number) > -1) {
            return numerology[number];
        }
    }
    return '';
}

const explainMinorArcana = (deckName, card) => {
    return [findNumerology(card), subDeckExplanations[deckName]];
}

const explainMajorArcana = (card) => {
    return majorArcana[card];
}

const explain = (card) => {
    const isReversed = Math.random() > 0.5;
    const lines = [];
    if (isCardInDeck(card, wands)) {
        lines.push(...explainMinorArcana('wands', card));
    } else if (isCardInDeck(card, cups)) {
        lines.push(...explainMinorArcana('cups', card));
    } else if (isCardInDeck(card, swords)) {
        lines.push(...explainMinorArcana('swords', card));
    } else if (isCardInDeck(card, pentacles)) {
        lines.push(...explainMinorArcana('pentacles', card));
    } else {
        lines.push(explainMajorArcana(card));
    }

    const explanation = header(card) + lines.join(' ');
    console.log(isReversed ? chalk.red(explanation) : explanation);
    console.log('');
}

exports.tarot = function () {
    const shuffled = shuffle(deck);
    shuffled.splice(0, 3).forEach(card => explain(card));
}