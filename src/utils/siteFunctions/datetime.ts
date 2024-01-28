import { useEffect, useState } from "react";

//?|[ GLOBAL TYPES ]|?//
interface DateObject {
  month: number;
  day: number;
  year: number;
}

//?|[ GLOBAL CONSTANTS ]|?//
const dtFormat = Intl.DateTimeFormat;
const date =  new Date();
// const timeElapsed = Date.now();
// const today = new Date(timeElapsed);

//! //================\\ !//
//! || DATE FUNCTIONS || !//
//! \\================// !//

//* GET CURRENT YEAR
/**
 * Returns the current year, optionally formatted to display a specific number of digits.
 * @param {number|boolean} [int] Specifies the number of digits to output (1 to 4, or -4 to -1).
 * @returns {string} The current year formatted according to the specified number of digits.
 * @example
 * getYear(2); //=> '23' if the current year is 2023
 */
export const getYear = (int?: number | boolean): string => {
  const year =  date.getFullYear().toString();
  const getLast = int && int !== true && int <= 4 && int >= 1
      ? -1*int
    : int && int !== true && int <= -1 && int >= -4
      ? int
    : int === true ? -2 : false;
  return getLast ? year.slice(getLast) : year;
}


//* GET CURRENT MONTH
/**
 * Returns the current month, optionally with leading zeros or as a string representation.
 * @param {boolean} [addZeros] If true, a leading zero is added for single-digit months.
 * @param {boolean} [toString] If true, returns the month as a string.
 * @returns {string|number} The current month as a number or string, depending on parameters.
 * @example
 * getMonth(true, true); //=> 'June' if the current month is June
 */
export const getMonth = (addZeros?: boolean, toString?: boolean): string | number | undefined => {
  toString = toString === true ? true : false;
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = addZeros && (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; 
  return toString === false ? month : months[date.getMonth()];
}


//* GET CURRENT DAY
/**
 * Returns the current day, optionally with leading zeros.
 * @param {boolean} [leadingZeros] If true, a leading zero is added for single-digit days.
 * @returns {string} The current day as a string.
 * @example
 * getDay(true); //=> '03' if the current day is the 3rd
 */
export const getDay = (leadingZeros?: boolean): string => {
  const today = date.getDate();
  return leadingZeros && today < 10 ? '0' + today.toString() : today.toString();
}

//* GET CURRENT DAY OF THE YEAR
/**
 * Returns the current day of the year.
 * @returns {number} The current day of the year.
 * @example
 * getDayOfYear(); //=> 174 if the current day is June 23rd
 */
export const dayInYear = (d: Date): number => Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);


//* GET HOURS/MINUTES IN CALCULATION OR MILITARY TIME
/**
 * Returns the total number of hours and minutes in a calculation or military time format.
 * @param {number} hour The hour to convert.
 * @param {number} minutes The minutes to convert.
 * @param {object} [opts] Options for time conversion.
 * @param {boolean} [opts.pm=false] If true, converts to PM time.
 * @param {boolean} [opts.military=false] If true, returns the time in military format.
 * @param {boolean} [opts.twentyFourHour=false] If true, returns time in 24-hour format.
 * @param {number} [opts.precision=2] Rounding precision for calculation format.
 * @returns {string|number} The total number of hours and minutes in the specified format.
 * @example
 * getTimeCalc(14, 30); //=> 14.5
 * getTimeCalc(14, 30, { military: true }); //=> '1430'
 * getTimeCalc(2, 30, { pm: true, twentyFourHour: true }); //=> '14:30'
 */
export const getTimeCalc = (
  hour: number,
  minutes: number,
  opts: {
    pm?: boolean,
    military?: boolean,
    twentyFourHour?: boolean,
    precision?: number
  } = {}
): string | number => {
  const { pm, military, twentyFourHour, precision = 2 } = opts;
  hour = pm === true && hour < 12 ? hour + 12 : hour;
  const totalMinutes = 60;
  const min = !Number.isNaN(minutes) && minutes <= totalMinutes ? Number(minutes) : 0;
  const hr = !Number.isNaN(hour) && ((hour < 24 && min) || (hour === 24 && min === 0)) ? Number(hour) : 0;

  const timeCalc = hr + (min / totalMinutes);

  if (military) {
    const milMin = min < 10 ? `0${min}` : min.toString();
    const milHr = hr < 10 ? `0${hr}` : hr.toString();
    return milHr + milMin;
  } else if (twentyFourHour) {
    const formattedMin = min < 10 ? `0${min}` : min.toString();
    return `${hr}:${formattedMin}`;
  } else {
    return Number(timeCalc.toFixed(precision));
  }
};

//* GET INFORMATION ON USER'S TIMEZONE
/**
 * Returns the user's current time zone.
 * @returns {string} The user's current time zone.
 * @example
 * getTimeZone(); //=> 'America/Chicago'
 */
export const getTimeZone = (): string => {
  return dtFormat().resolvedOptions().timeZone
}

//* GET INFORMATION ON USER'S TIMEZONE
/**
 * Returns the user's current locale.
 * @returns {string} The user's current locale.
 * @example
 * getLocale(); //=> 'en-US'
 */
export const getLocale = (): string => {
  return dtFormat().resolvedOptions().locale
}

//* FORMAT DATE BASED ON 'FORMAT' INPUT
/**
 * Formats a date into a specified format.
 *
 * @param inputDate The date to format. Can be a string, Date object, or boolean value.
 * @param format Optional. The format to use for the output. Can be a string, boolean value, or undefined.
 *               Available formats: false/"number"/"timestamp"/"stamp", true/"local"/"locale", "str"/"string"/"datestring",
 *               "iso", "utc", "obj"/"object".
 *
 * @returns The formatted date as a string, number, or DateObject (see below).
 *
 * DateObject format:
 *   {
 *     month: number, // 1-based month (1 = January)
 *     day: number,   // day of the month (1-31)
 *     year: number   // full year (e.g. 2023)
 *   }
 */
export const formatDate = (
  inputDate: string | Date | number | undefined,
  options: {
    time?: string;
    locale?: string;
    timeZone?: string;
    dateStyle?: "full" | "long" | "medium" | "short";
    timeStyle?: "full" | "long" | "medium" | "short";
  } = {}
) => {
  const date = inputDate instanceof Date
    ? inputDate
    : new Date(inputDate ?? new Date());

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  const {
    time = "00:00:00",
    locale = dtFormat().resolvedOptions().locale,
    timeZone = dtFormat().resolvedOptions().timeZone,
    dateStyle,
    timeStyle,
  } = options;

  const addMissingTimeParts = (time: string): string => {
    const [hour, minute, second] = time.split(':');
    const formattedHour = Number(hour) < 24 ? hour?.padStart(2, '0') : '12';
    const formattedMinute = Number(minute) < 60 ? (minute ?? '00').padEnd(2, '0') : '00';
    const formattedSecond = Number(second) < 60 ? (second ?? '00').padEnd(2, '0') : '00';
    return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
  };

  const formattedTime = addMissingTimeParts(time);
  const [hour, minute, second] = formattedTime.split(':');
  date.setHours(Number(hour), Number(minute), Number(second));

  const styledOutput = (d: Date) => {
    return new dtFormat(locale, { dateStyle, timeStyle, timeZone }).format(d);
  };

  const toYear = date.getFullYear();
  const toMonth = date.getMonth() + 1;
  const toDay = date.getDate();

  const dateObj = { month: toMonth, day: toDay, year: toYear };

  return {
    timestamp: date.getTime(), // Unix timestamp
    locale: styledOutput(date), // Formatted date based on locale
    string: date.toDateString(), // Date string
    iso: date.toISOString(), // ISO format
    utc: date.toUTCString(), // UTC format
    dateObject: dateObj, // Date object { month, day, year }
  };
};


//* CHECK IF AN OBJECT IS A "DATE OBJECT" -- { month: number, day: number, year: number }
/**
 * Checks if the given object is a valid "DateObject" with the shape { month: number, day: number, year: number }.
 * @param {any} obj Object to check.
 * @returns {boolean} True if the object is a valid DateObject, false otherwise.
 * @example
 * isDateObject({ month: 6, day: 23, year: 2023 }); //=> true
 */
export function isDateObject(obj: unknown): obj is DateObject {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'month' in obj &&
    'day' in obj &&
    'year' in obj
  );
}


//* CHECK FOR VALID DATE FORMAT
//? Includes Date object with { month, day, year }
//? To check if it is a valid "Date" object specifically, use "checkType(inputDate,'date')" instead
export const valiDate = (
  inputDate: string | number | Date | DateObject
): boolean => {

  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  const check = (data?: string | number | Date | DateObject) => {
    data = data ? data : inputDate;

    const isDate = 
      Object.prototype.toString.call(data) === '[object Date]' ??
      (data instanceof Date && !isNaN(data.getTime()));

    return {
      date: isDate,
      number: typeof data === 'number' && Number.isFinite(data),
      string: typeof data === 'string'
    };
  };

  if (typeof inputDate === 'object' && inputDate !== null && isDateObject(inputDate)) {
    const d = { m: Number(inputDate.month), d: Number(inputDate.day), y: Number(inputDate.year) };
    return (
      d.m <= 12 && d.d <= 31 && check(d.y).number && regex.test(`${d.m}/${d.d}/${d.y}`)
    );
  }

  if (!check(inputDate).string && !check(inputDate).number) {
    return check(inputDate).date;
  }

  const date = check(inputDate).number ? new Date(Number(inputDate)) : new Date(inputDate.toString());

  const timestamp = date.getTime();

  if (date.toString() !== 'Invalid Date' && check(timestamp).number) {
    return true;
  }

  return false;
  
};


//* CHECK IF DATE MATCHES TODAY'S DATE
/**
 * Checks if the given date matches today's date.
 * @param {Date | string | number | undefined} inputDate The date to check.
 * @returns {boolean} True if the date matches today's date, false otherwise.
 * @example
 * isToday('6/23/2023'); //=> false
 * isToday(new Date()); //=> true
 * isToday(new Date('6/13/2020')); //=> false
 * isToday(1592024400000); //=> false
 * isToday(undefined); //=> false
 */
export const isToday = (inputDate: Date | string | number | undefined): boolean => {
  if (!inputDate) {
    return false;
  }
  const todayIs = new Date();
  todayIs.setHours(0, 0, 0, 0); // Reset time to the start of the day

  const inputDateTime = new Date(inputDate);
  inputDateTime.setHours(0, 0, 0, 0); // Reset time to the start of the day

  return inputDateTime.getTime() === todayIs.getTime();
};


//* GET THE AMOUNT OF TIME PASSED FROM A TIMESTAMP
/**
 * Calculates the amount of time passed between two dates.
 * @param {number|Date} date - The date to compare.
 * @param {number|Date} [reference] - The reference date to compare against. Defaults to the current date.
 * @returns {object} An object containing the difference in milliseconds, seconds, minutes, hours, days, weeks, months, and years.
 * @example
 * timePassed(1592024400000); //=> { ms: 1592024400000, s: 1592024400, min: 26533740, hr: 442229, d: 18426, wk: 2632, mo: 60, yr: 5.01 }
 * timePassed(1592024400000, 1592024401000); //=> { ms: 1000, s: 1, min: 0, hr: 0, d: 0, wk: 0, mo: 0, yr: 0 }
 * timePassed(new Date(1592024400000), new Date(1592024401000)); //=> { ms: 1000, s: 1, min: 0, hr: 0, d: 0, wk: 0, mo: 0, yr: 0 }
 */
export const timePassed = (
  date: number | Date,
  reference: number | Date = new Date().getTime()
): object => {
  date = typeof date === 'number' ? new Date(date) : date;
  const timestamp = date.getTime();
  const refDate = typeof reference === 'number' ? new Date(reference) : reference;
  const refStamp = refDate.getTime();

  const deltaMs = Math.abs(refStamp - timestamp); // difference in milliseconds
  const deltaSeconds = Math.floor(deltaMs / 1000); // difference in seconds
  const deltaMinutes = Math.floor(deltaSeconds / 60); // difference in minutes
  const deltaHours = Math.floor(deltaMinutes / 60); // difference in hours
  const deltaDays = Math.floor(deltaHours / 24); // difference in days
  const deltaWeeks = Math.floor(deltaDays / 7); // difference in weeks
  const deltaMonths = Math.abs(
    (refDate.getFullYear() - date.getFullYear()) * 12 +
      (refDate.getMonth() - date.getMonth())
  ); // difference in months

  const deltaTime = {
    ms: deltaMs,
    s: deltaSeconds,
    min: deltaMinutes,
    hr: deltaHours,
    d: deltaDays,
    wk: deltaWeeks,
    mo: deltaMonths,
    yr: Math.abs(Number((refDate.getFullYear() - date.getFullYear()).toFixed(2)))
  };

  const string = deltaTime.s < 60 ? `less than a minute ago`
    : deltaTime.min === 1 ? `1 minute ago`
    : deltaTime.min < 60 ? `${deltaTime.min} minutes ago`
    : deltaTime.hr === 1 ? `1 hour ago`
    : deltaTime.hr < 60 ? `${deltaTime.hr} hours ago`
    : deltaTime.d === 1 ? `1 day ago`
    : deltaTime.d < 30 ? `${deltaTime.d} days ago`
    : deltaTime.wk < 12 ? `${deltaTime.wk} weeks ago`
    : deltaTime.mo < 12 ? `${Math.round(deltaTime.mo * 2) /2} months ago`
    : Math.round(deltaTime.yr * 20) / 20 < 1.2 ? `1 year ago`
    : `${Math.round(deltaTime.yr * 20) / 20} years ago`;
  
  return { deltaTime, string }
};


interface TimeZoneData {
  code: string | undefined;
  coordinates: string | undefined;
  tz: string | undefined;
  comments?: string;
}
/**
 * Asynchronously fetches and sets time zone data.
 * @returns {object} Contains the current date and a list of time zones.
 * @example
 * const { date, timeZoneList } = getDateTime();
 * console.log(date); //=> { day: '23', month: 'June', year: '2023' }
 */
export function getDateTime() {
  const [timeZoneList, setTimeZones] = useState<TimeZoneData[]>([]);

  useEffect(() => {
    async function getTimeZones() {
      try {
        const response = await fetch("/data/timezones.txt");
        const text = await response.text();

        const lines = text.trim().split("\n").slice(1);
        const timeZones: TimeZoneData[] = lines.map((line) => {
          const [code, coordinates, tz, ...comments] = line.trim().split("\t");
          return { code, coordinates, tz, comments: comments.join(" ") };
        });

        setTimeZones(timeZones);
      } catch (error) {
        console.error(error);
      }
    }

    getTimeZones().catch(console.error);
  }, []);

  const date = {
    day: getDay(),
    month: getMonth(),
    year: getYear()
  }

  return { date, timeZoneList };
}

/**
 * Converts a given time to a different time zone.
 * @param {string | number | {hour: number, minutes: number}} inputTime The input time to convert.
 * @param {string} fromTimeZone The time zone of the input time (e.g., 'America/New_York').
 * @param {string} toTimeZone The target time zone for the conversion (e.g., 'Asia/Tokyo').
 * @param {object} [opts] Options for time conversion and output.
 * @param {boolean} [opts.pm=false] Specifies if the time is PM (relevant if hour is in 12-hour format).
 * @returns {string} The converted time in "HH:MM" format.
 * @example
 * convertTimeZone('2:30', 'America/New_York', 'Asia/Tokyo'); // Converts 2:30 AM from New York to Tokyo time
 * convertTimeZone('14.5', 'America/New_York', 'Asia/Tokyo', { pm: true }); // Converts 2:30 PM from New York to Tokyo time
 * convertTimeZone({ hour: 14, minutes: 30 }, 'America/New_York', 'Asia/Tokyo'); // Converts 14:30 from New York to Tokyo time
 * convertTimeZone('2:30pm', 'America/New_York', 'Asia/Tokyo'); // Converts 2:30 PM from New York to Tokyo time
 */
export const convertTimeZone = (
  inputTime: string | number | {hour: number, minutes: number},
  fromTimeZone: string,
  toTimeZone: string,
  opts: {
    pm?: boolean,
    outputFormat?: '24hr' | '12hr' | 'hour' | 'json'
  } = {}
): string | {hour: number, minutes: number} => {
  let hour: number, minutes: number;

  if (typeof inputTime === 'string') {
    // Ensure inputTime is not undefined before using it in the match method
    const timeString = inputTime ?? '';
    const pmMatch = timeString.match(/(\d+):(\d+)\s*(am|pm)?/i) as string[];
    if (pmMatch) {
      hour = parseInt(String(pmMatch[1]), 10);
      minutes = parseInt(String(pmMatch[2]), 10);
      if (/pm/i.test(String(pmMatch[3])) && hour < 12) hour += 12;
      if (/am/i.test(String(pmMatch[3])) && hour === 12) hour = 0;
    } else {
      // Handle "HH.MM" military/24-hour format
      const decimalHour = parseFloat(inputTime);
      hour = Math.floor(decimalHour);
      minutes = Math.round((decimalHour - hour) * 60);
    }
  } else if (typeof inputTime === 'number') {
    // Handle decimal number format
    hour = Math.floor(inputTime);
    minutes = Math.round((inputTime - hour) * 60);
  } else {
    // Handle object format
    hour = inputTime.hour;
    minutes = inputTime.minutes;
  }

  // Apply PM option if specified
  if (opts.pm && hour < 12) hour += 12;

  // Formatting output based on selected format
  switch (opts.outputFormat) {
    case '24hr':
      return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    case '12hr':
      const amPm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      return `${hour}:${minutes.toString().padStart(2, '0')} ${amPm}`;
    case 'hour':
      return hour.toString();
    case 'json':
      return { hour, minutes };
    default:
      // Default output format
      return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
};