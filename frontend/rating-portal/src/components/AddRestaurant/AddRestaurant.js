import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRestaurant.css';

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/addRestaurant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, address, description }),
            });

            if (response.ok) {
                alert('Restaurant added successfully');
                navigate('/owner-dashboard');
            } else {
                alert('Failed to add restaurant');
            }
        } catch (error) {
            console.error('Add restaurant failed:', error);
            alert('Add restaurant failed. Please try again later.');
        }
    };

    return (
        <div className="add-restaurant-container">
            <h2>Add New Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Restaurant Name"
                    className="add-restaurant-input"
                />
                <br />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Restaurant Address"
                    className="add-restaurant-input"
                />
                <br />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Restaurant Description"
                    className="add-restaurant-input"
                />
                <br />
                <button type="submit" className="add-restaurant-button">Add Restaurant</button>
            </form>
        </div>
    );
};

export default AddRestaurant;