    import React from 'react';
    import { Link } from 'react-router-dom';
    import logo from '../images/logo.png';

    const Navbar = ({ isLoggedIn }) => {
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: '10px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: '0',
        zIndex: '1000'
    };

    const linkStyle = {
        margin: '0 15px',
        textDecoration: 'none',
        color: '#ff6347',
        fontWeight: 'bold',
        fontSize: '18px'
    };

    return (
        <nav style={navStyle}>
        <div>
            <img src={logo} alt="Logo" style={{ width: '80px' }} />
        </div>
        <div>
            <Link to="/" style={linkStyle}>
            Home
            </Link>
            {!isLoggedIn && (
            <Link to="/register-user" style={linkStyle}>
                Register
            </Link>
            )}
            <Link to="/login" style={linkStyle}>
            Login
            </Link>
        </div>
        </nav>
    );
    };

    export default Navbar;
