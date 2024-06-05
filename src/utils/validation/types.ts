import { isValidElement } from 'react';
import { isJsonObject, isJsonString } from '../core/json';
import type { TypesList } from '../types/validation';

//* CHECK VARIABLE TYPES
/**
 * Checks if the given 'variable' matches the specified type.
 * @param {unknown} variable - The variable to check the type of.
 * @param {string} [varType=''] - The type to compare against.
 * @returns {{is: boolean, type: string}} An object indicating whether the variable matches the type and the actual type of the variable.
 */
export const checkTypeof = (
  variable: unknown,
  varType: TypesList | '' = ''
): { is: boolean, type: string } => {

  //? Set Output
  let output: { is: boolean, type: string };

  //? Convert type to lowercase
  const type = varType?.toString().replace(/\s+/g, '').toLowerCase().trim() ?? undefined;

  //? Last resort checks
  const lastCheck = ((type !== null && (typeof variable === type || (typeof type === 'function' && variable?.constructor && variable instanceof type))))
    ?? (type === null && typeof variable === null) ?? (type === undefined && typeof variable === undefined)

  //? Give the type if it doesn't match
  const notType = variable?.constructor?.name ?? typeof variable ?? "unknown";

  //? Perform checks...
  output =
    // Arrays (array of arrays)
    type && (type === "arrays" || type === "arrayofarrays" || type === "array_of_arrays" || type === "multiarray"
    || type === "multi_array" || type === "multiple_arrays" || type === "multiplearrays")
    && isArrayOfArrays(variable)

      ? output = {is: true, type: "arrays"}
    
    // Arrays (has arrays)
    : type && (type === "hasarrays" || type === "somearrays")
      && hasArrays(variable)

      ? output = {is: true, type: "arrays"}

    // Array
    : type && type === "array" && (Array.isArray(variable) || Object.prototype.toString.call(variable) === '[object Array]')

      ? output = {is: true, type: "array"}

    // Function
    : type && type === "function" && isFunction(variable)

      ? output = {is: true, type: "function"}

    // RegExp
    : (type && type === "regex" && variable instanceof RegExp)

      ? output = {is: true, type: "regex"}

    // Infinity
      :type && type === "infinity" && variable === Infinity
      ? output = {is: true, type: "infinity"}

    // Number
    : type && type === 'number' && !Number.isNaN(parseFloat(variable as string)) && isFinite(variable as number)

      ? output = {is: true, type: "number"}

    // Number String
    : type && type === 'numberstring' && typeof variable === 'string'
      && typeof Number(variable) === 'number' && !Number.isNaN(Number(variable))

      ? output = {is: true, type: 'numberstring'}

    // String
    : type && type === 'string' && typeof variable === 'string'

      ? output = {is: true, type: 'string'}

    // Symbol
    : type && type === 'symbol' && typeof variable === 'symbol'

      ? output = {is: true, type: 'symbol'}

    // Date
    : type && Object.prototype.toString.call(variable) === '[object Date]' && isFinite((variable as Date).getTime())

      ? output = {is: true, type: 'date'}

    // DOM Node
    : type && type === "node" && variable instanceof Node

      ? output = {is: true, type: "node"}
    
    //? FUNCTION = FALSE (`DOM node`)
    : type && type === "function" && variable instanceof Node

      ? output = {is: false, type: "node"}
    
    // HTML Collection
    : type && type === "htmlcollection" && variable instanceof HTMLCollection

      ? output = {is: false, type: "node"}
    
    //? FUNCTION = FALSE (`HTML collection`)
    : type && type === "function" && variable instanceof HTMLCollection

      ? output = {is: false, type: "htmlcollection"}

    // Promise
    : type && type === "promise" && variable instanceof Promise

      ? output = {is: true, type: "Promise"}

    // JSON Object
    : type && (type === "json" || type === "jsonobject") && isJsonObject(variable)

    ? output = {is: true, type: "json (object)"}

    // JSON String
    : type && (type === "jsonstring") && isJsonString(variable)

      ? output = {is: true, type: "json (string)"}
    
    // Null
    : type && type === "null" && variable === null && !variable

      ? output = {is: true, type: "null"}

    // Undefined
    : type && type === "undefined" && variable === undefined

      ? output = {is: false, type: "undefined"}

    // React Element
    : type && type === "element" && isValidElement(variable)

      ? output = {is: true, type: "element"}

    // Image
    : type && type === 'image' && typeof variable === 'object' && variable !== null && "type" in variable && (variable as { type?: string }).type === 'img'

      ? output = {is: true, type: 'image'}

    // Percentage
    : type && type === 'percentage' && typeof variable === 'string' && /^(\d+|(\.\d+))(\.\d+)?%$/.test(variable)

      ? output = {is: true, type: 'percentage'}

    // Record
    : (type && type === "record" && isRecord(variable))
      
        ? output = { is: true, type: "record" }

    // Plain Object
    : (type && type === "plainobject" && isPlainObject(variable))
      
        ? output = { is: true, type: "plain object" }

    // Set
    : type && type === "set" && variable instanceof Set

      ? output = { is: true, type: "Set" }

    // WeakSet
    : type && type === "weakset" && variable instanceof WeakSet

      ? output = { is: true, type: "WeakSet" }

    // Map
    : type && type === "map" && variable instanceof Map

      ? output = { is: true, type: "Map" }

    // WeakMap
    : type && type === "weakmap" && variable instanceof WeakMap

      ? output = { is: true, type: "WeakMap" }

    //? OBJECT = FALSE (NULL)
    : type && type === 'object' && variable === null

    ? output = {is: false, type: 'null'}

    //? OBJECT = FALSE (ARRAY)
    : type && type === "object" && Array.isArray(variable)

    ? output = {is: false, type: "array"}
    
    // Object
    : type && type === "object" && typeof variable === "object" && variable !== null && !Array.isArray(variable)

      ? output = { is: true, type: "object" }
    
    //? LAST CHECK
    : lastCheck

      ? output = { is: lastCheck, type: type }

    //? ALL ELSE... TRUE
    : type && typeof variable === type

      ? output = { is: true, type: notType }

    //? ALL ELSE... FALSE
    : type && typeof variable !== type

      ? output = { is: false, type: notType }

    //? ALL ELSE... UNDEFINED
      : output = { is: false, type: notType }

  return output;

}

//? Types:
//?   Array = "array"
//?   Arrays (array of arrays) = "arrays"
//?   Arrays (has arrays) = "hasarrays"
//?   Boolean = "boolean"aa
//?   Number = "number"
//?   Number (as "string") = "numberstring"
//?   BigInt = "bigint"
//?   String = "string"
//?   Symbol = "symbol"
//?   Regex = "regex"
//?   Function = "function"
//?   Colors:
//?     * RGB (string) = "rgb"
//?           (object) = "rgbobject"
//?           (array)  = "rgbarray"
//?     * RGBA         = "rgba"
//?     * Hex          = "hex"
//?     * HSL          = "hsl"
//?   Percentage = "percentage"
//?   DOM Element = "element"
//?   DOM Node = "node"
//?   Undefined = "undefined"
//?   Null = "null" (reason)
//?   Any other object = "object"

//* CHECK VARIABLE TYPES -- SHORTCUT!!!
/**
 * Checks if the given 'variable' matches the specified 'type' (shortcut version).
 * @param {unknown} variable - The variable to check the type of.
 * @param {string | false} type - The type to compare against (shortcut version).
 * @returns {boolean | {is: boolean, type: string} | undefined} A boolean indicating whether the variable matches the type, an object with type information, or undefined if no type is provided.
 */
export const checkType = (variable: unknown, type: TypesList | false): boolean | { is: boolean; type: string; } | undefined => {
  variable = !variable ? false : variable;
  type = typeShortcuts(type);

  return type !== false && variable !== false
    ? checkTypeof(variable, type).is
    : type === false && variable !== false
    ? checkTypeof(variable)
    : !type && !variable
    ? undefined
    : { is: false, type: '' };
};


//* CHECK DATA TYPES
/**
 * Checks if the given 'data' matches the specified 'type'.
 * @param {unknown} data - The data to check the type of.
 * @param {string} [type] - The type to compare against.
 * @returns {{is: boolean, type: string} | undefined} An object indicating whether the data matches the type and the actual type of the data, or undefined if the type is not recognized.
 */
export const checkTypeofData = (data: unknown, type?: string): { is: boolean; type: string; } | undefined => {
  //? Convert type to lowercase
  type = type?.toString().replace(/\s+/g, '').toLowerCase().trim() ?? undefined;

  //? Give the type if it doesn't match
  const notType = data?.constructor?.name ?? typeof data ?? 'unknown';

  switch (type) {
    // FormData
    case 'formdata':
      if (data instanceof FormData) {
        return { is: true, type: 'FormData' };
      }
      break;
    
    // Multipart/form-data
    case 'multiform':
      if (data instanceof Response && data.headers.get("Content-Type") === 'multipart/form-data') {
        return { is: true, type: 'multipart/form-data' };
      }
      break;

    // Blob
    case 'blob':
      if (data instanceof Blob) {
        return { is: true, type: 'Blob' };
      }
      break;
     
    // Set
    case 'set':
      if (data instanceof Set) {
        return { is: true, type: 'Set' };
      }
      break;
     
    // WeakSet
    case 'weakset':
      if (data instanceof WeakSet) {
        return { is: true, type: 'WeakSet' };
      }
      break;
     
    // Map
    case 'map':
      if (data instanceof Map) {
        return { is: true, type: 'Map' };
      }
      break;
     
    // WeakMap
    case 'weakmap':
      if (data instanceof WeakMap) {
        return { is: true, type: 'WeakMap' };
      }
      break;

    // ArrayBuffer
    case 'arraybuffer':
      if (data instanceof ArrayBuffer) {
        return { is: true, type: 'ArrayBuffer' };
      }
      break;

    // URLSearchParams
    case 'urlsearchparams':
      if (data instanceof URLSearchParams) {
        return { is: true, type: 'URLSearchParams' };
      }
      break;

    // ReadableStream
    case 'readablestream':
      if (data instanceof ReadableStream) {
        return { is: true, type: 'ReadableStream' };
      }
      break;

    // Response
    case 'response':
      if (data instanceof Response) {
        return { is: true, type: 'Response' };
      }
      break;

    //? ALL ELSE FAILS...
    default:
      if (typeof data === type) {
        return {is: true, type: notType}
      } else if (typeof data !== type) {
        return {is: false, type: notType}
      } else {
        return undefined
      }
  }
}


//* CHECK DATA TYPES -- SHORTCUT!!!
/**
 * Checks if the given 'data' matches the specified 'type' (shortcut version).
 * @param {unknown} data - The data to check the type of.
 * @param {string} type - The type to compare against (shortcut version).
 * @returns {boolean | undefined} A boolean indicating whether the data matches the type, or undefined if the type is not recognized.
 */
export const checkDataType = (data: unknown, type: string): boolean | undefined => {
  type = !type ? '' : type.replace(/\s+/g, '').toLowerCase().trim();
  if (type === 'multipart/form-data' || type === 'multipartform') {
    type = 'multiform';
  }
  if(type === 'searchparams') {
    type ='urlsearchparams';
  }
  return checkTypeofData(data, type)?.is;
}

//* COMPARE TYPES
/**
 * Compare types of two or more items.
 * @param {...unknown[]} items - The items to compare.
 * @returns {boolean} Returns true if all items have the same type, false otherwise.
 */
export const compareTypes = (...items: unknown[]): boolean => {
  // Get the type of the first item
  const firstType = typeof items[0];

  // Compare the type of the first item with the types of the rest of the items
  for (let i = 1; i < items.length; i++) {
      if (typeof items[i] !== firstType) {
          return false; // Return false if types are not equal
      }
  }

  return true; // Return true if all types are equal
}

//* CHECK FOR ARRAY OF ARRAYS
/**
 * Checks if all items in an array are arrays.
 * @param {unknown} arr - The array to check.
 * @returns {arr is unknown[][]} Returns true if all items in the array are arrays, false otherwise.
 */
export const isArrayOfArrays = (arr: unknown): arr is unknown[][] =>
  Array.isArray(arr) && arr.every((item): item is unknown[] => Array.isArray(item));

//* CHECK FOR AT LEAST ONE ARRAY IN AN ARRAY
/**
 * Checks if any of the items in an array are arrays.
 * @param {unknown} arr - The array to check.
 * @returns {boolean} Returns true if some of the items in the array are arrays, false otherwise.
 */
export const hasArrays = (arr: unknown): boolean =>
  Array.isArray(arr) && arr.some((item) => Array.isArray(item));

//* CHECK FOR PLAIN OBJECT
/**
 * Checks if a value is a plain object.
 * @param {unknown} value - The value to check.
 * @returns {value is Record<(string | number | symbol), unknown>} Returns true if the value is a plain object, false otherwise.
 */
export function isPlainObject(value: unknown): value is Record<(string | number | symbol), unknown> {
  return typeof value === 'object' && value !== null && value.constructor === Object;
}

//* CHECK FOR RECORD
/**
 * Checks if a value is a record.
 * @param {unknown} value - The value to check.
 * @returns {value is Record<(string | number | symbol), unknown>} Returns true if the value is a record, false otherwise.
 */
export function isRecord(value: unknown): value is Record<(string | number | symbol), unknown> {
  return !Array.isArray(value) && !isPlainObject(value) && !(value instanceof Map) && !(value instanceof Set);
}

//* CHECK IF STRING IS A VALID URL
/**
 * Checks if a URL is valid.
 * @param {string} urlString - The URL string to check.
 * @param {Object} [options] - Additional options for URL validation.
 * @param {boolean} [options.requireProtocol=false] - Specifies whether the URL requires a protocol (http/https).
 * @param {boolean} [options.requireHttps=false] - Specifies whether the URL requires HTTPS protocol.
 * @returns {boolean} Returns true if the URL is valid, false otherwise.
 */
export const isValidUrl = (
  urlString: string,
  options: {
    requireProtocol: boolean,
    requireHttps: boolean
  }={
    requireProtocol: false,
    requireHttps: false
  }
): boolean => {
  
  // Get boolean values from 'options'
  const { requireHttps, requireProtocol } = options;

  // Check if protocol is required and if it's not present in the URL
  if ( (requireProtocol && !urlString.startsWith('http://'))
  // Check if https is required and if it's not present in the URL
    || (requireHttps && !urlString.startsWith('https://')) ) {
    return false;
  }

  // If protocol or https is not required, add https as default
  if (!requireProtocol && !requireHttps) {
    urlString = urlString.startsWith("https://") || urlString.startsWith("http://") ? urlString : "https://" + urlString;
  }

  // Regular expression pattern to match valid URLs
  const pattern = new RegExp(
    '^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i' // fragment locator
  );
  
  return !!pattern.test(urlString);
}

//* CHECK IF INPUT IS A FUNCTION
/**
 * Checks if the input is a function.
 * @param {unknown} input - The input to check.
 * @returns {boolean} Returns true if the input is a function, false otherwise.
 */
export const isFunction = (input: unknown): boolean => {
  // Check if input is a function
  if (typeof input === "function") {
    return true;
  }

  // Further checks if input is an object (to cover cases like `input instanceof Function`)
  if (typeof input === "object" && input !== null) {
    // Safe type assertion to check specific properties
    const inputObj = input as { nodeType?: unknown, item?: unknown };

    // Check if input is not a DOM node and not a NodeList
    return inputObj.nodeType === undefined && typeof inputObj.item !== "function";
  }

  return false;
};

//* CHECK IF STRING IS VALID URL
/**
 * Checks if a string is a valid URL.
 * @param {string} str - The string to check.
 * @returns {boolean} Returns true if the string is a valid URL, false otherwise.
 */
export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}

//* TYPE SHORTCUTS
/**
 * Converts type shortcuts to full type names.
 * @param {string} type - The type to convert.
 * @returns {string} The full type name.
 */
const typeShortcuts = (type: TypesList | false) => {
  type = !type ? false : type;
  if (typeof type === 'string') {
    switch (type) {
      case 's':
      case 'str':
        type = 'string';
        break;
      case 'o':
      case 'obj':
      case '{}':
        type = 'object';
        break;
      case 'a':
      case 'arr':
      case '[]':
        type = 'array';
        break;
      case 'multiarr':
      case 'multiarray':
      case 'arrs':
      case '[[]]':
        type = 'arrays';
        break;
      case 'f':
      case 'fn':
      case 'fun':
      case 'func':
        type = 'function';
        break;
      case 'b':
      case 'bool':
      case '??':
        type = 'boolean';
        break;
      case 'n':
      case 'num':
        type = 'number';
        break;
      case 'ns':
      case 'numstr':
        type = 'numberstring';
        break;
      case 'big':
        type = 'bigint';
        break;
      case 'd':
        type = 'date';
        break;
      case 'percent':
      case '%':
        type = 'percentage';
        break;
      case 'sym':
        type = 'symbol';
        break;
      case 'u':
        type = 'undefined';
        break;
      case 'e':
      case 'el':
        type = 'element';
        break;
      case '<>':
        type = 'node';
        break;
      case 'img':
        type = 'image';
        break;
      case 'jsonobj':
        type = 'jsonobject';
        break;
      case 'jsonstr':
        type = 'jsonstring';
        break;
      case 'rbgobj':
        type = 'rgbobject';
        break;
      case 'rbgarr':
        type = 'rgbarray';
        break;
    }
  }
  return type;
}