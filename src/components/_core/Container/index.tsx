import React, { forwardRef, memo } from 'react';
import type { ReactNode, CSSProperties, MutableRefObject } from 'react';
import Logo from '~/components/_elements/Logo';
import type { BasicCSSUnits } from '~/types/Units';

/**
 * Container component for general use.
 *
 * This component is a simple wrapper around a div element, providing an easy way
 * to apply styles, classes, and other attributes to a container element.
 *
 * @param {ContainerProps} props The properties of the component.
 * @param {React.MutableRefObject<HTMLDivElement>} ref Ref object for the component.
 * @returns {React.ReactElement} A div element with given props and children.
 */

type SizeValue = 'fullscreen' | 'fill' | `${number}${BasicCSSUnits}`;

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: SizeValue | [SizeValue?, SizeValue?];
  style?: CSSProperties;
  memoize?: boolean;
}

const ContainerComponent = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, size, style, ...props }, ref) => {
    const getSizingStyle = (sizing: SizeValue | undefined) => {
      switch (sizing) {
        case 'fullscreen':
          return { width: '100vw', height: '100vh' };
        case 'fill':
          return { width: '100%', height: '100%' };
        default:
          return {}; // Custom size or default
      }
    };

    const widthStyle = Array.isArray(size) ? getSizingStyle(size[0]) : getSizingStyle(size);
    const heightStyle = Array.isArray(size) && size[1] ? getSizingStyle(size[1]) : widthStyle;
    
    const containerStyle = { ...style, ...widthStyle, ...heightStyle };

    return (
      <div ref={ref as MutableRefObject<HTMLDivElement>} className={className} style={containerStyle} {...props}>
        {children}
      </div>
    );
  }
);

/**
 * Enhanced Container component with optional memoization.
 *
 * The `memoize` prop determines whether the component should use React.memo.
 * 
 * - Use `memoize={true}` when:
 *   - The component has a stable set of props that don't change often.
 *   - The component is relatively expensive to render.
 *   - The component frequently re-renders due to parent component re-renders.
 *
 * - Avoid `memoize={true}` when:
 *   - The props change frequently.
 *   - The component is simple and inexpensive to render.
 *   - You rely on frequent re-renders for functionality (e.g., animations).
 *
 * @example
 * //* Good use case for memoization
 * <Container memoize={true} style={{ padding: '1rem' }}>
 *   <ComplexChart data={stableData} />
 * </Container>
 *
 * @example
 * //* Bad use case for memoization (props change often)
 * <Container memoize={true} style={{ padding: variablePadding }}>
 *   <SimpleMessage message={frequentlyUpdatedMessage} />
 * </Container>
 *
 * @param {ContainerProps} props - The properties of the component.
 * @returns {React.ReactElement} A (possibly memoized) Container component.
 */
export const Container: React.FC<ContainerProps> = ({ memoize = false, ...props }) => {
  return memoize ? memo(ContainerComponent)(props) : <ContainerComponent {...props} />;
};

// Usage Example:
// <Container memoize={true} className="my-class" style={{ padding: '1rem' }}>
//   Your content here
// </Container>
