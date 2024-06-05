import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, supporting various input types.
 *
 * @param {...unknown[]} classes - Class names which can be strings, arrays, objects, or null/undefined.
 * @returns {string} A single string containing all provided class names, separated by spaces.
 * @example <caption>Basic usage with strings</caption>
 * console.log(classnames('foo', true && 'bar', 'baz')); // 'foo bar baz'
 * 
 * @example <caption>Using objects</caption>
 * console.log(classnames({ foo: true, bar: false, baz: true })); // 'foo baz'
 * 
 * @example <caption>Using objects with various structures</caption>
 * console.log(classnames({ foo: true }, { bar: false }, null, { '--foobar': 'hello' })); // 'foo --foobar'
 * 
 * @example <caption>Using arrays</caption>
 * console.log(classnames(['foo', 0, false, 'bar'])); // 'foo bar'
 * 
 * @example <caption>Using nested arrays</caption>
 * console.log(classnames(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]])); // 'foo bar baz hello there'
 * 
 * @example <caption>Complex example with various input types</caption>
 * console.log(classnames('foo', [1 && 'bar', { baz: false, bat: null }, ['hello', ['world']]], 'cya')); // 'foo bar hello world cya'
 */
export const classnames = (...classes: unknown[]): string => {
  const result: string[] = [];

  /**
   * Processes the input to determine its type and handle it accordingly.
   * @param {unknown} input - The input to process.
   */
  const process = (input: unknown): void => {
    // If the input is a string, add it to the result
    if (typeof input === 'string') {
      result.push(input);
    }

    // If the input is an array, recursively process each element
    if (Array.isArray(input)) {
      input.forEach(process);
    }

    // If the input is an object, add its keys to the result if their values are truthy
    if (input && typeof input === 'object') {
      Object.keys(input as Record<string, unknown>).forEach(key => {
        if ((input as Record<string, unknown>)[key]) {
          result.push(key);
        }
      });
    }
  };

  // Process each class name input
  for (const cls of classes) {
    process(cls);
  }

  // Merge the class names and return the result as a single string
  return twMerge(result.join(' '));
};


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
 * @param {number} [total=100] - The desired total sum of the normalized values. Defaults to 100.
 * @param {number | boolean} [decimalPlaces=true] - The number of decimal places to round each normalized value to. Defaults to 2.
 * @returns {Array<number>} An array of normalized and rounded values that sum up to the specified total.
 *
 * @example <caption>Normalizes to a sum of 100 with 2 decimal places</caption>
 * console.log(normalizeValues([10, 10, 30], 100)); // Output: [20, 20, 60]
 *
 * @example <caption>Normalizes to a sum of 10 with 2 decimal places</caption>
 * console.log(normalizeValues([10, 10, 30], 10)); // Output: [2, 2, 6]
 *
 * @example <caption>Normalizes to a sum of 100 with 0 decimal places</caption>
 * console.log(normalizeValues([30, 10, 20], 100, 0)); // Output: [50, 17, 33] 
 */
export function normalizeValues(values: (number | string)[], total = 100, decimalPlaces: number | boolean = true): number[] {
  if (values.length === 0) return [];

  decimalPlaces = typeof decimalPlaces === 'boolean' ? (decimalPlaces ? 2 : 0) : decimalPlaces;

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