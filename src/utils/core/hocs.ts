// ~/utils/core/hocs.ts
/**
 * A higher-order component (HOC) is a function that takes a component and returns a new component with additional props.
 * This type defines the signature of a higher-order component that takes a component of type `T` and returns a new component
 * with the same props.
 * 
 * @template T - The type of the component props.
 * @param {React.ComponentType<T>} component - The component to wrap.
 * @returns {React.ComponentType<T>} - The wrapped component.
 */
export type HOC = <T extends object>(_component: React.ComponentType<T>) => React.ComponentType<T>;

// Define the compose function
/**
 * Composes multiple higher-order components into a single higher-order component.
 * This function takes any number of higher-order components and returns a new higher-order component that applies
 * each of the input components from right to left.
 * 
 * @param {...HOC[]} hocs - The higher-order components to compose.
 * @returns {HOC} - A new higher-order component that applies each of the input components.
 * 
 * @example
 * const composedHOC = compose(withProvider, withLogger, withErrorBoundary);
 * const EnhancedComponent = composedHOC(MyComponent); // Same as `withProvider(withLogger(withErrorBoundary(MyComponent)));`
 */
export function compose(...hocs: HOC[]): HOC {
  return function <T extends object>(component: React.ComponentType<T>): React.ComponentType<T> {
    return hocs.reduceRight(
      (accComponent, hoc) => hoc(accComponent),
      component
    );
  };
}