import React, { type ComponentProps } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props<C extends React.ElementType> = {
  children: React.ReactNode;
  as?: C;
} & ComponentProps<C>;

const AnimateContainer = <C extends React.ElementType = 'div'>({
  children,
  as,
  ...props
}: Props<C>) => {
  const [animationParent] = useAutoAnimate();
  const Component = String(as ?? 'div');

  return (
    <Component ref={animationParent} {...(props as ComponentProps<C>)}>
      {children}
    </Component>
  );
};

export default AnimateContainer;
