import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import './MyReviews.css';

const MyReviews = () => {
    const { user } = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [updatedContent, setUpdatedContent] = useState('');

    useEffect(() => {
        if (user) {
            const fetchReviews = async () => {
                try {
                    const username = 'api_gateway';
                    const userPassword = 'Xe812C81M9yA';
                    const token = btoa(`${username}:${userPassword}`);

                    const response = await axios.post(
                        'http://127.0.0.1:5000/ratings/fetch_by_user',
                        { user_id: user.pk_user },
                        {
                            headers: {
                                'Authorization': `Basic ${token}`
                            }
                        }
                    );

                    if (response.data && Array.isArray(response.data.ratings)) {
                        setReviews(response.data.ratings);
                    } else {
                        console.error('Response data is not an array:', response.data);
                        setReviews([]);
                    }

                    console.log(response.data)
                } catch (error) {
                    console.error('Failed to fetch reviews:', error);
                }
            };

            fetchReviews();
        }
    }, [user]);

    const handleDelete = async (reviewId) => {
        try {
            const username = 'api_gateway';
            const userPassword = 'Xe812C81M9yA';
            const token = btoa(`${username}:${userPassword}`);

            await axios.post(
                'http://127.0.0.1:5000/ratings/delete_by_id',
                { rating_id: reviewId },
                {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                }
            );

            setReviews(reviews.filter(review => review.pk_rating !== reviewId));
            window.alert('Review deleted successfully!');
        } catch (error) {
            console.error('Failed to delete review:', error);
            window.alert('Failed to delete review.');
        }
    };

    if (!user) {
        return <p>Please log in to see your reviews.</p>;
    }

    return (
        <div className="reviews-container">
            <h2>My Reviews</h2>
            {reviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                <ul className="reviews-list">
                    {reviews.map((review) => (
                        <li key={review.pk_rating} className="review-item">
                            {editingReviewId === review.pk_rating ? (
                                <div>
                                    <textarea
                                        value={updatedContent}
                                        onChange={(e) => setUpdatedContent(e.target.value)}
                                        className="review-textarea"
                                    />
                                    <button onClick={() => setEditingReviewId(null)} className="button">Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <p>{review.review}</p>
                                    <button onClick={() => handleDelete(review.pk_rating)} className="button">Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyReviews;
