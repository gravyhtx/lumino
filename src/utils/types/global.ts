/**
 * A callback function that is invoked with a reference to an element or null.
 *
 * This type is commonly used when dealing with refs in React. It allows you to
 * perform operations on the referenced element or clean up any associated resources.
 *
 * @template T - The type of the element to which the ref refers.
 * @param {T | null} node - The referenced element or null if the element has been unmounted.
 *
 * @example
 * // Using a ref callback with a class component
 * class MyComponent extends React.Component {
 *   private myRef: RefCallback<HTMLDivElement> = (node) => {
 *     if (node) {
 *       // Do something with the node
 *       node.focus();
 *     } else {
 *       // Clean up resources
 *     }
 *   };
 *
 *   render() {
 *     return <div ref={this.myRef}>...</div>;
 *   }
 * }
 *
 * @example
 * // Using a ref callback with a functional component
 * const MyComponent = () => {
 *   const myRef: RefCallback<HTMLDivElement> = useCallback((node) => {
 *     if (node) {
 *       // Do something with the node
 *       node.focus();
 *     } else {
 *       // Clean up resources
 *     }
 *   }, []);
 *
 *   return <div ref={myRef}>...</div>;
 * };
 */
export type RefCallback<T extends HTMLElement> = (node: T | null) => void;


/**
 * Type definition for the configuration prop from the `titlecase` function, which allows you to
 * customize the function's behavior by specifying preferences, exceptions, and other options.
 * 
 * @property {string} [preference] - The style preference for title casing.
 * @property {boolean} [ignoreCapitalized] - Whether to ignore words that are already capitalized.
 * @property {string[]} [exceptions] - A list of words that should not be title cased.
 * @property {3 | 4 | false} [prepositionCase] - The case style for prepositions.
 * @property {string[]} [exactCases] - A list of words that should be title cased exactly as provided.
 * @property {Record<string, number[]>} [instanceExceptions] - A map of words and their indices that should not be title cased.
 * 
 * @example
 * const config: TitlecaseConfig = { 
 *   preference: 'APA',
 *   ignoreCapitalized: true,
 *   exceptions: ['API', 'URL', 'HTML'],
 *   prepositionCase: 4,
 *   exactCases: ['JavaScript', 'TypeScript'],
 *   instanceExceptions: { 'NASA': [0] }
 * };
 * 
 * const title = titlecase('the quick brown fox', config);
 * console.log(title); // Outputs: 'The Quick Brown Fox'
 */
export type TitlecaseConfig = {
  preference?: 'AMA' | 'AP' | 'APA' | 'NYT' | 'CMOS' | 'MLA' | 'Wikipedia' | 'Bluebook';
  ignoreCapitalized?: boolean;
  exceptions?: string[];
  prepositionCase?: 3 | 4 | false;
  exactCases?: string[];
  instanceExceptions?: Record<string, number[]>;
};