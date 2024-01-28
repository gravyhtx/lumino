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
 * Extracts all objects from a string and returns them in an array. If the `array` prop is `false`, only the first object is returned.
 * @param str - The string to extract objects from.
 * @param parse - Parse string to JSON or leave as string. Defaults to parsing to JSON.
 * @param array - Whether to return an array of all objects or just the first one. Defaults to `true`.
 * @returns Either an array of objects found in the string or the first object found, depending on the `array` prop.
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

//! EXAMPLE:
//* const str = "Some {\"key\": \"value\"} in a string with multiple {\"keys\": [1, 2, 3]}";
//* const objectsArray = getObjectsFromString(str); // Returns [{key: "value"}, {keys: [1, 2, 3]}]
//* const firstObject = getObjectsFromString(str, false); // Returns {key: "value"}
