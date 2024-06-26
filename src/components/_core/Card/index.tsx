import React, { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './card.module.css';
import { classnames } from '~/utils/global'
import withAutoAnimate from '~/hocs/withAutoAnimate';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  aria?: {
    label?: string;
    description?: string;
  }
  text?: {
    header?: string;
    content?: string;
    align?: 'left' | 'center' | 'right';
  }
  className?: string;
  children?: ReactNode;
};

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  aria,
  text,
  className,
  ...props
}, ref) => {
  const cardClass = classnames(styles.container, className);
  return (
    <div className={cardClass} aria-label={aria?.label ?? 'card'} aria-description={aria?.description ?? 'App Card'} ref={ref} {...props}>
      <>
        {text?.header && <h3 className={styles.header} style={{ textAlign: text.align }}>{text.header}</h3>}
        {text?.content && <p className={styles.content}>{text.content}</p>}
      </>
      {children}
    </div>
  );
});

export default withAutoAnimate(Card);