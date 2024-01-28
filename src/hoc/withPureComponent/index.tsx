import React, { memo, forwardRef } from 'react';
import type { ComponentType, Ref } from 'react';
import { setDisplayName, wrapDisplayName } from '../utils';
import { shallowEqual } from '~/lib/object';

/**
 * Enhances a base component to optimize rendering performance by implementing a shallow equality check on props.
 * @param {React.ComponentType} Component The base component to enhance.
 * @returns {React.ComponentType} The enhanced component.
 *
 * @example
 * //* Usage with functional component
 * const MyComponent = ({ name }) => (
 *   <div>{name}</div>
 * );
 *
 * const PureMyComponent = withPureComponent(MyComponent);
 */
export function withPureComponent<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  const MemoizedComponent = memo(
    forwardRef<HTMLElement, P>((props, ref) => <Component {...props} ref={ref as Ref<HTMLElement>} />),
    shallowEqual
  ) as unknown as ComponentType<P>;

  // If we're not in production, set a display name for debugging purposes
  if (process.env.NODE_ENV !== 'production') {
    const displayName = wrapDisplayName(Component, 'pure');
    return setDisplayName(displayName)(MemoizedComponent as unknown as ComponentType<unknown>) as ComponentType<P>;
  }

  // Otherwise, just return the memoized component
  return MemoizedComponent;
}