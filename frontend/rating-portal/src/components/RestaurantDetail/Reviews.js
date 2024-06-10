import React, { useState } from 'react';

const Reviews = ({ reviews, isLoading, handleReplySubmit }) => {
    const [reply, setReply] = useState('');

    if (isLoading) return <p>Loading reviews...</p>;
    if (!Array.isArray(reviews) || reviews.length === 0) return <p>No reviews available.</p>;

    return (
        <div>
            {reviews.map((review) => (
                <div key={review.pk_rating}>
                    <strong>{review.user_name}:</strong> {review.review}
                    {review.replies && review.replies.length > 0 ? (
                        review.replies.map((reply, index) => (
                            <p key={`${review.pk_rating}-${index}`}>{reply.message}</p>
                        ))
                    ) : (
                        <p>No replies yet.</p>
                    )}
                    <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Enter reply" />
                    <button onClick={() => {
                        handleReplySubmit(review.pk_rating);
                        setReply('');
                    }} disabled={isLoading}>
                        Submit Reply
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
