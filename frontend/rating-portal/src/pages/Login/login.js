import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import background from '../../images/background.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for backend data store
        navigate('/');
    };

    return (
        <div
            className="login-container"
            style={{
                background: `url(${background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
            }}
        >
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <br />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-options">
                    <button
                        onClick={() => navigate('/register-user')}
                        className="login-button"
                    >
                        Register as User
                    </button>
                    <button
                        onClick={() => navigate('/register-owner')}
                        className="login-button"
                    >
                        Register as Owner
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
