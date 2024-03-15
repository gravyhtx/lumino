import React from 'react';
import type { ReactNode } from 'react';
import Main from '~/components/Main';
import styles from './dashboard.module.css';
import { classnames, marginClass } from '~/utils/global';
import Logo from '~/components/_elements/Logo';

interface DashboardProps {
  children: ReactNode;
  className?: string;
  margin?: {
    size: number | 'px' | 'auto';
    sides?: 'x' | 'y' | 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end';
  }
  loggedIn?: boolean;
  logout?: () => void;
}

/**
 * Dashboard layout with a navigational menu, header, and main content area.
 * @param {DashboardProps} props - Props for the Dashboard component.
 * @returns {React.ReactElement} - The Dashboard layout component.
 */
const Dashboard: React.FC<DashboardProps> = ({ children, className, margin, loggedIn, logout }) => {
  // const [isNavOpen, setNavOpen] = useState(false);

  // const toggleNav = () => setNavOpen(!isNavOpen);
  const margins: string = marginClass(margin?.size ?? 0, margin?.sides);

  return (<div className={styles.wrapper}>
    <div className={styles.header}>
      <div className={styles.logo}><Logo /></div>
      {loggedIn && <div className={styles.logout} onClick={logout}>Log Out</div>}
    </div>
    <div className={styles.container}>
      <div className={styles.content}>
        <Main className={classnames(className, margins)} justifyContent={"start"}>{children}</Main>
      </div>
    </div>
    </div>);
};

export default Dashboard;
