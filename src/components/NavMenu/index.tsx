// components/NavMenu.tsx
import React from 'react';

interface NavMenuProps {
  isOpen: boolean;
}

/**
 * Side navigation component.
 * @param {NavMenuProps} props - Props for the NavMenu component.
 * @returns {React.ReactElement} The NavMenu component.
 */
const NavMenu: React.FC<NavMenuProps> = ({ isOpen }) => {
  return (
    <aside style={{ display: isOpen ? 'block' : 'none' }}>
      {/* Your side navigation content here */}
    </aside>
  );
};

export default NavMenu;
