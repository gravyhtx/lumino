// ~/types/Tailwind.ts
import type { FlexUnits } from "./Units";
import type { Breakpoint, FlexBasisProperty, FlexDirection, FlexWrap, GridAutoFlow, GridTemplateEntry, JustifyAlignPlacement } from "./declarations/css";

export interface TailwindLayoutProps {
  layout?: 'flex' | 'grid';
  columns?: GridTemplateEntry | Record<Breakpoint, GridTemplateEntry>;
  rows?: GridTemplateEntry | Record<Breakpoint, GridTemplateEntry>;
  template?: Record<Breakpoint, string>;
  gap?: Record<Breakpoint, number>;
  justifyContent?: JustifyAlignPlacement;
  justifyItems?: JustifyAlignPlacement;
  alignContent?: JustifyAlignPlacement;
  alignItems?: JustifyAlignPlacement;
  placeContent?: JustifyAlignPlacement;
  placeItems?: JustifyAlignPlacement;
  autoFlow?: GridAutoFlow;
  autoColumns?: string;
  autoRows?: string;
  order?: 'first' | 'last' | 'none' | 'initial' | number;
  wrap?: FlexWrap;
  direction?: FlexDirection | Record<Breakpoint, FlexDirection>;
  basis?: FlexBasisProperty<FlexUnits> | Record<Breakpoint, FlexBasisProperty<FlexUnits>>;
  grow?: number | Record<Breakpoint, number>;
  shrink?: number | Record<Breakpoint, number>;
}