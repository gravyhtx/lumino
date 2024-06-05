// Based on 'RECOMPOSE' package and converted to TypeScript
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/setStatic.js

import type { ComponentType } from 'react';

/**
 *  Sets a static property on a component
 *  @param key - The property key
 *  @param value - The property value
 *  @returns {function} - A function taking a base component and returning a component with the static property set
 *
 *  @example
 *  //* This will set the static property, 'foo', on the MyComponent component to 'bar'
 *  const MyComponentWithFoo = setStatic('foo', 'bar')(MyComponent);
*/

export function setStaticProperty<K extends string, V>(key: K, value: V) {
  return <T extends ComponentType<unknown>>(BaseComponent: T) => {
    // Extend the component with the additional static property
    type ExtendedComponent = T & { [key in K]?: V };

    // Cast the base component to the extended type
    const ExtendedComponent = BaseComponent as ExtendedComponent;

    // Use a type assertion here to assign the value
    ExtendedComponent[key] = value as ExtendedComponent[K];

    return ExtendedComponent;
  };
}
