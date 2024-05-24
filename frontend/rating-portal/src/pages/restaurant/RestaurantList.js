    // src/pages/Home/restaurant/RestaurantList.js
    import React from 'react';
    import RestaurantCard from './RestaurantCard';
    import { useNavigate } from 'react-router-dom';
    import './restaurant.css';

    import restaurant1 from '../../images/littleindia.jpg';
    import restaurant2 from '../../images/naan&curry.png';
    import restaurant3 from '../../images/image.png';

    const sampleRestaurants = [
    {
        id: 1,
        name: 'Little India',
        location: 'U1, Mannheim',
        rating: 4.5,
        image: restaurant1,
    },
    {
        id: 2,
        name: 'Naan&Curry',
        location: 'S2, Mannheim',
        rating: 4.2,
        image: restaurant2,
    },
    {
        id: 3,
        name: 'Raja Rani',
        location: 'Heidelberg',
        rating: 4.8,
        image: restaurant3,
    },
    ];

    const RestaurantList = () => {
    const navigate = useNavigate();

    const handleRestaurantClick = (id) => {
        navigate(`/restaurant/${id}`);
    };

    return (
        <div className="restaurant-list-container">
        {sampleRestaurants.map((restaurant) => (
            <div
            key={restaurant.id}
            className="restaurant-card-wrapper"
            onClick={() => handleRestaurantClick(restaurant.id)}
            >
            <RestaurantCard restaurant={restaurant} />
            </div>
        ))}
        </div>
    );
    };

    export default RestaurantList;
