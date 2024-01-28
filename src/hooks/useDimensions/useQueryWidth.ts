import { useState, useEffect } from 'react';
import type { RefObject } from 'react';
import { useContainerDimensions } from './useContainerDimensions';
import { useViewportDimensions } from './useViewportDimensions';
import { getDeviceType, getScreenType, getBreakType, checkInRange } from './utils';
import type { DeviceType, ScreenType, BreakType, AllBreakPoints } from './types';

type WidthInput = RefObject<HTMLElement> | number | `${number}px`;

/**
 * Custom hook to determine responsive behavior based on element or viewport width.
 * 
 * @param widthInput Either a number representing width in pixels, a string with pixel value (e.g., '600px'), 
 * or a ref to an HTML element to determine its width.
 * @returns An object containing device type, screen type, breakpoint, in-range status, and dimensions.
 * 
 * @example
 * // Using a number for width
 * const { device, screen, inRange } = useQueryWidth(600);
 * console.log(device, screen, inRange('mobile'));
 * 
 * @example
 * // Using a ref to get width
 * const MyComponent = () => {
 *   const myRef = useRef<HTMLDivElement>(null);
 *   const { device, screen, inRange } = useQueryWidth(myRef);
 * 
 *   return (
 *     <div ref={myRef}>
 *       {inRange('mobile') ? 'Mobile View' : 'Non-Mobile View'}
 *     </div>
 *   );
 * };
 */
export function useQueryWidth(widthInput?: WidthInput) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Use only containerDimensions from useContainerDimensions
  const [, containerDimensions] = useContainerDimensions();
  const viewportDimensions = useViewportDimensions();

  useEffect(() => {
    let newWidth: number;

    if (widthInput && typeof widthInput !== 'number') {
      newWidth = containerDimensions.width;
    } else {
      newWidth = typeof widthInput === 'number' ? widthInput : viewportDimensions.width;
    }

    setDimensions({ width: newWidth, height: viewportDimensions.height });
  }, [widthInput, containerDimensions, viewportDimensions]);

  const device: DeviceType = getDeviceType(dimensions.width);
  const screen: ScreenType = getScreenType(dimensions.width);
  const breakPoint: BreakType = getBreakType(dimensions.width);
  const inRange = (breakPoint: AllBreakPoints | [AllBreakPoints | number, AllBreakPoints | number]) => checkInRange(dimensions.width, breakPoint);

  return { device, screen, break: breakPoint, inRange, ...dimensions };
}