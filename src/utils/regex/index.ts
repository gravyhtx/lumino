import REGEX_PATTERNS from "~/constants/regex";

export const match = (str: string, regex: RegExp) => str.match(regex);
export const test = (str: string, regex: RegExp) => regex.test(str);
export const exec = (str: string, regex: RegExp) => regex.exec(str);

const regex = {
  match: match,
  test: test,
  exec: exec
}

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
  flag += caseSensitive === true ? "i" : "";
  flag += multiline === true ? "m" : "";
  const pattern = new RegExp(list.join(""), "i");
  return {
    test: pattern.test(text),
    match: text.match(pattern)
  };
}

//* REGMAX PATTERNS
export const patterns = REGEX_PATTERNS;

//* COMBINE MULTIPLE REGEX PATTERNS
export function makeRegExp(regex: RegExp | RegExp[], flag = ''): RegExp {
  const regexStr = Array.isArray(regex) ? regex.map((r) => r.source).join('|') : regex;
  return new RegExp(regexStr, flag);
}

export default regex;