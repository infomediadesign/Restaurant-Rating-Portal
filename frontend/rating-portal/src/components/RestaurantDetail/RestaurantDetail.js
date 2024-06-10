import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext.js';
import background from "../../images/background.jpg";
import './RestaurantDetail.css';
import Reviews from './Reviews';
import OpeningHours from './OpeningHours';
import RatingComponent from "../Ratings/RatingComponent"; 
import { createRating, createReply, fetchRestaurantDetails, fetchRatings, fetchOpeningHours, fetchRepliesByRating } from "../../apiService";

const RestaurantDetail = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [openingHours, setOpeningHours] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
    setIsLoading(true);
    try {
        const details = await fetchRestaurantDetails(+id);
        const ratings = await fetchRatings(+id);
        const hours = await fetchOpeningHours(+id);
        const replies = await fetchRepliesByRating(1);
        
        setRestaurant(details);
        setReviews(ratings);
        setOpeningHours(hours);
        setReplies(replies);
    
    } catch (error) {
        console.error('Error fetching details:', error);
    } finally {
        setIsLoading(false);
    }
};

        fetchDetails();
    }, [id]);  //
    const handleRatingSubmit = async () => {
        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }
        setIsLoading(true);
        try {
            const newReview = await createRating(user.pk_user, id, rating, reviewText);
            setReviews(prev => [...prev, newReview]);
            setRating(0);
            setReviewText("");
            alert("Rating submitted successfully!");
        } catch (error) {
            console.error('Error submitting rating:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReplySubmit = async (ratingId) => {
        console.log("User from context:", user);
        if (!user || !user.pk_user) {  
            alert("You must be logged in to reply.");
            return;
        }
        if (!reply.trim()) {
            alert("Please enter a reply.");
            return;
        }
        setIsLoading(true);
        try {
            await createReply(user.pk_user, ratingId, reply);
            alert('Reply submitted successfully!');
            setReply("");
        } catch (error) {
            console.error('Error submitting reply:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-container" style={{
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: "cover",
        }}>
            <div className="container">
                {restaurant?.images && <img src={restaurant.images[0]} alt={restaurant.name} />}
                <h1>{restaurant?.name}</h1>
                <p>{restaurant?.description}</p>
                <OpeningHours openingHours={openingHours} />
                <Reviews reviews={reviews} isLoading={isLoading} user={user} handleReplySubmit={handleReplySubmit} />
                <RatingComponent rating={rating} setRating={setRating} />
                <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Enter review" />
                <button onClick={handleRatingSubmit} disabled={isLoading}>Submit Rating</button>
            </div>
        </div>
    );
};

export default RestaurantDetail;

