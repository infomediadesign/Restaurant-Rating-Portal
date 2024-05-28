import React from 'react';

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

export default RestaurantCard;
