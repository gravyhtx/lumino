// ~/utils/core/arrays.ts
import { hasArrays } from "../validation";
import { numberClamp, toNum } from "./numbers";
import { cointoss, randomBell, randomize } from "./random";

//!=/======\=!//
//?[ ARRAYS ]?//
//!=\======/=!//

/**
 * Flattens an array of arrays to a specified depth or completely flat.
 *
 * @param {T[]|T[][]} arrays - The array(s) to be flattened.
 * @param {number} [depth=Infinity] - The depth level specifying how deep a nested array should be flattened.
 * @returns {T[]} The flattened array.
 * 
 * @example
 * const arr = [1, [2, [3, 4], 5], 6];
 * const flattened = flatten(arr, 1);
 * console.log(flattened); // Output: [1, 2, [3, 4], 5, 6]
 */
export const flatten = <T>(arrays: (T[] | T[][]), depth?: number): T[] => {
  if (hasArrays(arrays)) {
    depth = depth === undefined || depth < 1 ? Infinity : depth;
    return (arrays as T[][]).flat(depth) as T[];
  }
  return arrays as T[];
};

/**
 * Flattens an array of any type and removes all duplicate elements.
 * 
 * @param {T[]} array - The array to be flattened and smushed.
 * @returns {T[]} The flattened and smushed array with all duplicates removed.
 * 
 * @example
 * const arr = [[1,2],[3,3,[4,5,6]],4,7];
 * smush(arr); // [1,2,3,4,5,6,7]
 */
export const smush = <T extends object>(array: T[]): T[] => {
  // Ensuring the function deals explicitly with objects in the array
  return [...new Set(flatten(array))];
};

/**
 * Removes duplicate elements from an array, duplicate keys from an object, or characters from a string.
 * Handles circular references by removing them or allowing one circular reference based on the provided configuration.
 * 
 * @param {T[]|Record<string,T>|string} input - The input array, object, or string from which to remove duplicates.
 * @param allowOneCircularRef - Allows one level of circular reference, replacing further duplicates with null.
 * @returns A new array, object, or string with duplicates and optionally circular references handled.
 * 
 * @example <caption>Removes duplicates from an array with circular references allowed</caption>
 * const arrayWithCircularRefs = [{id: 1}, {id: 1}, {id: 2}];
 * arrayWithCircularRefs[1] = arrayWithCircularRefs;
 * removeDupes(arrayWithCircularRefs, true); // [{id: 1}, {id: 2}]
 */
export const removeDupes = <T>(
  input: T[] | Record<string,T> | string,
  allowOneCircularRef = false
): T[] | Record<string,T> | string =>{

  const seen = new WeakSet();
  let isFirstCircular = allowOneCircularRef;

  function handleValue(item: unknown) {
    if (typeof item === 'object' && item !== null) {
      if (seen.has(item)) {
        if (isFirstCircular) {
          isFirstCircular = false; // Allow one circular reference
          return item;
        }
        return null; // Remove or nullify subsequent circular references
      }
      seen.add(item);
    }
    return item;
  }

  if (typeof input === 'string') {
    const uniqueChars = [...new Set(input.split(''))].join('');
    return uniqueChars;
  } else if (Array.isArray(input)) {
    const uniqueItems = input.filter(item => handleValue(item) !== null);
    return uniqueItems;
  } else {
    const result: Record<string, T> = {};
    for (const key in input) {
      if (Object.hasOwnProperty.call(input, key)) {
        const value = handleValue((input)[key]);
        if (value !== null) result[key] = value as T;
      }
    }
    return result;
  }
}

/**
 * Removes duplicate words in a given string.
 *
 * @param {string} text - The input string.
 * @returns {string} The string with duplicate words removed.
 * 
 * @example
 * const str = "The The Go go";
 * removeWordDupes(str); // "The Go go"
 */
export const removeWordDupes = (text: string) => {
  return [...new Set(text.split(' '))].join('');
}

/**
 * Returns a new array with the same elements as the input array, but in reverse order.
 * 
 * @param input - The input array.
 * @returns A new array with the elements of the input array in reverse order.
 * 
 * @example
 * const arr = [1, 2, 3, 4];
 * const reversedArr = reverseArr(arr);
 * console.log(reversedArr); // Output: [4, 3, 2, 1]
 */
export const reverseArr = <T>(input: T[]): (T | undefined)[] => {
  const output = [];
  if(input){
      for(let i = input.length-1; i >= 0; i--) {
        output.push(input[i]);
    }
  }
  return output;
}

/**
 * Removes specified items from an array, returning a new array.
 * 
 * @template T - The type of the items in the array.
 * @param {T[]} array - The array to remove items from.
 * @param {T|T[]} removeItems - An item or array of items to remove.
 * @returns {T[]} A new array with the specified items removed.
 * 
 * @example
 * removeFromArray([1, 2, 3, 4, 5], 2); // Returns [1, 3, 4, 5]
 * removeFromArray([1, 2, 3, 4, 5], [2, 3]); // Returns [1, 4, 5]
 */
export const removeFromArray = <T>(array: T[], removeItems: (T | T[])): T[] => {
  const itemsToRemove = new Set(Array.isArray(removeItems) ? removeItems : [removeItems]);
  return array.filter(item => !itemsToRemove.has(item));
}

/**
 * Splits an array into two separate arrays, weighted on the first half if uneven.
 * 
 * @param {T[]} list - The array to split.
 * @param {'bell'|boolean} [randomSplit] - Whether to split randomly on a bell curve, or to split at an exact point.
 * @param {number} [setSplit] - The exact point to split the array.
 * @param {number} [clampPad] - The padding to ensure the length of each array is not less than a specified value.
 * 
 * @returns {[T[], T[]]} - An array with two halves.
 * 
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const [firstHalf, secondHalf] = splitArray(arr);
 * console.log(firstHalf); // Output: [1, 2, 3]
 * console.log(secondHalf); // Output: [4, 5]
 */
export const splitArray = <T>(
  list: T[],
  randomSplit?: 'bell' | boolean,
  setSplit?: number,
  clampPad?: number,
): [T[], T[]] => {

  const half = Math.ceil(list.length / 2); // The first array will get the extra item if array is odd
  const randomVal: number = randomize(Math.ceil(half / 2)); // Random value at half of half
  const split = cointoss() ? half+randomVal : half-randomVal; // Random split point
  const splitAt = randomSplit && randomSplit !== "bell"
      ? split
    : randomSplit === "bell"
      ? randomBell(list.length)
      : half;

  const padding = clampPad && typeof clampPad === 'number' && !Number.isNaN(clampPad) ? clampPad : 0;

  const min = 1+padding; // Each array will have at least ONE item plus the 'clampPad' value
  const max = (list.length-1)-padding;

  const finalSplit = ( setSplit ?? setSplit ) === 0 ? numberClamp(
    toNum(setSplit), [(numberClamp(min, [1, half-1])), (numberClamp(max, [half+1, list.length-1]))])
    : false; // Ensure split remains between 1 and half with 'clampPad' value
  
  const a = list.slice( 0, finalSplit ? finalSplit : splitAt );
  const b = list.slice( finalSplit ? finalSplit : splitAt );

  // Output an array unless 'outputObj' is true
  return [ a, b ];
}

/**
 * Retrieves a random item or subset from an array or an array of arrays.
 *
 * @param {(T | undefined)[]} input - The array or array of arrays to select from.
 * @param {object} [options] - An object containing options for the selection.
 * @param {number[]} [options.selectIndexes] - An array of indexes to consider when selecting from an array of arrays. If not provided, all indexes are considered.
 * @param {boolean} [options.returnSubset=false] - Whether to return a subset (true) or a single item (false). Default is false.
 * @returns {T[] | T | undefined} A randomly selected subset or single item from the input array or array of arrays. Returns undefined if the input is empty or the selectIndexes are invalid.
 *
 * @example <caption>Choosing a random single element from an array</caption>
 * const arr = [1, 2, 3, 4, 5];
 * const element = getRandomElement(arr);
 * console.log(element); // Output: 3 (or any other single element from the array)
 *
 * @example <caption>Choosing a random subset from an array of arrays</caption>
 * const arr = [["1a", "2a"], ["1b"], ["1c", "2c", "3c"], ["4b", "4c"]];
 * const subset = getRandomElement(arr, { returnSubset: true, selectIndexes: [0, 2] });
 * console.log(subset); // Output: ["1a", "2a"] (or ["1c", "2c", "3c"], depending on the random selection)
 *
 * @example <caption>Choosing a random item from an array of arrays</caption>
 * const arr = [["1a", "2a"], ["1b"], ["1c", "2c", "3c"], ["4b", "4c"]];
 * const item = getRandomElement(arr, { selectIndexes: [1, 2] });
 * console.log(item); // Output: "1b" (or any other single element from the specified subsets)
 */
export const getRandomElement = <T>(
  input: (T)[],
  options?: { selectIndexes?: number[]; returnSubset?: boolean }
): T[] | T | undefined => {
  if (input.length === 0) {
    return undefined;
  }

  const { selectIndexes, returnSubset = false } = options ?? {};

  const validIndexes = selectIndexes?.filter((index) => index >= 0 && index < input.length) ?? [];
  const subsetsToConsider = validIndexes.length > 0 ? validIndexes.map((index) => input[index]) : input;

  const filteredSubsets = subsetsToConsider.filter((subset): subset is T => Array.isArray(subset) || typeof subset !== 'undefined');

  if (filteredSubsets.length === 0) {
    return undefined;
  }

  const randomSubset = filteredSubsets[Math.floor(Math.random() * filteredSubsets.length)];

  if (returnSubset) {
    return randomSubset;
  } else {
    if (Array.isArray(randomSubset)) {
      return randomSubset[Math.floor(Math.random() * randomSubset.length)] as T;
    } else {
      return randomSubset;
    }
  }
};

/**
 * Copies significant (non-null) values from a source array to a destination array.
 *
 * @param {(T | undefined)[]} src - The source array containing values to be copied.
 * @param {(T | undefined)[]} dest - The destination array to which the significant values will be copied.
 * @returns {(T | undefined)[]} The destination array with significant values copied from the source array.
 *
 * @example
 * const src = [1, undefined, 2, null, 3];
 * const dest = [];
 * const result = copyArrayData(src, dest);
 * console.log(result); // Output: [1, 2, 3]
 */
export const copyArrayData = <T>(src: (T | undefined)[], dest: (T | undefined)[]) =>{
  // Determine the number of significant bytes in the source array
  const sigBytes = src.filter(function(byte) { return byte !== null; }).length;
  // Copy the data from the source array to the destination array
  for(let i = 0; i < sigBytes; i++) {
    dest[i] = src[i];
  }
  // Return the destination array
  return dest;
}


//!=/=======================\=!//
//?[ HANDLE SETTING ELEMENTS ]?//
//!=\=======================/=!//

/**
 * Combines two arrays or two objects, or an array and an object, 
 *  or an object with a new element, depending on their types.
 * @param {Array | Object} data - The original array or object.
 * @param {Array | Object | number | boolean | string} newData - The new array or object 
 *    to combine with the original array or object.
 * @returns {Array | Object} - Returns the combined array or object. 
 *    If data type is invalid, returns an error message. 
 *    If newData is a non-object element, it is added to the array.
 *    If data is an object and newData is an array, it returns an array 
 *    of objects with properties of each object in data, plus newData.
 *    If data is an array and newData is an object, it returns an array 
 *    of objects with properties of newData merged with the object in each index of data.
 *    If data and newData are objects, returns an object that has properties 
 *    of both objects, with newData overriding data properties with the same name.
 */
export function setData<T, U>(
  data: T[] | Record<string, T>,
  newData: U[] | Record<string, U> | U
): (T | U)[] | Record<string, T | U> | void {
  if (Array.isArray(data)) {
    if (Array.isArray(newData)) {
      return [...data, ...newData];
    } else if (typeof newData === 'object' && newData !== null && !Array.isArray(newData)) {
      return data.map(item => ({ ...item, ...newData as Record<string, U> }));
    } else {
      return [...data, newData];
    }
  } else if (typeof data === 'object' && data !== null) {
    if (typeof newData === 'object' && newData !== null && !Array.isArray(newData)) {
      return { ...data, ...newData };
    } else {
      console.warn('Objects can only be combined with other objects.');
    }
  } else {
    console.warn('Data type must be an object or array.');
  }
}

/**
 * Normalizes an array of numbers or percentage strings to make their sum equal to a specified total.
 * The function proportionally adjusts each value based on its ratio to the total sum of all values,
 * then rounds each value to a specified number of decimal places. It ensures the rounded values sum
 * up correctly to the specified total by adjusting the last value accordingly.
 *
 * @param {Array<number | string>} values - An array of numbers or percentage strings to be normalized.
 * @param {number} total - The desired total sum of the normalized values. Defaults to 100.
 * @param {0 | 1 | 2} decimalPlaces - The number of decimal places to round each normalized value to. Defaults to 2.
 * @returns {Array<number>} An array of normalized and rounded values that sum up to the specified total.
 *
 * @example
 * //* Normalizes to a sum of 100 with 2 decimal places
 * console.log(normalizeValues([10, 10, 30], 100)); // Output: [20, 20, 60]
 *
 * //* Normalizes to a sum of 10 with 2 decimal places
 * console.log(normalizeValues([10, 10, 30], 10)); // Output: [2, 2, 6]
 *
 * //* Normalizes to a sum of 100 with 0 decimal places
 * console.log(normalizeValues([30, 10, 20], 100, 0)); // Output: [50, 17, 33]
 */
export function normalizeValues(values: (number | string)[], total = 100, toFixed: number | false = 2): number[] {
  const numericValues = values.map(value =>
    typeof value === 'string' && value.endsWith('%') ? parseFloat(value) : Number(value)
  );

  const sum = numericValues.reduce((acc, curr) => acc + curr, 0);
  const normalizedValues = numericValues.map(value => (value / sum) * total);
  const roundedValues = toFixed === false ? normalizedValues : normalizedValues.map(value => parseFloat(value.toFixed(toFixed)));

  // Adjust the last value to make sure the total is correct after rounding
  if (roundedValues.length > 0) {
    const lastIndex = roundedValues.length - 1; // Store the last index
    const lastValue = roundedValues[lastIndex]; // Get the last value directly
  
    if (typeof lastValue !== 'undefined') { // Additional check to satisfy TypeScript
      const roundedSum = roundedValues.reduce((acc, curr) => acc + curr, 0);
      const difference = total - roundedSum;
      // Update the last element safely
      roundedValues[lastIndex] = toFixed ? parseFloat((lastValue + difference).toFixed(toFixed)) : Number(lastValue + difference);
    }
  }

  return roundedValues;
}

/**
 * Iterates through an array of values and returns the first truthy value.
 * If all values are falsy, returns the last value in the array.
 * 
 * @param {Array<T>} values - The array of values to check.
 * @returns {T | undefined} - The first truthy value, or the last value if all are falsy.
 * 
 * @example
 * //* Usage example
 * const style = { svg: { opacity: undefined } };
 * const opacity = undefined;
 * const defaultOpacity = 1;
 * const finalOpacity = returnFirstValid([opacity, style.svg.opacity, defaultOpacity]); // FinalOpacity would be 1
 */
export function returnFirstValid<T>(values: Array<T>): T | undefined {
  for (const value of values) {
    if (value ?? value === 0 ?? value === false) {
      return value;
    }
  }
  return values[values.length - 1];
}