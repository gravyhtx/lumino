import REGEX_PATTERNS from "~/constants/regex";
import { checkType, isValidUrl } from "./types";

//* CHECK IF STRING HAS SPECIAL CHARACTERS
export const hasSpecialChars = (str: string): boolean => {
  return REGEX_PATTERNS.specialChar.test(str);
};

//* CHECK FOR VALID PHONE NUMBER
//? API -- https://apilayer.com/marketplace/number_verification-api
export const validPhoneNumber = (phoneNumber: string) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return regex.test(phoneNumber);
}


//* CHECK FOR CONSECUTIVE CHARACTERS
//?  Default max consecutive characters is 2 in a row -- 3+ will return 'true'
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


//* TURN A STRING INTO A FILENAME
export const fileName = (string: string) => {
  let str = '';

  if(string !== undefined && checkType(string, 'string')) {
    str = string.replace(/\s+/g, ' ').trim().toLowerCase();
  }
  const output = str ? str.replace(/ /g, "_").replace(/[^a-z0-9_]/gmi, "-") : string;
  return output;
}


//* TURN FILENAME STRING INTO A STRING (w/ spaces instead of underscores/dashes)
export const unFileName = (string: string) => {
  if(string !== undefined && checkType(string, 'string')) {
    string = string.replaceAll(/_+/g, ' ').trim().toLowerCase();
    string = string.replaceAll(/-/g, ' - ');
    return string;
  }
  return undefined;
}

//* FORMAT A STRING AS A VALID HTTPS URL
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
