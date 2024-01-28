// Based on 'RECOMPOSE' package and converted to TypeScript
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/getDisplayName.js

import { ComponentType } from "react";

/**
 *  Gets the display name of a component
 *  @param Component - The component whose name is to be retrieved
 *  @returns {string | undefined} - The display name of the component
 *
 *  @example
 *  //* For a component defined as `class MyComponent extends React.Component {...}`, this will return 'MyComponent'
 *  const name = getDisplayName(MyComponent);
*/

export function getDisplayName<P>(Component: ComponentType<P> | string): string {
  if (typeof Component === 'string') {
    return Component;
  }

  return Component.displayName ?? Component.name ?? 'Component';
}