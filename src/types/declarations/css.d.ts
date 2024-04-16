//  ~/types/declarations/css.d.ts
// https://use-form.netlify.app/modules/_node_modules_csstype_index_d_.html#fontfacefontstyleproperty
import type { AllColorStrings } from "../Color";
import type { AbsoluteSize } from "../Units";

export type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset";
export type HtmlAttributes = "[-webkit-dropzone]" | "[-webkit-slot]" | "[abbr]" | "[accept-charset]" | "[accept]" | "[accesskey]" | "[action]" | "[align]" | "[alink]" | "[allow]" | "[allowfullscreen]" | "[allowpaymentrequest]" | "[alt]" | "[archive]" | "[async]" | "[autobuffer]" | "[autocapitalize]" | "[autocomplete]" | "[autofocus]" | "[autoplay]" | "[axis]" | "[background]" | "[behavior]" | "[bgcolor]" | "[border]" | "[bottommargin]" | "[buffered]" | "[cellpadding]" | "[cellspacing]" | "[char]" | "[charoff]" | "[charset]" | "[checked]" | "[cite]" | "[class]" | "[classid]" | "[clear]" | "[code]" | "[codebase]" | "[codetype]" | "[color]" | "[cols]" | "[colspan]" | "[command]" | "[compact]" | "[content]" | "[contenteditable]" | "[contextmenu]" | "[controls]" | "[coords]" | "[crossorigin]" | "[data]" | "[datafld]" | "[datasrc]" | "[datetime]" | "[declare]" | "[decoding]" | "[default]" | "[defer]" | "[dir]" | "[direction]" | "[disabled]" | "[download]" | "[draggable]" | "[dropzone]" | "[enctype]" | "[exportparts]" | "[face]" | "[for]" | "[form]" | "[formaction]" | "[formenctype]" | "[formmethod]" | "[formnovalidate]" | "[formtarget]" | "[frame]" | "[frameborder]" | "[headers]" | "[height]" | "[hidden]" | "[high]" | "[href]" | "[hreflang]" | "[hspace]" | "[http-equiv]" | "[icon]" | "[id]" | "[inputmode]" | "[integrity]" | "[intrinsicsize]" | "[is]" | "[ismap]" | "[itemid]" | "[itemprop]" | "[itemref]" | "[itemscope]" | "[itemtype]" | "[kind]" | "[label]" | "[lang]" | "[language]" | "[leftmargin]" | "[link]" | "[longdesc]" | "[loop]" | "[low]" | "[manifest]" | "[marginheight]" | "[marginwidth]" | "[max]" | "[maxlength]" | "[mayscript]" | "[media]" | "[method]" | "[methods]" | "[min]" | "[minlength]" | "[moz-opaque]" | "[mozallowfullscreen]" | "[mozbrowser]" | "[mozcurrentsampleoffset]" | "[msallowfullscreen]" | "[multiple]" | "[muted]" | "[name]" | "[nohref]" | "[nomodule]" | "[noresize]" | "[noshade]" | "[novalidate]" | "[nowrap]" | "[object]" | "[onafterprint]" | "[onbeforeprint]" | "[onbeforeunload]" | "[onblur]" | "[onerror]" | "[onfocus]" | "[onhashchange]" | "[onlanguagechange]" | "[onload]" | "[onmessage]" | "[onoffline]" | "[ononline]" | "[onpopstate]" | "[onredo]" | "[onresize]" | "[onstorage]" | "[onundo]" | "[onunload]" | "[open]" | "[optimum]" | "[part]" | "[ping]" | "[placeholder]" | "[played]" | "[poster]" | "[prefetch]" | "[preload]" | "[profile]" | "[prompt]" | "[radiogroup]" | "[readonly]" | "[referrerPolicy]" | "[referrerpolicy]" | "[rel]" | "[required]" | "[rev]" | "[reversed]" | "[rightmargin]" | "[rows]" | "[rowspan]" | "[rules]" | "[sandbox-allow-modals]" | "[sandbox-allow-popups-to-escape-sandbox]" | "[sandbox-allow-popups]" | "[sandbox-allow-presentation]" | "[sandbox-allow-storage-access-by-user-activation]" | "[sandbox-allow-top-navigation-by-user-activation]" | "[sandbox]" | "[scope]" | "[scoped]" | "[scrollamount]" | "[scrolldelay]" | "[scrolling]" | "[selected]" | "[shape]" | "[size]" | "[sizes]" | "[slot]" | "[span]" | "[spellcheck]" | "[src]" | "[srcdoc]" | "[srclang]" | "[srcset]" | "[standby]" | "[start]" | "[style]" | "[summary]" | "[tabindex]" | "[target]" | "[text]" | "[title]" | "[topmargin]" | "[translate]" | "[truespeed]" | "[type]" | "[typemustmatch]" | "[usemap]" | "[valign]" | "[value]" | "[valuetype]" | "[version]" | "[vlink]" | "[volume]" | "[vspace]" | "[webkitallowfullscreen]" | "[width]" | "[wrap]" | "[xmlns]";
export type AtRules = "@charset" | "@counter-style" | "@document" | "@font-face" | "@font-feature-values" | "@import" | "@keyframes" | "@media" | "@namespace" | "@page" | "@supports" | "@viewport"

export type Box = "border-box" | "content-box" | "padding-box";

// Fonts
export type EastAsianVariantValues = "jis04" | "jis78" | "jis83" | "jis90" | "simplified" | "traditional";
export type FontFaceFontVariantProperty = EastAsianVariantValues | "all-petite-caps" | "all-small-caps" | "common-ligatures" | "contextual" | "diagonal-fractions" | "discretionary-ligatures" | "full-width" | "historical-forms" | "historical-ligatures" | "lining-nums" | "no-common-ligatures" | "no-contextual" | "no-discretionary-ligatures" | "no-historical-ligatures" | "none" | "normal" | "oldstyle-nums" | "ordinal" | "petite-caps" | "proportional-nums" | "proportional-width" | "ruby" | "slashed-zero" | "small-caps" | "stacked-fractions" | "tabular-nums" | "titling-caps" | "unicase";
export type GenericFamily = "cursive" | "fantasy" | "monospace" | "sans-serif" | "serif";
export type FontSizeAdjustProperty = Globals | "none" | number;
export type FontSizeProperty<TLength> = Globals | AbsoluteSize | TLength | "larger" | "smaller";
export type FontVariantProperty = Globals | EastAsianVariantValues | "all-petite-caps" | "all-small-caps" | "common-ligatures" | "contextual" | "diagonal-fractions" | "discretionary-ligatures" | "full-width" | "historical-forms" | "historical-ligatures" | "lining-nums" | "no-common-ligatures" | "no-contextual" | "no-discretionary-ligatures" | "no-historical-ligatures" | "none" | "normal" | "oldstyle-nums" | "ordinal" | "petite-caps" | "proportional-nums" | "proportional-width" | "ruby" | "slashed-zero" | "small-caps" | "stacked-fractions" | "tabular-nums" | "titling-caps" | "unicase";
export type FontWeightAbsolute = "bold" | "normal" | number;
export type FontWeightProperty = Globals | FontWeightAbsolute | "bolder" | "lighter";
export type FontFamilyProperty = Globals | GenericFamily;
export type FontProperty = Globals | "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar";

// Animation / Timing
export type CubicBezierTimingFunction = "ease" | "ease-in" | "ease-in-out" | "ease-out";
export type StepTimingFunction = "step-end" | "step-start";
export type TimingFunction = CubicBezierTimingFunction | StepTimingFunction | "linear";
export type SingleAnimationDirection = "alternate" | "alternate-reverse" | "normal" | "reverse";
export type SingleAnimationFillMode = "backwards" | "both" | "forwards" | "none";
export type SingleAnimation = TimingFunction | SingleAnimationDirection | SingleAnimationFillMode | "infinite" | "none" | "paused" | "running" | number;

export type AnimationProperty = Globals | SingleAnimation;

// CSS Color Properties
export type ColorProperty = Globals | AllColorStrings;
export type BackgroundColorProperty = Globals | AllColorStrings;

// Background Properties
export type BackgroundImageProperty = Globals | "none";


// Sizing
export type WidthProperty<TLength> = Globals | TLength | "-moz-fit-content" | "-moz-max-content" | "-moz-min-content" | "-webkit-fill-available" | "-webkit-fit-content" | "-webkit-max-content" | "auto" | "available" | "fit-content" | "intrinsic" | "max-content" | "min-content" | "min-intrinsic";
export type HeightProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "-webkit-fit-content" | "auto" | "available" | "fit-content" | "max-content" | "min-content";


// https://github.com/Karibash/pixel-units/blob/main/src/defs.ts
const AbsoluteLengthUnitSuffix = {
  Pixel: 'px',
  Centimeter: 'cm',
  Millimeter: 'mm',
  Quarter: 'Q',
  Inch: 'in',
  Pica: 'pc',
  Point: 'pt',
} as const;
export type AbsoluteLengthUnitSuffix = typeof AbsoluteLengthUnitSuffix[keyof typeof AbsoluteLengthUnitSuffix];

const RelativeLengthUnitSuffix = {
  REM: 'rem',
  EM: 'em',
  ViewWidth: 'vw',
  ViewHeight: 'vh',
  ViewMin: 'vmin',
  ViewMax: 'vmax',
} as const;
export type RelativeLengthUnitSuffix = typeof RelativeLengthUnitSuffix[keyof typeof RelativeLengthUnitSuffix];

const DynamicLengthUnitSuffix = {
  DVHeight: 'dvh',
  DVWidth: 'dvw',
  DVMin: 'dvmin',
  DVMax: 'dvmax',
} as const;
export type DynamicLengthUnitSuffix = typeof DynamicLengthUnitSuffix[keyof typeof DynamicLengthUnitSuffix];

const MultiplicationUnitSuffix = {
  Percent: '%',
  Magnification: '',
} as const;
export type MultiplicationUnitSuffix = typeof MultiplicationUnitSuffix[keyof typeof MultiplicationUnitSuffix];

const LengthUnitSuffix = {
  ...AbsoluteLengthUnitSuffix,
  ...RelativeLengthUnitSuffix,
};
export type LengthUnitSuffix = typeof LengthUnitSuffix[keyof typeof LengthUnitSuffix];

export const UnitSuffix = {
  ...LengthUnitSuffix,
  ...MultiplicationUnitSuffix,
};
export type UnitSuffix = typeof UnitSuffix[keyof typeof UnitSuffix];

export type Unit<Suffix extends UnitSuffix> = `${number}${Suffix}`;

export type ConvertLengthUnitArgsOptions = {
  rem?: Element | Unit<'px'>;
  em?: Element | Unit<'px'>;
  viewWidth?: Unit<'px'>;
  viewHeight?: Unit<'px'>;
};

// Breakpoints
export type Breakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Grid + Flex Layout
export type GridTemplateEntry = number | string | [number, string][];
export type GridAutoFlow = 'row' | 'col' | 'row-dense' | 'col-dense';
export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap';
export type JustifyAlignPlacement =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch'
  | 'baseline';

// Grid Properties
export type GridAutoColumnsProperty<TLength> = Globals | TLength | 'min-content' | 'max-content' | 'auto' | 'fit-content';
export type GridAutoRowsProperty<TLength> = Globals | TLength | 'min-content' | 'max-content' | 'auto' | 'fit-content';
export type GridAutoFlowProperty = Globals | 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense';
export type GridTemplateColumnsProperty<TLength> = Globals | 'none' | 'subgrid' | GridTrackSize<TLength>[] | `repeat(${number}, ${GridTrackSize<TLength>})`;
export type GridTemplateRowsProperty<TLength> = Globals | 'none' | 'subgrid' | GridTrackSize<TLength>[] | `repeat(${number}, ${GridTrackSize<TLength>})`;
export type GridTrackSize<TLength> =
  | TLength
  | 'min-content'
  | 'max-content'
  | 'auto'
  | 'fit-content'
  | '1fr';

// Flex Properties
export type FlexBasisProperty<TLength> = Globals | TLength | "-moz-max-content" | "-moz-min-content" | "-webkit-auto" | "auto" | "available" | "content" | "fit-content" | "max-content" | "min-content";
export type FlexDirectionProperty = Globals | "column" | "column-reverse" | "row" | "row-reverse";
export type FlexFlowProperty = Globals | "column" | "column-reverse" | "nowrap" | "row" | "row-reverse" | "wrap" | "wrap-reverse";
export type FlexProperty<TLength> = Globals | TLength | "auto" | "available" | "content" | "fit-content" | "max-content" | "min-content" | "none" | number;
export type FlexWrapProperty = Globals | "nowrap" | "wrap" | "wrap-reverse";