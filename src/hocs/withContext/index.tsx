// Based on 'RECOMPOSE' package and converted to TypeScript
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/withContext.js

import { Component } from 'react';
import type { ComponentType, ValidationMap } from 'react';
import { getDisplayName, wrapDisplayName } from '../utils';

/**
 * Provides a higher-order component for adding context to a React component.
 *
 * This HOC allows you to define a context for a component and provide it to all its children.
 * This is particularly useful for passing data deeply through the component tree without manually
 * passing props at every level.
 *
 * @param {ValidationMap<unknown>} childContextTypes - An object specifying the types of context properties.
 * @param {(props: P) => object} getChildContext - A function that returns the context values based on component props.
 * @returns A higher-order component that passes the specified context to its children.
 *
 * @example
 * //* Context type definitions
 * const contextTypes = {
 *   theme: PropTypes.string,
 *   toggleTheme: PropTypes.func
 * };
 *
 * //* Function to get context values
 * const getContext = (props) => ({
 *   theme: props.theme,
 *   toggleTheme: props.toggleTheme
 * });
 *
 * //* Wrapping a component with context
 * const MyComponentWithContext = withContext(contextTypes, getContext)(MyComponent);
 *
 * //* Using the wrapped component
 * <MyComponentWithContext theme="dark" toggleTheme={toggleThemeFunction} />
 *
 * //* Inside MyComponent, the context is accessible via this.context
 * class MyComponent extends React.Component {
 *   render() {
 *     const { theme, toggleTheme } = this.context;
 *     return (
 *       // Component rendering logic using theme and toggleTheme
 *     );
 *   }
 * }
 */
const withContext = <P extends object>(
  childContextTypes: ValidationMap<unknown>,
  getChildContext: (props: P) => unknown
): ((BaseComponent: ComponentType<P>) => ComponentType<P>) => {
  return (BaseComponent: ComponentType<P>) => {
    class WithContext extends Component<P> {
      static childContextTypes = childContextTypes;
      static displayName?: string;

      getChildContext(): unknown {
        return getChildContext(this.props);
      }

      render() {
        return <BaseComponent {...this.props} />;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      WithContext.displayName = wrapDisplayName(getDisplayName(BaseComponent), 'withContext');
    }

    return WithContext;
  };
};

export default withContext;