// Taken from 'RECOMPOSE' package and converted to TypeScript
// https://github.com/acdlite/recompose/blob/master/src/packages/recompose/renderComponent.js

import React, { ComponentType, FC } from 'react';
import { wrapDisplayName } from '../../../lib/helpers/components/hoc';

/**
 * A higher-order component (HOC) that simply renders the provided component.
 * This can be useful in scenarios where you want to wrap a component without adding any
 * additional logic, perhaps for consistent naming in devtools or other similar reasons.
 * 
 * @param {React.ComponentType<Props>} Component - The component to be rendered.
 * @returns {React.FC<Props>} - The higher-order component.
 * 
 * @example
 * ```jsx
 * const SampleComponent: FC<{ message: string }> = ({ message }) => <div>{message}</div>;
 * const WrappedComponent = renderComponent(SampleComponent);
 * 
 * <WrappedComponent message="Hello from the WrappedComponent!" />
 * ```
 */
export function renderComponent<Props extends object>(Component: ComponentType<Props>): FC<Props> {
  // Define the RenderComponent which forwards all props to the Component.
  const RenderComponent: FC<Props> = (props) => <Component {...props} />;
  
  // Set a displayName for the RenderComponent for better debugging in development.
  // The `wrapDisplayName` function presumably prefixes or modifies the display name.
  if (process.env.NODE_ENV !== 'production') {
    RenderComponent.displayName = wrapDisplayName(Component.displayName || Component.name, 'renderComponent');
  }

  return RenderComponent;
};
