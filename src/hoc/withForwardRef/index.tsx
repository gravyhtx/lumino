import React, { forwardRef, ReactNode } from 'react';

/**
 * HOC that creates a forward ref component wrapper for a given React component.
 * @param ReactComponent - The React component to wrap.
 * @param displayName - The display name of the forward ref component.
 * @returns The forward ref component.
 * @example
 * const MyComponent = withForwardRef(SomeComponent);
 * <MyComponent ref={myRef} />
 */

export function withForwardRef<T, ElementType>(
  ReactComponent: React.ComponentType<T & { forwardedRef?: React.Ref<ElementType> }>,
  displayName?: string
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T & { children?: ReactNode }> & React.RefAttributes<ElementType>
> {
  const forwardRefComponent = forwardRef<ElementType, T & { children?: ReactNode }>((props, ref) => {
    return <ReactComponent {...props} forwardedRef={ref} />;
  });

  if (displayName && displayName !== '') {
    forwardRefComponent.displayName = displayName;
  }

  return forwardRefComponent;
}
