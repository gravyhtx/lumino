// type IntervalTime = ``

export type TimeUnits = 'ms' | 's';
export type Time = `${number}${TimeUnits}`;

export type Days = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type Months = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const month: Months[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthNumber = (name: Months) => month.indexOf(name) + 1;
export const daysInMonth = (month: Months, year: number) => new Date(year, monthNumber(month), 0).getDate();