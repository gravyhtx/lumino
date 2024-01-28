import { isValidElement } from 'react';
// import { isJsonObject, isJsonString } from '../../helpers/jsonHelpers';
import { isJsonObject, isJsonString } from '../json';

//* CHECK VARIABLE TYPES
// Uses various methods to check if the given 'element' matches a 'type' (string)
export const checkTypeof = (
  variable: unknown = undefined,
  varType = ''
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
    //? ARRAYS (array of arrays) = TRUE
    type && (type === "arrays" || type === "arrayofarrays" || type === "array_of_arrays" || type === "multiarray"
    || type === "multi_array" || type === "multiple_arrays" || type === "multiplearrays")
    && isArrayOfArrays(variable)

      ? output = {is: true, type: "arrays"}
    
    //? ARRAYS (has arrays) = TRUE
    : type && (type === "hasarrays" || type === "somearrays")
      && hasArrays(variable)

      ? output = {is: true, type: "arrays"}

    //? ARRAY = TRUE
    : type && type === "array" && Array.isArray(variable)

      ? output = {is: true, type: "array"}

    //? OBJECT = FALSE (ARRAY)
    : type && type === "object" && Array.isArray(variable)

      ? output = {is: false, type: "array"}

    //? FUNCTION = TRUE
    : type && type === "function" && isFunction(variable)

      ? output = {is: true, type: "function"}

    //? REGEX = TRUE
    : (type && type === "regex" && variable instanceof RegExp)

      ? output = {is: true, type: "regex"}

    //? INFINITY = TRUE
      :type && type === "infinity" && variable === Infinity
      ? output = {is: true, type: "infinity"}

    //? NUMBER = TRUE
    : type && type === 'number' && !Number.isNaN(parseFloat(variable as string)) && isFinite(variable as number)

      ? output = {is: true, type: "number"}

    //? NUMBER = FALSE ('Infinity')
    : type && type === 'number' && variable === Infinity

      ? output = {is: true, type: "infinity"}

    //? NUMBER STRING = TRUE
    : type && type === 'numberstring' && typeof variable === 'string'
      && typeof Number(variable) === 'number' && !Number.isNaN(Number(variable))

      ? output = {is: true, type: 'numberstring'}

    //? STRING = TRUE
    : type && type === 'string' && typeof variable === 'string'

      ? output = {is: true, type: 'string'}

    //? SYMBOL = TRUE
    : type && type === 'symbol' && typeof variable === 'symbol'

      ? output = {is: true, type: 'symbol'}

    //? DATE = TRUE (`new Date`)
    : type && Object.prototype.toString.call(variable) === '[object Date]' && isFinite((variable as Date).getTime())

      ? output = {is: true, type: 'date'}

    //? NODE = TRUE
    : type && type === "node" && variable instanceof Node

      ? output = {is: true, type: "node"}
    
    //? FUNCTION = FALSE (`DOM node`)
    : type && type === "function" && variable instanceof Node

      ? output = {is: false, type: "node"}
    
    //? HTML COLLECTION = TRUE
    : type && type === "htmlcollection" && variable instanceof HTMLCollection

      ? output = {is: false, type: "node"}
    
    //? FUNCTION = FALSE (`HTML collection`)
    : type && type === "function" && variable instanceof HTMLCollection

      ? output = {is: false, type: "htmlcollection"}
    //? JSON OBJECT = TRUE
    : type && (type === "json" || type === "jsonobject") && isJsonObject(variable)

    ? output = {is: true, type: "json (object)"}

    //? JSON STRING = TRUE
    : type && (type === "jsonstring") && isJsonString(variable)

      ? output = {is: true, type: "json (string)"}
    
    //? NULL = TRUE
    : type && type === "null" && variable === null && !variable

      ? output = {is: true, type: "null"}
    
    //? OBJECT = FALSE (NULL)
    : type && type === 'object' && variable === null

      ? output = {is: false, type: 'null'}

    //? UNDEFINED = TRUE
    : type && type === "undefined" && variable === undefined

      ? output = {is: false, type: "undefined"}

    //? REACT ELEMENT = TRUE
    : type && type === "element" && isValidElement(variable)

      ? output = {is: true, type: "element"}

    //? IMAGE = TRUE
    : type && type === 'image' && typeof variable === 'object' && variable !== null && "type" in variable && (variable as { type?: string }).type === 'img'

      ? output = {is: true, type: 'image'}

    //? PERCENTAGE = TRUE
    : type && type === 'percentage' && typeof variable === 'string' && /^(\d+|(\.\d+))(\.\d+)?%$/.test(variable)

      ? output = {is: true, type: 'percentage'}

    //? REGEX = FALSE
    : (type && type !== "regex" && variable instanceof RegExp)

      ? output = {is: false, type: "regex"}
    
    //? OBJECT = TRUE
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
//?   Boolean = "boolean"
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
export const checkType = (variable: unknown, type: string | false): boolean | { is: boolean; type: string; } | undefined => {
  variable = !variable ? false : variable;
  type = !type ? false : typeof type === 'string' && type.replace(/\s+/g, '').toLowerCase().trim();
  //?  'Type' shortcuts
  if(type === 's' || type === 'str') {
    type = 'string'
  }
  if(type === 'o' || type === 'obj' || type ==='{}') {
    type = 'object'
  }
  if(type === 'a' || type === 'arr' || type === '[]') {
    type = 'array'
  }
  if(type === 'multiarr' || type === 'multiarray' || type === 'arrs' || type === '[[]]') {
    type = 'arrays'
  }
  if(type === 'f' || type === 'fun' || type === 'func') {
    type = 'function'
  }
  if(type === 'b' || type === 'bool' || type === '?') {
    type = 'boolean'
  }
  if(type === 'n' || type === 'num') {
    type = 'number'
  }
  if(type === 'ns' || type === 'numstr') {
    type = 'numberstring'
  }
  if(type === 'big') {
    type = 'bigint'
  }
  if(type === 'd') {
    type = 'date'
  }
  if(type === 'p' || type === 'percent' || type === '%') {
    type = 'percentage'
  }
  if(type === 'sym') {
    type = 'symbol'
  }
  if(type === 'u' || type === 'und' || type === 'ud') {
    type = 'undefined'
  }
  if(type === 'e' || type === 'el') {
    type = 'element'
  }
  if(type === '<>') {
    type = 'node'
  }
  if(type === 'img') {
    type = 'image'
  }
  if(type === 'jsonobj') {
    type = 'jsonobject'
  }
  if(type === 'jsonstr') {
    type = 'jsonstring'
  }
  if(type === 'rbgobj') {
    type = 'rgbobject'
  }
  if(type === 'rbgarr') {
    type = 'rgbarray'
  }

  return type !== false && variable !== false
    ? checkTypeof(variable, type).is
  : type === false && variable !== false
    ? checkTypeof(variable)
  : !type && !variable
    ? undefined
  : { is: false, type: '' };
}


//* CHECK DATA TYPES
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


//* CHECK FOR ARRAY OF ARRAYS
//? Checks if all items in an array are arrays
export const isArrayOfArrays = (arr: unknown): boolean => 
  Array.isArray(arr) && arr.every((item): item is unknown[] => Array.isArray(item));


//* CHECK FOR AT LEAST ONE ARRAY IN AN ARRAY
//? Checks if some of the items in an array are arrays
export const hasArrays = (arr: unknown): boolean => arr && Array.isArray(arr) ? arr.some(item => Array.isArray(item)) : false;


//* CHECK IF STRING IS A VALID URL
//? Checks if a URL is valid. Includes checks for protocol (http/https) requirements in 'options'.
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
export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}
