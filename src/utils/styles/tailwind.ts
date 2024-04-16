import { cssNumber } from ".";
import { isNegative } from "../global";

/**
 * Generates a TailwindCSS margin class string based on size and sides.
 * It handles both positive and negative numbers and special cases like 'auto'.
 *
 * @param {number | 'auto'} size - The size of the margin. Can be a number, 'auto', or undefined.
 * @param {'x' | 'y' | 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'} [sides] - The side(s) where the margin is applied. Optional.
 * @returns {string} The TailwindCSS margin class string.
 *
 * @example
 * //* Returns 'mt-4'
 * marginClass(4, 'top');
 *
 * @example
 * //* Returns '-mx-2'
 * marginClass(-2, 'x');
 *
 * @example
 * //* Returns 'm-auto'
 * marginClass(); // or `marginClass('auto');`
 */
export const marginClass = (
  size?: number | 'px' | 'auto',
  sides?: 'x' | 'y' | 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end'
) => (size ?? sides) ? `${isNegative(Number(size)) ? '-' : ''}m${(sides ?? '')}-${(cssNumber(size) ?? 'auto')}` : '';