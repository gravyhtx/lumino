import type { HeightProperty, WidthProperty } from "./declarations/css";

// CSS Unit Classifications //
export type AbsoluteUnits = 'px' | 'cm' | 'mm' | 'Q' | 'in' | 'pt' | 'pc';
export type RelativeUnits = 'em' | 'ex' | 'ch' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' | '%';
export type DynamicUnits = 'dvw' | 'dvh' | 'dvmin' | 'dvmax';
export type StaticUnits = 'cm' | 'mm' | 'Q' | 'in' | 'px' | 'pt' | 'pc' | 'em' | 'rem';
export type ExtendedRelativeUnits = RelativeUnits | 'dvw' | 'dvh' | 'dvmin' | 'dvmax';
export type StandardViewportUnits = 'vw' | 'vh' | 'vi' | 'vb' | 'vmin' | 'vmax';
export type LargeViewportUnits = 'lvh' | 'lvw' | 'lvb' | 'lvi' | 'lvmin' | 'lvmax';
export type SmallViewportUnits = 'svh' | 'svw' | 'svb' | 'svi' | 'svmin' | 'svmax';
export type DynamicViewportUnits = DynamicUnits | 'dvb' | 'dvi';
export type StandardUnits = AbsoluteUnits | RelativeUnits | DynamicUnits;
export type ViewportUnits = StandardViewportUnits | LargeViewportUnits | SmallViewportUnits | DynamicViewportUnits;
export type ExtendedUnits = StandardUnits | ViewportUnits;
export type BasicAbsoluteUnits = 'px' | 'pt';
export type BasicStaticUnits = 'px' | 'pt' | 'em' | 'rem';
export type BasicRelativeUnits = '%' | 'vw' | 'dvw' | 'vh' | 'dvh'
export type BasicCSSUnits = BasicStaticUnits | BasicRelativeUnits;
export type ExtendedCSSUnits = AbsoluteUnits | RelativeUnits | DynamicUnits | StaticUnits | ExtendedRelativeUnits | StandardViewportUnits | LargeViewportUnits | SmallViewportUnits | DynamicViewportUnits | BasicCSSUnits;

// CSS Size Units //
export type SizeUnits = 'px' | 'em' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' | 'dvw' | 'dvh' | 'dvmin' | 'dvmax' | '%';

// Experimental CSS Size Units //
export type ExperimentalCSSUnits = 'cap' | 'ic' | 'lh' | 'rlh' | 'vi' | 'vb' | 'dvi' | 'dvb';
// export type 

export type AbsoluteSize = `${number}${AbsoluteUnits}`;
export type RelativeSize = `${number}${RelativeUnits}`;
export type DynamicSize = `${number}${DynamicUnits}`;
export type StaticSize = `${number}${StaticUnits}`;
export type ExtRelativeSize = `${number}${ExtendedRelativeUnits}`;
export type StandardViewportSize = `${number}${StandardViewportUnits}`;
export type LargeViewportSize = `${number}${LargeViewportUnits}`;
export type SmallViewportSize = `${number}${SmallViewportUnits}`;
export type DynamicViewportSize = `${number}${DynamicViewportUnits}`;
export type StandardSize = AbsoluteSize | RelativeSize | DynamicSize;
export type ViewportSize = StandardViewportSize | LargeViewportSize | SmallViewportSize | DynamicViewportSize;


// CSS Sizing Types //
export type PxSize = `${number}px`;
export type PtSize = `${number}pt`;
export type PcSize = `${number}pc`;
export type CmSize = `${number}cm`;
export type MmSize = `${number}mm`;
export type QSize = `${number}Q`;
export type InSize = `${number}in`;
export type EmSize = `${number}em`;
export type RemSize = `${number}rem`;
export type PercentSize = `${number}%`;
export type CharacterSize = `${number}ch`;
export type VwSize = `${number}vw`;
export type VhSize = `${number}vh`;
export type VmaxSize = `${number}vmax`;
export type DvwSize = `${number}dvw`;
export type DvhSize = `${number}dvh`;
export type DvminSize = `${number}dvmin`;
export type DvmaxSize = `${number}dvmax`;

// Recommended Size Units //
export type BorderSize = PxSize;
export type IconSize = EmSize;
export type MarginSize = RemSize;
export type PaddingSize = EmSize;
export type FontSize = EmSize | RemSize | PercentSize;
export type FontWeight = number;
export type RootFontSize = PxSize;
export type LineHeightSize = EmSize | RemSize | number;
export type BlurSize = PxSize;
export type LetterSpacingSize = EmSize | RemSize;
export type OpacitySize = PercentSize;
export type ShadowSize = PxSize;
export type TextIndentSize = EmSize | RemSize;
export type TextStrokeSize = PxSize;
export type TextStrokeWidth = PxSize;
export type TextStrokeOffset = PxSize;

// CSS Sizing Groups //
export type BasicSizing = PxSize | EmSize | RemSize;
export type StandardSizing = BasicSizing | PercentSize | CharacterSize;
export type ViewportSizing = VwSize | VhSize | VmaxSize | DvwSize | DvhSize | DvminSize | DvmaxSize;
export type ExtendedSizing = StandardSizing | ViewportSizing;
export type AbsoluteSizing = PxSize | PtSize | PcSize;
export type RelativeSizing = EmSize | RemSize | PercentSize | CharacterSize | ViewportSizing;
export type MetricSizing = CmSize | MmSize | QSize;
export type ImperialSizing = InSize | PtSize | PcSize;
export type MeasurementSizing = MetricSizing | ImperialSizing;
export type ScreenSizing = BasicSizing | PercentSize;
export type PrintSizing = BasicSizing | MeasurementSizing | PtSize | PcSize;
export type StaticSizing = BasicSizing | MetricSizing | ImperialSizing;

// CSS Dimensions | Width + Height //
export type CSSDimensions<TLength> =
| [WidthProperty<TLength>, HeightProperty<TLength>]
| {width: WidthProperty<TLength>, height: HeightProperty<TLength>};


//! ABSOLUTE UNITS
//? Units that are “absolute” are the same size regardless of the parent element or window size. This
//? means a property set with a value that has an absolute unit will be that size when looked at on a
//? phone or on a large monitor (and everything in between!)
//* cm	  centimeters (1cm = 96px/2.54)
//* mm	  millimeters (1mm = 1/10th of 1cm)
//* Q     quarter-millimeters (1Q = 1/40th of 1cm)
//* in	  inches (1in = 96px = 2.54cm)
//* px?   pixels (1px = 1/96th of 1in)
//* pt	  points (1pt = 1/72 of 1in)
//* pc  	picas (1pc = 1/6th of 1in = 12pt)

//? NOTE: Pixels (px) are relative to the viewing device. For low-dpi devices, 1px is one
//?       device pixel (dot) of the display. For printers and high resolution screens 1px
//?       implies multiple device pixels.

//! RELATIVE UNITS
//? Relative units are useful for styling responsive sites because they scale relative to the parent or
//? window size (depending on the unit).
//* em?	  Relative to the font-size of the element (2em means 2 times the size of the current font)	
//* ex	  Relative to the x-height of the current font (rarely used)	
//* ch	  Relative to the width of the "0" (zero)	
//* rem	  Relative to font-size of the root element	( “rem” = “root em”)
//* vw	  Relative to 1% of the width of the viewport*	
//* vh	  Relative to 1% of the height of the viewport*	
//* vmin  Relative to 1% of viewport's* smaller dimension	
//* vmax  Relative to 1% of viewport's* larger dimension	
//* %	    Relative to the parent element

//? NOTE: If you do not specify a font size, the default size for normal text, like paragraphs, is 16px (16px=1em).

//! STANDARD VIEWPORT UNITS
//* vw   1% of the width of the viewport size.
//* vh   1% of the height of the viewport size.
//* vi = 1% of the size of the viewport’s inline axis.
//* vb = 1% of the size of the viewport’s block axis.
//* vmin = the smaller of vw or vh.
//* vmax = the larger of vw or vh.

//! LARGE VIEWPORT UNITS
//* The Large Viewport is the viewport sized assuming any UA UI Elements that are dynamically expanded and
//* retracted to be retracted. It has the l-prefix, so its linked units are lvh / lvw / lvb / lvi / lvmin / lvmax.

//! SMALL VIEWPORT UNITS
//* The Small Viewport is the viewport sized assuming any UA UI Elements that are dynamically expanded and retracted
//* to be expanded. It has the s-prefix, so its linked units are svh / svw / svb / svi / svmin / svmax.

//! DYNAMIC VIEWPORT UNITS
//* The Dynamic Viewport is the viewport sized with dynamic consideration of any UA UI Elements. It will automatically
//* adjust itself in response to UA interface elements being shown or not. It has the d-prefix.
//* dvh / dvw / dvb / dvi / dvmin / dvmax