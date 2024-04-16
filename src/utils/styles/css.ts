import { pxConversionFactor } from '~/constants';
import type { StaticUnits, StaticSize, StandardSize, StandardUnits } from '~/types/Units';
import { percentToValue } from '../global';
import { GridTrackSize } from '~/types/declarations/css';

/**
 * Converts a number to a string according to specific rules.
 * - Numbers up to 3.5 are rounded to the nearest multiple of 0.5.
 * - Numbers above 3.5 and up to 20 are integers.
 * - Numbers above 20 are multiples of 4 up to 64, then 72, 80, and 96.
 * - Numbers are capped at 96.
 * 
 * @param num - The number to convert.
 * @returns The converted string.
*/
export function cssNumber(num?: number | string): string | undefined {
  let numericValue = typeof num === 'string' ? parseFloat(num) : num;

  // Check if the numericValue is a valid number
  if (typeof numericValue === 'number' && isFinite(numericValue)) {
    // Handle negative values
    const isNegative = numericValue < 0;
    numericValue = Math.abs(numericValue);

    // Cap the number at 96
    numericValue = Math.min(numericValue, 96);

    // Handle numbers less than or equal to 3.5
    if (numericValue <= 3.5) {
      const rounded = Math.round(numericValue * 2) / 2;
      return (isNegative ? '-' : '') + (rounded < 1 ? `0${rounded}` : rounded.toString());
    }

    // Handle numbers greater than 3.5 and up to 20
    if (numericValue <= 20) {
      return (isNegative ? '-' : '') + Math.floor(numericValue).toString();
    }

    // Special numbers for rounding
    const specialNumbers = [64, 72, 80, 96];

    // Find the closest special number or handle if it's a special number
    if (numericValue > 20) {
      const closest = specialNumbers.reduce((prev, curr) =>
        (Math.abs(curr - Number(numericValue)) < Math.abs(prev - Number(numericValue))) ? curr : prev
      );
      return (isNegative ? '-' : '') + closest.toString();
    }

    // Default to multiples of 4
    return (isNegative ? '-' : '') + (Math.floor(numericValue / 4) * 4).toString();
  }

  // Return undefined for non-numeric inputs or strings that can't be parsed into numbers
  return undefined;
}


/**
 * Extracts the numeric value and unit from a CSS size string.
 * @param {string} cssSize - A CSS size string (e.g., '10px', '2em').
 * @returns {[number, string]} A tuple containing the numeric value and unit.
 */
export const extractNumberAndUnit = (cssSize: string): [number | undefined, string | undefined] => {
  const match: RegExpMatchArray | null = cssSize.match(/^(\d+(?:\.\d+)?)([a-z%]+)$/i);
  if (!match) {
    const err = new Error(`Invalid CSS size: ${cssSize}`);
    console.error(err);
    return [undefined, undefined];
  }
  return [parseFloat(String(match[1])), match[2]];
};


/**
 * Convert CSS static unit values.
 * 
 * @param value - The CSS value to convert.
 * @param targetUnit - The target unit to convert to.
 * @param basePxSize - The number value for the base font size (root or parent) for em/rem conversions (default is 16px).
 * @returns The converted CSS value.
 */
export const convertStaticUnits = (value: string, targetUnit: StaticUnits, basePxSize = 16): StaticSize => {
  // Extract the numeric part from the value
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    throw new Error('Invalid numeric value');
  }

  // Extract the unit from the value
  const unitMatch = value.match(/[a-zA-Z]+/);
  const unit = unitMatch ? unitMatch[0] as StaticUnits : 'px';

  // Convert value to pixels
  const valueInPx = numericValue * pxConversionFactor(basePxSize)[unit as keyof typeof pxConversionFactor];

  // Convert pixels to target unit
  const convertedValue = valueInPx / pxConversionFactor(basePxSize)[targetUnit as keyof typeof pxConversionFactor];

  return `${convertedValue}${targetUnit}`;
};


/**
 * Determines whether a unit is a static unit.
 * @param unit - The unit to check.
 * @returns True if the unit is a static unit, false otherwise.
 */
const isStaticUnit = (unit: StandardUnits): unit is StaticUnits => {
  return ['cm', 'mm', 'in', 'px', 'pt', 'pc', 'em', 'rem'].includes(unit);
};


/**
 * Converts a value or an array of values to the specified CSS unit.
 * @param value - The value(s) to convert.
 * @param unit - The target CSS unit.
 * @param convert - Whether to convert the value or just change the unit.
 * @param basePxSize - The base (root or parent) font size in pixels, used for conversions involving em/rem.
 * @returns The value(s) converted to the specified unit.
 */
export const toCssUnits = (
  value: string | number | Array<string | number>,
  unit: StandardUnits,
  convert: boolean,
  basePxSize = 16
): StandardSize | StandardSize[] | undefined => {
  const processValue = (val: string | number): StandardSize => {
    if (typeof val === 'number') {
      return `${val}${unit}`;
    }

    const numericValue = parseFloat(val);
    if (isNaN(numericValue)) {
      throw new Error('Invalid numeric value');
    }

    // Extract the unit from the value
    const unitMatch = val.match(/[a-zA-Z]+/);
    const currentUnit = unitMatch ? unitMatch[0] as StandardUnits : 'px';

    if (convert && isStaticUnit(currentUnit) && isStaticUnit(unit)) {
      return convertStaticUnits(val, unit as StaticUnits, basePxSize);
    }

    return `${numericValue}${unit}`;
  };

  if (Array.isArray(value)) {
    return value.map(v => processValue(v));
  } else {
    return processValue(value);
  }
};

/**
 * Parses an opacity value and returns a numeric representation.
 * Handles percentage strings and clamps numeric values between 0 and 1.
 * Returns CSS keywords as-is.
 * 
 * @param {string | number} opacity - The opacity value.
 * @param {number | boolean} limitDecimalPlaces - Limit the decimal places (default: false, 2 places if `true`).
 * @returns {number | string} - The parsed opacity value.
 */
export function parseOpacityValue(
  opacity: string | number = 1,
  limitDecimalPlaces: number | boolean = false
): number | string {
  if (typeof opacity === 'string' && opacity.endsWith('%')) {
    return percentToValue(opacity as `${number}%`);
  } else if (!isNaN(parseFloat(String(opacity)))) {
    let numericValue = Math.min(Math.max(parseFloat(String(opacity)), 0), 1);
    numericValue = parseFloat(numericValue.toFixed(limitDecimalPlaces === true ? 2 : typeof limitDecimalPlaces === 'number' ? limitDecimalPlaces : 3));
    return numericValue;
  }
  return opacity; // Return the string as-is for CSS keywords
}

// ~/types/utils/index.ts

// ...

/**
 * Generates a CSS grid template string based on the provided options.
 *
 * @param options - An object containing the options for generating the grid template.
 * @param options.type - The type of grid template to generate. Can be 'areas', 'rows', 'columns', or 'combined'.
 * @param options.areas - An array of strings representing the grid areas (used with 'areas' type).
 * @param options.rows - An array of grid track sizes for the rows (used with 'rows' and 'combined' types).
 * @param options.columns - An array of grid track sizes for the columns (used with 'columns' and 'combined' types).
 * @param options.lineNames - An object containing line names for rows and columns (used with 'rows', 'columns', and 'combined' types).
 * @returns A string representing the generated CSS grid template.
 *
 * @example
 * const areaTemplate = gridTemplate({ type: 'areas', areas: ['a a a', 'b b b'] });
 * // Output: '"a a a" "b b b"'
 *
 * const rowsTemplate = gridTemplate({ type: 'rows', rows: ['100px', '1fr'], lineNames: { rows: ['header', 'content'] } });
 * // Output: '[header] 100px [content] 1fr'
 *
 * const combinedTemplate = gridTemplate({
 *   type: 'combined',
 *   areas: ['a a a', 'b b b'],
 *   rows: ['20%', 'auto'],
 *   columns: ['auto', '1fr', 'auto'],
 *   lineNames: { rows: ['header', 'content'], columns: ['left', 'center', 'right'] },
 * });
 * // Output: '"a a a" [header] 20% [content] auto / [left] auto [center] 1fr [right] auto'
 */
export function gridTemplate<TLength extends string | number>({
  type,
  areas,
  rows,
  columns,
  lineNames,
}: {
  type: 'areas' | 'rows' | 'columns' | 'combined';
  areas?: string[];
  rows?: (TLength | GridTrackSize<TLength>)[];
  columns?: (TLength | GridTrackSize<TLength>)[];
  lineNames?: {
    rows?: string[];
    columns?: string[];
  };
}): string {
  const generateLineNames = (lines: string[], type: 'rows' | 'columns') =>
    lines.map((name, index) => `[${name}] ${type === 'rows' ? rows?.[index] : columns?.[index]}`).join(' ');

  const generateAreaNames = (areas: string[]) => `"${areas.join('" "')}"`;

  switch (type) {
    case 'areas':
      return generateAreaNames(areas!);
    case 'rows':
      return `${lineNames?.rows ? generateLineNames(lineNames.rows, 'rows') : rows?.join(' ')}`;
    case 'columns':
      return `${lineNames?.columns ? generateLineNames(lineNames.columns, 'columns') : columns?.join(' ')}`;
    case 'combined':
      const areasTemplate = areas ? generateAreaNames(areas) : '';
      const rowsTemplate = rows
        ? `${lineNames?.rows ? generateLineNames(lineNames.rows, 'rows') : rows.join(' ')}`
        : '';
      const columnsTemplate = columns
        ? `/ ${lineNames?.columns ? generateLineNames(lineNames.columns, 'columns') : columns.join(' ')}`
        : '';
      return `${areasTemplate} ${rowsTemplate}${columnsTemplate}`.trim();
    default:
      return '';
  }
}