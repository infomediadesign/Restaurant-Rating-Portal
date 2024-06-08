import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import './ProfileDropdown.css';

const MyReviewsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleViewProfile = () => {
        navigate('/my-profile');
    };

    const handleViewReviews = () => {
        navigate('/my-reviews');
    };

    const handleLogout = () => {
        logout();
        alert("Logged out successfully!");
        navigate('/login');
    };

    return (
        <div className="my-reviews-dropdown">
            <button onClick={toggleDropdown} className="circular-button">
                Profile
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li onClick={handleViewProfile}>My Profile</li>
                    <li onClick={handleViewReviews}>My Reviews</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            )}
        </div>
    );
};

export default MyReviewsDropdown;
