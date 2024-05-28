import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerOwner.css'; // Import the CSS file
import background from '../../images/background.jpg';

const RegisterOwner = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [businessLicense, setBusinessLicense] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !surname || !email || !password || !businessLicense) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/registerdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, surname, email, password, businessLicense }),
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
            className="register-owner-container"
            style={{
                background: `url(${background}) no-repeat center center fixed`,
                backgroundSize: 'cover',
            }}
        >
            <div className="register-owner-box">
                <h2 className="register-owner-title">Register as Owner</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="register-owner-input"
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        className="register-owner-input"
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-owner-input"
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-owner-input"
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Business License"
                        value={businessLicense}
                        onChange={(e) => setBusinessLicense(e.target.value)}
                        className="register-owner-input"
                    />
                    <br />
                    <button type="submit" className="register-owner-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterOwner;
