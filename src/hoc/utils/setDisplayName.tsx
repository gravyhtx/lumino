// Based on 'RECOMPOSE' package and converted to TypeScript
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/setDisplayName.js
import type { ComponentType } from 'react';

/**
 *  Sets the displayName static property on a component
 *  @param displayName The display name
 *  @returns {function} A function taking a base component and returning a component with the displayName set
 *
 *  @example
 *  //* This will set the display name of MyComponent to 'MyFancyComponent'
 *  const MyFancyComponent = setDisplayName('MyFancyComponent')(MyComponent);
*/

export function setDisplayName<P extends JSX.IntrinsicAttributes>(displayName: string) {
  return (Component: ComponentType<P>) => {
    const WrappedComponent = (props: P) => <Component {...props} />;
    WrappedComponent.displayName = displayName;
    
    // Type assertion to inform TypeScript about the expected return type
    return WrappedComponent as ComponentType<P>;
  };
}