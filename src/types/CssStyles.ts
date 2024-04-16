// ~/types/CssStyles.ts
import type { ColorString } from "./Color";
import type { BorderSize } from "./Units";


// CSS Values //
export type BorderStyles = 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
export type BorderCSS = `${BorderSize} ${BorderStyles} ${ColorString}`;
export type OpacityValue = 
| 0
| 1
| '0'
| `${0 | 1 | ''}.${number}`
| '1'
| `${number}%`
| 'inherit'
| 'initial'
| 'unset'
| 'revert';