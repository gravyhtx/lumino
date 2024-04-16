// components/Header.tsx
import React, { useState } from 'react';
import Icon from '~/components/_core/Icon';
import Logo from '../Logo';
import { classnames } from '~/utils/global';
import styles from './header.module.css';

interface HeaderProps {
  name?: string;
  onMenuToggle?: () => void;
}

/**
 * Header component for the layout.
 * @param {HeaderProps} props - Props for the Header component.
 * @returns {React.ReactElement} The Header component.
 */
const Header: React.FC<HeaderProps> = ({ name, onMenuToggle }): React.ReactElement => {

  const [isToolbarOpen, setToolbarOpen] = useState<boolean>(false);
  const toolbarStatus = isToolbarOpen ? styles.open : styles.closed;

  const toggleToolbar = () => {
    console.log('toggle menu');
    setToolbarOpen(!isToolbarOpen);
  }

  const twClasses = "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60";

  return (<>
    <header className={classnames(styles.container, twClasses)}>
      <div onClick={() => toggleToolbar}>
        { name ?
          <h3>{name}</h3> :
          <Logo />
        }
        <button onClick={onMenuToggle} className={styles.toggleNav}>
          <Icon name="Menu" library="feather" size={24} />
        </button>
      </div>
      <div className={styles.spacer} />
      <div className={classnames(styles.toolbar, toolbarStatus)}>
        <div className="header-left">
          <ul>
            <li>{/* Add your left-side navigation items here */}</li>
          </ul>
        </div>
        <div className="header-right">
          <ul>
          <li>{/* Add your right-side navigation items here */}</li>
          </ul>
        </div>
      </div>
    </header>
  </>);
};

export default Header;
