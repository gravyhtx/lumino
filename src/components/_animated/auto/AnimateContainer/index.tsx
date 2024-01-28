import React from 'react';
import type { HTMLAttributes } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props = {
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>; // Add HTMLAttributes type

const AnimateContainer = ({ children, ...props }: Props) => {
  const [animationParent] = useAutoAnimate();
  return (
    <div ref={animationParent} {...props}>
      {children}
    </div>
  );
};

export default AnimateContainer;
