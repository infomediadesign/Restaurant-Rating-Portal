import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerUser.css';
import background from '../../images/background.jpg';

const RegisterUser = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !surname || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/registerdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, surname, email, password }),
            });

            if (response.ok) {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again later.');
        }
    };

    return (
        <div
            className="register-user-container"
            style={{
                background: `url(${background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
            }}
        >
            <div className="register-user-box">
                <h2 className="register-user-title">Register as User</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="register-user-input"
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="register-user-input"
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-user-input"
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-user-input"
                    />
                    <br />
                    <button type="submit" className="register-user-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
