//* CHECK IF INPUT IS VALID JSON STRING
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

//* CHECK IF INPUT IS VALID JSON OBJECT
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

//* STRINGIFY OBJECTS AN ARRAY
//? Takes an array and stringifies any objects it contains
export function stringifyArray<T extends unknown[]>(arr: T): T {
  return arr.map((item) =>
    typeof item === "object" && item !== null ? JSON.stringify(item) : item
  ) as T;
}

//* PARSE JSON STRINGS IN AN ARRAY
//? Takes an array and parses any stringified objects it contains
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

//* GET ALL JSON OBJECTS FROM A STRING
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
