import React, { ComponentType, PropsWithoutRef, memo, forwardRef, Ref } from 'react';
import { shallowEqual } from '../../../lib/helpers/data/object/shallowEqual';
import { wrapDisplayName, setDisplayName } from '../../../lib/helpers/components/hoc';

/**
 * Enhances a base component to optimize rendering performance by implementing a shallow equality check on props.
 *
 * @param {React.ComponentType} Component - The base component to enhance.
 * @returns {React.ComponentType} - The enhanced component.
 *
 * @example
 *
 * //* Usage with functional component
 *
 * const MyComponent = ({ name }) => (
 *   <div>{name}</div>
 * );
 *
 * const PureMyComponent = withPureComponent(MyComponent);
 *
 * //* Usage with class component
 *
 * class MyComponent extends React.Component {
 *   //* ...
 * }
 *
 * const PureMyComponent = withPureComponent(MyComponent);
 */
export function withPureComponent<P extends PropsWithoutRef<any>>(
  Component: ComponentType<P>
): ComponentType<P> {
  // Wrap the component with React.memo and React.forwardRef, with a custom comparison function
  const MemoizedComponent = memo(
    forwardRef((props: P, ref: Ref<any>) => <Component {...props} ref={ref} />),
    shallowEqual
  );

  // If we're not in production, set a display name for debugging purposes
  if (process.env.NODE_ENV !== 'production') {
    const displayName = wrapDisplayName(Component, 'pure');
    return setDisplayName(displayName)(MemoizedComponent) as ComponentType<P>;
  }

  // Otherwise, just return the memoized component
  return MemoizedComponent as ComponentType<P>;
}
