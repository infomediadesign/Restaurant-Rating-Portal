import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurantPicture = ({ restaurantId }) => {
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/restaurants/pictures/upload', {
                fk_restaurant: 4,
                url: imageUrl
            }, {
                headers: {
                    'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            alert('Image added successfully!');
            setImageUrl('');
        } catch (error) {
            console.error('Error adding image:', error);
            alert('Failed to add image.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required
            />
            <button type="submit">Add Image</button>
        </form>
    );
};

export default AddRestaurantPicture;
