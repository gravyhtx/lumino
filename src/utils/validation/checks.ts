//* CHECK FOR DUPLICATES IN AN ARRAY (OR ARRAY OF ARRAYS)
/**
 * Checks for duplicate elements in an array (or array of arrays).
 *
 * @param {unknown[]} array - The array to be checked for duplicates.
 * @param {boolean} [showDetails=false] - Whether to return details about duplicates.
 * @returns {(boolean | { hasDupes: boolean, occurrences: any[] })} - Returns a boolean indicating the presence of duplicates, or an object with details if `showDetails` is true.
 */
export const checkArrayDupes = (array: unknown[], showDetails = false) => {
  const flatArray = array.flat(Infinity);
  const occurrences = flatArray.filter((item, index) => flatArray.indexOf(item) !== index);
  const hasDupes = occurrences.length > 0;
  return showDetails ? { hasDupes, occurrences } : hasDupes;
};


//* CHECK FOR DUPLICATES IN A STRING
/**
 * Checks for duplicate characters in a string.
 *
 * @param {string} input - The string to be checked for duplicate characters.
 * @param {boolean} [showDetails=false] - Whether to return details about duplicates.
 * @returns {(boolean | { hasDupes: boolean, occurrences: string[] })} - Returns a boolean indicating the presence of duplicates, or an object with details if `showDetails` is true.
 */
export const checkStringDupes = (input: string, showDetails = false) => {
  const chars: Record<string, boolean> = {};
  const occurrences: string[] = [];
  let hasDupes = false;

  for (const char of input) {
    if (chars[char]) {
      hasDupes = true;
      occurrences.push(char);
    }
    chars[char] = true;
  }
  return showDetails ? { hasDupes, occurrences } : hasDupes;
};


//* CHECK FOR DUPLICATE WORDS IN A STRING
/**
 * Checks for duplicate words in a string.
 *
 * @param {string} string - The string to be checked for duplicate words.
 * @param {boolean} [showDetails=false] - Whether to return details about duplicates.
 * @returns {(boolean | { hasDupes: boolean, occurrences: string[] })} - Returns a boolean indicating the presence of duplicates, or an object with details if `showDetails` is true.
 */
export const checkWordDupes = (string: string, showDetails = false) => {
  const removePunctuation = (text: string) => text.replace(/[.,!?;()]/g, ''); // You can customize this regex as per your needs.
  const splitString = removePunctuation(string).split(' ');
  const words: Record<string, boolean> = {};
  const occurrences: string[] = [];
  let hasDupes = false;

  for (const word of splitString) {
    if (words[word]) {
      hasDupes = true;
      occurrences.push(word);
    }
    words[word] = true;
  }

  return showDetails ? { hasDupes, occurrences } : hasDupes;
};



//* CHECK FOR DUPLICATE OBJECT VALUES IN AN ARRAY
/**
 * Checks for duplicate object values in an array.
 *
 * @param {unknown[]} objArray - The array of objects to be checked for duplicates.
 * @param {string} key - The key to be checked in each object.
 * @param {boolean} [showDetails=false] - Whether to return details about duplicates.
 * @returns {(boolean | { hasDupes: boolean, occurrences: ObjectWithOccurrence[] })} - Returns a boolean indicating the presence of duplicates, or an object with details if `showDetails` is true.
 */
type ObjectWithOccurrence = { [key: string]: unknown; occurrence: number };

export const checkObjectDupes = (objArray: unknown[], key: string, showDetails = false) => {
  const occurrences: ObjectWithOccurrence[] = [];
  let hasDupes = false;

  objArray.forEach((x: unknown) => {
    let matchFound = false;
    const currentObj = JSON.stringify(x);
    occurrences.forEach((obj) => {
      if (key) {
        if (obj[key] === (x as Record<string, unknown>)[key]) {
          obj.occurrence++;
          matchFound = true;
        }
      } else {
        const storedObj = JSON.stringify(obj);
        if (storedObj === currentObj) {
          obj.occurrence++;
          matchFound = true;
        }
      }
    });
    if (!matchFound) {
      const obj = { ...(x as Record<string, unknown>), occurrence: 1 } as ObjectWithOccurrence;
      occurrences.push(obj);
    } else if (!hasDupes) {
      hasDupes = true;
    }
  });

  return showDetails === true ? { hasDupes, occurrences } : hasDupes;
};


//* MULTIPLE CHECKS USING THE ARRAY METHOD, 'EVERY'
//?  Simple code that checks if a target variable is equal to Multiple Values
/**
 * Checks if a target variable satisfies multiple conditions specified by an array of values.
 *
 * @param {(number | string)[]} valuesToCheck - The array of values to be checked against the target variable.
 * @param {(number | string)} targetVariable - The target variable to be checked.
 * @param {string} checkToPerform - The type of check to perform ('=', '<', '<=', '>', '>=', 'subset', 'includes').
 * @returns {boolean} - Returns a boolean indicating if the target variable satisfies the conditions specified.
 */
export const multiCheck = (valuesToCheck: (number | string)[], targetVariable: number | string, checkToPerfrom: string) => {
  if(!Array.isArray(valuesToCheck) || valuesToCheck.length <= 1) {
    console.warn(`Please include more than one value to check. (Value: ${String(valuesToCheck)})`);
  }

  const isEqual = valuesToCheck.every(value => {
    return value === targetVariable
  });

  const isThreshold = valuesToCheck.every(value => {
    if (typeof value === 'number' && typeof targetVariable === 'number') {
      return checkToPerfrom === '>'
        ? value > targetVariable
        : checkToPerfrom === '>='
          ? value >= targetVariable
          : checkToPerfrom === '<'
            ? value < targetVariable
            : value <= targetVariable
    } else if (typeof value === 'string' && typeof targetVariable === 'string') {
      return checkToPerfrom === '>'
        ? value > targetVariable
        : checkToPerfrom === '>='
          ? value >= targetVariable
          : checkToPerfrom === '<'
            ? value < targetVariable
            : value <= targetVariable
    } else {
      return false; // return false if the types do not match
    }
  });

  const isSubset = valuesToCheck.every(value => {
    return typeof targetVariable === 'string' &&
           typeof value === 'string' &&
           targetVariable.includes(value);
  });

  const includes = valuesToCheck.includes(targetVariable);

  switch(checkToPerfrom) {
    case '=':
    case 'equal':
      return isEqual;
    case '<':
    case '<=':
    case '>':
    case '>=':
      return isThreshold;
    case 'subset':
      return isSubset;
    case 'includes':
      return includes;
  }
}

//* CHECK IF AN OBJECT IS EMPTY
/**
 * Checks if an object is empty.
 * @param obj - The object to be checked.
 * @returns A boolean indicating if the object is empty.
 * @example
 * objIsEmpty({});  // Returns true
 */
export const objIsEmpty = (obj: object) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;


//* CHECK ONLINE STATUS
export const checkOnlineStatus = () => navigator?.onLine ? true : !navigator?.onLine ? false : undefined;


//* GET WORD COUNT
/**
 * Calculate the word count in a given string.
 *
 * This function considers a word to be a sequence of non-whitespace characters.
 * It collapses multiple adjacent whitespace characters into a single space.
 * Leading and trailing whitespace is ignored.
 *
 * @param {string} string - The string whose word count is to be calculated.
 * @returns {number} The word count of the string.
 *
 * @example
 * //* returns 5
 * wordCount('  Hello,   world! This  is a test.  ');
 * 
 * @example
 * //* returns 0
 * wordCount('       ');
 * 
 * @example
 * //* returns 0
 * wordCount('');
 */
export const wordCount = (string: string) => {
  // Use regex to replace extra spaces, tabs, and newlines with a single space
  const cleanedString = string.replace(/\s+/g, ' ').trim();

  // Check for an empty string
  if (cleanedString === '') {
    return 0;
  }

  return cleanedString.split(' ').length;
};


//* GET CHARACTER COUNT
/**
 * Calculate the character count in a given string.
 *
 * This function allows for counting either all characters in the string,
 * or only the non-whitespace characters, depending on the value of the
 * `includeWhiteSpace` parameter.
 *
 * @param {string} string - The string whose character count is to be calculated.
 * @param {boolean} includeWhiteSpace - Whether to include whitespace in the character count.
 * @returns {number} The character count of the string.
 *
 * @example
 * //* returns 27
 * characterCount('  Hello,   world! This  is.  ', true);
 * 
 * @example
 * //* returns 23
 * characterCount('  Hello,   world! This  is.  ', false);
 * 
 * @example
 * //* returns 0
 * characterCount('', true);
 */
export const characterCount = (string: string, includeWhiteSpace = true) => {
  if (includeWhiteSpace) {
    return string.length;
  } else {
    return string.replace(/\s+/g, '').length;
  }
};
