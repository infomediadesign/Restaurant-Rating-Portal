import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import background from "../../images/background.jpg";

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate(); 

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

    useEffect(() => {
        const results = restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredRestaurants(results);
    }, [search, restaurants]);

    return (
        <div className="bg-container" style={{
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: "cover",
        }}>
            <div className="container mt-4">
                <h1 className="text-center mb-4">Restaurants Near You</h1>
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    className="form-control mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="row">
                    {filteredRestaurants.map(restaurant => (
                        <div className="col-md-4 mb-4" key={restaurant.pk_restaurant}>
                            <div className="card" onClick={() => navigate(`/restaurant/${restaurant.pk_restaurant}`)}>
                                
                        {restaurant.images&&<img src={restaurant.images[0]} className="card-img-top" alt={restaurant.name} />} 
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">Genre: {restaurant.genre}</p>
                                    <p className="card-text">Address: {`${restaurant.house_number} ${restaurant.street_name}, ${restaurant.city}`}</p>
                                    {restaurant.verified ? <span className="badge bg-success">Verified</span> : <span className="badge bg-danger">Not Verified</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantList;
