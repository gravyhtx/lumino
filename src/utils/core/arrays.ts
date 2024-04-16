/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { cointoss, numberClamp, randomBell, randomize, toNum } from ".";
import { checkType, hasArrays } from "../validation";


//!=/======\=!//
//?[ ARRAYS ]?//
//!=\======/=!//

//* MERGE OBJECTS
/**
 * Merges objects together into one object.
 * @param objects The objects to merge.
 * @returns The merged object.
 */
export const mergeObjects = <T extends object>(
  ...objects: T[]
): T => {
  // Ensure objects are treated as extendable object types
  return smush(objects).reduce((acc, cur) => ({ ...acc, ...cur }), {} as T);
};

//! EXAMPLES
//? const obj1 = { a: 1, b: 2 };
//? const obj2 = { b: 3, c: 4 };
//? const obj3 = { c: 5, d: 6 };
//? const merged = mergeObjects(obj1, obj2, obj3);
//? console.log(merged);
///   Output: { a: 1, b: 3, c: 5, d: 6 }
//? const arr1 = [{ a: 1, b: 2 }, { c: 3 }];
//? const arr2 = [{ b: 4 }, { d: 5 }];
//? const arr3 = [{ c: 6, d: 7 }, { e: 8 }];
//? const merged = mergeObjects(arr1, arr2, arr3);
//? console.log(merged);
///   Output: [ { a: 1, b: 4 }, { c: 6, d: 7 }, { e: 8 } ]


//* REMOVE DUPLICATES
/**
 * Removes duplicate elements from an array, or duplicate keys from an object.
 * If the input is a string, it will remove individual characters.
 * If you want to remove individual words, use the `removeWordDupes` function instead.
 * @param input The input array, object, or string to remove duplicates from.
 * @returns A new array, object, or string without duplicates.
 */
export const removeDupes = (input: string | object | unknown[]): string | object | unknown[] => {
  //! NOTE: STRING WILL REMOVE INDIVIDUAL CHARACTERS!
  //? If you want to remove individual words you must use an array or 'removeWordDupes'.
  const isString = typeof input === 'string';
  const isArray = Array.isArray(input);
  const isObject = typeof input === 'object' && !isArray && input !== null;

  if (isObject) {
    const keys = Object.keys(input);
    const uniqueKeys = [...new Set(keys)];
    const result: Record<string, unknown> = {};
    for (const key of uniqueKeys) {
      result[key] = (input as Record<string, unknown>)[key];
    }
    return result;
  }
  if (isArray) {
    return new Set(input);
  }
  if (isString) {
    return [...new Set(input.split(''))].join('');
  }
  return input;
}


//* REMOVE DUPLICATE WORDS IN A STRING
/**
 * Removes duplicate words in a given string.
 *
 * @param {string} text - The input string.
 * @returns {string} The string with duplicate words removed.
 */
export const removeWordDupes = (text: string) => {
  return [...new Set(text.split(' '))].join('');
}


//* FLATTEN ARRAY OF ARRAYS
//? Defaults to a completely flat array
/**
 * Flattens an array of arrays to a specified depth or completely flat.
 *
 * @param {T[] | T[][]} arrays - The array(s) to be flattened.
 * @param {number} [depth=Infinity] - The depth level specifying how deep a nested array should be flattened.
 * @returns {T[]} The flattened array.
 * @template T
 */
export const flatten = <T>(arrays: T[] | T[][], depth?: number): T[] => {
  if (hasArrays(arrays)) {
    depth = depth === undefined || depth < 1 ? Infinity : depth;
    return (arrays as T[][]).flat(depth) as T[];
  }
  return arrays as T[];
};

//* FLATTEN AND REMOVE ALL DUPLICATES IN AN ARRAY
//? Defaults to a completely flat array
/**
 * Flattens an array of any type and removes all duplicate elements.
 * @param {unknown[]} array - The array to be flattened and smushed.
 * @returns {unknown[]} The flattened and smushed array with all duplicates removed.
 */
export const smush = <T extends object>(array: T[]): T[] => {
  // Ensuring the function deals explicitly with objects in the array
  return [...new Set(flatten(array))];
};


//* REVERSE ORDER OF AN ARRAY
/**
 * Returns a new array with the same elements as the input array, but in reverse order.
 * @param input - The input array.
 * @returns A new array with the elements of the input array in reverse order.
 */
export const reverseArr = (input: unknown[]) => {
  const output = [];
  if(input){
      for(let i = input.length-1; i >= 0; i--) {
        output.push(input[i]);
    }
  }
  return output;
}


//* REMOVE ITEMS FROM AN ARRAY
/**
 * Removes one or more items from an array and returns a new array.
 * @param {Array} array - The array to remove items from.
 * @param {unknown|Array} removeItems - The item or items to remove from the array. If an array is provided, all its items will be removed.
 * @returns {Array} A new array with the specified items removed.
 */
export const removeFromArray = (array: unknown[], removeItems: unknown) => {
  const itemsToRemove = Array.isArray(removeItems) ? removeItems : [removeItems];
  return array.filter(value => !itemsToRemove.includes(value));
}


//* SPLIT ARRAY INTO TWO SEPARATE ARRAYS

//? This was initially made just to output an array with two halves whether it is even or odd, but
//? now it does much more! You can choose the half split, there's a "human" split which splits it
//? randomly on a bell curve somewhere around the middle, you can set 'randomSplit' to true and it
//? it chooses a number halfway between 0 and the halfway point to be added or subtracted to the
//? 'half' value, or choose an exaxt point to split.

//? If only 'list' is entered this will just split the array in half as was initially intended. You
//? can also add padding to ensure the length of each array is not less than a specified value to
//? make sure the set split is within a specified range, especially useful when that value and/or the
//? halfway point is unknown.
/**
 * Splits an array into two separate arrays, weighted on the first half if uneven.
 * 
 * @param {unknown[]} list - The array to split.
 * @param {'bell' | boolean} [randomSplit] - Whether to split randomly on a bell curve, or to split at an exact point.
 * @param {number} [setSplit] - The exact point to split the array.
 * @param {number} [clampPad] - The padding to ensure the length of each array is not less than a specified value.
 * @param {boolean} [outputObj] - Whether to output an object instead of an array.
 * 
 * @returns {unknown[] | { a: unknown[], b: unknown[] }} - An array with two halves, or an object with two properties.
 */

export const splitArray = (
  list: unknown[],
  randomSplit?: 'bell' | boolean,
  setSplit?: number,
  clampPad?: number,
  outputObj?: boolean
) => {

  const half = Math.ceil(list.length / 2); // The first array will get the extra item if array is odd
  const randomVal = randomize(Math.ceil(half / 2)); // Random value at half of half
  const split = cointoss() ? half+randomVal : half-randomVal;
  const splitAt = randomSplit && randomSplit !== "bell"
      ? split
    : randomSplit === "bell"
      ? randomBell(list.length)
      : half;

  const padding = clampPad && typeof clampPad === 'number' && !Number.isNaN(clampPad) ? clampPad : 0;

  const min = 1+padding; // Each array will have at least ONE item plus the 'clampPad' value
  const max = (list.length-1)-padding;

  const finalSplit = ( setSplit ?? setSplit ) === 0 ? numberClamp(
      toNum(setSplit), numberClamp(min, 1, half-1), numberClamp(max, half+1, list.length-1)
    ) : false; // Ensure split remains between 1 and half with 'clampPad' value
  
  const a = list.slice( 0, finalSplit ? finalSplit : splitAt );
  const b = list.slice( finalSplit ? finalSplit : splitAt );

  // Output an array unless 'outputObj' is true
  return outputObj === true ? { a: a, b: b } : [ a, b ];
}


//* RETURN ONE ITEM (or set/object) FROM AN ARRAY or ARRAY OF ARRAYS
/**
 * Returns one randomly selected item from an array or array of arrays.
 *
 * @param {string|unknown[]} el - The array or array of arrays to select from.
 * @returns {any} A randomly selected item from the provided array.
 */
export const select = (el: string | unknown[]) => {
  const output = el[randomize(el.length)] as unknown[];
  return output[randomize(output.length)] ? output[randomize(output.length)] : el[randomize(el.length)];
}


//* GET MULTIPLE RANDOM ITEMS FROM AN ARRAY OF ARRAYS
/**
 * Returns a random selection from an array or array of arrays. 
 * 
 * @param {any[]} arraySet - The array or array of arrays to select from.
 * @param {number[]} [selectIndexesArray] - An optional array of indexes to select from.
 * @returns {any} - A random selection from the array(s).
 * 
 * @example
 * 
 * //* Select a random item from an array
 * const myArray = [1, 2, 3, 4, 5];
 * const selection = randomSelection(myArray);
 * console.log(selection); // Output: a random item from myArray
 *
 * //* Select a random item from an array of arrays
 * const myArrayOfArrays = [[1, 2], [3, 4, 5], [6]];
 * const selection = randomSelection(myArrayOfArrays);
 * console.log(selection); // Output: a random array from myArrayOfArrays
 *
 * //* Select a random item from an array of arrays using specified indexes
 * const myArrayOfArrays = [[1, 2], [3, 4, 5], [6]];
 * const selection = randomSelection(myArrayOfArrays, [0, 1]);
 * console.log(selection); // Output: a random array from the first two arrays in myArrayOfArrays
 */
export const randomSelection = (
  arraySet: unknown[],
  selectIndexesArray?: number[]
) => {
  let output: unknown[] = [];
  if (selectIndexesArray) {
    for (let i=0; i < selectIndexesArray.length; i++) {
      const n = selectIndexesArray[i];
      if(checkType(n,'number')) {
        output.push(arraySet[Number(n)]);
      } else {
        console.log(`All selected values must be numbers! Value
        "${selectIndexesArray[i]}"at index ${i} was skipped...`);
      }
    }
  } else {
    output=arraySet;
  }
  return output[randomize(output.length)];
}

//* RETURN A SINGLE ELEMENT OR SET FROM AN ARRAY OF ARRAYS
/**
 * Returns a single element or set from an array of arrays.
 * @param {Array} arraySet - The array of arrays being sorted.
 * @param {Boolean} [outputEntireSet=true] - Output entire array set (default) or just one element.
 * @param {Array} [selectIndexesArray] - Array conatining indexes of array sets to be considered.
 * Use to include only specific array sets from the array of arrays ("arraySet").
 * @returns {Array|String} Returns the selected array set or one element from an array set.
 *
 * @example
 * //* Choosing one array set from an array of arrays
 * const arr = [["1a","2a"],["1b"],["1c","2c","3c"],["4b","4c"]]
 * arrayEl(arr, true, [0,2])
 * //* Output: ["1c","2c","3c"]
 * //* Selected 'arr[2]' from indexes 0 and 2
 *
 * @example
 * //* Choosing a single element from an array of arrays
 * const arr = [["1a","2a"],["1b"],["1c","2c","3c"],["4b","4c"]]
 * arrayEl(arr, false, [0,2])
 * //* Output: "2c"
 *
 */
export const arrayEl = (
  arraySet: unknown[],
  outputEntireSet?: boolean,
  selectIndexesArray?: number[],
) => {
  // Default to 'randomSelection' unless 'outputEntireSet' is false
  outputEntireSet = outputEntireSet !== false ? true : false;
  // Choose one set from the 'arraySet'
  const randomOutput = randomSelection(arraySet, selectIndexesArray);
  // Output an entire set or a single item from the set
  return outputEntireSet ? randomOutput : select(arraySet);
}

// ONLY ALLOW SIGNIFICANT VALUES (non-Null) TO BE COPIED TO A NEW ARRAY
export function copyArrayData(src: unknown[], dest: unknown[]) {
  // Determine the number of significant bytes in the source array
  const sigBytes = src.filter(function(byte) { return byte !== null; }).length;
  // Copy the data from the source array to the destination array
  for(let i = 0; i < sigBytes; i++) {
    dest[i] = src[i];
  }
  // Return the destination array
  return dest;
}


/////////////////////////////
// HANDLE SETTING ELEMENTS //
/////////////////////////////

//* SET NEW DATA TO AN OBJECT OR ARRAY
//? Detects if data is an object or array and then combines new data appropriately based on its type
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
export const set = (data: object | unknown[], newData: object | unknown[] | number | boolean | string) => {
    const dontSpread = !Array.isArray(newData) && typeof newData !== 'object';
    if (Array.isArray(data) && Array.isArray(newData)) {
        return  [ ...data, ...newData ] as unknown;
    } else if (typeof data === 'object' && typeof newData === 'object') {
        return { ...data, ...newData };
    } else if (Array.isArray(data) && typeof newData === 'object') {
        return data.map(item => ({...item, ...newData}));
    } else if (Array.isArray(data) && dontSpread) {
        return  [ ...data, newData ];
    } else if (typeof data === 'object' && dontSpread && !Array.isArray(data)) {
        console.warn('Objects can only be combimed with other objects.');
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
 * @param {Array<any>} values - The array of values to check.
 * @returns {any} - The first truthy value, or the last value if all are falsy.
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