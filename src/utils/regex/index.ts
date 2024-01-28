import REGEX_PATTERNS from "~/constants/regex";

/**
 * Performs a regular expression 'match' on a string.
 * @param {string} str - The string to match.
 * @param {RegExp} regex - The regular expression to use for matching.
 * @returns {RegExpMatchArray | null} The result of the match.
 * @example
 * match('Hello World', /hello/i); // ['Hello', index: 0, input: 'Hello World', groups: undefined]
 */
export const match = (str: string, regex: RegExp) => str.match(regex);
/**
 * Performs a regular expression 'test' on a string.
 * @param {string} str - The string to test.
 * @param {RegExp} regex - The regular expression to use for testing.
 * @returns {boolean} The result of the test.
 * @example
 * test('Hello World', /hello/i); // true
 * test('Hello World', /hello/); // false
 */
export const test = (str: string, regex: RegExp) => regex.test(str);
/**
 * Performs a regular expression 'exec' on a string.
 * @param {string} str - The string to test.
 * @param {RegExp} regex - The regular expression to use for testing.
 * @returns {RegExpExecArray | null} The result of the exec.
 * @example
 * exec('Hello World', /hello/i); // ['Hello', index: 0, input: 'Hello World', groups: undefined]
 */
export const exec = (str: string, regex: RegExp) => regex.exec(str);

/**
 * A collection of regular expression utility functions.
 */
const regex = {
  match: match,
  test: test,
  exec: exec
}

/**
 * Checks a text against a list of strings using regular expressions.
 *
 * @param {string} text - The text to check.
 * @param {string[]} list - An array of strings to form the regular expression.
 * @param {object} [opts] - Optional configuration for regex matching.
 * @param {boolean} [opts.caseSensitive=false] - If `true`, matching will be case-sensitive.
 * @param {boolean} [opts.multiline=false] - If `true`, multiline matching will be enabled.
 * @returns An object with `test` and `match` results.
 * @example
 * checkText('Hello World', ['Hello', 'World'], { caseSensitive: true });
 */
export const checkText = (
  text: string,
  list: string[],
  opts?: {
    caseSensitive?: boolean,
    multiline?: boolean
  }
) => {
  const { caseSensitive, multiline } = opts ?? {};
  let flag = "g";
  flag += caseSensitive ? "" : "i"; // Add "i" flag for case-insensitive matching
  flag += multiline ? "m" : ""; // Add "m" flag for multiline matching
  const pattern = new RegExp(list.join("|"), flag); // Use "|" to join the list for OR condition in regex
  return {
    test: pattern.test(text),
    match: text.match(pattern)
  };
};

/**
 * A collection of predefined regular expression patterns.
 */
export const patterns = REGEX_PATTERNS;

/**
 * Combines multiple regular expressions into a single regular expression.
 *
 * @param {RegExp|RegExp[]} regex - A regular expression or an array of regular expressions to combine.
 * @param {string} [flag=''] - Flags to apply to the combined regular expression.
 * @returns {RegExp} - A new regular expression that combines the input expressions.
 * @example
 * const combinedRegex = makeRegExp([/abc/, /123/], 'i');
 */
export function makeRegExp(regex: RegExp | RegExp[], flag = ''): RegExp {
  const regexStr = Array.isArray(regex) ? regex.map((r) => r.source).join('|') : regex;
  return new RegExp(regexStr, flag);
}

/**
 * Default export containing regular expression utility functions.
 * @module regex
 * @example
 * import regex from 'utils/regex';
 */
export default regex;