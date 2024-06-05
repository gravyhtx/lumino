// ~/utils/core/crypto.ts
import * as crypto from 'crypto';
import { windowExists } from "../validation";
import { shuffleStr } from './random';
import { positiveInteger } from './numbers';

//!=/==========\=!//
//?[ THE BASICS ]?//
//!=\==========/=!//

/**
 * Generate a random number using the built-in crypto module.
 *
 * @param {number | [number, number]} num - The maximum number or a tuple of [min, max].
 * @param {number} [shift] - An optional number to shift the minimum value.
 * @returns {number} - A random number within the specified range.
 *
 * @example <caption>Generate a cryptographically random number between 0 and 10</caption>
 * const randomNum = cryptoRando(10);
 *
 * @example <caption>Generate a cryptographically random number between 5 and 15</caption>
 * const randomNum = cryptoRando([5, 15]);
 */
export const cryptoRando = (
  num: number | [min: number, max: number],
  shift?: number
): number => {
  let max: number;
  let min: number;
  if (Array.isArray(num)) {
    min = num[0] && num[1] && num[0] > 0 && num[0] < num[1] ? num[0] : 0;
    max = num[0] && num[1] && num[1] > num[0] ? num[1] : 1;
  } else {
    min = 0;
    max = num && num > 0 ? num : 1;
  }
  const range = max - min + 1;
  const bytes = crypto.randomBytes(4);
  const rand = (bytes.readUInt32BE() / 0xffffffff) * range + min;
  const shiftNum = shift ? min + shift : min;
  return Math.floor(rand) + shiftNum;
};

/**
 * Convert a string to 8-bit characters.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} - The string converted to 8-bit characters.
 *
 * @example
 * const binaryStr = toBinary('Hello, World!');
 */
export const toBinary = (str: string): string => {
  const codeUnits = Uint16Array.from(
    { length: str.length },
    (_, index) => str.charCodeAt(index)
  );
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
};

/**
 * Convert a string from 8-bit characters back to its original form.
 *
 * @param {string} binary - The 8-bit string to convert.
 * @returns {string} - The original string.
 *
 * @example
 * const originalStr = fromBinary(binaryStr);
 */
export const fromBinary = (binary: string): string => {
  const bytes = Uint8Array.from(
    { length: binary.length },
    (_, index) => binary.charCodeAt(index)
  );
  const charCodes = new Uint16Array(bytes.buffer);
  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
};


//!=/====================\=!//
//?[ ENCRYPTION & HASHING ]?//
//!=\====================/=!//

/**
 * Simple encryption and decryption function using the built-in crypto module.
 *
 * @param {string | { hash: string; iv: string | Buffer }} data - The data to encrypt or decrypt.
 * @param {string | Buffer} [key] - The encryption key.
 * @returns {{ encrypt: { iv: string; hash: string } | null; decrypt: string | null }} - An object containing the encrypted data or decrypted string.
 *
 * @example <caption>Encrypt a string</caption>
 * const encryptedData = simpleCrypto('Hello, World!', 'secretKey');
 *
 * @example <caption>Decrypt an encrypted object</caption>
 * const decryptedStr = simpleCrypto(encryptedData, 'secretKey').decrypt;
 */
export const simpleCrypto = (
  data: string | { hash: string; iv: string | Buffer },
  key?: string | Buffer
): { encrypt: { iv: string; hash: string } | null; decrypt: string | null } => {
  const isString = typeof data === 'string';
  const dataIv = !isString && data?.iv && !Buffer.isBuffer(data?.iv)
    ? Buffer.from(data?.iv, 'hex')
    : !isString && data?.iv && !Buffer.isBuffer(data?.iv)
      ? data?.iv
      : null;
  const cryptoIv = dataIv ?? crypto.randomBytes(16);
  key = process.env.CRYPTO_SECRET_KEY ? Buffer.from(process.env.CRYPTO_SECRET_KEY) :
    !Buffer.isBuffer(key) && key ? Buffer.from(key) : key;

  const cipher = isString && key ? crypto.createCipheriv('aes-256-cbc', key, cryptoIv) : null;
  const decipher = !isString && key && "hash" in data && "iv" in data ? crypto.createDecipheriv('aes-256-cbc', key, cryptoIv) : null;
  let hash = isString && cipher ? cipher.update(data, 'utf8', 'base64') : '';
  hash += isString && cipher ? cipher.final('base64').replace(/=+$/, '') : null;
  let decrypted = !isString && "hash" in data && "iv" in data && decipher ? decipher.update(data.hash, 'base64', 'utf8') : '';
  decrypted += !isString && decipher && "hash" in data && "iv" in data ? decipher.final('utf8') : null;

  return {
    encrypt: isString ? { iv: cryptoIv.toString('hex'), hash } : null,
    decrypt: decrypted ? decrypted : null,
  };
};

/**
 * Base64 encryption (not secure).
 *
 * @param {string} str - The string to encrypt or decrypt.
 * @returns {string | undefined} - The encrypted or decrypted string, or undefined if the operation fails.
 *
 * @example <caption>Encrypt a string</caption>
 * const encryptedStr = baseEncrypt('Hello, World!');
 *
 * @example <caption>Decrypt a Base64 encrypted string</caption>
 * const decryptedStr = baseEncrypt(encryptedStr);
 */
export const baseEncrypt = (str: string): string | undefined => {
  if (windowExists()) {
    const binaryStr = toBinary(str);
    const encrypted = () => {
      try {
        const base64Str = window.btoa(binaryStr);
        return base64Str;
      } catch (e) {
        return undefined;
      }
    };
    const decrypted = () => {
      try {
        const fromBinaryStr = fromBinary(window.atob(str));
        return fromBinaryStr;
      } catch (e) {
        return undefined;
      }
    };
    if (decrypted()) {
      return decrypted();
    } else if (encrypted()) {
      return encrypted();
    } else {
      return undefined;
    }
  }
};

/**
 * Generate a shortened numeric hash from a string.
 *
 * @param {string} str - The input string to hash.
 * @returns {number} - The shortened numeric hash.
 *
 * @example
 * const hash = shortenHash('Hello, World!');
 */
export const shortenHash = (str: string): number => {
  const len = str.length;
  let output = 0;
  for (let h = 0, i = 0; i < len; h &= h) {
    output = 31 * h + str.charCodeAt(i++);
  }
  return output;
};

/**
 * Generate a simple hash string from an input string.
 *
 * @param {string} str - The input string to hash.
 * @param {number} [length] - The desired length of the hash string (between 6 and 12).
 * @param {boolean} [lowercase] - Whether to output the hash string in lowercase.
 * @returns {string} - The generated hash string.
 *
 * @example
 * const hash = simpleHash('Hello, World!', 8, true);
 */
export const simpleHash = (str: string, length?: number, lowercase?: boolean): string => {
  const lc = lowercase === true ? true : false;
  let hash = 0;
  const outputLength = length && length >= 6 && length <= 12
    ? length
    : length && length > 12
      ? 12
      : length && length < 6
        ? 6
        : 6;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }

  let output = new Uint32Array([hash])[0]!.toString(36);

  while (output.length < outputLength) {
    const randomNum = Math.floor(Math.random() * 10).toString();
    output += randomNum;
  }
  output = lc ? output : output.toUpperCase();
  return shuffleStr(output);
};

/**
 * Generate an array of cryptographic random numbers.
 *
 * @param {number} length - The desired length of the array.
 * @param {number} maxNum - The maximum number for each element in the array.
 * @returns {number[]} - The array of random numbers.
 *
 * @example
 * const randomNumbers = cryptoNumberArray(5, 100);
 */
export const cryptoNumberArray = (length: number, maxNum: number): number[] => {
  const randomNum = cryptoRando(maxNum) + 1;
  if (length < 1) {
    return [];
  }
  return Array.from({ length: length }, () => randomNum);
};

/**
 * Generate a unique identifier (UID) with a specified character length.
 *
 * @param {number} [length] - The desired length of the UID (default is 6).
 * @param {boolean} [uppercase] - Whether to output the UID in uppercase.
 * @returns {string} - The generated UID.
 *
 * @example
 * const uid = generateUID(8, true);
 * console.log(uid); // Output: "A1B2C3D4"
 */
export const generateUID = (length?: number, uppercase?: boolean): string => {
  const arr: string[] = [];
  length = length && length > 0 ? length : 6;
  const loop = length < 6 ? 1 : Math.ceil(length / 6);
  for (let i = 0; i < loop; i++) {
    let firstHalf = cryptoRando(46656).toString(36);
    let secondHalf = cryptoRando(46656).toString(36);
    firstHalf = ("000" + firstHalf).slice(-3);
    secondHalf = ("000" + secondHalf).slice(-3);
    arr.push(firstHalf + secondHalf);
  }
  const output = arr.join('').slice(0, length);
  return uppercase ? output.toUpperCase() : output;
};


/**
 * Generate a random string with a specified character length.
 *
 * @param {number} [length] - The desired length of the string (default is 14).
 * @param {boolean} [uppercase] - Whether to output the string in uppercase or lowercase.
 * @returns {string} - The generated random string.
 *
 * @example
 * const randomStr = randomString(10, false);
 * console.log(randomStr); // Output: "a1b2c3d4e5"
 */
export const randomString = (length?: number, uppercase?: boolean): string => {
  const arr: string[] = [];
  length = length && length > 0 ? length : 14;
  const loop = length < 6 ? 1 : Math.ceil(length / 6);
  for (let i = 0; i < loop; i++) {
    arr.push(Math.floor((Math.random() * Math.pow(10, 16))).toString(16));
  }
  const output = arr.join('').slice(0, length);
  return uppercase === true ? output.toUpperCase()
    : uppercase === false ? output.toLowerCase()
      : output;
};


//! //==============\\ !//
//! || QUITE UNSAFE || !//
//! \\==============// !//

/**
 * ROT13 cipher (aka "Caesar Cipher") - Same function to encode and decode.
 *
 * @param {string} str - The string to encode or decode.
 * @returns {string} - The encoded or decoded string.
 *
 * @example
 * const encodedStr = rot13('Hello, World!');
 * const decodedStr = rot13(encodedStr);
 */
export const rot13 = (str: string): string =>
  str.split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) + (char.toLowerCase() < 'n' ? 13 : -13)))
    .join('');

/**
 * Applies a Caesar cipher to a given string, shifting each letter by a specified number of places in the alphabet.
 * Supports arbitrary shifts and maintains the case of each letter. Non-alphabetical characters are returned as is.
 *
 * @param {string} str - The input string to be encoded.
 * @param {number} [shift=13] - The number of positions to shift each letter. Default is 13, which corresponds to ROT13.
 * @returns {string} The encoded string, where each alphabetic character is shifted by the specified number of places.
 *
 * @example
 * // Returns 'Uryyb, Jbeyq!' for a 13-place shift.
 * console.log(rotCipher('Hello, World!'));
 * @example
 * // Returns 'Mjqqt, Btwqi!' for a 5-place shift.
 * console.log(rotCipher('Hello, World!', 5));
 */
export const rotCipher = (str: string, shift = 13): string => {
  const shiftAmount = shift % 26;
  return str
    .split('')
    .map(char => {
      const charCode = char.charCodeAt(0);
      if (charCode >= 97 && charCode <= 122) { // Lowercase letters
        return String.fromCharCode(((charCode - 97 + shiftAmount) % 26) + 97);
      }
      if (charCode >= 65 && charCode <= 90) { // Uppercase letters
        return String.fromCharCode(((charCode - 65 + shiftAmount) % 26) + 65);
      }
      return char; // Non-alphabetical characters
    })
    .join('');
};

    
/**
 * Pseudo-random number generator (PRNG) that directly returns an array of numbers.
 * 
 * @param {number} seed - The initial seed value for the PRNG.
 * @param {number} [length=1] - The number of pseudo-random numbers to generate.
 * @returns {Array<number>} - An array of pseudo-random numbers.
 * 
 * @example
 * const randNums = prng(1, 5); // Outputs an array of numbers directly.
 * console.log(randNums); // Example output: [0.5138700781390071, 0.1757413148880005, ...]
 */
export function prng(seed: number, length = 1): number[] {
  const a = 1103515245;
  const c = 12345;
  const m = Math.pow(2, 31);
  seed = Math.trunc(Math.abs(seed)); // Ensure seed is a positive integer

  const output = [];
  for (let i = 0; i < length; i++) {
    seed = (a * seed + c) % m;
    output.push(seed / m);
  }
  return output;
}

/**
 * Generates an array of pseudo-random number generator functions based on a linear congruential generator (LCG) algorithm.
 * This allows for deferred execution of the random number generation, which can be useful in scenarios where
 * you need more control over when and how random numbers are generated and used.
 *
 * @param {number} seed - The seed value for initializing the PRNG. The same seed will always produce the same sequence of numbers.
 * @param {number} [length=1] - Specifies how many generator functions to create. Each function, when called, generates the next number in the sequence.
 * @returns {Array<() => number>} An array of functions, each returning a new pseudo-random number upon invocation.
 *
 * @example <caption>Using generator functions for deferred random number generation</caption>
 * // Generating a single random number generator function
 * const singleRandFunc = prngFunc(42)[0];
 * console.log(singleRandFunc()); // Outputs a pseudo-random number based on the seed 42
 *
 * @example <caption>Generating multiple generator functions for simulation scenarios</caption>
 * // Generating an array of random number generators for different simulation scenarios
 * const randomGenerators = prngFunc(123, 5);
 * const simulationResults = randomGenerators.map(gen => {
 *   const randomValue = gen();
 *   return simulateScenario(randomValue);
 * });
 * // This can be used to run simulations with consistent but varied initial conditions.
 *
 * @example <caption>Using generator functions in animation or game logic</caption>
 * // Creating random number generators for use in a game for various random effects
 * const effectGenerators = prngFunc(2021, 3);
 * const effects = effectGenerators.map(gen => {
 *   return `Effect intensity: ${gen()}`;
 * });
 * console.log(effects);
 * // Each generator could control a different aspect of the game's random effects, such as randomness in enemy behavior, loot drops, etc.
 *
 * @example <caption>Batch processing in data analysis or machine learning</caption>
 * // Using a set of generator functions to generate randomized data sets for batch processing
 * const dataGenerators = prngFunc(8675309, 10);
 * const dataBatches = dataGenerators.map(gen => {
 *   return generateDataBatch(gen());
 * });
 * // This can be useful for creating multiple data sets with controlled randomness for training machine learning models.
 */
export function prngFunc(seed: number, length = 1): Array<() => number> {
  const a = 1103515245;
  const c = 12345;
  const m = Math.pow(2, 31);
  seed = positiveInteger(seed); // Ensure seed is a positive integer

  const output = [];
  for (let i = 0; i < length; i++) {
    output.push(() => {
      seed = (a * seed + c) % m;
      return seed / m;
    });
  }
  return output;
}