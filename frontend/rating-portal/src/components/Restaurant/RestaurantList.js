import React from 'react';
import RestaurantCard from './RestaurantCard';
import { useNavigate } from 'react-router-dom';
import './RestaurantList.css';

import image1 from '../../images/image1.png';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.png';
import image4 from '../../images/image4.png';
import image5 from '../../images/image5.png';
import image6 from '../../images/image6.jpg';

const sampleRestaurants = [
    {
        id: 1,
        name: 'Little India',
        location: 'U1, Mannheim',
        rating: 4.5,
        image: image1,
    },
    {
        id: 2,
        name: 'Naan&Curry',
        location: 'S2, Mannheim',
        rating: 4.2,
        image: image2,
    },
    {
        id: 3,
        name: 'Raja Rani',
        location: 'Heidelberg',
        rating: 4.8,
        image: image3,
    },
    {
        id: 4,
        name: 'Spice Villa',
        location: 'Frankfurt',
        rating: 4.7,
        image: image4,
    },
    {
        id: 5,
        name: 'Curry House',
        location: 'Berlin',
        rating: 4.3,
        image: image5, 
    },
    {
        id: 6,
        name: 'Tandoori Palace',
        location: 'Hamburg',
        rating: 4.6,
        image: image6, 
    },
];

const RestaurantList = () => {
    const navigate = useNavigate();

    const handleRestaurantClick = (id) => {
        navigate(`/restaurant/${id}`);
    };

    return (
        <div className="restaurant-list">
            <div className="restaurant-list-background"></div>
            <div className="restaurant-list-grid">
                {sampleRestaurants.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        className="restaurant-list-item"
                        onClick={() => handleRestaurantClick(restaurant.id)}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <RestaurantCard restaurant={restaurant} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default RestaurantList;
