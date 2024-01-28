// Based on 'RECOMPOSE' package and converted to TypeScript
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/wrapDisplayName.js

import type { ComponentType } from "react";
import { getDisplayName } from "./getDisplayName";

/**
 * Generates a descriptive display name for a component wrapped by a higher-order component (HOC).
 * 
 * In React, HOCs are functions that take a component and return a new component with additional
 * props, behavior, or render logic. When using developer tools, it's useful to see a clear naming 
 * convention for HOC-wrapped components to understand the component hierarchy better.
 * 
 * `wrapDisplayName` is a utility function to generate such names, making nested HOCs easier to identify.
 *
 * @param BaseComponent - The original component being wrapped by an HOC.
 * @param hocName - The name of the HOC.
 * @returns {string} - The generated display name, typically in the format "hocName(BaseComponentName)".
 *
 * @example
 * ```typescript
 * function withLogging(WrappedComponent: React.ComponentType) {
 *   return class extends React.Component {
 *     componentDidMount() {
 *       console.log(`Component ${getDisplayName(WrappedComponent)} is now mounted`);
 *     }
 *     render() {
 *       return <WrappedComponent {...this.props} />;
 *     }
 *   }
 * }
 * 
 * const MyComponentWithLogging = withLogging(MyComponent);
 * 
 * //* Using wrapDisplayName will make the display name as "withLogging(MyComponent)"
 * MyComponentWithLogging.displayName = wrapDisplayName(MyComponent, 'withLogging');
 * ```
**/

export function wrapDisplayName<P>(BaseComponent: ComponentType<P> | string, hocName: string): string {
  if (typeof BaseComponent === 'string') {
    return `${hocName}(${BaseComponent})`;
  }

  return `${hocName}(${getDisplayName(BaseComponent)})`;
}