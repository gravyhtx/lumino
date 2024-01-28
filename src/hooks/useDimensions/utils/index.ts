import type { AllBreakPoints, BreakType, DeviceType, ScreenType } from "../types";

export const deviceBreakpoints: { [key in DeviceType]: number } = {
  'phone': 480,
  'tablet': 768,
  'laptop': 1024,
  'desktop': 1280,
  '4k': 3840,
};

export const screenBreakpoints: { [key in ScreenType]: number } = {
  'mobile': 768,
  'computer': 1024,
  'monitor': 1920,
};

export const breakBreakpoints: { [key in BreakType]: number } = {
  'xs': 480,
  'sm': 568,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  'x2': 1920,
  'x3': 2560,
  'x4': 3840,
};

export const getDeviceType = (width: number): DeviceType => {
  if (width <= deviceBreakpoints.phone) return 'phone';
  if (width <= deviceBreakpoints.tablet) return 'tablet';
  if (width <= deviceBreakpoints.laptop) return 'laptop';
  if (width <= deviceBreakpoints.desktop) return 'desktop';
  return '4k';
};

export const getScreenType = (width: number): ScreenType => {
  if (width <= screenBreakpoints.mobile) return 'mobile';
  if (width <= screenBreakpoints.computer) return 'computer';
  return 'monitor';
};

export const getBreakType = (width: number): BreakType => {
  if (width <= breakBreakpoints.xs) return 'xs';
  if (width <= breakBreakpoints.sm) return 'sm';
  if (width <= breakBreakpoints.md) return 'md';
  if (width <= breakBreakpoints.lg) return 'lg';
  if (width <= breakBreakpoints.xl) return 'xl';
  if (width <= breakBreakpoints.x2) return 'x2';
  if (width <= breakBreakpoints.x3) return 'x3';
  return 'x4'; // Default to '4x' for larger sizes
};

export const getBreakpointValue = (bp: AllBreakPoints | number): number => {
  if (typeof bp === 'number') return bp;
  if (bp in deviceBreakpoints) return deviceBreakpoints[bp as DeviceType];
  if (bp in screenBreakpoints) return screenBreakpoints[bp as ScreenType];
  return breakBreakpoints[bp as BreakType];
};

export const checkInRange = (width: number, breakpoint: AllBreakPoints | [min: AllBreakPoints | number, max: AllBreakPoints | number]): boolean => {
  let min: number, max: number;

  if (Array.isArray(breakpoint)) {
    min = getBreakpointValue(breakpoint[0]);
    max = getBreakpointValue(breakpoint[1]);
  } else {
    min = 0;
    max = getBreakpointValue(breakpoint);
  }

  return width >= min && width <= max;
};