//!=/==============\=!//
//?[ RANDOM NUMBERS ]?//
//!=\==============/=!//

//* RANDOMIZE SHORTCUT - Use number or array: [min, max]
/**
 * Returns a random number between a minimum and maximum value.
 * @param {number | [number, number]} num - Either a number or an array of two numbers representing the minimum and maximum values.
 * @param {number} shift - An optional value to shift the range up or down.
 * @returns {number} - A random number between the specified range.
 *
 * @example
 * const result = randomize(10); // returns a random number between 0 and 10
 * const result2 = randomize([5, 10]); // returns a random number between 5 and 10
 * const result3 = randomize([5, 10], 2); // returns a random number between 7 and 10 (5 + 2)
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

//* HEADS... OR TAILS?
/**
 * Tosses a coin and returns true or false.
 * @param {boolean} useBoolean - Whether to use a fixed value instead of randomization.
 * @returns {boolean} True if heads (or 0 if useBoolean is true), false if tails (or 1 if useBoolean is true).
 */
export const cointoss = (useBoolean=false): boolean => {
  if (useBoolean) {
    const now = new Date().getTime();
    return now % 2 === 0;
  } else {
    return Math.random() >= 0.5;
  }
}

//* RANDOMLY MAKE A NUMBER POSITIVE OR NEGATIVE
/**
 * Returns a random number that is either positive or negative
 * @param n - The number to make positive or negative (default: 1)
 * @returns A random number that is either positive or negative
 */
export const randomPosNeg = (n: number): number => {
  return (n?n:1)*(Math.round(Math.random()) * 2 - 1)
}

//* ROLL A RANDOM NUMBER -- ASSIGN IT WHEREVER YOU WANT ACROSS PAGES!
/**
 * Roll a random number and store/retrieve it in local storage
 * @param operation - A number or 'set' to set a random number in local storage or 'get' to retrieve it
 * @param id - Optional identifier to distinguish between multiple luckyRoll instances
 * @returns If 'get' is used, returns the lucky number, otherwise returns nothing
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

//* RANDOM VALUE FROM BELL CURVE
/**
 * Generate a random value from a bell curve distribution
 * @param {number|boolean} multiplier - A number to multiply the result by, or true to multiply by 100
 * @param {number} min - The minimum value of the output range (default: 0)
 * @param {number} max - The maximum value of the output range (default: 1)
 * @param {number} skew - A factor that skews the distribution, larger values result in more extreme values (default: 1)
 * @returns {number} - A random value from the specified bell curve distribution
 */
/**
 * Generate a random value from a bell curve distribution using the Box-Muller transform.
 *
 * @param {number} [multiplier=1] - A number to multiply the result by. If not provided, the result will be in the range [min, max].
 * @param {number} [min=0] - The minimum value of the output range.
 * @param {number} [max=1] - The maximum value of the output range.
 * @param {number} [skew=1] - A factor that skews the distribution. Values greater than 1 skew towards the maximum, while values less than 1 skew towards the minimum.
 * @param {number} [maxResamples=5] - The maximum number of times to resample the value if it falls outside the desired range.
 * @returns {number} A random value from the specified bell curve distribution, multiplied by the multiplier if provided.
 */
export const randomBell = (
  multiplier = 1,
  min = 0,
  max = 1,
  skew = 1,
  maxResamples = 5
): number => {
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

//* GENERATE RANDOM NUMBER VALUES IN AN ARRAY
/**
 * Generate an array of random number values.
 * @param {number} length - The length of the array.
 * @param {number} maxNum - The maximum number value.
 * @returns {number[]} - An array of random number values.
 */
export const randomNumberArray = (length: number, maxNum: number) => {
  const randomNum = randomize(maxNum) + 1
  if (length < 1) {
    return [];
  }
  return Array.from({length: length}, () => randomNum);
}


//!=/==========\=!//
//?[ OPERATIONS ]?//
//!=\==========/=!//

//* TRUNCATE TO DECIMAL PLACE
/**
 * Truncates a number to the specified decimal place.
 * @param {number} num - The number to be truncated.
 * @param {number} [decimalPlaces=1] - The number of decimal places to truncate to.
 * @returns {number} The truncated number.
 */
export const truncate = (num: number, decimalPlaces?: number): number => {    
  const numPowerConverter = Math.pow(10, decimalPlaces ?? 1); 
  return ~~(num * numPowerConverter)/numPowerConverter;
}

//* ROUND TO NEAREST SPECIFIED MULTIPLE
/**
 * Rounds the given number to the nearest specified multiple.
 *
 * @param {number} num - The number to be rounded.
 * @param {number} [multiple=5] - The multiple to which the number should be rounded.
 * @returns {number} - The rounded number.
 */
export const roundToMultiple = (num: number, multiple?: number): number => {
  const m = multiple ?? 5;
  return Math.round(num / m) * m;
}/**
 * Rounds a number to the specified number of decimal places.
 *
 * @param {number} num - The number to be rounded.
 * @param {number} decimalPlaces - The number of decimal places.
 * @returns {number} The rounded number.
 */
export const roundToPlaces = (num: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}

//* PRECISION ROUNDING (Round things like "1.005")
/**
 * Rounds a number to two decimal places while also taking into account floating point errors.
 * 
 * @param {number} num - The number to round.
 * @returns {number} The rounded number.
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

//* CLAMP NUMBER WITHIN SPECIFIED RANGE
/**
 * Clamps a number within a specified range.
 * @param num - The number to clamp.
 * @param min - The minimum value the number can be. Default is 0.
 * @param max - The maximum value the number can be. Default is 100.
 * @returns The clamped number.
 */
export const numberClamp = (num: number, min?: number, max?: number): number => {
  // Example...
  //  numberClamp(123,50,100) ?? Output: 100
  min = min ? min : 0;
  max = max ? max : 100;
  return Math.min(Math.max(num, min), max);
}

//* CONVERT VALUE TO NUMBER
//? Use 'unary operator' ("+") to convert any value to its equivalent
//? number value.
//? Fastest (and preferred) way to convert values to numbers because
//? no other operations are performed to the number.
/**
 * Converts the given value to its equivalent number value using the
 * unary operator "+".
 * 
 * @param {unknown} value - The value to convert to a number.
 * @returns {number} The equivalent number value of the given value.
 */
export const toNum = (value: unknown): number => {
  return Number(value);
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

//* CONVERT VALUES IN AN ARRAY TO NUMBERS
/**
 * Convert an array of values to an array of numbers.
 * @param {unknown[]} arr - The input array of values to be converted.
 * @returns {number[]} An array of numbers.
 */
export const arrayToNumbers = (arr: unknown[]): number[] => {
  return arr.map(toNum);
}

/**
 * Returns an even number, rounding up or down if necessary
 * @param {number} number - The number to make even
 * @param {boolean} [roundUp=false] - Whether to round up if the number is odd
 * @returns {number} - The even number
 */
export const makeNumberEven = (number: number, roundUp = false): number => {
  const rounded = roundUp ? number+1 : number-1;
  return number % 2 == 0 ? number : rounded;
}

/**
 * Returns an odd number, rounding up or down if necessary
 * @param {number} number - The number to make odd
 * @param {boolean} [roundUp=false] - Whether to round up if the number is even
 * @returns {number} - The odd number
 */
export const makeNumberOdd = (number: number, roundUp = false): number => {
  const rounded = roundUp ? number+1 : number-1;
  return number % 2 == 0 ? rounded : number;
}


//!=/==========\=!//
//?[ MATH UTILS ]?//
//!=\==========/=!//

//* GET THE GREATEST COMMON DENOMINATOR
const gcdCompare = (a: number, b: number): number => {
  a = Math.abs(a); // Ensure the numbers are positive
  b = Math.abs(b);
  if (b === 0) {
    return a;
  }
  return gcdCompare(b, a % b);
};

//* GET THE LEAST COMMON MULTIPLE
const lcmCompare = (a: number, b: number): number => {
  a = Math.abs(a); // Ensure the numbers are positive
  b = Math.abs(b);
  return (a * b) / gcdCompare(a, b);
};

//* GET THE GREATEST COMMON DENOMINATOR FROM A SET OF NUMBERS
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

//* GET THE LEAST COMMON MULTIPLE FROM A SET OF NUMBERS
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

//* GET THE SUM OF AN ARRAY OF NUMBERS
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
export const sumAll = (arr: number[]): number => {
  return arr.reduce((a, b) => a + b, 0);
}


//!=/==============\=!//
//?[ BOOLEAN CHECKS ]?//
//!=\==============/=!//

//* HANDLE EVEN/ODD VALUES
/**
 * Returns true if the provided number is even, false if not
 * @param {number} number - The number to check
 * @returns {boolean} - true if the number is even, false if not
 */
export const numberIsEven = (number: number): boolean => {
  return number % 2 == 0 ? true : false;
}

/**
 * Returns true if the provided number is odd, false if not
 * @param {number} number - The number to check
 * @returns {boolean} - true if the number is odd, false if not
 */
export const numberIsOdd = (number: number): boolean => {
  return number % 2 == 0 ? false : true;
}

//* CHECK IF NUMBER IS A PRIME NUMBER
/**
 * Checks if a number is prime.
 *
 * @param {number} number - The number to check.
 * @returns {boolean} Whether the number is prime.
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

//* CHECKS IF A NUMBER IS A WHOLE NUMBER
/**
 * Checks if a number is a whole number (an integer).
 * @param {number} num - The number to check.
 * @returns {boolean} True if the number is a whole number, false otherwise.
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


//!=/============\=!//
//?[ NUMBER UTILS ]?//
//!=\============/=!//

//* CONVERT A STRING INTO AN ARRAY OF VALUES
//? Split string by spaces or commas ('0.01 2300 4' - or - '0.01 2,300 4' - or - '0.01,2_300,4')
/**
 * Convert a string into an array of values.
 * @param {string} str - The string to be converted.
 * @param {boolean} [onlyNumbers=true] - If true, only numeric values are returned.
 * @returns {Array} - An array of values extracted from the input string.
 */
export const stringToArrayValues = (str: string, onlyNumbers = true): string[] => {
  str = str.trim();
  const spaces = /^\S*$/;
  if(!spaces.test(str)) {
    return str.replace(/,/g, '').trim().split(" ").filter((v:unknown)=>v!='');
  }
  return onlyNumbers
    ? str.split(",").filter((v:unknown) => !isNaN(Number(v)))
    : str.split(",").filter((v:unknown) => v != '');
}