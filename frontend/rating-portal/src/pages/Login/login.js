import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/UserContext/UserContext';
import './login.css';
import background from '../../images/background.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const username = "api_gateway";
            const userPassword = "Xe812C81M9yA";
            const token = btoa(`${username}:${userPassword}`);

            const response = await axios.post(
                'http://127.0.0.1:5000/users/login',
                { email, password },
                {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                }
            );

            if (response.status === 200) {
                const userData = response.data.user;
                console.log('User Data:', userData);
                login(userData);
                alert('Login successful!');
                if (userData.role === 'owner') {
                    navigate('/owner-dashboard');
                } else if (userData.role === 'user') {
                    navigate('/');
                } else {
                    alert('Unknown user role. Please contact support.');
                }
            } else {
                alert('Login failed. Invalid credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Login failed. Please try again later.');
        }
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
