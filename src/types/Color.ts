// import { Character, Letter, Number } from "./Characters";
// import { Globals } from "./declarations/css";
import type { CSS_COLOR_NAMES } from '~/constants/css-color-names';

// HSL + HSLA  Colors
export type HSLValues = [h: number, s: number, l: number] | {h: number, s: number, l: number};
export type HSLString = `hsl(${number}, ${number}%, ${number}%)` | `hsl(${number}deg, ${number}%, ${number}%)`;
export type HSL = HSLString | HSLValues;
export type HSLAValues = [h: number, s: number, l: number, a: number] | {h: number, s: number, l: number, a: number};
export type HSLAString = `hsla(${number}, ${number}%, ${number}%, ${number})` | `hsla(${number}deg, ${number}%, ${number}%, ${number})`
export type HSLA = HSLAString | HSLAValues;
export type AnyHSL = HSL | HSLA;

// RGB + RGBA Colors
export type RGBValues = [r: number, g: number, b: number] | {r: number, g: number, b: number};
export type RGBString = `rgb(${number}, ${number}, ${number})`;
export type RGBAValues = [r: number, g: number, b: number, a: number] | {r: number, g: number, b: number, a: number};
export type RGBAString = `rgba(${number}, ${number}, ${number}, ${number})`;
export type RGB = RGBString | RGBValues;
export type RGBA = RGBAString | RGBAValues;
export type AnyRGB = RGB | RGBA;

// HEX Colors
export type HexNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type HexLetter = 'A' | 'a' | 'B' | 'b' | 'C' | 'c' | 'D' | 'd' | 'E' | 'e' | 'F' | 'f';
export type HexChar = HexLetter | HexNumber;
export type HexShortString = `#${string | number}${string | number}${string | number}`;
export type HexShortStringExact = `#${HexChar}${HexChar}${HexChar}`;
export type HexAlphaShortString = `${HexShortString}${string | number}`;
export type HexLongString = `${HexShortString}${string | number}${string | number}${string | number}`;
export type HexAlphaLongString = `${HexLongString}${string | number}${string | number}`;
export type HexString = HexShortString | HexAlphaShortString | HexLongString | HexAlphaLongString;


// CSS Color Groups
export type NamedColor = typeof CSS_COLOR_NAMES.names[number];
export type DeprecatedSystemColor = "ActiveBorder" | "ActiveCaption" | "AppWorkspace" | "Background" | "ButtonFace" | "ButtonHighlight" | "ButtonShadow" | "ButtonText" | "CaptionText" | "GrayText" | "Highlight" | "HighlightText" | "InactiveBorder" | "InactiveCaption" | "InactiveCaptionText" | "InfoBackground" | "InfoText" | "Menu" | "MenuText" | "Scrollbar" | "ThreeDDarkShadow" | "ThreeDFace" | "ThreeDHighlight" | "ThreeDLightShadow" | "ThreeDShadow" | "Window" | "WindowFrame" | "WindowText"
export type CSS3SystemColor = 
| "Canvas"
| "CanvasText"
| "LinkText"
| "VisitedText"
| "ActiveText"
| "ButtonFace"
| "ButtonText"
| "ButtonBorder"
| "Field"
| "FieldText"
| "Highlight"
| "HighlightText"
| "Mark"
| "MarkText"
| "GrayText";
export type SystemColor = DeprecatedSystemColor | CSS3SystemColor;

export type AnyColor = AnyHSL | AnyRGB | HexString;
export type AnyColorString = HSLString | HSLAString | RGBString | RGBAString | HexString;

// CSS Color Strings
export type ColorString = NamedColor | "currentcolor" | AnyColorString;
export type AllColorStrings =
  NamedColor        | // Color names
  CSS3SystemColor   | // CSS3 System Colors
  HexString         | // Hexadecimal
  RGBString         | // RGB functional
  RGBAString        | // RGBA functional
  HSLString         | // HSL functional
  HSLAString        | // HSLA functional
  `cmyk(${string})` | // CMYK functional - not standard in CSS
  `lab(${string})`  | // LAB functional - not standard in CSS
  `lch(${string})`  | // LCH functional - not standard in CSS
  `oklab(${string})`| // OKLAB functional - not standard in CSS
  `oklch(${string})`| // OKLCH functional - not standard in CSS
  'currentcolor';     // CSS3 currentcolor

// CSS Color Spaces
export type ColorSpaceNames = 'sRGB' | 'display-p3'	| 'a98-rgb' | 'prophoto-rgb' | 'rec2020'
export type ColorSpace = `color(${ColorSpaceNames} ${number} ${number} ${number} / ${number})` | `color(${ColorSpaceNames} ${number} ${number} ${number})`;

// OKLCH Colors
export type OKLCHValues =
  | [l: number, c: number, h: number]
  | {l: number, c: number, h: number}
  | [l: number, c: number, h: number, a: number]
  | {l: number, c: number, h: number, a: number};
export type OKLCHString = `oklch(${number}, ${number}%, ${number})` | `oklch(${number}, ${number}%, ${number} / ${number})`;

// LAB Colors
export type LABValues =
  | [l: number, a: number, b: number]
  | { l: number, a: number, b: number }
  | [l: number, a: number, b: number, alpha: number]
  | { l: number, a: number, b: number, alpha: number };
export type LABString = `lab(${number}% ${number} ${number})` | `lab(${number}% ${number} ${number} / ${number})`;

// CSS Variables
export type CSSVariable = `var(--${string})`;

// GSS Gradients
export type LinearGradient = `linear-gradient(${string})`;
export type RadialGradient = `radial-gradient(${string})`;


// Blend Modes
export type BlendModes =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';