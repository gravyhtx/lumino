// ~/constants/regex.ts

//* REGEX PATTERNS
type RegexPatterns = {
  alpha: RegExp;
  alphaNum: RegExp;
  bitcoinHash: RegExp;
  characters: RegExp;
  consecutiveChar: RegExp;
  creditCard: RegExp;
  currency: RegExp;
  currencySymbols: RegExp;
  date: RegExp;
  dollarAmount: RegExp;
  ext: RegExp;
  email: RegExp;
  hexColor: RegExp;
  ipAddress: RegExp;
  isbn: RegExp;
  ethereumHash: RegExp;
  guid: RegExp;
  militaryTime: RegExp;
  trueMilitaryTime: RegExp;
  number: RegExp;
  numerals: RegExp;
  phone: RegExp;
  punctuation: RegExp;
  endPunctuation: RegExp;
  basicPunctuation: RegExp;
  rgbColor: RegExp;
  specialChar: RegExp;
  ssn: RegExp;
  time: RegExp;
  multiLine: RegExp;
  spaces: RegExp;
  consecutiveSpaces: RegExp;
  whitespace: RegExp;
  integer: RegExp;
  decimal: RegExp;
  percent: RegExp;
  name: RegExp;
  path: RegExp;
  password: RegExp;
  simplePassword: RegExp;
  url: RegExp;
  words: RegExp;
  zip: RegExp;
  zipCanada: RegExp;
  zipNorthAmerica: RegExp;
};

/**
 * Function to provide common regex patterns for validation.
 * @returns {RegexPatterns} An object containing various regex patterns.
*/

export const regexPatterns = (): RegexPatterns => {
  //? CHARACTERS
  const characters = /\w/gi; // letters, digits, and underscore characters

  //? WORDS
  const words = /\w+/gi;

  //? SPECIAL CHARACTERS
  const specialChar =
    /[?!@#$%^&*(),."：{}|<>`~@#$^&*()=：“”‘’'，。、？|{}':;'%,\\.\[\]<>\/~！@#￥\u2026&*（）&;—|{}【】‘；]/gu; // Checks for Unicode

  //? BASIC PUNCTUATION MARKS
  const basicPunctuation = /([.,!?;:])/g;

  //? ENDING PUNCTUATION MARKS
  const endPunctuation = /([.?!;:\-\u2026]])/g;

  //? ALL PUNCTUATION MARKS
  const punctuation = /([.,?¿!¡;:(){}[\]'"“”‘’—\-\u2026])/g;

  //? CURRENCY
  const currency = /[$£€¥¢₽₹₩฿₪₫]\s*(\d{1,3}(?:,\d{3})*|\d+)(?:\.(\d{1,3}))?/;

  //? CURRENCY SYMBOLS
  const currencySymbols = /[$£€¥¢₽₹₩฿₪₫]/g;
  
  //? ROMAL NUMERALS
  const numerals =
    /^(\d{4}|(?=[IVX])(X{0,3}I{0,3}|X{0,2}VI{0,3}|X{0,2}I?[VX])-[A-Z]{2})$/i;
  
  //? EMAIL
  const email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

  //? PHONE NUMBER (North American)
  const phone =
    /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    
  //? DATE (YYYY-MM-DD)
  const date =
    /^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([12][0-9])|(3[01]))$/;
    
  //? TIME (HH:MM:SS)
  const time =
    /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  
  //? MILITARY / 24-HR TIME (HH:MM or HHMM)
  const militaryTime =
    /^([01]?[0-9]|2[0-3]):?[0-5][0-9]$/;
  
  //? TRUE MILITARY TIME (HHMM)
  const trueMilitaryTime =
    /^([01]?[0-9]|2[0-3])([0-5][0-9])$/;
    
  //? CREDIT CARD
  const creditCard =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    
  //? IP ADDRESS
  const ipAddress =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
  //? ALPHANUMERIC
  const alphaNum =
    /^[a-zA-Z0-9]+$/g;
    
  //? ALPHABETIC
  const alpha =
    /^[a-zA-Z]+$/g;
    
  //? NUMERIC
  const number = /^[0-9]+$/g;
    
  //? HEX COLOR
  const hexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;

  //? RGB COLOR
  const rgbColor = /^rgb\(\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*,\s*(0|[1-9]\d?|1\d\d?|2[0-4]\d|25[0-5])\s*\)$/i;
    
  //? SOCIAL SECURITY NUMBERS
  const ssn = /\d{3}-\d{2}-\d{4}/;
    
  //? ISBN
  const isbn = /(?:ISBN(?:-1[03])?:?\ )?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\ ]){3})[-\ 0-9X]{13}$|97[89][0-9]{10}$|[0-9]{9}[0-9X]$)[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9X]/;
    
  //? POSTAL CODE (USA)
  const zip = /\d{5}(?:[-\s]\d{4})?/;
    
  //? POSTAL CODE (CANADA)
  const zipCanada = /^([A-Z]\d[A-Z]\s?\d[A-Z]\d)$/;

  //? POSTAL CODE (NORTHAMERICA)
  const zipNorthAmerica = /^(?=.[0-9])\d{5}(?=.[a-zA-Z])|[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/;

  //? STANDARD PASSWORD CHECK (1 uppercase, 1 lowercase, 1 digit, 1 special character, 8 character minimum, no spaces)
  const password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])(?!.*\s)[A-Za-z\d@$!%*#?&]{8,}$/;

  //? SIMPLE PASSWORD -- at least 1 letter and 1 number, 6 character minimum, no spaces
  const simplePassword = /^(?=.[A-Za-z])(?=.\d)(?!.*\s)[A-Za-z\d]{6,}$/;

  //? NORTH AMERICAN CURRENCY -- Optional 2 decimal place for cents
  const dollarAmount = /^\s*\$(([1-9]\d{0,2}(,\d{3}){0,2})|0)?(?:\.\d{1,2})?\s*(USD|CAD)?\s*$/;

  //? FILE EXTENSION
  const ext = /(.*)\.([a-zA-Z]+)$/;

  //? PATH
  const path = /^(?:[a-zA-Z]\:|\\\\[\w\.]+\\[\w.$]+)\\(?:[\w]+\\)*\w([\w.])+$/;

  //? URL
  const url = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;

  //? GUID
  const guid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  //? NAME ('Cuz some names be crazy... but we keepsin it not TOO crazy)
  //  Allows for any possible characters including accented characters, dashes,
  //  apostrophes, spaces, and numbers in the name, but will not allow for any
  //  other symbols or consecutive spaces, dashes, and apostrophes.
  //  You'd want to trim and ensure there aren't multiple spaces.
  const name = /^(?=.{1,60})(?!\s)[\w-'\u00C0-\u017F]+(?:[.!?\s][\w-'\u00C0-\u017F]+)*$/g; 
               //  Also, Texas allows for 100 characters, but 60 is probaly enough...

  //? SPACES
  // Checks if there is any whitespace character present in the string.
  const spaces = /\s/;

  //? WHITESPACE
  // Checks for the total whitespace in the string. It matches zero or more consecutive
  // whitespace characters, including empty strings.
  const whitespace = /\s*/; 
  
  //? CONSECUTIVE SPACES
  // Checks for at least two occurrences of whitespace characters consecutively
  // Useful for when you need to find and replace multiple consecutive spaces in a string
  const consecutiveSpaces = /\s{2,}/g;

  //? INTEGER
  const integer = /(\d{1,3})/; // Match integers: 79, 255, etc.

  //? DECIMAL
  const decimal = /((?:\d+(?:\.\d+)?)|(?:\.\d+))/; // Match 129.6, 79, .9, etc.

  //? PERCENT
  const percent = new RegExp(`${decimal.source}%`); // Match 12.9%, 79%, .9%, etc.

  //? MULTIPLE LINES
  const multiLine = /\n/;

  //? CONSECUTIVE CHARACTERS
  const consecutiveChar = /(.)\1+/g;

  //? BITCOIN HASH
  const bitcoinHash = /^[a-fA-F0-9]{64}$/i;

  //? ETHEREUM HASH
  const ethereumHash = /^0x[a-fA-F0-9]{40}$/i;

  return {
    alpha,
    alphaNum,
    bitcoinHash,
    characters,
    consecutiveChar,
    creditCard,
    currency,
    currencySymbols,
    date,
    dollarAmount,
    ext,
    email,
    hexColor,
    ipAddress,
    isbn,
    ethereumHash,
    guid,
    militaryTime,
    trueMilitaryTime,
    number,
    numerals,
    phone,
    punctuation,
    endPunctuation,
    basicPunctuation,
    rgbColor,
    specialChar,
    ssn,
    time,
    multiLine,
    spaces,
    consecutiveSpaces,
    whitespace,
    integer,
    decimal,
    percent,
    name,
    path,
    password,
    simplePassword,
    url,
    words,
    zip,
    zipCanada,
    zipNorthAmerica,
  }
}

const REGEX_PATTERNS = regexPatterns();

export default REGEX_PATTERNS;