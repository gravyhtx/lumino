import REGEX_PATTERNS from "~/constants/regex";
import { checkType, isValidUrl } from "./types";

/**
 * Checks if a string is a valid email address.
 * @param {string} email - The email address to check.
 * @returns {boolean} True if the email address is valid, false otherwise.
 * 
 * @example
 * validEmail('test@test.com'); // true
 * validEmail('test@test'); // false
 * 
 * @url https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 */
export const validEmail = (email: string): boolean => {
  return REGEX_PATTERNS.email.test(email);
};

export const validName = (name: string): boolean => {
  return REGEX_PATTERNS.name.test(name);
};

/**
 * Checks if a number is valid U.S./Canada phone number.
 * Allows for a strict pattern match which is more precise in matching specific formats,
 * or a lenient match that broadly accepts various common phone number formats.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @param {boolean} [strict=false] - Set to true for strict pattern matching which requires specific formatting
 *                                   and valid area code and exchange code (must start with digits 2-9).
 * @returns {boolean} - Returns true if the phone number is valid according to the chosen pattern, otherwise false.
 *
 * @example <caption>Examples of valid and invalid phone numbers. [strict=true]</caption>
 * validPhoneNumber('+1-202-555-0104', true); // true, correctly formatted North American phone number.
 * validPhoneNumber('202-555-0104', true); // true, correctly formatted with hyphens.
 * validPhoneNumber('2025550104', true); // false, continuous digits not accepted.
 * validPhoneNumber('(202) 555-0104', true); // true, correct format with parentheses around area code.
 * validPhoneNumber('202 555 0104', true); // false, space separators not acceptable in strict mode for this regex.
 * validPhoneNumber('192-555-0104', true); // false, area code starts with '1' which is invalid.
 *
 * @example <caption>Examples of valid and invalid phone numbers. [strict=false]</caption>
 * validPhoneNumber('+1-202-555-0104'); // true, accepts with or without country code.
 * validPhoneNumber('202-555-0104'); // true, standard format with hyphens.
 * validPhoneNumber('2025550104'); // true, continuous digits are accepted.
 * validPhoneNumber('202 555 0104'); // true, spaces as separators are acceptable.
 * validPhoneNumber('202.555.0104'); // true, dots as separators are acceptable.
 * validPhoneNumber('202555010'); // false, insufficient number of digits.
 * validPhoneNumber('(202) 555-0104'); // true, parentheses around the area code are acceptable.
 * validPhoneNumber('192 555 0104'); // true, lenient mode does not verify the first digit of area codes.
 */
export const validPhoneNumber = (phoneNumber: string, strict = false): boolean => {
  const regex = strict ? REGEX_PATTERNS.phone : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phoneNumber);
};

/**
 * Turns a string into a filename string.
 * @param {string} string - The string to convert.
 * @returns {string} The converted string.
 * @example
 * fileName('hello world'); // 'hello_world'
 */
export const fileName = (string: string) => {
  let str = '';

  if(string !== undefined && checkType(string, 'string')) {
    str = string.replace(/\s+/g, ' ').trim().toLowerCase();
  }
  const output = str ? str.replace(/ /g, "_").replace(/[^a-z0-9_]/gmi, "-") : string;
  return output;
}

/**
 * Turns a filename string into a regular string.
 * @param {string} string - The filename string to convert.
 * @returns {string} The converted string.
 * 
 * @example
 * unFileName('hello_world'); // 'hello world'
 */
export const unFileName = (string: string) => {
  if(string !== undefined && checkType(string, 'string')) {
    string = string.replaceAll(/_+/g, ' ').trim().toLowerCase();
    string = string.replaceAll(/-/g, ' - ');
    return string;
  }
  return undefined;
}

/**
 * Formats a URL string to be a valid HTTPS URL.
 * @param {string} url - The URL to format.
 * @param {object} opts - Options for formatting the URL.
 * @param {string} opts.spaces - The delimiter to use for spaces in the URL.
 * @param {boolean} opts.httpsOnly - Whether to force the URL to be HTTPS.
 * @param {boolean} opts.checkSafety - Whether to check if the URL is safe.
 * @returns {string} The formatted URL.
 * 
 * @example
 * formatUrl('google.com'); // 'https://google.com'
 * formatUrl('google.com/search?q=hello world'); // 'https://google.com/search?q=hello%20world'
 * formatUrl('google.com/search?q=hello world', { spaces: '-' }); // 'https://google.com/search?q=hello-world'
 * formatUrl('http://google.com'); // 'https://google.com'
 * formatUrl('http://google.com', { httpsOnly: false }); // 'http://google.com'
 */
export function formatUrl(
  url: string,
  opts?: {
    spaces?: '-' | '_' | '20%' | '+',
    httpsOnly?: boolean,
    checkSafety?: boolean,
  }
): string {
  let formattedUrl = url.trim();
  const { spaces = '-', httpsOnly = true } = opts ?? {};

  if(!httpsOnly && isValidUrl(url)) {
    return url;
  }

  // Check if the URL starts with a protocol
  if (!/^https?:\/\//i.test(formattedUrl)) {
    // If it doesn't, add https://
    formattedUrl = `https://${formattedUrl}`;
  }

  // Replace http:// with https://
  formattedUrl = formattedUrl.replace(/^http:/i, 'https:');

  // Replace spaces with the chosen delimiter
  switch (spaces) {
    case '-':
      formattedUrl = formattedUrl.replace(/\s+/g, '-');
      break;
    case '_':
      formattedUrl = formattedUrl.replace(/\s+/g, '_');
      break;
    case '+':
      formattedUrl = formattedUrl.replace(/\s+/g, '+');
      break;
    default:
        formattedUrl = formattedUrl.replace(/\s+/g, '%20');
        break;
  }
  
  return formattedUrl;
}

/**
 * Checks if a string has special characters.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string has special characters, false otherwise.
 * 
 * @example
 * hasSpecialChars('hello world'); // false
 * hasSpecialChars('hello*world'); // true
 */
export const hasSpecialChars = (str: string): boolean => {
  return REGEX_PATTERNS.specialChar.test(str);
};

/**
 * Checks if a string contains consecutive repeating characters.
 *
 * @param {string} string - The string to check for consecutive characters.
 * @param {boolean} [checkCasing=true] - Whether to consider character casing for repeats. If `false`, 'A' and 'a' will be considered the same.
 * @param {number} [limit=2] - The number of allowed consecutive characters before considering it a repeat. Must be at least 1.
 * @returns {boolean} - `true` if the string contains more than the specified limit of consecutive repeating characters, `false` otherwise.
 * 
 * @example
 * //* Check for more than 2 consecutive characters (case-sensitive)
 * consecutiveChars('aaabbb', true, 2); // true
 * 
 * @example
 * //* Check for more than 3 consecutive characters (case-insensitive)
 * consecutiveChars('aaAbBB', false, 3); // false
 */
export const consecutiveChars = (string: string, checkCasing?: boolean, limit?: number): boolean => {

  string = checkCasing === false ? string : string.toLowerCase();  
  // If 'checkCasing' is false then repeats of the same character in
  // different cases will be ignored. Defaults to 'true'.

  limit = limit && Number.isFinite(limit) && limit > 0 ? Number(limit) : 2;
  // Limit must be at least 1

  const pattern = checkCasing === false ? /([a-zA-Z0-9])\1+/g : /([a-z0-9])\1+/g; 
  const matches = string.match(pattern);

  if (string && matches) {
    for (const match of matches) {
      if (match.length > limit) {
        return true;
      }
    }
  }

  return false;
};