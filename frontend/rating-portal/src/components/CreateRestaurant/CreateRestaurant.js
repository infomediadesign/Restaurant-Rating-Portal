import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRestaurant.css';

const CreateRestaurant = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !location || !image) {
            alert('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('image', image);

        try {
            const response = await fetch('http://127.0.0.1:5000/owner/create-restaurant', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Restaurant created successfully!');
                navigate('/owner-dashboard');
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Creation failed:', error);
            alert('Creation failed. Please try again later.');
        }
    };

    return (
        <div className="create-restaurant-container">
            <h2>Create Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="create-restaurant-input"
                />
                <br />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="create-restaurant-input"
                />
                <br />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="create-restaurant-input"
                />
                <br />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="create-restaurant-input"
                />
                <br />
                <button type="submit" className="create-restaurant-button">Create</button>
            </form>
        </div>
    );
};

export default CreateRestaurant;
