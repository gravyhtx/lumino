import React, { forwardRef, useRef, useEffect, ComponentType, RefAttributes, PropsWithoutRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

/**
 * Type for the configuration object of auto-animate.
 */
type AutoAnimateConfig = Parameters<typeof autoAnimate>[1];

/**
 * Type for props of the Higher-Order Component.
 */
type WithAutoAnimateProps = {
  autoAnimateConfig?: AutoAnimateConfig;
}

/**
 * HOC to add auto-animate functionality to a component.
 *
 * @param WrappedComponent - The component to be enhanced.
 * @param config - Optional configuration for auto-animate.
 * @returns Enhanced component with auto-animate functionality.
 */
function withAutoAnimate<P extends object>(
  WrappedComponent: ComponentType<P>,
  config?: AutoAnimateConfig
): React.ForwardRefExoticComponent<PropsWithoutRef<P & WithAutoAnimateProps> & RefAttributes<HTMLElement>> {
  const WithAutoAnimate = forwardRef<HTMLElement, P & WithAutoAnimateProps>((props, ref) => {
    const animationRef = useRef<HTMLElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLElement>) || animationRef;

    useEffect(() => {
      if (combinedRef.current) {
        autoAnimate(combinedRef.current, props.autoAnimateConfig ?? config);
      }
    }, [combinedRef, props.autoAnimateConfig, config]);

    // Splitting autoAnimateConfig from the rest of the props
    const { autoAnimateConfig, ...restProps } = props;

    return <WrappedComponent ref={combinedRef} {...restProps as P} />;
  });

  WithAutoAnimate.displayName = `WithAutoAnimate(${getDisplayName(WrappedComponent)})`;

  return WithAutoAnimate;
}

// Helper function to get the display name of a component
function getDisplayName<P>(WrappedComponent: ComponentType<P>) {
  return WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';
}

export default withAutoAnimate;
