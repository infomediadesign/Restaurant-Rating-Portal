    // src/pages/Restaurant/RestaurantCard.js
    import React from 'react';
    import '/Users/riddhiodedra/Desktop/sad-01-24-gitguardians/frontend/rating-portal/src/pages/Home/restaurant/restaurant.css';

    const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
        <img src={restaurant.image} alt={restaurant.name} />
        <h3>{restaurant.name}</h3>
        <p>{restaurant.location}</p>
        <p>Rating: {restaurant.rating}</p>
        <div>
            {Array.from({ length: 5 }, (_, index) => (
            <span key={index} style={{ color: index < restaurant.rating ? 'gold' : '#ccc' }}>
                ★
            </span>
            ))}
        </div>
        </div>
    );
    };

    export default RestaurantCard;
