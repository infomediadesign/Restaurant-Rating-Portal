import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext.js';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchRestaurantDetails();
    }, [id]);

    const fetchRestaurantDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://127.0.0.1:5000/restaurants/fetch_by_id`,{ 
                pk_restaurant: +id
            }, {
                headers: {
                    'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
                    'Content-Type': 'application/json'
                }
            });
            setRestaurant(response.data);
            setReviews(response.data.reviews || []);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRatingSubmit = async () => {
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/ratings/create", { 
                fk_user: +id,
                fk_restaurant: id,
                stars: rating,
                review: review
            }, {
                headers: {
                    'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
                    'Content-Type': 'application/json'
                }
            });
            setReviews(prev => [...prev, response.data]);
            setRating(0);
            setReview("");
            alert("Rating submitted successfully!");
        } catch (error) {
            console.error('Error submitting rating:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReplySubmit = async (ratingId) => {
        console.log("User from context:", user);
        if (!user || !user.id) {  
        alert("You must be logged in to reply.");
        return;
    }
        if (!reply.trim()) {
            alert("Please enter a reply.");
            return;
        }
        setIsLoading(true);
        try {
            await axios.post('http://127.0.0.1:5000/ratings/replies/create', {
                fk_user: +id,
                fk_rating: ratingId,
                message: reply
            }, {
                headers: {
                    'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('Reply submitted successfully!');
            setReply(""); // Reset reply input after successful submission
        } catch (error) {
            console.error('Error submitting reply:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            return (
                <span key={index}
                    className={rating > index ? 'star on' : 'star off'}
                    onClick={() => setRating(index + 1)}>&#9733;</span>
            );
        });
    };

    return (
        <div className="container">
            {restaurant?.images && <img src={restaurant.images[0]} alt={restaurant.name} />}
            <h1>{restaurant?.name}</h1>
            <p>{restaurant?.description}</p>
            <div className="rating-system">{renderStars()}</div>
            <input type="text" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter review" />
            <button onClick={handleRatingSubmit} disabled={isLoading}>Submit Rating</button>
            {reviews.map((reviews) => (
                <div key={reviews.id} className="review-item">
                    <strong>{reviews.user_name}: </strong>{reviews.review}
                    <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Enter reply" />
                    <button onClick={() => handleReplySubmit(review.id)} disabled={isLoading}>Submit Reply</button>
                </div>
            ))}
        </div>
    );
};

export default RestaurantDetail;
