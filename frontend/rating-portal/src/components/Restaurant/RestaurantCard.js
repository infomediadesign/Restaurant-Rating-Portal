    import React from 'react';
    import PropTypes from 'prop-types'; 
    import './RestaurantCard.css';

    const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} className="restaurant-card-image" />
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
    RestaurantCard.propTypes = {
    restaurant: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    }).isRequired,
};


    export default RestaurantCard;
