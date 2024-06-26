// ~/utils/core/json.ts
/**
 * Checks if the input is a valid JSON string.
 * @param data - The data to check.
 * @returns `true` if the input is a valid JSON string, `false` otherwise.
 * @example
 * isJsonString({key: "value"}); // Returns false
 * isJsonString("{\"key\": \"value\"}"); // Returns true
*/
export const isJsonString = (data: unknown) => {
  if(typeof data !== 'string') {
    return false;
  }
  try {
    JSON.parse(data.toString());
  } catch (e) {
      return false;
  }
  return true;
}

/**
 * Checks if the input is a valid JSON object.
 * @param data - The data to check.
 * @returns `true` if the input is a valid JSON object, `false` otherwise.
 * @example
 * isJsonObject({key: "value"}); // Returns true
 * isJsonObject("Not an object"); // Returns false
*/
export const isJsonObject = (data: unknown) => {
  if (typeof data !== "object") {
    return false;
  } else {
    try {
      const parsedData: unknown = JSON.parse(JSON.stringify(data));
      return typeof parsedData === 'object' && parsedData !== null && !Array.isArray(parsedData);
    } catch (e) {
      return false;
    }
  }
}

/**
 * Takes an array and stringifies any objects it contains.
 * @param arr - The array to stringify.
 * @returns The stringified array.
 * @example
 * const arr = [{key: "value"}, {key: "value"}];
 * const stringifiedArr = stringifyArray(arr); // Returns ["{\"key\": \"value\"}", "{\"key\": \"value\"}"]
 * const arr2 = [{key: "value"}, "Not an object"];
 * const stringifiedArr2 = stringifyArray(arr2); // Returns ["{\"key\": \"value\"}", "Not an object"]
*/
export function stringifyArray<T extends unknown[]>(arr: T): T {
  return arr.map((item) =>
    typeof item === "object" && item !== null ? JSON.stringify(item) : item
  ) as T;
}

/**
 * Takes an array and parses any stringified objects it contains.
 * @param arr - The array to parse.
 * @returns The parsed array.
 * @example
 * const arr = ["{\"key\": \"value\"}", "{\"key\": \"value\"}"];
 * const parsedArr = parseArray(arr); // Returns [{key: "value"}, {key: "value"}]
 * const arr2 = ["{\"key\": \"value\"}", "Not a JSON string"];
 * const parsedArr2 = parseArray(arr2); // Returns [{key: "value"}, "Not a JSON string"]
*/
export function parseArray<T>(arr: T[]): T[] {
  return arr.map((item) => {
    if (typeof item === "string" && isJsonString(item)) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error("Error parsing JSON string:", error);
        return item;
      }
    } else {
      return item;
    }
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
export function parseJSON <T>(json: string): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    throw new Error(`Error parsing JSON: ${String(error)}`);
  }
}

/**
 * Formats a JSON object into a nicely indented string.
 * 
 * This function uses `JSON.stringify` with indentation to format a JSON object into a more readable string.
 * It can be particularly useful for logging or displaying structured data clearly.
 *
 * @param {unknown} json - The JSON object to format.
 * @param {number} [spaces=2] - The number of spaces to use for indentation. Defaults to 2.
 * @returns {string} The formatted JSON string.
 *
 * @example
 * // Formatting a simple object
 * const obj = { id: 1, name: "John Doe", age: 30 };
 * console.log(formatJSON(obj)); // Output: "{\n  "id": 1,\n  "name": "John Doe",\n  "age": 30\n}"
 *
 * @example
 * // Formatting an array of objects
 * const users = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];
 * console.log(formatJSON(users)); // Output: "[\n  {\n    "id": 1,\n    "name": "John"\n  },\n  {\n    "id": 2,\n    "name": "Jane"\n  }\n]"
 */
export const formatJSON = (json: unknown, spaces = 2): string => {
  return JSON.stringify(json, null, spaces);
}

/**
 * Extracts all objects from a string and returns them in an array. If the `array` prop is `false`, only the first object is returned.
 * 
 * @param str - The string to extract objects from.
 * @param parse - Parse string to JSON or leave as string. Defaults to parsing to JSON.
 * @param array - Whether to return an array of all objects or just the first one. Defaults to `true`.
 * @returns Either an array of objects found in the string or the first object found, depending on the `array` prop.
 * 
 * @example <caption>Extracting objects from a string</caption>
 * const str = "Some {\"key\": \"value\"} in a string with multiple {\"keys\": [1, 2, 3]}";
 * const objectsArray = getObjectsFromString(str); // Returns [{key: "value"}, {keys: [1, 2, 3]}]
 * const firstObject = getObjectsFromString(str, false); // Returns ["{\"key\": \"value\"}, {\"keys\": [1, 2, 3]}]
 * 
 * @example <caption>Extracting objects from a string without parsing</caption>
 * const str = "Some {\"key\": \"value\"} in a string with multiple {\"keys\": [1, 2, 3]}";
 * const objectsArray = getObjectsFromString(str, true, false); // Returns "{key: "value"}"
 * const firstObject = getObjectsFromString(str, false, false); // Returns "{\"key\": \"value\"}"
 */
export function getObjectsFromString(str: string, parse = true, array = true): unknown {
  const objectsRegex = /\{.*?\}/gs;
  const matches = str.match(objectsRegex);
  const parseString = (s: string): unknown => parse ? JSON.parse(s) : s;
  
  if (!matches) {
    return array ? [] : undefined;
  }
  
  if (array) {
    return matches.map(match => parseString(match));
  }
  
  return parseString(matches[0]);
}
