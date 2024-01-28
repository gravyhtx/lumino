import React, { forwardRef } from 'react';
import * as FeatherIcon from 'react-feather';
import { LucideProps, icons as LucideIcons } from 'lucide-react';
import { classnames } from "~/utils/global";
import styles from './icon.module.css';

/**
 * Icon component that can dynamically use icons from Feather or Lucide libraries.
 *
 * @component
 * @param {IconProps} props - The props for the icon component.
 * @param {IconName} [props.name='HelpCircle'] - The name of the icon.
 * @param {'feather' | 'lucide' | 'auto'} [props.library='auto'] - The icon library to use.
 * @param {number} [props.size=24] - The size of the icon.
 * @param {string} [props.color='currentColor'] - The color of the icon.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {CSSProperties} [props.style] - Inline styles for the icon.
 * @param {Object} [props.error] - Error handling properties.
 * @param {FeatherIconNames} [props.error.icon] - Fallback icon in case of an error.
 * @param {string | boolean} [props.error.color] - Color for the error icon. Defaults to 'red'.
 * @param {ErrorStyleProps | boolean} [props.error.style] - Custom styling for error state.
 * @returns {React.ReactElement} The rendered icon element.
 */


// Creating a union type for all icon names from both libraries
type FeatherIconNames = keyof typeof FeatherIcon;
type LucideIconNames = keyof typeof LucideIcons;
export type IconName = FeatherIconNames | LucideIconNames;

// Error styling type
interface ErrorStyleProps extends React.CSSProperties {
  color?: string;
}

// IconProps with error type
type IconProps = LucideProps & {
  name?: IconName;
  library?: 'feather' | 'lucide' | 'auto';
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  error?: {
    icon?: FeatherIconNames;
    color?: string | boolean;
    style?: ErrorStyleProps | boolean;
  };
};

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({
    name = 'HelpCircle',
    library = 'auto',
    size = 24,
    color = 'currentColor',
    className,
    error,
    style,
    ...rest
  }, ref) => {

    const iconClass = classnames(styles.icon, className);

    const errorMessage = library === 'auto'
      ? `Icon "${name}" not found in Feather or Lucide icon libraries`
      : `Icon "${name}" not found in ${library} library`;
    const errorColor = error?.color && error.color !== true ? error?.color : error?.color === false ? 'currentColor' : 'red';

    const errorStyles = error?.style === true
      ? { color: errorColor, border: '2px solid red' }
      : error?.style ? { color: errorColor, border: '2px solid red' }
      : {};

    let IconComponent: React.ElementType | null = null;
    let hasError = false;

    if (library === 'feather' || (library === 'auto' && name in FeatherIcon)) {
      IconComponent = FeatherIcon[name as FeatherIconNames];
    } else if (library === 'lucide' || (library === 'auto' && name in LucideIcons)) {
      IconComponent = LucideIcons[name as LucideIconNames];
    } else {
      console.error(errorMessage);
      hasError = true;
      IconComponent = FeatherIcon[error?.icon ?? 'XCircle' as FeatherIconNames]; // Default error icon
    }

    const containerStyle = hasError && error?.style ? { ...style, ...errorStyles } : style;

    return (
      <span ref={ref} className={iconClass} style={containerStyle}>
        {React.createElement(IconComponent ?? FeatherIcon.XCircle, { size, color, style, ...rest })}
      </span>
    );
  }
);

export default React.memo(Icon);
