import React, { useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { UserContext } from '../UserContext/UserContext.js';

const RestaurantDetail = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState("");
    const [reply, setReply] = useState('');
    // const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
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
            }
        };
        fetchRestaurantDetails();
    }, [id]);

    const handleRatingSubmit = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/ratings/create", { 
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
            alert('Rating submitted successfully!');
            setRating('');
            setReview('');
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const handleReplySubmit = async () => {
        try {
            await axios.post('http://127.0.0.1:5000/ratings/replies/create', {
                pk_rating: rating,
                reply
            });
            alert('Reply submitted successfully!');
            setReply("");
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };


    return (
        <div>
            <h1>{restaurant?.name}</h1>
            <p>{restaurant?.description}</p>
            <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Enter stars" />
            <input type="text" value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter review" />
            <button onClick={handleRatingSubmit}>Submit Rating</button>
            <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Enter reply" />
            <button onClick={handleReplySubmit}>Submit Reply</button>
        </div>
    );
};

export default RestaurantDetail;

