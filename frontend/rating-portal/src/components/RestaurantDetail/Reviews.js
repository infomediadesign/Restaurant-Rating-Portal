import React, { useState, useEffect } from 'react';
import { fetchRatings, fetchRepliesByRating } from '../../apiService';

const Reviews = ({ restaurantId }) => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRatingsAndReplies = async () => {
            try {
                setIsLoading(true);
                const fetchedRatings = await fetchRatings(restaurantId);
                const reviewsWithReplies = await Promise.all(
                    fetchedRatings.map(async (rating) => {
                        const replies = await fetchRepliesByRating(rating.pk_rating);
                        return { ...rating, replies };
                    })
                );
                setReviews(reviewsWithReplies);
                console.log("Reviews with replies fetched", reviewsWithReplies);
            } catch (error) {
                console.error("Failed to fetch ratings and replies", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadRatingsAndReplies();
    }, [restaurantId]); 

    return (
        <div>
            {isLoading ? (
                <p>Loading reviews...</p>
            ) : (
                reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.pk_rating}>
                            <strong>User {review.fk_user}:</strong> {review.review}
                            {review.replies && review.replies.length > 0 ? (
                                review.replies.map(reply => (
                                    <p key={reply.pk_reply}>
                                        <strong>Reply from User {reply.fk_user}:</strong> {reply.message}
                                    </p>
                                ))
                            ) : (
                                <p>No replies yet.</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )
            )}
        </div>
    );
};

export default Reviews;
