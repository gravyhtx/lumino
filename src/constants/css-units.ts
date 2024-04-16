// ~/constants/css-units.ts
import type { StaticUnits } from "~/types/Units";

/**
 * Provides conversion factors from various CSS static units to pixels.
 * @param baseFontSize - Base font size for em/rem conversions (default is 16px).
 * @returns A record mapping static units to their conversion factors to pixels.
*/
export const pxConversionFactor = (baseFontSize = 16): Record<StaticUnits, number> => {
  return {
    cm:  37.7952755906, // 1cm = 37.7952755906px = 25.2/64in
    mm:  3.77952755906, // 1mm = 3.77952755906px = 1/10th of 1cm
    Q:   0.9448818898,  // 1Q = 0.9448818898px = 1/40th of 1cm
    in:  96,            // 1in = 96px = 2.54cm
    px:  1,             // 1px = 1px = 1/96th of 1in
    pc:  16,            // 1pc = 16px= 1/6th of 1in
    pt:  1.3333333333,  // 1pt = 1.3333333333px = 1/72nd of 1in
    em:  baseFontSize,  // 1em = font size of parent element
    rem: baseFontSize   // 1rem = font size of root element
  }
};