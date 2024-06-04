import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditRestaurant.css';

const EditRestaurant = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/owner/restaurant/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setDescription(data.description);
                    setLocation(data.location);
                } else {
                    console.error('Failed to fetch restaurant');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRestaurant();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/owner/edit-restaurant/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Restaurant updated successfully!');
                navigate('/owner-dashboard');
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('Update failed. Please try again later.');
        }
    };

    return (
        <div className="edit-restaurant-container">
            <h2>Edit Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="edit-restaurant-input"
                />
                <br />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="edit-restaurant-input"
                />
                <br />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="edit-restaurant-input"
                />
                <br />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="edit-restaurant-input"
                />
                <br />
                <button type="submit" className="edit-restaurant-button">Update</button>
            </form>
        </div>
    );
};

export default EditRestaurant;
