import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/owner/restaurants');
                if (response.ok) {
                    const data = await response.json();
                    setRestaurants(data);
                } else {
                    console.error('Failed to fetch restaurants');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleCreateRestaurant = () => {
        navigate('/create-restaurant');
    };

    const handleEditRestaurant = (id) => {
        navigate(`/edit-restaurant/${id}`);
    };

    const handleViewRatings = (id) => {
        navigate(`/view-ratings/${id}`);
    };

    return (
        <div className="owner-dashboard-container">
            <h1>Owner's Dashboard</h1>
            <button onClick={handleCreateRestaurant} className="create-restaurant-button">Create New Restaurant</button>
            <h2>Your Restaurants</h2>
            <ul className="restaurant-list">
                {restaurants.map(restaurant => (
                    <li key={restaurant.id} className="restaurant-item">
                        <h3>{restaurant.name}</h3>
                        <button onClick={() => handleEditRestaurant(restaurant.id)}>Edit</button>
                        <button onClick={() => handleViewRatings(restaurant.id)}>View Ratings</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OwnerDashboard;
