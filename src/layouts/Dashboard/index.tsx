import React, { useState } from 'react';
import type { ReactNode } from 'react';
import Header from '~/components/Header';
import Main from '~/components/Main';
import NavMenu from '~/components/NavMenu';
import styles from './dashboard.module.css';

interface DashboardProps {
  children: ReactNode;
  name?: string;
}

/**
 * Dashboard layout with a navigational menu, header, and main content area.
 * @param {DashboardProps} props - Props for the Dashboard component.
 * @returns {React.ReactElement} - The Dashboard layout component.
 */
const Dashboard: React.FC<DashboardProps> = ({ children, name }) => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!isNavOpen);

  return (
    <div className={styles.wrapper}>
      <NavMenu isOpen={isNavOpen} />
      <div className={styles.content}>
        <Header name={name} onMenuToggle={toggleNav} />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Dashboard;
