import { pxConversionFactor } from '~/constants';
import type { StaticUnits, StaticSize, StandardSize, StandardUnits } from '~/types/Units';
import { percentToValue } from '../global';

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
 * @param {number | boolean} limitDecimalPlaces - Limit the decimal places (default: false).
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

// export function parseOpacityValuez(
//   opacity: string | number = 1,
//   limitDecimalPlaces: number | boolean = false
// ): number | string {
//   const decimalPlaces = limitDecimalPlaces === true ? 2 : limitDecimalPlaces;
//   if (String(opacity).endsWith('%')) {
//     return percentToValue(String(opacity)) as number;
//   }
//   if (Number(opacity)) {
//     const numericValue = Math.min(Math.max(parseFloat(String(opacity)), 0), 1);
//     return parseFloat(decimalPlaces ? numericValue.toFixed(3) : String(numericValue));
//   }
//   return opacity;
// }