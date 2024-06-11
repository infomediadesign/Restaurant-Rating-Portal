import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext.js';
import background from "../../images/background.jpg";
import './RestaurantDetail.css';
import Carousel from '../../components/Carousel/Carousel.js'; 
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
    // const [review, setReview] = useState(0);
    const [replyText, setReplyText] = useState(0);
    const [openingHours, setOpeningHours] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    const fetchDetails = async () => {
        setIsLoading(true);
        try {
            const details = await fetchRestaurantDetails(+id);
            const ratings = await fetchRatings(+id);
            console.log("Fetched ratings:", ratings);
            console.log("Fetching ratings for restaurant ID:", id);
            const ratingsWithReplies = await Promise.all(ratings.map(async (rating) => {
                    const replies = await fetchRepliesByRating(rating.pk_rating);
                    return { ...rating, replies };
                }));

            setRestaurant(details);
            setReviews(ratingsWithReplies);
            const hours = await fetchOpeningHours(+id);
            setOpeningHours(hours);
        } catch (error) {
            console.error('Error fetching details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchDetails();
}, [id]);

    const handleRatingSubmit = async () => {
    if (rating === 0) {
        alert("Please select a rating and, optionally, enter a review.");
        return;
    }
    setIsLoading(true);
    try {
        const newReview = await createRating(user.pk_user, +id, rating, reviewText);
        console.log("New Review Received:", newReview);

        const preparedReview = {
            ...newReview,
            replies: [] 
        };
        // Update the reviews state by adding the new review
        setReviews(prevReviews => [...prevReviews, preparedReview]);
        setRating(0);
        setReviewText("");
        alert("Rating submitted successfully!");
    } catch (error) {
        console.error('Error submitting rating:', error);
        alert("Failed to submit rating.");
    } finally {
        setIsLoading(false);
    }
};

    const handleReplySubmit = async (ratingId) => {
    console.log("Received rating ID:", ratingId); 
    if (!ratingId) {
        console.error("No rating ID provided");
        alert("No rating ID provided");
        return;
    }
    if (user) {
        alert("You must be logged in to reply.");
        return;
    }
    setIsLoading(true);
    try {
        const reply = await createReply(user.pk_user, ratingId, replyText);
        console.log("Reply submission successful:", reply);
        alert("Reply submitted successfully!");
        const updatedReviews = reviews.map(review =>
            review.pk_rating === ratingId ? {...review, replies: [...review.replies, reply]} : review
        );
        setReviews(updatedReviews);
        setReplyText("");
    } catch (error) {
        console.error("Error submitting reply:", error);
        alert("Failed to submit reply.");
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
                {restaurant?.images && <Carousel images={restaurant.images} />}
                <h1>{restaurant?.name}</h1>
                <p>{restaurant?.description}</p>
                <OpeningHours openingHours={openingHours} />
                <Reviews reviews={reviews} isLoading={isLoading} /> 
                <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply here" />
                {reviews.map(review => (
                <div key={review.pk_rating}>
                <p>{review.review}</p>
                <button onClick={() => handleReplySubmit(review.pk_rating)}>
                        Submit Reply
                </button>
        </div>
        ))}
                <RatingComponent rating={rating} setRating={setRating} />
                <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Enter review" />
                <button onClick={handleRatingSubmit} disabled={isLoading}>Submit Rating</button>
            </div>
        </div>
    );
};

export default RestaurantDetail;
