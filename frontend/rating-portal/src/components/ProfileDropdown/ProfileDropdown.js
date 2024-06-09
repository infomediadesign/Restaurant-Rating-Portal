import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleViewProfile = () => {
        navigate('/my-profile');
    };

    const handleLogout = () => {
        logout();
        alert("Logged out successfully!");
        navigate('/login');
    };

    return (
        <div className="profile-dropdown">
            <button onClick={toggleDropdown} className="circular-button">
                Profile
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li onClick={handleViewProfile}>My Profile</li>
                    {user.role !== 'owner' && (
                        <li onClick={() => navigate('/my-reviews')}>My Reviews</li>
                    )}
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            )}
        </div>
    );
};

export default ProfileDropdown;
