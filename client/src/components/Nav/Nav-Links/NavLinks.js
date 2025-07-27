import { Link } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = ({ closeMobileMenu, isMobileOpen }) => {
    return (
        <nav className={`nav__bottom__container ${isMobileOpen ? 'open' : ''}`}>
            <div className="bottom__container">
                <ul className="nav">
                    <li className='nav-link'><Link to="/" onClick={closeMobileMenu}>Home</Link></li> 
                    <li className='nav-link'><Link to="/shop" onClick={closeMobileMenu}>Shop</Link></li>
                    <li className='nav-link'><Link to="/category/men" onClick={closeMobileMenu}>Men</Link></li> 
                    <li className='nav-link'><Link to="/category/women" onClick={closeMobileMenu}>Women</Link></li> 
                    <li className='nav-link'><Link to="/category/kids" onClick={closeMobileMenu}>Kids</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavLinks;
