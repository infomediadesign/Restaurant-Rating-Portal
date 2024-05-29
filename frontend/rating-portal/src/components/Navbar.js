import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import './Navbar.css';

const Navbar = ({ isLoggedIn }) => {
    return (
        <nav className="nav">
            <div>
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div>
                <Link
                    to="/"
                    className="nav-link"
                >
                    Home
                </Link>
                {!isLoggedIn && (
                    <Link
                        to="/register-user"
                        className="nav-link"
                    >
                        Register
                    </Link>
                )}
                <Link
                    to="/login"
                    className="nav-link"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
