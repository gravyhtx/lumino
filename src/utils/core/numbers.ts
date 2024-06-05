// ~/utils/core/numbers.ts
//!=/==========\=!//
//?[ OPERATIONS ]?//
//!=\==========/=!//

/**
 * Truncates a number to the specified decimal place.
 * @param {number} num - The number to be truncated.
 * @param {number} [decimalPlaces=1] - The number of decimal places to truncate to.
 * @returns {number} The truncated number.
 * 
 * @example
 * truncate(1.005, 2); // Returns 1.01
 */
export const truncate = (num: number, decimalPlaces?: number): number => {    
  const numPowerConverter = Math.pow(10, decimalPlaces ?? 1); 
  return ~~(num * numPowerConverter)/numPowerConverter;
}

/**
 * Rounds the given number to the nearest specified multiple.
 *
 * @param {number} num - The number to be rounded.
 * @param {number} [multiple=5] - The multiple to which the number should be rounded.
 * @returns {number} - The rounded number.
 * 
 * @example
 * roundToMultiple(12, 5); // Returns 10
 * roundToMultiple(12, 10); // Returns 10
 * roundToMultiple(12, 3); // Returns 12
 */
export const roundToMultiple = (num: number, multiple?: number): number => {
  const m = multiple ?? 5;
  return Math.round(num / m) * m;
}

/**
 * Rounds a number to the specified number of decimal places.
 *
 * @param {number} num - The number to be rounded.
 * @param {number} decimalPlaces - The number of decimal places.
 * @returns {number} The rounded number.
 * 
 * @example
 * roundToPlaces(1.005, 2); // Returns 1.01
 */
export const roundToPlaces = (num: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}

/**
 * Rounds a number to two decimal places while also taking into account floating point errors.
 * 
 * @param {number} num - The number to round.
 * @returns {number} The rounded number.
 * 
 * @example
 * roundToTwo(1.005); // Returns 1.01
 */
export const precisionRound = (num: number): number => {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

//* GAUSSIAN ROUNDING (Round to the nearest even number)
/**
 * Round a number to the nearest even number, also known as "Gaussian rounding".
 * @param {number} num - The number to round.
 * @param {number} [decimalPlaces] - The number of decimal places to round to.
 * @returns {number} The rounded number.
 * 
 * @example
 * gaussRound(1.5); // Returns 2
 */
export const gaussRound = (num: number, decimalPlaces?: number): number => {
  const d = decimalPlaces ?? 0,
  m = Math.pow(10, d),
  n = +(d ? num * m : num).toFixed(8),
  i = Math.floor(n), f = n - i,
  e = 1e-8,
  r = (f > 0.5 - e && f < 0.5 + e) ?
  ((i % 2 == 0) ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}

/**
 * Clamps a number within a specified range.
 * 
 * @param num - The number to clamp.
 * @param min - The minimum value the number can be. Default is 0.
 * @param max - The maximum value the number can be. Default is 100.
 * @returns The clamped number.
 * 
 * @example
 * numberClamp(123, 50, 100); // Returns 100
 * numberClamp(123, 50); // Returns 100
 * numberClamp(123); // Returns 100
 * numberClamp(23, 50, 100); // Returns 50
 */
export const numberClamp = (num: number, range: [(number|undefined), (number|undefined)] = [0, 100]): number => {
  const [min=0, max=100] = range;
  return Math.min(Math.max(num, min), max);
}

/**
 * Converts the given value to its equivalent number value using the
 * unary operator "+".
 * 
 * @param {T} value - The value to convert to a number.
 * @returns {number} The equivalent number value of the given value.
 * 
 * @example
 * toNum("5"); // Returns 5
 */
export const toNum = <T>(value: T): number => {
  return Number(value);
}

/**
 * Converts a percentage string to a numeric value.
 * Optionally clamps the value within a specified range.
 * 
 * @param {string} value - The percentage value as a string.
 * @param {[(number|undefined), (number|undefined)] | boolean} range - The range to clamp the value. Default is 'false' (any value), 'true' sets the range to `[0, 100]`.
 * @returns {number} - The numeric value of the percentage.
 * 
 * @example
 * percentToValue("50%"); // Returns 0.5
 * percentToValue("150%", [0, 100]); // Returns 1
 * percentToValue("150%", true); // Returns 1
 * percentToValue("150%", false); // Returns 1.5
 * percentToValue("80%", [0, 50]); // Returns 0.5
*/
export const percentToValue = (
  value: `${number}%`,
  range: [min: (number|undefined), max: (number|undefined)] | boolean = false
): number => {
  const percentage = parseInt(value, 10);
  if (range) {
   const [min=0, max=100] = range === true ? [0, 100] : range;
   return Math.min(Math.max(percentage, min), max) / 100;
  }
  return parseInt(String(value)) / 100;
}

/**
 * Convert an array of values to an array of numbers.
 * 
 * @param {unknown[]} arr - The input array of values to be converted.
 * @returns {number[]} An array of numbers.
 * 
 * @example
 * arrayToNumbers(["1", "2", "3"]); // Returns [1, 2, 3]
 * arrayToNumbers(["1", "2", "3", "a"]); // Returns [1, 2, 3, NaN]
 */
export const arrayToNumbers = (arr: unknown[]): number[] => {
  return arr.map(toNum);
}

/**
 * Returns an even number, rounding up or down if necessary
 * 
 * @param {number} number - The number to make even
 * @param {boolean} [roundUp=false] - Whether to round up if the number is odd
 * @returns {number} - The even number
 * 
 * @example
 * makeNumberEven(3); // Returns 2
 * makeNumberEven(3, true); // Returns 4
 */
export const makeNumberEven = (number: number, roundUp = false): number => {
  const rounded = roundUp ? number+1 : number-1;
  return number % 2 == 0 ? number : rounded;
}

/**
 * Returns an odd number, rounding up or down if necessary
 * 
 * @param {number} number - The number to make odd
 * @param {boolean} [roundUp=false] - Whether to round up if the number is even
 * @returns {number} - The odd number
 * 
 * @example
 * makeNumberOdd(2); // Returns 1
 * makeNumberOdd(2, true); // Returns 3
 */
export const makeNumberOdd = (number: number, roundUp = false): number => {
  const rounded = roundUp ? number+1 : number-1;
  return number % 2 == 0 ? rounded : number;
}


//!=/==============\=!//
//?[ BOOLEAN CHECKS ]?//
//!=\==============/=!//

/**
 * Returns true if the provided number is even, false if not
 * 
 * @param {number} number - The number to check
 * @returns {boolean} - true if the number is even, false if not
 * 
 * @example
 * numberIsEven(4); // Returns true
 * numberIsEven(5); // Returns false
 */
export const numberIsEven = (number: number): boolean => {
  return number % 2 == 0 ? true : false;
}

/**
 * Returns true if the provided number is odd, false if not
 * 
 * @param {number} number - The number to check
 * @returns {boolean} - true if the number is odd, false if not
 * 
 * @example
 * numberIsOdd(4); // Returns false
 * numberIsOdd(5); // Returns true
 */
export const numberIsOdd = (number: number): boolean => {
  return number % 2 == 0 ? false : true;
}

/**
 * Checks if a number is prime.
 *
 * @param {number} number - The number to check.
 * @returns {boolean} Whether the number is prime.
 * 
 * @example
 * isPrime(7); // Returns true
 * isPrime(10); // Returns false
 */
export const isPrime = (number: number): boolean => {
  if (number < 2) {
    return false;
  }
  if (number > 2 && number % 2 === 0) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};

/**
 * Checks if a number is a whole number (an integer).
 * @param {number} num - The number to check.
 * @returns {boolean} True if the number is a whole number, false otherwise.
 * 
 * @example
 * isWholeNumber(5); // Returns true
 * isWholeNumber(5.5); // Returns false
 */
export const isWholeNumber = (num: number): boolean => {
  return num % 1 === 0;
}

/**
 * Checks if a given numeric value is negative.
 * It can handle both number and string inputs and returns true if the value is negative.
 *
 * @param {string | number} value - The value to check if it's negative.
 * @returns {boolean} True if the value is negative, false otherwise.
 *
 * @example <caption>Returns true</caption>
 * isNegative(-5);
 *
 * @example <caption>Returns false</caption>
 * isNegative(10);
 *
 * @example <caption>Returns true</caption>
 * isNegative("-3.5");
 */
export const isNegative = (value: string | number): boolean => { 
  if (!isNaN(Number(value))) {
    return typeof value === 'number' ? value < 0 : value.startsWith('-');
  }
  return false;
}


//!=/==========\=!//
//?[ MATH UTILS ]?//
//!=\==========/=!//
/**
 * Calculates the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The greatest common divisor of `a` and `b`.
 *
 * @example
 * const gcd = gcdCompare(24, 18); // Returns 6
 * const gcd = gcdCompare(-10, 5); // Returns 5 (absolute values are used)
 */
export const gcdCompare = (a: number, b: number): number => {
  a = Math.abs(a); // Ensure the numbers are positive
  b = Math.abs(b);
  if (b === 0) {
    return a;
  }
  return gcdCompare(b, a % b);
};

/**
 * Calculates the least common multiple (LCM) of two numbers.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The least common multiple of `a` and `b`.
 *
 * @example
 * const lcm = lcmCompare(4, 6); // Returns 12
 * const lcm = lcmCompare(-8, 12); // Returns 24 (absolute values are used)
 */
export const lcmCompare = (a: number, b: number): number => {
  a = Math.abs(a); // Ensure the numbers are positive
  b = Math.abs(b);
  return (a * b) / gcdCompare(a, b);
};

/**
 * Calculates the greatest common divisor (GCD) of multiple numbers.
 *
 * @param nums - The numbers for which to calculate the GCD
 * @returns The GCD of all the numbers
 *
 * @example
 * gcm(24, 36, 48) // returns 12
 * gcm(17, 13, 19) // returns 1
 */
export const gcd = (...nums: number[]): number => {
  let common = Math.abs(Number(nums[0])); // Ensure the first number is positive
  for (let i = 1; i < nums.length; i++) {
    common = gcdCompare(common, Math.abs(Number(nums[i]))); // Ensure each number is positive
  }
  return common;
};

/**
 * Calculates the least common multiple (LCM) of multiple numbers.
 *
 * @param nums - The numbers for which to calculate the LCM
 * @returns The LCM of all the numbers
 *
 * @example
 * lcm(4, 5, 10) // returns 20
 * lcm(12, 18, 24) // returns 72
 */
export const lcm = (...nums: number[]): number => {
  let common = Math.abs(Number(nums[0])); // Ensure the first number is positive
  for (let i = 1; i < nums.length; i++) {
    common = lcmCompare(common, Math.abs(Number(nums[i]))); // Ensure each number is positive
  }
  return common;
};

/**
 * Converts a number to a positive integer.
 * Takes the absolute value of the number and truncates any decimal portion.
 * @param {number} num - The number to convert.
 * @returns {number} The positive integer.
 * @example <caption>Example usage:</caption>
 * 
 * const result = positiveInteger(-42.7); // Returns: 42
 * const result = positiveInteger(5.9);   // Returns: 5
 */
export const positiveInteger = (num: number): number => Math.trunc(Math.abs(num));

/**
 * Sums all the numbers in an array.
 *
 * @param {number[]} arr - The array of numbers to sum.
 * @returns {number} The sum of all the numbers in the array.
 *
 * @example
 * const result = sumAll([1, 2, 3, 4, 5]); // returns 15
 * const result2 = sumAll([-1, 1]); // returns 0
 * const result3 = sumAll([10, 20, 30]); // returns 60
 */
export const sumAll = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

/**
 * Multiplies all the numbers in an array.
 *
 * @param {number[]} arr - The array of numbers to multiply.
 * @returns {number} The product of all the numbers in the array.
 *
 * @example
 * const result = multiplyAll([1, 2, 3, 4, 5]); // returns 120
 * const result2 = multiplyAll([-1, 1]); // returns -1
 * const result3 = multiplyAll([10, 20, 30]); // returns 6000
 */
export const multiplyAll = (arr: number[]): number => arr.reduce((a, b) => a * b, 1);

/**
 * Returns the largest number from an array or from each sub-array in an array of arrays.
 * 
 * @param arr - An array of numbers or an array of arrays of numbers.
 * @returns An array containing the largest number from each sub-array or a single number if it's a flat array.
 * 
 * @example
 * const flatArray = [1, 2, 3];
 * const nestedArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
 * console.log(largestNumber(flatArray)); // Returns: 3
 * console.log(largestNumber(nestedArray)); // Returns: [3, 6, 9]
 */
export const largestNumber = (arr: Array<number | number[]>): number | number[] => {
  if (arr.every(item => typeof item === 'number')) {
    return Math.max(...arr as number[]);
  }
  return (arr as number[][]).map(subArr => Math.max(...subArr));
};

/**
 * Returns the smallest number from an array or from each sub-array in an array of arrays.
 * 
 * @param arr - An array of numbers or an array of arrays of numbers.
 * @returns An array containing the smallest number from each sub-array or a single number if it's a flat array.
 * 
 * @example
 * const flatArray = [3, 2, 1];
 * const nestedArray = [[3, 2, 1], [6, 5, 4], [9, 8, 7]];
 * console.log(smallestNumber(flatArray)); // Returns: 1
 * console.log(smallestNumber(nestedArray)); // Returns: [1, 4, 7]
 */
export const smallestNumber = (arr: Array<number | number[]>): number | number[] => {
  if (arr.every(item => typeof item === 'number')) {
    return Math.min(...arr as number[]);
  }
  return (arr as number[][]).map(subArr => Math.min(...subArr));
};

/**
 * Calculates the factorial of a number.
 *
 * @param num - The number for which to calculate the factorial.
 * @returns The factorial of the number.
 *
 * @example
 * factorial(5); // Returns: 120
 * factorial(0); // Returns: 1
 */
export const factorial = (num: number): number => (num === 0 ? 1 : num * factorial(num - 1));

/**
 * Calculates the median of a given array of numbers.
 * 
 * @param {number[]} arr - An array of numbers.
 * @returns {number} The median of the array. Returns NaN if the array is empty.
 * 
 * @example <caption> Calculate median of a list of numbers</caption>
 * console.log(median([3, 1, 2])); // Returns: 2
 * console.log(median([3, 1, 2, 4])); // Returns: 2.5
 * console.log(median([])); // Returns: NaN
 */
export const median = (arr: number[]): number => {
  if (arr.length === 0) {
    return NaN;  // Return NaN if the array is empty
  }

  const nums = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);

  // Helper function to safely access array elements
  const getElement = (offset: number): number => nums[mid + offset] ?? 0;

  // If the array length is odd, return the middle element
  if (nums.length % 2 !== 0) {
    return getElement(0);
  } else {
    // For even length array, calculate the average of the two middle elements
    return (getElement(-1) + getElement(0)) / 2;
  }
};

/**
 * Calculates the average of a given array of numbers.
 * @param {number[]} arr - An array of numbers.
 * @returns {number} The average of the array. Returns NaN if the array is empty.
 * 
 * @example <caption>Calculate average of a list of numbers</caption>
 * console.log(average([3, 1, 2])); // Returns: 2
 * console.log(average([3, 1, 2, 4])); // Returns: 2.5
 * console.log(average([])); // Returns: NaN
 */
export const average = (arr: number[]): number => median(arr);


//!=/============\=!//
//?[ NUMBER UTILS ]?//
//!=\============/=!//

/**
 * Convert a string into an array of values.
 * 
 * @param {string} str - The string to be converted.
 * @param {boolean} [onlyNumbers=false] - If true, only numeric values are returned.
 * @returns {Array} - An array of values extracted from the input string.
 * 
 * @example
 * stringToArrayValues("1, 2, 3, a, b, c"); // Returns [1, 2, 3, 'a', 'b', 'c']
 * stringToArrayValues("1, 2, 3, a, b, c", true); // Returns: [1, 2, 3]
 */
export const stringToArrayValues = (str: string, onlyNumbers = false): (string | number)[] => {
  str = str.trim();
  const spaces = /^\S*$/;
  if(!spaces.test(str)) {
    return str.replace(/,/g, '').trim().split(" ").filter((v:unknown)=>v!='');
  }
  return onlyNumbers
    ? str.split(",").filter((v:unknown) => !isNaN(Number(v)))
    : str.split(",").filter((v:unknown) => v != '');
}

/**
 * Generates an array of numbers based on the specified range, step, and additional options.
 * 
 * @param range - The number of elements to generate.
 * @param opts - Options to customize the output array:
 *               `start` sets the starting number (default is 0),
 *               `step` defines the increment between elements (default is 1),
 *               `reverse` determines if the array should be generated in reverse order (default is false).
 * @returns An array of numbers based on the provided parameters.
 *
 * @example <caption>Generate a series starting from 5, 10 elements, increment by 3</caption>
 * const numbers = numberSet(10, { start: 5, step: 3 });
 * console.log(numbers); // Returns: [5, 8, 11, 14, 17, 20, 23, 26, 29, 32]
 * 
 * @example <caption>Generate a reversed series starting from 0, 5 elements, decrement by 1</caption>
 * const descendingNumbers = numberSet(5, { reverse: true });
 * console.log(descendingNumbers); // Returns: [4, 3, 2, 1, 0]
 */
export const numberSet = (
  range: number,
  opts: { start?: number; step?: number; reverse?: boolean } = {}
) => {
  const { start = 0, step = 1, reverse = false } = opts;
  const array = Array.from({ length: range }, (_, i) => start + i * step);
  return reverse ? array.reverse() : array;
};

/**
* Checks if a string is a valid representation of a number using only numbers as words.
* 
* @param {string} input The string to check.
* @returns {boolean} True if the string represents a number using only words and spaces, false otherwise.
* 
* @example
* console.log(isNumberString("twenty two")); // true
* console.log(isNumberString("one Hundred THOUSAND")); // true
* console.log(isNumberString("twenty two and")); // false
*/
export const isNumberString = (input: string): boolean => {
  const numberWords: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
    'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
    'hundred', 'thousand', 'million', 'billion', 'trillion'
  ];
  const words = input.toLowerCase().split(/\s+/);
  return words.every(word => numberWords.includes(word));
};

/**
 * Formats a number with thousands separators.
 *
 * @param {number} number - The number to format.
 * @param {string} [separator=','] - The separator character to use for thousands.
 * @param {object} [opts] - An object containing formatting options.
 * @returns {string} The formatted number string.
 *
 * @example
 * formatNumber(1234567.89); // Returns "1,234,567.89"
 * formatNumber(1234567.89, '.'); // Returns "1.234.567,89"
 */
export const formatNumber = (
  number: number,
  separator = ',',
  opts: {
    locale?: string,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    useGrouping?: boolean
  } = {}
): string => {
  const { minimumFractionDigits=2, maximumFractionDigits=2, useGrouping=true, locale='en-US' } = opts;
  return number.toLocaleString(locale, { useGrouping, minimumFractionDigits, maximumFractionDigits }).replace(/,/g, separator);
};

/**
 * Parses a number from a string, handling different formats.
 *
 * @param {string} str - The string to parse.
 * @param {string} [separator=','] - The separator character used for thousands.
 * @returns {number} The parsed number, or NaN if the string is invalid.
 *
 * @example
 * parseNumber("1,234,567.89"); // Returns 1234567.89
 * parseNumber("1.234.567,89", "."); // Returns 1234567.89
 */
export const parseNumber = (str: string, separator = ','): number => {
  return Number(str.replace(new RegExp(`\\${separator}`, 'g'), ''));
};