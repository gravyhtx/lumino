import { useState, useEffect } from 'react';
import { useContainerDimensions } from './useContainerDimensions';
import { useViewportDimensions } from './useViewportDimensions';
import { getDeviceType, getScreenType, getBreakType, checkInRange } from './utils';
import type { DeviceType, ScreenType, BreakType, AllBreakPoints } from './types';

export function useQueryWidth() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [containerRef, containerDimensions] = useContainerDimensions();
  const viewportDimensions = useViewportDimensions();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions(containerDimensions);
    } else {
      setDimensions(viewportDimensions);
    }
  }, [containerRef, containerDimensions, viewportDimensions]);

  const device: DeviceType = getDeviceType(dimensions.width);
  const screen: ScreenType = getScreenType(dimensions.width);
  const breakPoint: BreakType = getBreakType(dimensions.width);
  const inRange = (breakPoint: AllBreakPoints | [AllBreakPoints | number, AllBreakPoints | number]) => checkInRange(dimensions.width, breakPoint);

  return { containerRef, device, screen, break: breakPoint, inRange, ...dimensions };
}