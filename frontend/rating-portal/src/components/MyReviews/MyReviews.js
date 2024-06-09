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
                    const response = await axios.post('http://127.0.0.1:5000/ratings/fetch_by_user', {
                        user_id: user.pk_user
                    });
                    setReviews(response.data);
                } catch (error) {
                    console.error('Failed to fetch reviews:', error);
                }
            };

            fetchReviews();
        }
    }, [user]);

    const handleEdit = (review) => {
        setEditingReviewId(review.pk_rating);
        setUpdatedContent(review.review);
    };

    const handleUpdate = async (reviewId) => {
        try {
            await axios.post('http://127.0.0.1:5000/ratings/update', {
                rating_id: reviewId,
                review: updatedContent
            });
            setReviews(reviews.map(review => 
                review.pk_rating === reviewId ? { ...review, review: updatedContent } : review
            ));
            setEditingReviewId(null);
        } catch (error) {
            console.error('Failed to update review:', error);
        }
    };

    const handleDelete = async (reviewId) => {
        try {
            await axios.post('http://127.0.0.1:5000/ratings/delete', { rating_id: reviewId });
            setReviews(reviews.filter(review => review.pk_rating !== reviewId));
        } catch (error) {
            console.error('Failed to delete review:', error);
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
                                    <button onClick={() => handleUpdate(review.pk_rating)} className="button">Update</button>
                                    <button onClick={() => setEditingReviewId(null)} className="button">Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <p>{review.review}</p>
                                    <button onClick={() => handleEdit(review)} className="button">Edit</button>
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
