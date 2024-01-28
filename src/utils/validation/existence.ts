import { checkType } from './types';

//* CHECK TO SEE IF A VALUE "EXISTS" -- Empty variables (such as arrays, strings, and object) will show as 'true'
//? Empty strings
export const exists = (x: unknown): boolean => {
  return !!(
    x !== null &&
    x !== undefined &&
    (x || x === 0 ||
    (Array.isArray(x) && x.length === 0) ||
    (typeof x === "object" && x !== null && Object.keys(x).length === 0))
  );
};
export const doesNotExist = (x: unknown) => (x === null || x === undefined || x === "");

//* CHECK IF WINDOW EXISTS (!undefined)
//? Checks for 'window' and allows for retries at 500ms intervals by default
//? or interval can be set by a number (in ms). You can also set the amount
//? of retries by number or set to 'true' to allow 1 retry.
export const windowExists = (
  options: {
    allowRetries: boolean | number,
    retryDelay: number,
    elseDoThis: () => unknown,
  }={
    allowRetries: false,
    retryDelay: 500,
    elseDoThis: () => {return {}},
  }
): boolean => {
  let { allowRetries, retryDelay } = options;
  const { elseDoThis } = options;
  allowRetries = allowRetries === true ? 1 : checkType(allowRetries, 'number') ? allowRetries : false;
  retryDelay = checkType(retryDelay, 'number') ? retryDelay : 500;

  //? Set retries to 0
  let retries = 0;

  //? If undefined perform an action...
  if(typeof window === 'undefined') {
    if(checkType(elseDoThis, 'function')){
      elseDoThis();
    }
    if (allowRetries) {
      if (retries < (allowRetries + 1)) {
        retries += 1;
        setTimeout(() => windowExists({ allowRetries, retryDelay, elseDoThis }), 500);
      } else {
        console.error("Failed to access window object, check if code is running in a browser environment "+
        "or try running the function inside of a useEffect");
        if(checkType(elseDoThis, 'function')){
          elseDoThis();
        }
      }
    }
    return false;
  }
  return true;
}


//* CHECK IF IMAGE EXISTS
// export const imageExists = (src: string) => {
//   const fetch = async () => axios.get(src).then(res => res.data);
//   const { data, error } = useSWR(src, fetch);
//   return data || !error ? true : error || !data ? false : null;
// }
export const imageExists = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}



//* CHECK STRING FOR WORDS
export const checkForWords = (string: string, wordsList: string[], booleanOutput?: boolean) => {
  let isTrue = false;
  //? Use an array with a list of words to check string for instances
  const checks = wordsList ? string.match( new RegExp("\\b(" + wordsList.join('|') + ")\\b", "ig") ) : undefined;

  // Check if string is included in "Words List"
  isTrue = wordsList ? wordsList.includes(string) : false;

  return booleanOutput === true || !checks ? isTrue : checks;
}