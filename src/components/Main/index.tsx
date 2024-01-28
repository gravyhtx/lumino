import React from 'react';
import type { ReactNode } from 'react';
import { classnames } from '~/utils/global';
import styles from './main.module.css';

interface MainProps {
  children: ReactNode;
  className?: string;
}

/**
 * Main content area component.
 * @param {MainProps} props - Props for the Main component.
 * @returns {React.ReactElement} The Main component.
 */
const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main className={classnames(styles.container, className)}>
      {children}
    </main>
  );
};

export default Main;
