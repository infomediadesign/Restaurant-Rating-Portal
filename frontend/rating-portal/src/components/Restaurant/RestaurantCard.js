    import React from 'react';
    import PropTypes from 'prop-types';

    const RestaurantCard = ({ restaurant }) => {
    return (
        <div
        style={{
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            margin: '10px',
            cursor: 'pointer',
        }}
        >
        <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{
            width: '100%',
            height: '200px', 
            objectFit: 'cover',
            borderRadius: '5px',
            marginBottom: '10px',
            }}
        />
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
