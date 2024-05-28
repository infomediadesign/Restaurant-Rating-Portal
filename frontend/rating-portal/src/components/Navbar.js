import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar = ({ isLoggedIn }) => {
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '10px 30px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: '0',
        zIndex: '1000',
    };

    const linkStyle = {
        margin: '0 15px',
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'color 0.3s ease',
    };

    const linkHoverStyle = {
        color: '#ff6347',
    };

    const logoStyle = {
        width: '60px',
        transition: 'transform 0.3s ease',
    };

    return (
        <nav style={navStyle}>
            <div>
                <img src={logo} alt="Logo" style={logoStyle} />
            </div>
            <div>
                <Link
                    to="/"
                    style={linkStyle}
                    onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
                    onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
                >
                    Home
                </Link>
                {!isLoggedIn && (
                    <Link
                        to="/register-user"
                        style={linkStyle}
                        onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
                        onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
                    >
                        Register
                    </Link>
                )}
                <Link
                    to="/login"
                    style={linkStyle}
                    onMouseOver={(e) => (e.currentTarget.style.color = linkHoverStyle.color)}
                    onMouseOut={(e) => (e.currentTarget.style.color = linkStyle.color)}
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
