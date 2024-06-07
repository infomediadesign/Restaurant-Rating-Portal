import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/restaurants/fetch_all', {}, {
                    headers: {
                        'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
                        'Content-Type': 'application/json'
                    }
                });
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div>
            <h1>Restaurants Near You</h1>
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.pk_restaurant}>
                        <h2>{restaurant.name}</h2>
                        <p>Genre: {restaurant.genre}</p>
                        <p>Address: {`${restaurant.house_number} ${restaurant.street_name}, ${restaurant.city}, ${restaurant.state}, ${restaurant.zip_code}, ${restaurant.country}`}</p>
                        <p>License: {restaurant.licence}</p>
                        {restaurant.verified ? <p>Verified</p> : <p>Not Verified</p>}
                        {restaurant.images && restaurant.images.map(image => (
                            <img key={image} src={image} alt={`${restaurant.name}`} />
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;
