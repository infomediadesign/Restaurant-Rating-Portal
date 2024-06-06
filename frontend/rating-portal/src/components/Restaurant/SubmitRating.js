import React, { useState } from 'react';
import { submitRating } from '../api';

const SubmitRating = ({ restaurantId }) => {
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating || !review) {
            alert('Please fill in all fields.');
            return;
        }

        const ratingData = {
            restaurantId,
            rating: parseInt(rating),
            review,
        };

        try {
            const response = await submitRating(ratingData);
            alert('Rating submitted successfully');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Rating:
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Review:
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit">Submit Rating</button>
        </form>
    );
};

export default SubmitRating;