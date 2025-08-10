import './Control.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { useAuth } from '../../../Context/AuthContext';

const Control = () => {
    const wishItems = useContext(WishItemsContext);
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        // You can add a success message here if needed
    };

    return (
        <div className="control__bar__container">
            <div className="controls__container">
                {user ? (
                    <>
                        <div className="control">
                            <Link to="/account/me" title="My Account">
                                <PersonOutlineIcon color="black" size="large" sx={{ width: '35px' }} />
                            </Link>
                        </div>
                        <div className="control">
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100%'
                                }}
                                title="Logout"
                            >
                                <LogoutIcon color="black" sx={{ width: '35px' }} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="control">
                        <Link to="/account/login">
                            <PersonOutlineIcon color="black" size="large" sx={{ width: '35px' }} />
                        </Link>
                    </div>
                )}
                <div className="control">
                    <Link to="/wishlist">
                        <Badge badgeContent={wishItems.items.length} color="error">
                            <FavoriteBorderIcon color="black" sx={{ width: '35px' }} />
                        </Badge>
                    </Link>
                </div>
                <div className="control">
                    <Cart />
                </div>

            </div>
        </div>
    );
}

export default Control;