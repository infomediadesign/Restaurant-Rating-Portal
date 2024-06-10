import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext.js';
import background from "../../images/background.jpg";
import './RestaurantDetail.css';

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [ openingHours, setOpeningHours ] = useState([]);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

const getDayName = (dayNumber) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayNumber - 1]; 
};

const formatTime = (time) => {
const [hours, minutes] = time.split(":");
const period = +hours >= 12 ? "PM" : "AM";
const formattedHours = +hours % 12 || 12; // Converts "00" to "12"
return `${formattedHours}:${minutes} ${period}`;
};


    const fetchRestaurantDetails =useCallback( async () => {
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
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const fetchRatings = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://127.0.0.1:5000/restaurants/ratings/fetch_by_restaurant`,{ 
                restaurant_id: +id
            }, {
                headers: {
                    'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
                    'Content-Type': 'application/json'
                }
            });
            setReviews(response.data.reviews || []);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        } finally {
            setIsLoading(false);
        }
    },[id]);
    
    const fetchOpeningHours = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://127.0.0.1:5000/restaurants/opening_hours/fetch_all_by_restaurant_id`,{ 
                fk_restaurant: +id
            }, {
                headers: {
                    'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data && Array.isArray(response.data)) {
            setOpeningHours(response.data);
        } else {
            setOpeningHours([]); 
        }
    } catch (error) {
        console.error('Error fetching opening hours:', error);
        setOpeningHours([]);
    } finally {
        setIsLoading(false);
    }
},[id]);

    const renderReviews = () => {
    if (!reviews || reviews.length === 0) {
        return <p>No reviews available.</p>;
    }
    return reviews.map((review) => (
        <div key={review.id} className="review-item">
            <strong>{review.user_name}: </strong>{review.review}
            <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Enter reply" />
            <button onClick={() => handleReplySubmit(review.id)} disabled={isLoading}>Submit Reply</button>
        </div>
    ));
};

    const renderOpeningHours = () => {
        if (!openingHours || !openingHours.length) {
            return <p>No opening hours available.</p>;
        }
        return openingHours.map((hour, index) => (
            <div key={index}>
                <strong>{getDayName(hour.week_day)}: </strong> 
                {formatTime(hour.open_time)} - {formatTime(hour.close_time)}
            </div>
        ));
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

    //renders stars
    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            return (
                <span key={index}
                    className={rating > index ? 'star on' : 'star off'}
                    onClick={() => setRating(index + 1)}>&#9733;</span>
            );
        });
    };

    useEffect(() => {
        fetchRestaurantDetails();
        fetchRatings();
        fetchOpeningHours();
    }, [fetchRestaurantDetails, fetchRatings, fetchOpeningHours]);

return (
    <div className="bg-container" style={{
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: "cover",
        }}>
    <div className="container">
            {restaurant?.images && <img src={restaurant.images[0]} alt={restaurant.name} />}
            <h1>{restaurant?.name}</h1>
            <p>{restaurant?.description}</p>
            {renderOpeningHours()}
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
        </div>
    );
};

export default RestaurantDetail;
