import React from 'react';

const RestaurantCard = ({ restaurant }) => {
    return (
        <div
            style={{
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
            }}
        >
            <img
                src={restaurant.image}
                alt={restaurant.name}
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                }}
            />
            <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px' }}>{restaurant.name}</h3>
                <p style={{ margin: '0 0 5px' }}>{restaurant.location}</p>
                <p style={{ margin: '0', fontWeight: 'bold' }}>Rating: {restaurant.rating}</p>
                <div style={{ marginTop: '10px' }}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} style={{ color: index < restaurant.rating ? 'gold' : '#ccc' }}>
                            ★
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
