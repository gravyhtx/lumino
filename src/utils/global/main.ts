import type { TitlecaseConfig } from "./types";

/**
 * Combines multiple class names into a single string and filters out any undefined values.
 *
 * @param {...(string | undefined)[]} classes - An array of class names, which can include undefined values.
 * @returns {string} A single string containing all provided class names, separated by spaces.
 * @example
 * const className = classnames('btn', isActive ? 'active' : undefined); // 'btn active' if isActive is true, otherwise 'btn'
*/
export const classnames = (...classes: (string | undefined)[]): string => classes.filter(Boolean).join(" ");


/**
 * Converts the first character of each word in a string to uppercase except for exceptions,
 * except when the word is the first or last in the title. It also handles words that should
 * maintain their exact casing. Additionally, allows specifying instances of exceptions to be capitalized.
 *
 * @param {string} title - The string to convert.
 * @param {TitlecaseConfig} config - Configuration object including exceptions, exactCases, and instanceExceptions.
 * @returns {string} - The converted string with specific capitalization rules applied.
 *
 * @example
 * //* General exception and exact casing
 * titlecase('an example title with and and or', { exceptions: ['and', 'or'], exactCases: ['xD00Dx'] });
 * // Output: 'An Example Title with And and Or'
 *
 * @example
 * //* Maintaining exact casing for specific words
 * titlecase('Claire McChesney and xD00Dx on the Beach', { exceptions: ['on', 'the'], exactCases: ['xD00Dx'] });
 * // Output: 'Claire McChesney and xD00Dx on the Beach'
 *
 * @example
 * //* Capitalizing specific instances of exceptions
 * titlecase('this and and and that', { exceptions: ['and'], instanceExceptions: { 'and': [1, 3] } });
 * // Output: 'This And and And That'
 */
export const titlecase = (title: string, config: TitlecaseConfig = {}) => {
  const { exceptions = [], exactCases = [], instanceExceptions = {} } = config;

  return title
    .toLowerCase()
    .split(' ')
    .map((word, index, words) => {
      const totalWords = words.length;
      const exactCaseWord = exactCases.find(exactWord => exactWord.toLowerCase() === word);
      if (exactCaseWord) {
        return exactCaseWord;
      }

      if (index === 0 || index === totalWords - 1) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      const instanceExceptionIndices = instanceExceptions[word.toLowerCase()];
      if (instanceExceptionIndices && instanceExceptionIndices.includes(index + 1)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      if (exceptions.includes(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};


/**
 * Normalizes an array of numbers so that their sum equals a specified target.
 * Adjusts the values proportionally and respects the maximum decimal places.
 * Distributes rounding differences across the array elements.
 * 
 * @param {number[]} numbers - Array of numbers to normalize.
 * @param {number} [target=100] - Target sum for the numbers.
 * @param {number | boolean} [maxDecimals=true] - Maximum decimal places.
 * @returns {number[]} Normalized array of numbers.
 * @example
 * const numbers = [40.26, 10.54, 49.19];
 * const normalizedNumbers = normalizeArray(numbers); // Adjusts the array so that the sum is 100
*/
export function normalizeArray(numbers: number[], target = 100, maxDecimals: number | boolean = true): number[] {
  if (numbers.length === 0) return [];

  const total = numbers.reduce((sum, num) => sum + num, 0);
  const maxDecimalPlaces = typeof maxDecimals === 'boolean'
    ? (maxDecimals ? Math.max(...numbers.map(num => (num.toString().split('.')[1] ?? '').length)) : 0)
    : maxDecimals;

  const normalized = numbers.map(num => (num / total) * target);
  const roundingError = normalized.reduce((sum, num) => sum + num, 0) - target;
  
  return normalized.map((num, index) => {
    const adjustment = index === numbers.length - 1 ? roundingError : 0;
    return parseFloat((num - adjustment).toFixed(maxDecimalPlaces));
  });
}


/**
 * Parses a JSON string and returns a value of the specified type.
 * Throws an error if the JSON string cannot be parsed.
 * 
 * @template T - The expected type of the parsed JSON.
 * @param {string} json - The JSON string to parse.
 * @returns {T} - The parsed JSON in the specified type.
 * @throws {Error} - Throws an error if the JSON cannot be parsed.
*/
export const parseJSON = <T>(json: string): T => {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    throw new Error(`Error parsing JSON: ${String(error)}`);
  }
}


/**
 * Converts a percentage string to a numeric value.
 * Optionally clamps the value within a specified range.
 * 
 * @param {string} value - The percentage value as a string.
 * @param {[number, number] | boolean} range - The range to clamp the value. Default is 'false' (any value), 'true' sets the range to `[0, 100]`.
 * @returns {number} - The numeric value of the percentage.
*/
export const percentToValue = (
  value: `${number}%`,
  range: [min: number, max: number] | boolean = false
): number => {
  const percentage = parseInt(value, 10);
  if (range) {
   const [min, max] = range === true ? [0, 100] : range;
   return Math.min(Math.max(percentage, min), max) / 100;
  }
  return parseInt(String(value)) / 100;
}

/**
 * Formats a date string or timestamp into a human-readable format.
 *
 * @param {string | number} input - The date string or timestamp.
 * @returns {string} - The formatted date string.
 */
export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
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


/**
 * Checks if a given numeric value is negative.
 * It can handle both number and string inputs and returns true if the value is negative.
 *
 * @param {string | number} value - The value to check if it's negative.
 * @returns {boolean} True if the value is negative, false otherwise.
 *
 * @example
 * //* Returns true
 * isNegative(-5);
 *
 * @example
 * //* Returns false
 * isNegative(10);
 *
 * @example
 * //* Returns true
 * isNegative("-3.5");
 */
export const isNegative = (value: string | number): boolean => { 
  if (!isNaN(Number(value))) {
    return typeof value === 'number' ? value < 0 : value.startsWith('-');
  }
  return false;
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
export function normalizeValues(values: (number | string)[], total = 100, decimalPlaces: 0 | 1 | 2 = 2): number[] {
  const numericValues = values.map(value =>
    typeof value === 'string' && value.endsWith('%') ? parseFloat(value) : Number(value)
  );

  const sum = numericValues.reduce((acc, curr) => acc + curr, 0);
  const normalizedValues = numericValues.map(value => (value / sum) * total);
  const roundedValues = normalizedValues.map(value => parseFloat(value.toFixed(decimalPlaces)));

  // Adjust the last value to make sure the total is correct after rounding
  if (roundedValues.length > 0) {
    const lastIndex = roundedValues.length - 1; // Store the last index
    const lastValue = roundedValues[lastIndex]; // Get the last value directly
  
    if (typeof lastValue !== 'undefined') { // Additional check to satisfy TypeScript
      const roundedSum = roundedValues.reduce((acc, curr) => acc + curr, 0);
      const difference = total - roundedSum;
      // Update the last element safely
      roundedValues[lastIndex] = parseFloat((lastValue + difference).toFixed(decimalPlaces));
    }
  }

  return roundedValues;
}