import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewRatings.css';

const ViewRatings = () => {
    const { id } = useParams();
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/owner/restaurant/${id}/ratings`);
                if (response.ok) {
                    const data = await response.json();
                    setRatings(data);
                } else {
                    console.error('Failed to fetch ratings');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRatings();
    }, [id]);

    const handleReply = async (ratingId, reply) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/owner/restaurant/${id}/ratings/${ratingId}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reply }),
            });

            if (response.ok) {
                alert('Reply posted successfully!');
                setRatings(ratings.map(rating => rating.id === ratingId ? { ...rating, reply } : rating));
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Failed to post reply:', error);
            alert('Failed to post reply. Please try again later.');
        }
    };

    return (
        <div className="view-ratings-container">
            <h2>Ratings</h2>
            <ul className="ratings-list">
                {ratings.map(rating => (
                    <li key={rating.id} className="rating-item">
                        <p><strong>User:</strong> {rating.user}</p>
                        <p><strong>Rating:</strong> {rating.rating}</p>
                        <p><strong>Comment:</strong> {rating.comment}</p>
                        <p><strong>Reply:</strong> {rating.reply || 'No reply yet'}</p>
                        <textarea
                            placeholder="Type your reply here..."
                            onBlur={(e) => handleReply(rating.id, e.target.value)}
                            className="reply-textarea"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewRatings;
