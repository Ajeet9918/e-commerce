import { useState } from 'react';
import Navbottom from '../Nav/Nav-Links/NavLinks';
import Navtop from '../Nav/Container/Container';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // You can toggle this from a hamburger icon if needed
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className='header__container'>
      <Navtop toggleMobileMenu={toggleMobileMenu} />
      <Navbottom closeMobileMenu={closeMobileMenu} isMobileOpen={mobileMenuOpen} />
    </div>
  );
};

export default Header;
