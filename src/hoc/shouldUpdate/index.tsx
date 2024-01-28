// // Taken from 'RECOMPOSE' package and converted to TypeScript
// // https://github.com/acdlite/recompose/blob/master/src/packages/recompose/shouldUpdate.js

// import React, { Component } from 'react';
// import type { ComponentClass, ReactElement } from 'react';
// import { setDisplayName, wrapDisplayName } from '../utils';


// type UpdateFunction<Props> = (currentProps: Props, nextProps: Props) => boolean;

// /**
//  * HOC that conditionally re-renders the component based on a custom conditional function.
//  *
//  * @param {function} condition - The condition function that determines whether the component should update.
//  * @returns {function} - The higher-order component.
//  *
//  * @example
//  ** // Usage with a simple component that updates only when the prop `name` changes
//  * function MyComponent({ name }: { name: string }) {
//  *   return <div>Hello, {name}!</div>;
//  * }
//  *
//  * const ShouldUpdateMyComponent = shouldUpdate(
//  *   (currentProps, nextProps) => currentProps.name !== nextProps.name
//  * )(MyComponent);
//  * 
//  * //* To use the HOC wrapped component:
//  * <ShouldUpdateMyComponent name="Alice" />
//  * 
//  * @example
//  * //* Usage with a component that updates unless prop `loading` is the same in both current and next props
//  * function MyComponent({ loading, data }: { loading: boolean, data: string }) {
//  *   if(loading) return <div>Loading...</div>;
//  *   return <div>Data: {data}</div>;
//  * }
//  *
//  * const ShouldUpdateMyComponent = shouldUpdate(
//  *   (currentProps, nextProps) => currentProps.loading !== nextProps.loading
//  * )(MyComponent);
//  *
//  * //* To use the HOC wrapped component:
//  * <ShouldUpdateMyComponent loading={true} data="Some data" />
//  */
// export const shouldUpdate = <Props extends object>(condition: UpdateFunction<Props>) => 
//   (BaseComponent: ComponentClass<Props>) => {

//   const factory = React.createFactory(BaseComponent);

//   class ShouldUpdate extends Component<Props, {}> {
//     shouldComponentUpdate(nextProps: Props) {
//       return condition(this.props, nextProps)
//     }

//     render() {
//       return factory(this.props)
//     }
//   }

//   const WrapperComponent: React.FC<Props> = (props: Props): ReactElement | null => {
//     // The wrapper is a functional component, but inside it uses the ShouldUpdate class component
//     return <ShouldUpdate {...props} />
//   };

//   if (process.env.NODE_ENV !== 'production') {
//     return setDisplayName(wrapDisplayName(BaseComponent, 'shouldUpdate'))(WrapperComponent);
//   }
//   return WrapperComponent;
// }