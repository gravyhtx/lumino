import { useEffect, useState, FC, ReactNode } from "react";

/***
 ** This is a Higher-Order Component (HOC) that takes a Component and adds a hook to it.
 ** This hook is then used to keep track of state within the HOC.
 *
 * @template P The type of the props for the wrapped component.
 *
 * @param {React.FC<P>} Component The React component to wrap with the HOC.
 *
 * @returns {React.FC<P & WithHookProps>} A new component that wraps the provided component,
 * while injecting a hook for state management.
 *
 * @example
 * //* An example hook function that will be used with the HOC
 * const useCounter = () => {
 *   const [count, setCount] = useState(0);
 *   const increment = () => setCount(count + 1);
 *   return { count, increment };
 * };
 * 
 * //* Component to wrap
 * const CounterComponent = ({ count, increment }) => (
 *   <div>
 *     <p>{count}</p>
 *     <button onClick={increment}>Increment</button>
 *   </div>
 * );
 * 
 * //* Using the HOC
 * const CounterWithHook = withHook(CounterComponent);
 *
 * //* Rendering the component
 * <CounterWithHook hook={useCounter} render={({ count, increment }) => <CounterComponent count={count} increment={increment} />} />
 */

interface WithHookProps<H> {
  hook: () => H;
}

function withHook<P extends object, H>(Component: FC<P & H>): FC<P & WithHookProps<H>> {
  return (props: P & WithHookProps<H>) => {
    const { hook, ...restProps } = props as WithHookProps<H>;
    const hookState = hook();

    return <Component {...restProps as P} {...hookState} />;
  };
}

export { withHook };


//! HOW TO USE 'withHook'

//? BUILDING A HIGH ORDER FUNCTION FROM A HOOK
//*  This example uses a custom hook called 'useDarkMode' and composes a new HOC
//*  called 'withDarkMode' using 'withHook'

//? CREATE (OR IMPORT) A HOOK
//*  export const useDarkMode = () => {
//*    const [isDarkMode, setIsDarkMode] = useState(false);
//*    const toggleDarkMode = () => setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
//*    return { isDarkMode, toggleDarkMode };
//*  };


//? CREATE A COMPONENT -- Import your hook ('useDarkMode') and 'withHook'
//*  import React, { useState } from "react";
//*  import { useDarkMode } from ../hooks;
//*  import { withHook } from "../lib/hoc";

//? ADD PROPS FROM YOUR HOOK
//*  interface Props {
//*    isDarkMode: boolean;
//*    toggleDarkMode: () => void;
//*  }

//*  const MyComponent: React.FC<Props> = ({ isDarkMode, toggleDarkMode }) => {
//*  return (
//*    <div>
//*      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
//*      {isDarkMode ? "Dark mode is on" : "Dark mode is off"}
//*      </div>
//*    );
//*  };

//? COMPOSE A NEW HOC FROM THE HOOK USING 'withHook'
//*  const withDarkMode = withHook(useDarkMode);
//? EXPORT THE COMPONENT WITH THE NEW HOC
//*  export default withDarkMode(MyComponent); 