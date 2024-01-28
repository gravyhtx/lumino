import { useEffect, useState } from "react";


//? || TYPES || ?//

interface DateObject {
  month: number;
  day: number;
  year: number;
}

const date =  new Date();
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

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
export const getYear = (int?: number | boolean) => {
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
export const getMonth = (addZeros?: boolean, toString?: boolean) => {
  toString = toString === true ? true : false;
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = addZeros && (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; 
  return toString === false ? month : months[date.getMonth()];
}


//* GET CURRENT DAY
export const getDay = (addZeros?: boolean) => {
  const today = date.getDate();
  return addZeros && today < 10 ? '0' + today.toString() : today.toString();
}

export const dayInYear = (d: Date) => Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);


//* GET HOURS/MINUTES IN CALCULATION OR MILITARY TIME
//? Ex. 14hr 30min = 14.5 or '1430'
export const getTimeCalc = (hour: number, minutes: number, military?: boolean): string | number => {
  const total = 60;
  const min = !Number.isNaN(minutes) && minutes <= 60 ? Number(minutes) : 0;
  const hr = !Number.isNaN(hour) && ((hour < 24 && min) || (hour === 24 && min === 0)) ? Number(hour) : 0;

  const timeCalc = hr + (min / total);

  const milMin = min > 10 ? min.toString() : min < 10 && min !== 0 ? '0' + minutes.toString() : '00';
  const milHr = hr < 10 ? '0'+hr.toString() : hr.toString();
  const milTime = milHr + milMin;

  return military === true ? milTime : Number(timeCalc.toFixed(2));
}

//* GET INFORMATION ON USER'S TIMEZONE
export const getTimeZone = () => {
  return dtFormat().resolvedOptions().timeZone
}

//* GET INFORMATION ON USER'S TIMEZONE
export const getLocale = () => {
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

const dtFormat = Intl.DateTimeFormat;

export const formatDate = (
  inputDate: string | Date | false | undefined = undefined,
  options: {
    time: string |undefined,
    locale: string | undefined,
    timeZone: string | undefined,
    dateStyle: "full" | "long" | "medium" | "short" | undefined,
    timeStyle: "full" | "long" | "medium" | "short" | undefined,
  }={
    time: "00:00:00",
    locale: dtFormat().resolvedOptions().locale,
    timeZone: dtFormat().resolvedOptions().timeZone,
    dateStyle: undefined,
    timeStyle: undefined,
  }
): {
  timestamp: Date,
  locale: Date,
  string: Date,
  iso: Date,
  utc: Date,
  dateObject: DateObject,
} => {
  
  inputDate = inputDate ? new Date(inputDate) : today;

  const isValidDate = ((Object.prototype.toString.call(inputDate) === '[object Date]' && isFinite(inputDate.getTime())) ??
  ((typeof inputDate === 'object' && typeof inputDate.getTime() === 'function')))

  const { timeZone, locale } = options;
  let { timeStyle, dateStyle } = options;

  const addMissingTimeParts = (time: string): string => {
    const [hour, minute, second] = time.split(':');
    const formattedHour = Number(hour) < 24 ? hour?.padStart(2, '0') : '12';
    const formattedMinute = Number(minute) < 60 ? (minute ?? '00').padEnd(2, '0') : '00';
    const formattedSecond = Number(second) < 60 ? (second ?? '00').padEnd(2, '0') : '00';
    return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
  };

  const formattedTime = options.time ? addMissingTimeParts(options.time) : undefined;

  const useStyle = dateStyle ?? (timeStyle ? true : false);

  const styledOutput = (d: Date) => {
    timeStyle = timeStyle ?? 'short';
    dateStyle = dateStyle ?? 'short';
    const dateTime = isValidDate && typeof d !== 'string' && typeof d !== 'boolean'
      ? new Date(d.getTime())
      : new Date(date.getTime());
    if(formattedTime) {
      const [hour, minute, second] = formattedTime.split(':');
      dateTime.setHours(Number(hour), Number(minute), Number(second));
    }
    return new dtFormat(locale, { dateStyle, timeStyle, timeZone }).format(dateTime);
  }

  const toDate = inputDate instanceof Date
      ? inputDate
    : typeof inputDate === 'string'
      ? new Date(inputDate)
      : today;

  const output = !inputDate ? today : toDate;
  const outputDate = (d: unknown) => useStyle ? styledOutput(d as Date) : d;

  const toYear = output.getFullYear();
  const toMonth = output.getMonth()+1;
  const toDay = output.getDate();

  const dateObj = { month: toMonth, day: toDay, year: toYear }

  return {
    timestamp: outputDate(output.getTime()) as Date, //? 1592024400000
    locale: outputDate(output.toLocaleDateString()) as Date, //? "6/13/2020"
    string: outputDate(output.toDateString()) as Date, //? "Sun Jun 13 2020"
    iso: outputDate(output.toISOString()) as Date, //? "2020-06-13T18:30:00.000Z"
    utc: outputDate(output.toUTCString()) as Date, //? "Sat, 13 Jun 2020 18:30:00 GMT"
    dateObject: outputDate(dateObj) as DateObject, //? { month: 6, day: 13, year: 2020 }
  }
}


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
export const isToday = (inputDate: string | false | Date | undefined) => {
  return formatDate(inputDate).timestamp === today;
}


//* GET THE AMOUNT OF TIME PASSED FROM A TIMESTAMP
export const timePassed = (
  date: number | Date,
  reference: number | Date = new Date().getTime()
) => {
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