import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import './Navbar.css';
import MyReviewsDropdown from '../components/ProfileDropdown/ProfileDropdown';
import { UserContext } from '../components/UserContext/UserContext';

const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav className="nav">
            <div>
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div>
                <Link to="/" className="nav-link">Home</Link>
                {!user && (
                    <>
                        <Link to="/register-user" className="nav-link">Register</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </>
                )}
                {user && <MyReviewsDropdown />}
            </div>
        </nav>
    );
};

export default Navbar;