import { checkType } from './types';

//* CHECK TO SEE IF A VALUE "EXISTS" -- Empty variables (such as arrays, strings, and object) will show as 'true'
/**
 * Check if a value exists. This function will return true if the value is not null, undefined, or an empty string, array, or object.
 * 
 * @param x - The value to check.
 * @returns A boolean indicating whether the value exists.
 * 
 * @example
 * exists(0);     // Returns true
 * exists(true);  // Returns true
 * exists(false); // Returns true
 * exists(null);  // Returns false
 * exists('');    // Returns false
 * exists([]);    // Returns false
 * exists({});    // Returns false
 */
export const exists = (x: unknown): boolean => {
  return !!(
    x !== null &&
    x !== undefined &&
    (x || x === 0 ||
    (Array.isArray(x) && x.length === 0) ||
    (typeof x === "object" && x !== null && Object.keys(x).length === 0))
  );
};

//* CHECK TO SEE IF A VALUE "DOES NOT EXIST" -- Empty variables (such as arrays, strings, and object) will show as 'false'
/**
 * Check if a value does not exist. This function will return true if the value is null, undefined, or an empty string, array, or object.
 * 
 * @param x - The value to check.
 * @returns A boolean indicating whether the value does not exist.
 * 
 * @example
 * doesNotExist(0);     // Returns false
 * doesNotExist(true);  // Returns false
 * doesNotExist(false); // Returns false
 * doesNotExist(null);  // Returns true
 * doesNotExist('');    // Returns true
 * doesNotExist([]);    // Returns true
 * doesNotExist({});    // Returns true
 */
export const doesNotExist = (x: unknown) => (x === null || x === undefined || x === "");

//* CHECK IF WINDOW EXISTS (!undefined)
//? Checks for 'window' and allows for retries at 500ms intervals by default
//? or interval can be set by a number (in ms). You can also set the amount
//? of retries by number or set to 'true' to allow 1 retry.
export const windowExists = (
  options: {
    allowRetries: boolean | number,
    retryDelay: number,
    elseDoThis: () => unknown,
  }={
    allowRetries: false,
    retryDelay: 500,
    elseDoThis: () => {return {}},
  }
): boolean => {
  let { allowRetries, retryDelay } = options;
  const { elseDoThis } = options;
  allowRetries = allowRetries === true ? 1 : checkType(allowRetries, 'number') ? allowRetries : false;
  retryDelay = checkType(retryDelay, 'number') ? retryDelay : 500;

  //? Set retries to 0
  let retries = 0;

  //? If undefined perform an action...
  if(typeof window === 'undefined') {
    if(checkType(elseDoThis, 'function')){
      elseDoThis();
    }
    if (allowRetries) {
      if (retries < (allowRetries + 1)) {
        retries += 1;
        setTimeout(() => windowExists({ allowRetries, retryDelay, elseDoThis }), 500);
      } else {
        console.error("Failed to access window object, check if code is running in a browser environment "+
        "or try running the function inside of a useEffect");
        if(checkType(elseDoThis, 'function')){
          elseDoThis();
        }
      }
    }
    return false;
  }
  return true;
}


//* CHECK IF IMAGE EXISTS
// export const imageExists = (src: string) => {
//   const fetch = async () => axios.get(src).then(res => res.data);
//   const { data, error } = useSWR(src, fetch);
//   return data || !error ? true : error || !data ? false : null;
// }
export const imageExists = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}



//* CHECK STRING FOR WORDS
/**
 * Checks if a given string contains any of the words from a provided list.
 *
 * @param {string} string - The string to check.
 * @param {string[]} wordsList - The list of words to check against.
 * @param {boolean} [showChecks=false] - If true, returns an array of matched words; otherwise, returns a boolean indicating if the string contains any of the words.
 * @returns {boolean | string[]} - Returns an array of matched words if showChecks is true, otherwise returns a boolean indicating if the string contains any of the words.
 * @example <caption>Checking for words in a string (boolean result)</caption>
 * console.log(checkForWords('The quick brown fox', ['quick', 'slow'])); // true
 * 
 * @example <caption>Checking for words in a string (array of matches)</caption>
 * console.log(checkForWords('The quick brown fox', ['quick', 'slow'], true)); // ['quick']
 * 
 * @example <caption>String does not contain any words from the list</caption>
 * console.log(checkForWords('The quick brown fox', ['slow', 'lazy'])); // false
 */
export const checkForWords = (string: string, wordsList: string[], showChecks = false): boolean | string[] => {
  // Check if wordsList is provided and not empty
  if (!wordsList || wordsList.length === 0) {
    return showChecks ? [] : false;
  }

  // Use a regular expression to find instances of words from the list in the string
  const checks = string.match(new RegExp("\\b(" + wordsList.join('|') + ")\\b", "ig")) ?? [];

  // Check if the string itself is included in the wordsList
  const isTrue = wordsList.includes(string);

  // Return matched words if showChecks is true, otherwise return the boolean result
  return showChecks ? checks : isTrue;
}