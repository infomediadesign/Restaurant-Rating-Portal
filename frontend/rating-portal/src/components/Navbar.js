import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import './Navbar.css';
import ProfileDropdown from '../components/ProfileDropdown/ProfileDropdown';
import { UserContext } from '../components/UserContext/UserContext';

const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav className="nav">
            <div className="nav-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="nav-right">
                {user ? (
                    <>
                        <Link to={user.role === 'owner' ? '/owner-dashboard' : '/'} className="nav-link">Home</Link>
                        <ProfileDropdown />
                    </>
                ) : (
                    <>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/register-user" className="nav-link">Register</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
