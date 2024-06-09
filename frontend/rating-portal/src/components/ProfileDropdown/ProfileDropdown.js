import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import './ProfileDropdown.css';

const MyReviewsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

console.log("User:", user);
console.log("Logout Function:", logout);


const toggleDropdown = (event) => {
        event.stopPropagation();
        console.log("Toggling dropdown from", isOpen, "to", !isOpen);
        setIsOpen(!isOpen);
    };

    const handleViewProfile = (event) => {
        event.stopPropagation();
        navigate('/my-profile');
    };

    const handleViewReviews = (event) => {
        event.stopPropagation();
        navigate('/my-reviews');
    };

    const handleLogout = (event) => {
        event.stopPropagation();
        logout();
        alert("Logged out successfully!");
        navigate('/login');
    };

    useEffect(() => {
    const handleOutsideClick = (event) => {
        if (!event.target.closest('.my-reviews-dropdown')) {
            setIsOpen(false);
        }
    };

    if (isOpen) {
        window.addEventListener('click', handleOutsideClick);
    }

    return () => {
        window.removeEventListener('click', handleOutsideClick);
    };
}, [isOpen]);

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
