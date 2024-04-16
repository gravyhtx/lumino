import React, { forwardRef } from 'react';
import Icon from '~/components/_core/Icon';
import type { IconName } from '~/components/_core/Icon';

interface CloseButtonProps {
  iconName?: IconName;
  padding?: number | string;
  verticalOffset?: number | string;
  horizontalOffset?: number | string;
  label?: string;
}

/**
 * CloseButton component for positioning an icon at the top right of its parent container.
 * @param {CloseButtonProps} props - Props for the CloseButton component.
 * @returns {React.ReactElement} The CloseButton component.
 */
const CloseButton: React.FC<CloseButtonProps> = forwardRef<HTMLDivElement, CloseButtonProps>(({
  iconName,
  padding = 0,
  verticalOffset = 0,
  horizontalOffset = 0,
  label = 'Close',
}, ref) => {
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: typeof verticalOffset === 'number' ? `${verticalOffset}px` : verticalOffset,
    right: typeof horizontalOffset === 'number' ? `${horizontalOffset}px` : horizontalOffset,
    padding: typeof padding === 'number' ? `${padding}px` : padding,
  };

  return (
    <div aria-label={label} role='button' style={containerStyle} ref={ref}>
      <Icon name={iconName??"XCircle"} size={24} />
    </div>
  );
});

export default CloseButton;