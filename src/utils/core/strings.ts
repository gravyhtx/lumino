// ~/utils/core/strings.ts
import TITLECASE from "~/constants/titlecase";
import { CHICAGO_CAPS, GREEK_ALPHABET, NYT_CAPS, PREPOSITIONS } from "~/constants/grammar";
import { checkType } from "../validation";
import type { RegExpFlag } from "~/types/RegExp";
import type { TitlecaseConfig } from "./types";

//* ADD LEADING ZEROS TO NUMBER
/**
 * Adds leading zeros to a number and returns it as a string.
 * @param num - The number to add leading zeros to. Default is 1.
 * @param pad - The number of digits the output string should have. Default is 3.
 * @returns A string with leading zeros added to the number.
 */
export const addZeros = (num?: number, pad?: number): string => {
  //? Add "0" to the beginning of a number and convert to string.
  //? Default: "001"
  num = num ? num : 1;
  pad = pad ? pad : 3;
  return num.toString().padStart(pad, '0');
}


//* REMOVE ALL NON-ALPHANUMERIC CHARACTERS
/**
 * Remove all non-alphanumeric characters from a string.
 * @param {string} text - The text to strip non-alphanumeric characters from.
 * @param {boolean} [lowerCase=false] - Whether to convert the result to lowercase. Default is false.
 * @returns {string} The input text with all non-alphanumeric characters removed.
 */
export const alphaNumeric = (text: string, lowerCase?: boolean): string => {
  lowerCase = lowerCase ? lowerCase : false;
  const strip = text.trim().replace(/[^a-zA-Z0-9]/g, "");
  return lowerCase === true ? strip.toLowerCase() : strip;
}


//* REMOVE ALL NON-ALPHABET CHARACTERS
export const alphaOnly = (text: string, lowerCase?: boolean): string => {
  lowerCase = lowerCase ? lowerCase : false;
  const strip = text.trim().replace(/[^a-zA-Z]/g, "");
  return lowerCase === true ? strip.toLowerCase() : strip;
}


//* REMOVE WHITE SPACE -- Preserves new lines
/**
 * Removes all non-alphabet characters from a string.
 * 
 * @param {string} text - The string to remove non-alphabet characters from.
 * @param {boolean} [lowerCase=false] - Whether to convert the resulting string to lowercase.
 * 
 * @returns {string} The resulting string with only alphabetical characters.
 */
export const noSpaces = (
  text: string,
  options: {
    trimOnly: boolean;
  }={ trimOnly: false }
): string => {
  const { trimOnly } = options;
  const trimmedLines = text.split('\n').map(line => line.replace(/\s+/g, ' ').trim());
  const result = trimmedLines.join('\n');
  return trimOnly ? result : result.replace(/\n/g, '');
}


//* PAD START/END OF STRING
/**
 * Pad start/end of a string or number with a given character.
 * @param {string|number} string - The string or number to be padded.
 * @param {number} [padLength=2] - The length of the padding. Default is 2.
 * @param {string} [padCharacter='0'] - The character used for padding. Default is '0'.
 * @param {boolean} [addByLength=false] - If true, add padding to both start and end of string. Default is false.
 * @returns {Object} An object containing the padded start and/or end strings.
 *                   If addByLength is true, the object will also include the string with padding on both sides.
 *                   For example, { start: '01', end: '10', both: '010' }
 */
export const padString = (
  string: string | number,
  padLength = 2,
  padCharacter = '0',
  addByLength = false
) : { start: string, end: string } | { start: string, end: string, both: string } => {

  //? Enter parameters and use dot notation or destructuring to display
  //? whichever new string with padding placement is needed

  //? Set defaults
  const length = padLength && padLength > 0 ? padLength : 2;
  //? Convert any numbers to a string
  const newStr = string.toString();
  //? Pad start of string with given character
  const startPad = newStr.padStart(length, padCharacter);
  const endPad = newStr.padEnd(length, padCharacter);
  if (addByLength) {
    //? Repeat 'padCharacter' if 'addByLength' is true
    const repeatChar = padCharacter.repeat(padLength)
    return {
      start: repeatChar+newStr,
      end: newStr+repeatChar,
      both: repeatChar+newStr+repeatChar
    }
  } else {
    return {
      start: startPad,
      end: endPad
    }
  }
}


//* SPLIT STRING TO ARRAY
/**
 * Splits a string into an array of its individual characters
 * @param {string} str - The string to split into an array
 * @returns {string[]} An array of each individual character in the string
 */
export const splitString = (str: string): string[] => {
  //? Outputs an array of each individual character
  return [...str];
}


//* REVERSE STRING ORDER
/**
 * Reverses the order of characters in a string.
 * @param {string} str - The string to reverse.
 * @returns {string} - The reversed string.
 */
export const reverseString = (str: string): string => {
  //? Reverses character array and joins back to string
  return splitString(str).reverse().join('');
}


//* ADD ELLIPSIS TO END OF STRING
/**
 * Adds an ellipsis to the end of a string, if a certain condition is met.
 * 
 * @param {string} str - The string to add an ellipsis to.
 * @param {boolean | function} [condition=true] - A condition to check before adding the ellipsis.
 * Can be a boolean value or a function that returns a boolean.
 * @returns {string} - The original string with an ellipsis added to the end, or the original string if
 * the condition is not met or the string already ends with a punctuation mark.
 */
export const addEllipsis = (str: string, condition?: boolean | (() => boolean)): string => {
  //? Check for condition or ignore this check
  const check = condition !== undefined && typeof condition === 'function'
      ? condition()
    : condition !== undefined && typeof condition === 'boolean'
      ? condition
      : true;
  //? Add an ellipsis if chadracter limit is less than the length of the string
  //? Ignore if the new string ends with any other punctuation mark
  if(check
    && !str.endsWith(`?`) && !str.endsWith(`!`)
    && !str.endsWith(`"`) && !str.endsWith("'")) {
    //? Check if there is already a "." at the end of the new string to add two
    //? if there is or three if there isn't
    return str.endsWith('.') ? str += '..' : str += '...';
  }
  return str;
}


//* LIMIT CHARACTERS IN A STRING
/**
 * Limits the number of characters in a string and adds an ellipsis if necessary.
 * @param {number} len - The maximum number of characters to allow.
 * @param {string} string - The string to limit.
 * @param {boolean} [completeWords=false] - If true, will limit to the end of the last word.
 * @param {boolean} [ellipsis=true] - If true, will add an ellipsis if necessary.
 * @returns {string} The trimmed and optionally ellipsized string.
 */
export const charLimit = (
  len: number,
  string: string,
  completeWords?: boolean,
  ellipsis?: boolean
): string => {
  //? Trim string to chararcter limit
  let trim = string.slice(0, len);

  if(completeWords === true) {
    //? If character is cut off in middle of word continue final word
    trim = trim.slice(0, Math.min(trim.length, trim.lastIndexOf(" ")));
  }
  //? Add an ellipsis if character limit is less than the length of the string
  //? Ignore if the new string ends with any other punctuation mark
  const condition = ellipsis === true && len < string.length

  //? Return with ellipsis if condition is met
  return addEllipsis(trim, condition);
}


//* LIMIT WORD COUNT IN STRING
/**
 * Limits the number of words in a string
 *
 * @param {number} len - The maximum number of words to allow
 * @param {string} string - The input string to limit
 * @param {boolean} [ellipsis=false] - Whether to add an ellipsis if the limit is reached
 * @returns {string} The new string with limited words
 */
export const wordLimit = (
  len: number,
  string: string,
  ellipsis?: boolean
): string => {
  const split = string.trim().split(' ');
  const arr = split.slice(0, len);
  const output = arr.join(' ');
  const condition = ellipsis === true && len < split.length;
  return addEllipsis(output, condition);
}


//* GET WORD COUNT
/**
 * Counts the number of words in a string.
 * 
 * @param {string} str - The input string to count the words in.
 * @returns {number} The number of words in the string.
 */
export const wordCount = (str: string): number => {
  return str.trim().split(/\s+/).length;
}


//* REPEAT A STRING OVER A GIVEN NUMBER OF CHARACTERS
/**
 * Repeat a string over a given number of characters
 * @param {string} str - The string to be repeated
 * @param {number} numChars - The total number of characters desired in the output string
 * @returns {string} The repeated string with length equal to numChars
 */
export const stringRepeat = (str: string, numChars: number): string => {
  return str.repeat(Math.ceil(numChars / str.length)).slice(0, numChars)
}


//* FILL A STRING TO WORD COUNT LENGTH WITH A GIVEN INPUT STRING
/**
 * Fill a string with a given input string to match a target word count
 * @param {string} words - The input string to fill with
 * @param {number} maxWords - The target word count to fill to
 * @param {boolean} [ellipsis=true] - Whether or not to add an ellipsis if the final string is shorter than the target word count
 * @returns {string} The filled string
 */
export const fillWords = (
  words: string,
  maxWords: number,
  ellipsis = true // Defaults to adding ellipsis at end of string
): string => {

  //? Split words into an array
  const wordArr = words.split(' ');
  
  //? Get length of 'wordArr'
  const wLen = wordArr.length;

  //? Determine number of times to loop through 'words'
  const loop = maxWords && (maxWords < wLen ?? maxWords === undefined) ? 1 : Math.ceil(maxWords / wLen);
  //? New array
  const arr: string[] = [];

  for(let i=0; i < loop; i++) {
    arr.push(words);
  }
  const strFromArr = arr.join(' ');
  const arrFromStr = strFromArr.split(' ');
  const lenMatch = arrFromStr.length === maxWords;
  if(maxWords){
    arrFromStr.length = maxWords;
  }
  const output = arrFromStr.join(' ');

  const condition = ellipsis === true && !lenMatch
  return addEllipsis(output, condition);
}


//* CHECK FOR A SEARCH TERM IN A STRING OR ARRAY OF STRINGS
/**
 * Checks if a search term exists in a string or array of strings
 * @param checks A string or array of strings to search
 * @param searchTerm The search term to look for
 * @returns An object containing the search results: 
 *    If `checks` is a string, the object will contain `includes`, `startsWith`, 
 *    and `endsWith` properties with boolean values indicating whether the search term 
 *    was found in the respective position in the string.
 *    If `checks` is an array of strings, the function returns a boolean indicating whether 
 *    the search term exists in the array.
 */
export const stringSearch = (
  checks: string | string[],
  searchTerm: string,
) => {
  if(!Array.isArray(checks)) {
    return {
      includes: checks.includes(searchTerm),
      startsWith: checks.startsWith(searchTerm),
      endsWith: checks.endsWith(searchTerm),
    }
  } else {
    const arrSet = new Set(checks);
    return arrSet.has(searchTerm);
  }
}


//* CAPITALIZE FIRST LETTER
/**
 * Capitalizes the first letter of a string, or all words if specified.
 *
 * @param {string} string - The string to capitalize.
 * @param {boolean} [firstLetterOnly] - If `true`, only the first letter of the string will be capitalized.
 * If `false` or omitted, all other letters will keep their original casing.
 * @returns {string} The capitalized string.
 */
export const capitalize = (string: string, firstLetterOnly?: boolean): string => {
  //? If 'firstLetterOnly' is true, all other characters are lowercase
  if(firstLetterOnly) {
    string = string.toLowerCase();
  }
  //? If 'firstLetterOnly' is not true then other characters will keep their casing
  return string.charAt(0).toUpperCase() + string.slice(1);
}


//* CAPITALIZE MULTIPLE WORDS IN A STRING OR ARRAY
/**
 * Capitalizes the first letter of each word in a string, with the option to ignore specific words.
 * @param input - The string to capitalize.
 * @param titleCase - A boolean indicating whether to capitalize all words, except for ignored words, or to only capitalize the first word.
 * @param ignoreWordsList - An optional array of strings indicating words to ignore when capitalizing.
 * @returns A new string with the specified words capitalized.
 */
export const capitalizeWords = (input: string, titleCase = false, ignoreWordsList: string[] = []): string => {
  const words = input.trim().split(" ");

  const findIgnoredVersion = (word: string) => {
    return ignoreWordsList.find(iw => iw.toLowerCase() === word.toLowerCase());
  };

  const isIgnored = (word: string): boolean => {
    return Boolean(ignoreWordsList.some(iw => iw.toLowerCase() === word.toLowerCase())) ?? Boolean(TITLECASE.includes(word.toLowerCase() as typeof TITLECASE[number]));
  };

  return words
    .map((word, index) => {
      if (word.match(/^\d+$/)) {
        return word;
      }

      if (index === 0) {
        const ignoredVersion = findIgnoredVersion(word);
        return ignoredVersion ?? capitalize(word);
      }

      const lowercaseWord = word.toLowerCase();
      if (titleCase && !isIgnored(lowercaseWord)) {
        return capitalize(lowercaseWord);
      }

      const ignoredVersion = findIgnoredVersion(word);
      return ignoredVersion ?? lowercaseWord;
    })
    .join(" ");
};

//** SIMPLE TITLE CASE
/**
 * Capitalizes the first letter in each word of a string, except for words in the
 * `ignore` array.
 *
 * @param input - The string to convert to title case.
 * @param ignore - An optional array of words to not capitalize in the output.
 *
 * @returns The input string with the first letter of each word capitalized, except for ignored words.
 */
export const title = (input: string, ignore: string[] = []) => {
  return capitalizeWords(input, true, ignore);
};

/**
 * Converts a string to title case based on the specified style preference and configuration options.
 *
 * @param {string} title - The string to convert to title case.
 * @param {TitlecaseConfig} [config={}] - The configuration options for title casing.
 * @param {string} [config.preference='AP'] - The style preference for title casing. Supported values: 'AMA', 'AP', 'APA', 'NYT', 'CMOS', 'MLA', 'Wikipedia', 'Bluebook'.
 * @param {boolean} [config.ignoreCapitalized=true] - Whether to ignore words that are fully capitalized.
 * @param {string[]} [config.exceptions=[]] - An array of words that should not be capitalized.
 * @param {3 | 4 | false} [config.prepositionCase=false] - The length of prepositions to keep lowercase. Set to 3 or 4 to keep prepositions with 3 or 4 letters lowercase, or false to ignore preposition length.
 * @param {string[]} [config.exactCases=[]] - An array of words that should maintain their exact casing.
 * @param {Record<string, number[]>} [config.instanceExceptions={}] - An object specifying the instances of words that should be capitalized. The key is the word, and the value is an array of 1-based indices indicating which instances should be capitalized.
 *
 * @returns {string} The string converted to title case based on the specified configuration.
 *
 * @example
 * // Basic usage with default configuration (AP style)
 * titlecase('the quick brown fox jumps over the lazy dog');
 * // Returns: 'The Quick Brown Fox Jumps Over the Lazy Dog'
 *
 * @example
 * // Using AMA style with custom exceptions and preposition case
 * titlecase('the quick brown fox jumps over the lazy dog', {
 *   preference: 'AMA',
 *   exceptions: ['fox', 'dog'],
 *   prepositionCase: 3
 * });
 * // Returns: 'The Quick Brown fox Jumps over the Lazy dog'
 *
 * @example
 * // Using NYT style with exact cases and instance exceptions
 * titlecase('the quick brown fox jumps over the lazy dog', {
 *   preference: 'NYT',
 *   exactCases: ['QuIcK'],
 *   instanceExceptions: { 'the': [1, 7] }
 * });
 * // Returns: 'The QuIcK Brown Fox Jumps Over The Lazy Dog'
 *
 * @example
 * // Handling Greek letters
 * titlecase('β-blocker and δ-9-tetrahydrocannabinol', {
 *   preference: 'AP'
 * });
 * // Returns: 'β-Blocker and Δ-9-tetrahydrocannabinol'
 */
export const titlecase = (title: string, config: TitlecaseConfig = {}) => {
  const {
    preference = 'AP',
    ignoreCapitalized = true,
    exceptions = [],
    prepositionCase = false,
    exactCases = [],
    instanceExceptions = {},
  } = config;

  const words = title.split(' ');

  const capitalizeWord = (word: string, index: number, totalWords: number) => {
    const lowerCaseWord = word.toLowerCase();

    if (ignoreCapitalized && word === word.toUpperCase()) {
      return word;
    }

    if (exactCases.includes(word)) {
      return word;
    }

    if (index === 0 || index === totalWords - 1) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (instanceExceptions[lowerCaseWord]?.includes(index)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (exceptions.includes(lowerCaseWord)) {
      return lowerCaseWord;
    }

    if (prepositionCase) {
      if (PREPOSITIONS.includes(lowerCaseWord as typeof PREPOSITIONS[number])) {
        if (prepositionCase === 3 && lowerCaseWord.length <= 3) {
          return lowerCaseWord;
        }
        if (prepositionCase === 4 && lowerCaseWord.length <= 4) {
          return lowerCaseWord;
        }
      }
    }

    if (preference === 'NYT' && NYT_CAPS.includes(lowerCaseWord as typeof NYT_CAPS[number])) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (['CMOS', 'MLA'].includes(preference) && CHICAGO_CAPS.includes(lowerCaseWord as typeof CHICAGO_CAPS[number])) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const greekLetterIndex = GREEK_ALPHABET.LOWERCASE.indexOf(word.charAt(0) as typeof GREEK_ALPHABET.LOWERCASE[number]);
    if (greekLetterIndex !== -1) {
      const nextChar = word.charAt(1);
      if (
        nextChar &&
        !GREEK_ALPHABET.LOWERCASE.includes(nextChar as typeof GREEK_ALPHABET.LOWERCASE[number]) &&
        !GREEK_ALPHABET.UPPERCASE.includes(nextChar as typeof GREEK_ALPHABET.UPPERCASE[number])
      ) {
        const currentLetter = GREEK_ALPHABET.LOWERCASE[greekLetterIndex];
        const isWordEnd = greekLetterIndex === GREEK_ALPHABET.LOWERCASE.length - 1;
        const lowercaseLetter = currentLetter === 'σ' && isWordEnd ? 'ς' : currentLetter;
        return lowercaseLetter + nextChar.toUpperCase() + word.slice(2);
      }
    }

    const greekLetterIndexUpper = GREEK_ALPHABET.UPPERCASE.indexOf(word.charAt(0) as typeof GREEK_ALPHABET.UPPERCASE[number]);
    if (greekLetterIndexUpper !== -1) {
      const nextChar = word.charAt(1);
      if (
        nextChar &&
        !GREEK_ALPHABET.LOWERCASE.includes(nextChar as typeof GREEK_ALPHABET.LOWERCASE[number]) &&
        !GREEK_ALPHABET.UPPERCASE.includes(nextChar as typeof GREEK_ALPHABET.UPPERCASE[number])
      ) {
        const lowercaseLetter = GREEK_ALPHABET.UPPERCASE[greekLetterIndexUpper] === 'Σ' ? 'σ' : GREEK_ALPHABET.LOWERCASE[greekLetterIndexUpper];
        return lowercaseLetter + nextChar.toLowerCase() + word.slice(2);
      }
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return words.map((word, index) => capitalizeWord(word, index, words.length)).join(' ');
};


//* REMOVE ACCENTS IN A WORD
/**
 * Removes accents from a word.
 * @param {string} word - The word to remove accents from.
 * @returns {string} The word without accents.
 */
export const removeWordAccents = (word: string): string => {
  //? Split accent from letters into 2 separate characters
  const splitAccent: string[] = [...word].map(char => char.normalize('NFD'));
  let output = '';
  splitAccent.map(char => {
    //? Only push letters and numbers, accents will be ignored
    const sanitizedChar = char.replaceAll(/[^a-z0-9]/gi, '');
    if(sanitizedChar){
      output += sanitizedChar;
    }
  })
  return output;
}


//* REMOVE PUNCTUATION FROM A STRING
/**
 * Removes all punctuation marks from a string.
 *
 * @param {string} text - The text to remove punctuation marks from.
 * @returns {string} - The modified string with no punctuation marks.
 */
export const removePunctuation = (text: string): string => {
  const punctuation = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/mg;
  return text.replace(punctuation, '');
}


//* CONVERT A NUMBER TO ROMAN NUMERAL
/**
 * Converts a number to its Roman numeral equivalent (up to 10,000).
 * @param {number|string} num - The number to convert to a Roman numeral.
 * @returns {string} The Roman numeral representation of the given number.
 */
export const numeral = (num: number | string) => {
  // Convert the input to a number and set a minimum value of 1
  let n = +num < 1 ? 1 : +num;
  // If the number is greater than 10,000, print a warning message
  if (n > 10000) {
    console.warn("Numeral conversion may not be accurate over 10000.");
  }
  // Define arrays for the Roman numeral symbols and their corresponding decimal values
  const romanNumerals = ["ↂ", "ↁ", "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX",
                         "VIII", "VII", "VI", "V", "IV", "III", "II", "I"];
  const decimalValues = [10_000, 5000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  // Initialize an empty string to store the Roman numeral result
  let romanNumeral = "";

  // Iterate through the decimal values, starting with the largest
  for (let i = 0; i < decimalValues.length; i++) {
    // While the remaining number is greater than or equal to the current decimal value
    while (n >= Number(decimalValues[i])) {
      // Add the corresponding Roman numeral symbol to the result
      romanNumeral += romanNumerals[i];
      // Subtract the decimal value from the remaining number
      n -= Number(decimalValues[i]);
    }
  }

  // Return the number as a Roman numeral string
  return romanNumeral;
}


//* REMOVE ALL ACCENTS IN A STRING -- Find accents across multiple words
/**
 * Removes all accents from a string that contains one or more words.
 * If the input is a single word, only the accents within that word will be removed.
 *
 * @param {string} input - The input string to remove accents from.
 *
 * @returns {string} The input string with all accents removed.
 *
 * @example
 * const input = "Café au lait";
 * const output = removeAccents(input);
 * console.log(output); // "Cafe au lait"
 */
export const removeAccents = (input: string) => {
  //? Follows same structure as 'capitalizeWords'
  const checkForMultipleWords = input.trim().indexOf(' ') != -1;
  const splitString = input.split(" ");

  const inputArray = checkForMultipleWords ? splitString : [];

  if(checkType(input, "string") && checkForMultipleWords === false) {
    return removeWordAccents(input);
  }

  const normalizedWords: string[] = [];

  for (const word of inputArray) {
    normalizedWords.push(removeWordAccents(word))
  }

  const output = normalizedWords ? normalizedWords.join(" ") : false;
  return output !== false ? output : removeWordAccents(input);
}


//* CONVERT UNICODE TO CHARACTER
/**
 * Convert a Unicode code point to a character or regular expression.
 * @param {string} code - The Unicode code point to be converted.
 * @returns {string|RegExp} - The converted character or regular expression.
 */
export const unicodeToChar = (code: string) => {
  const uPlus = code.match(/u\+1/g);
  const split = uPlus ? code.split(uPlus[0]) : '';
  const regex = '\\'+`u{${split[1]}}`;
  const normal = code.replace(/\\u[\dA-F]{4}/gi, 
         function (match: string) {
              return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
         });

  return regex ? new RegExp(regex) : normal;
}


//* SEARCH FOR A STRING AND REPLACE
//? Defaults to empty string ('') which removes all instances
/**
 * Searches for a string or regular expression pattern in a given string or RegExp and replaces it with another string.
 * 
 * @param {string | RegExp} input - The string or regular expression to search.
 * @param {string} searchFor - The string to search for within the input.
 * @param {string} [replaceWith=''] - The string to replace the matched string with.
 * @param {'g' | 'i' | 'm' | 's' | 'u' | 'y' | 'gi' | 'gm' | 'gs' | 'gy' | 'imsu'} [flags='g'] - A string containing the flags to use for the regular expression search. Default is 'g'.
 * @param {boolean} [caseSensitive=false] - Whether the search should be case sensitive. Default is false.
 * @returns {string} The input string with the matched string replaced by the replacement string.
 */
export const findAndReplace = (
  input: string | RegExp,
  searchFor: string,
  replaceWith = '',
  flags: RegExpFlag | RegExpFlag[] = 'g', // No error here
  caseSensitive = false
): string => {
  const f =  Array.isArray(flags) ? flags.join('') : flags;
  const csFlag = !caseSensitive && !f.includes('i') ? 'i' : '';
  const regex = new RegExp(searchFor, `${csFlag}${f}`); // No error here
  if (typeof input === 'string') {
    return input.replace(regex, replaceWith);
  } else {
    // Constructing a new RegExp from another RegExp's source and combining flags
    const combinedFlags = (csFlag + f + input.flags).split('').filter((v, i, a) => a.indexOf(v) === i).join('');
    return input.source.replace(new RegExp(searchFor, combinedFlags), replaceWith);
  }
};


//!=/=======\=!//
//?[ STRINGS ]?//
//!=\=======/=!//

//* ONLY ALLOW ALPHANUMERIC CHARACTERS IN A STRING
/**
 * Returns a new string with only alphanumeric characters. Optionally allow alphabets only.
 *
 * @param {string} input - The string to filter
 * @param {boolean} [alphaOnly=false] - Whether to allow only alphabets, defaults to false
 * @param {string} [exceptions] - Any characters to allow in addition to alphanumerics
 * @returns {string} The filtered string
 */
export const alphaNumOnly = (input: string, alphaOnly = false, exceptions?: string) => {
  const conditions = alphaOnly === true ? '^a-z' : '^a-z0-9';
  const allow = checkType(exceptions, 'string') ? exceptions : '';
  const regex = new RegExp(conditions+allow, 'gi');
  return input.replaceAll(regex, '');
}