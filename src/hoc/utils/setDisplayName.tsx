// Based on 'RECOMPOSE' package and converted to TypeScript
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/setDisplayName.js
import type { ComponentType } from 'react';
import { setStaticProperty } from '.';

/**
 *  Sets the displayName static property on a component
 *  @param displayName - The display name
 *  @returns {function} - A function taking a base component and returning a component with the displayName set
 *
 *  @example
 *  //* This will set the display name of MyComponent to 'MyFancyComponent'
 *  const MyFancyComponent = setDisplayName('MyFancyComponent')(MyComponent);
*/

export function setDisplayName<P extends JSX.IntrinsicAttributes>(displayName: string): (Component: ComponentType<P>) => ComponentType<P> {
  // return (Component: ComponentType<P>) => setStaticProperty('displayName', displayName)(Component);
  return (Component: ComponentType<P>) => {
    const WrappedComponent: ComponentType<P> = (props: P) => <Component {...props} />;
    WrappedComponent.displayName = displayName;
    return WrappedComponent;
  };
}