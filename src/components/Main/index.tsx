import React from 'react';
import type { ReactNode } from 'react';
import { classnames } from '~/utils/global';
import styles from './main.module.css';

interface MainProps {
  children: ReactNode;
  className?: string;
  center?: boolean;
}

/**
 * Main content area component.
 * @param {MainProps} props - Props for the Main component.
 * @returns {React.ReactElement} The Main component.
 */
const Main: React.FC<MainProps> = ({ children, className, center }) => {
  const styleCenter = center ? styles.center : '';
  return (
    <main className={classnames(styles.container, styleCenter, className)}>
      {children}
    </main>
  );
};

export default Main;
