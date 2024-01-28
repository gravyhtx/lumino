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
export function returnFirstValid(values: Array<unknown>): unknown {
  for (const value of values) {
    if (value || value === 0 || value === false) {
      return value;
    }
  }
  return values[values.length - 1];
}

/**
 * Converts a number to a string according to specific rules.
 * - Numbers up to 3.5 are rounded to the nearest multiple of 0.5.
 * - Numbers above 3.5 and up to 20 are integers.
 * - Numbers above 20 are multiples of 4 up to 64, then 72, 80, and 96.
 * - Numbers are capped at 96.
 * 
 * @param num - The number to convert.
 * @returns The converted string.
*/
export function cssNumber(num?: number | string): string | undefined {
  let numericValue = typeof num === 'string' ? parseFloat(num) : num;

  // Check if the numericValue is a valid number
  if (typeof numericValue === 'number' && isFinite(numericValue)) {
    // Handle negative values
    const isNegative = numericValue < 0;
    numericValue = Math.abs(numericValue);

    // Cap the number at 96
    numericValue = Math.min(numericValue, 96);

    // Handle numbers less than or equal to 3.5
    if (numericValue <= 3.5) {
      const rounded = Math.round(numericValue * 2) / 2;
      return (isNegative ? '-' : '') + (rounded < 1 ? `0${rounded}` : rounded.toString());
    }

    // Handle numbers greater than 3.5 and up to 20
    if (numericValue <= 20) {
      return (isNegative ? '-' : '') + Math.floor(numericValue).toString();
    }

    // Special numbers for rounding
    const specialNumbers = [64, 72, 80, 96];

    // Find the closest special number or handle if it's a special number
    if (numericValue > 20) {
      const closest = specialNumbers.reduce((prev, curr) =>
        (Math.abs(curr - Number(numericValue)) < Math.abs(prev - Number(numericValue))) ? curr : prev
      );
      return (isNegative ? '-' : '') + closest.toString();
    }

    // Default to multiples of 4
    return (isNegative ? '-' : '') + (Math.floor(numericValue / 4) * 4).toString();
  }

  // Return undefined for non-numeric inputs or strings that can't be parsed into numbers
  return undefined;
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
 * Generates a TailwindCSS margin class string based on size and sides.
 * It handles both positive and negative numbers and special cases like 'auto'.
 *
 * @param {number | 'auto'} size - The size of the margin. Can be a number, 'auto', or undefined.
 * @param {'x' | 'y' | 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'} [sides] - The side(s) where the margin is applied. Optional.
 * @returns {string} The TailwindCSS margin class string.
 *
 * @example
 * //* Returns 'mt-4'
 * marginClass(4, 'top');
 *
 * @example
 * //* Returns '-mx-2'
 * marginClass(-2, 'x');
 *
 * @example
 * //* Returns 'm-auto'
 * marginClass(); // or `marginClass('auto');`
 */
export const marginClass = (
  size?: number | 'px' | 'auto',
  sides?: 'x' | 'y' | 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'
) => (size ?? sides) ? `${isNegative(Number(size)) ? '-' : ''}m${(sides ?? '')}-${(cssNumber(size) ?? 'auto')}` : '';