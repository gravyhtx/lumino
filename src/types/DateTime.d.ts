// ~/types/DateTime.ts
import type { NumericRange } from "./utils";

export type TimeUnits = 'ms' | 's';
export type Time = `${number}${TimeUnits}`;

export type Days = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type Months = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export type MillisecondsValue = number;
export type SecondsValue = NumericRange<[], 60>;
export type MinutesValue = NumericRange<[], 60>;
export type HoursValue = NumericRange<[], 24>;
export type DaysValue = number;
export type WeeksValue = NumericRange<[], 52>;
export type MonthValue = NumericRange<[], 12>;
export type YearValue = number;

export type ClockTime = {
  ms: MillisecondsValue;
  s: SecondsValue;
  min: MinutesValue;
  hr: HoursValue;
}
export type CalendarTime = {
  d: DaysValue;
  wk: WeeksValue;
  mo: MonthValue;
  yr: YearValue;
}