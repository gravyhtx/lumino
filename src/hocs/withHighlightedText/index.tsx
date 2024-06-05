import React from 'react';

interface WithHighlightTextProps {
  searchTerm: string;
  children?: React.ReactNode;
}

/**
 * Enhances a component with text highlighting capabilities based on a search term.
 * @param WrappedComponent - The component to wrap.
 * @returns A new component with added text highlighting.
 * @example
 * ```
 * const TextComponent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
 * const HighlightedTextComponent = withHighlightText(TextComponent);
 * const App = () => (
 *   <HighlightedTextComponent searchTerm="highlight">
 *     Highlight this text where the word 'highlight' appears.
 *   </HighlightedTextComponent>
 * );
 * ```
 */
function withHighlightText<T extends object>(WrappedComponent: React.ComponentType<T>) {
  type FinalProps = Omit<T, keyof WithHighlightTextProps> & WithHighlightTextProps;

  return ({ searchTerm, ...props }: FinalProps) => {
    const highlightText = (text: string): JSX.Element[] => {
      if (!searchTerm) return [<>{text}</>];

      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return text.split(regex).map((part, index) =>
        regex.test(part)
          ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
          : <span key={index}>{part}</span>
      );
    };

    const getHighlightedContent = (children: React.ReactNode): JSX.Element[] => {
      return React.Children.map(children, child =>
        typeof child === 'string'
          ? highlightText(child)
          : child
      ) as JSX.Element[];
    };

    return (
      <WrappedComponent {...(props as T)}>
        {getHighlightedContent(props.children as React.ReactNode)}
      </WrappedComponent>
    );
  };
}

export default withHighlightText;
