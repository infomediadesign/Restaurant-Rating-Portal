import React, { useState, useEffect } from 'react';
import { fetchRestaurants } from '../../api';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const data = await fetchRestaurants();
                setRestaurants(data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };
        getRestaurants();
    }, []);

    return (
        <div>
            <h1>Restaurants</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.description}</p>
                        <p>Rating: {restaurant.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;