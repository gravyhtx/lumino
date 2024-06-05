// ~/utils/core/random.ts
import { splitArray } from "./arrays";

//!=/=======\=!//
//?[ NUMBERS ]?//
//!=\=======/=!//

/**
 * Returns a random number between a minimum and maximum value.
 *
 * @param {number | [number, number]} num - Either a number or an array of two numbers representing the minimum and maximum values.
 * @param {number} [shift] - An optional value to shift the range up or down.
 * @returns {number} A random number between the specified range.
 *
 * @example
 * const result1 = randomize(10); // returns a random number between 0 and 10
 * const result2 = randomize([5, 10]); // returns a random number between 5 and 10
 * const result3 = randomize([5, 10], 2); // returns a random number between 7 and 12
 */
export const randomize = (
  num: number | [ min:number, max:number ],
  shift?: number
): number => {
  let max: number;
  let min: number;
  if(Array.isArray(num)) {
    min = num[0] && num[1] && num[0] > 0 && num[0] < num[1] ? num[0] : 0;
    max = num[0] && num[1] && num[1] > num[0] ? num[1] : 1;
  } else {
    min = 0;
    max = num && num > 0 ? num : 1;
  }
  const shiftNum  = shift ? min + shift : min;
  return Math.floor(Math.random() * (max-min)) + shiftNum;
}

/**
 * Tosses a coin and returns true or false.
 *
 * @param {boolean} [useBoolean=false] - Whether to use the current timestamp instead of `Math.random()`.
 * @returns {boolean} True if heads (or 0 if useBoolean is true), false if tails (or 1 if useBoolean is true).
 *
 * @example
 * const result1 = cointoss(); // returns true or false randomly
 * const result2 = cointoss(true); // returns true if the current time is even, false if odd
 */
export const cointoss = (useBoolean=false): boolean => {
  if (useBoolean) {
    const now = new Date().getTime();
    return now % 2 === 0;
  } else {
    return Math.random() >= 0.5;
  }
}

/**
 * Returns a random number that is either positive or negative.
 *
 * @param {number} [n=1] - The number to make positive or negative.
 * @returns {number} A random number that is either positive or negative.
 *
 * @example
 * const result1 = randomPosNeg(); // returns either 1 or -1
 * const result2 = randomPosNeg(5); // returns either 5 or -5
 */
export const randomPosNeg = (n: number): number => {
  return (n?n:1)*(Math.round(Math.random()) * 2 - 1)
}

/**
 * Rolls a random number and stores/retrieves it in local storage.
 *
 * @param {number | 'get' | 'set'} operation - A number or 'set' to set a random number in local storage or 'get' to retrieve it.
 * @param {string | number} [id] - Optional identifier to distinguish between multiple luckyRoll instances.
 * @returns {void | number | null} If 'get' is used, returns the lucky number, otherwise returns nothing.
 *
 * @example <caption>Set a lucky number</caption>
 * luckyRoll('set', 'myNumber'); // sets a random number between 1 and 100 in local storage with the key 'luckyNumber_myNumber'
 *
 * @example <caption>Get a lucky number</caption>
 * const myLuckyNumber = luckyRoll('get', 'myNumber'); // retrieves the lucky number from local storage with the key 'luckyNumber_myNumber'
 */
export const luckyRoll = (
  operation: number | 'get' | 'set',
  id?: string | number
): void | number | null => {
  const len = localStorage.length;
  const prefix = "luckyNumber_";

  if (operation === 'set' && !id) {
    const randomString = Math.random().toString(36).slice(2);
    id = `_${len}-${randomString}`;
  }

  if (typeof id === 'number') {
    id = id.toString();
  }

  const fullKey = prefix + (id ? id : '');

  if (operation === 'get') {
    if (!id) {
      console.warn('No identifier provided.');
      return null;
    }

    // Handle the case where id is a number
    const keys = Object.keys(localStorage).filter(key => key.startsWith(prefix + (typeof id === 'number' ? id + "-" : id)));

    if (keys.length === 0) {
      console.warn('No matching keys found.');
      return null;
    }

    if (keys.length > 1) {
      console.warn('Multiple matching keys found.');
      return null;
    }

    return Number(localStorage.getItem(String(keys[0])));
  }

  const output = Math.floor(Math.random() * (Number(operation === 'set' ? 100 : operation)) + 1);
  localStorage.setItem(fullKey, output.toString());
};

/**
 * Generates a random value from a bell curve distribution using the Box-Muller transform.
 *
 * @param {number} [multiplier=1] - A number to multiply the result by. If not provided, the result will be in the range [min, max].
 * @param {number} [min=0] - The minimum value of the output range.
 * @param {number} [max=1] - The maximum value of the output range.
 * @param {number} [skew=1] - A factor that skews the distribution. Values greater than 1 skew towards the maximum, while values less than 1 skew towards the minimum.
 * @param {number} [maxResamples=5] - The maximum number of times to resample the value if it falls outside the desired range.
 * @returns {number} A random value from the specified bell curve distribution, multiplied by the multiplier if provided.
 *
 * @example <caption>Generate a random value from a standard bell curve distribution</caption>
 * const result1 = randomBell(); // returns a random value between 0 and 1 from a standard bell curve distribution
 *
 * @example <caption>Generate a random value from a skewed bell curve distribution</caption>
 * const result2 = randomBell(1, 0, 10, 2); // returns a random value between 0 and 10 from a bell curve distribution skewed towards the maximum
 */
export const randomBell = (
  multiplier = 1,
  range = [0, 1],
  skew = 1,
  maxResamples = 5
): number => {
  const [min=0, max=1] = range;
  // Validate input parameters
  if (min >= max) {
    throw new Error('Min must be less than Max');
  }

  if (skew <= 0) {
    throw new Error('Skew must be greater than 0');
  }

  let bellValue = 0;
  let resampleCount = 0;

  while (resampleCount < maxResamples) {
    let uniformRandom1 = 0;
    let uniformRandom2 = 0;

    // Generate two uniform random numbers in the range (0, 1)
    while (uniformRandom1 === 0) uniformRandom1 = Math.random();
    while (uniformRandom2 === 0) uniformRandom2 = Math.random();

    // Apply the Box-Muller transform to convert uniform random numbers to a standard normal distribution
    const standardNormal = Math.sqrt(-2.0 * Math.log(uniformRandom1)) * Math.cos(2.0 * Math.PI * uniformRandom2);

    // Translate the standard normal value to the range [0, 1]
    bellValue = (standardNormal / 10.0) + 0.5;

    // Check if the bell value is within the valid range
    if (bellValue >= 0 && bellValue <= 1) {
      // Apply the skew factor
      bellValue = Math.pow(bellValue, skew);

      // Scale the bell value to the desired range [min, max]
      bellValue = bellValue * (max - min) + min;

      break;
    }

    resampleCount++;
  }

  // Multiply the result by the multiplier if provided
  return multiplier !== 1 ? bellValue * multiplier : bellValue;
};

/**
 * Generates an array of random number values.
 *
 * @param {number} length - The length of the array.
 * @param {number} maxNum - The maximum number value.
 * @returns {number[]} An array of random number values.
 *
 * @example
 * const result = randomNumberArray(5, 10); // returns an array of 5 random numbers between 1 and 10
 */
export const randomNumberArray = (length: number, maxNum: number) => {
  const randomNum = randomize(maxNum) + 1
  if (length < 1) {
    return [];
  }
  return Array.from({length: length}, () => randomNum);
}


//!=/=======\=!//
//?[ STRINGS ]?//
//!=\=======/=!//


/**
 * Randomizes the order of characters in a string.
 *
 * @param {string} str - The string to shuffle.
 * @returns {string} The shuffled string.
 *
 * @example
 * const result = shuffleStr('hello'); // returns a string with the characters of 'hello' in a random order
 */
export const shuffleStr = (str: string) => { // Randomizes character order of a string
  const arr = str.split('');
  const output = shuffleArr(arr).join('');
  return output;
}


//!=/======\=!//
//?[ ARRAYS ]?//
//!=\======/=!//

/**
 * Shuffles the elements of an array in-place using the Fisher-Yates algorithm.
 *
 * @param {(T | undefined)[]} array - The array to be shuffled.
 * @returns {(T | undefined)[]} The shuffled array.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const shuffledArr = shuffle(arr); // returns [3, 5, 2, 1, 4] (or any other random order)
 */
export const shuffle = <T>(array: (T | undefined)[]): (T | undefined)[] => {
  for (let i = array.length -1; i > 0; i--) {
    const j: number = randomize(i);
    const k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
  return array;
}


/**
 * Randomly shuffles the order of an array in place.
 *
 * @param {(T | undefined)[]} array - The array to shuffle.
 * @returns {(T | undefined)[]} The shuffled array.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const shuffledArr = shuffleArr(arr); // returns [3, 5, 2, 1, 4] (or any other random order)
 */
export const shuffleArr = <T>(array: (T | undefined)[]): (T | undefined)[] => {
  //? Get number of indexes to replace
  let index = array.length;
  let randomIndex: number;
  while (index !== 0) {
    //? Randomly choose from available eleme: unknown[]nts.
    randomIndex = randomize(index);
    index--;
    //? Replace current index with random element.
    [array[index], array[randomIndex]] =
    [array[randomIndex], array[index]];
  }
  return array;
}

/**
 * Shuffles an array like a deck of cards.
 *
 * @param {T[]} array - The array to shuffle.
 * @param {number} [setSplit] - Optional number of sets to split the array into (default is 2).
 * @param {'bell' | boolean} [bellSplit=false] - Optional "bell curve" splitting (splitting the sets more near the center of the array) or 'bell'.
 * @param {boolean} [tarot=false] - Optional flag to keep track of whether a card is reversed or not (default is false).
 * @returns {T[]} The shuffled array.
 *
 * @example
 * const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const shuffledDeck = shuffleDeck(deck); // returns the deck shuffled like a deck of cards
 */
const shuffleDeck = <T>(
  array: T[],
  setSplit?: number,
  bellSplit?: 'bell' | boolean,
  tarot?: boolean
): T[] => {
  tarot = tarot === true ? true : false;
  // First split
  const split: [T[], T[]] = splitArray(array, bellSplit ? "bell" : false, setSplit);
  const len = array.length;

  const arr: T[] = [];
  const setA: T[] = split[0];
  const setB: T[] = split[1];

  // Type guard to check if an item is Reversable
  function hasReversedProperty<T>(item: T): item is Extract<T, { reversed: boolean }> {
    return typeof item === 'object' && item !== null && 'reversed' in item && typeof item.reversed === 'boolean';
  }

  // Shuffle
  for (let i = len; i > 0; i--) { // Emulate odds of left vs. right side being shuffled in
    const sel = cointoss();
    if ((sel && setA.length) || setB.length === 0) {
      const item = setA.shift();
      if (item !== undefined) {
        arr.push(item);
      }
    } else {
      if (setB.length > 0) {
        const item = setB[0];
        if (tarot && hasReversedProperty(item)) {
          item.reversed = !item.reversed;
        }
        const shiftedItem = setB.shift();
        if (shiftedItem !== undefined) {
          arr.push(shiftedItem);
        }
      }
    }
  }

  // Second split
  const outputArr = splitArray(arr, bellSplit ? "bell" : false, setSplit);
  const output = outputArr[1].concat(outputArr[0]); // Combine sets

  return output;
}

//* THE "SHUFFLE CARDS" FUNCTION -- Includes # of Rounds, Computer Shuffle, & Split options
/**
 * Shuffle an array of cards like a deck of cards, with options for number of rounds, computer shuffle, and split options.
 * 
 * @param {unknown[]} array - The array of cards to be shuffled.
 * @param {number} [rounds] - The number of times the array will be shuffled.
 * @param {boolean} [moreRandom] - Whether or not to add more randomization to the shuffle.
 * @param {'bell' | boolean} [split] - The option for splitting the deck. Using "bell" for split will give the best approximation for an automated middle-split, while using a number will split at an exact point for every shuffle (minimum is 1, maximum is 1 less than the array length). No split will split in the middle or, when odd, setA will be weighted with more.
 * @param {boolean} [tarot] - Whether or not the array is a tarot deck.
 * 
 * @returns {unknown[]} The shuffled array of cards.
 */
export const shuffleCards = <T>(
  array: (T | undefined)[],
  rounds=1,
  opts: {
    moreRandom?: boolean,
    split?: 'bell' | boolean | number,
    tarot?: boolean
  }
): (T | undefined)[] => {
  const { split, tarot=false, moreRandom=false } = opts;

  const bellSplit = split === "bell" || split === true ? true : false;
  const setSplit = !bellSplit && typeof split === 'number' && !Number.isNaN(split)
    ? split : undefined;

  let output = shuffleDeck(array, setSplit, bellSplit, tarot);

  if (rounds && rounds > 1) {
    for (let i = 0; i < (rounds - 1); i++) {
      output = shuffleDeck(output, setSplit, bellSplit, tarot);
    }
  }

  if (moreRandom) {
    output = shuffle<T>(output);
  }

  return output;
}