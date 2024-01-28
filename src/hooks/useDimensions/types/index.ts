export type DeviceType = 'phone' | 'tablet' | 'laptop' | 'desktop' | '4k';
export type ScreenType = 'mobile' | 'computer' | 'monitor';
export type BreakType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'x2' | 'x3' | 'x4';
export type BreakSize = {
  type: BreakType;
  min: number;
  max: number;
  inRange: boolean;
  outRange: boolean;
};
export type AllBreakPoints = DeviceType | ScreenType | BreakType;