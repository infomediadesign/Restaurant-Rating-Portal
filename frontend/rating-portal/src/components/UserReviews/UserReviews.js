import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const UserReviews = () => {
    const { user } = useContext(UserContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchReviews = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/users/${user.id}/reviews`);
                    setReviews(response.data);
                } catch (error) {
                    console.error('Failed to fetch reviews:', error);
                }
            };

            fetchReviews();
        }
    }, [user]);

    if (!user) {
        return <p>Please log in to see your reviews.</p>;
    }

    return (
        <div>
            <h2>My Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>{review.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserReviews;
