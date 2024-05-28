import React from 'react';
import RestaurantCard from './RestaurantCard';
import { useNavigate } from 'react-router-dom';

import littleindia from '../../images/littleindia.jpg';
import naancurry from '../../images/naan&curry.png';
import image from '../../images/image.png';
import background from '../../images/background.jpg';

const sampleRestaurants = [
    {
        id: 1,
        name: 'Little India',
        location: 'U1, Mannheim',
        rating: 4.5,
        image: littleindia,
    },
    {
        id: 2,
        name: 'Naan&Curry',
        location: 'S2, Mannheim',
        rating: 4.2,
        image: naancurry,
    },
    {
        id: 3,
        name: 'Raja Rani',
        location: 'Heidelberg',
        rating: 4.8,
        image: image,
    },
    {
        id: 4,
        name: 'Spice Villa',
        location: 'Frankfurt',
        rating: 4.7,
        image: image, // Use the appropriate image for this restaurant
    },
    {
        id: 5,
        name: 'Curry House',
        location: 'Berlin',
        rating: 4.3,
        image: image, // Use the appropriate image for this restaurant
    },
];

const RestaurantList = () => {
    const navigate = useNavigate();

    const handleRestaurantClick = (id) => {
        navigate(`/restaurant/${id}`);
    };

    return (
        <div
            style={{
                position: 'relative',
                padding: '20px',
                borderRadius: '10px',
            }}
        >
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    background: `url(${background}) no-repeat center center fixed`,
                    backgroundSize: 'cover',
                    filter: 'brightness(0.5)',
                }}
            ></div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '30px',
                }}
            >
                {sampleRestaurants.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            padding: '20px',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                        }}
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
