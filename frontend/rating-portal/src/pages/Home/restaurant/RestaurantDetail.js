    // src/pages/Home/restaurant/RestaurantDetail.js
    import React, { useState } from 'react';
    import { useParams } from 'react-router-dom';
    import Rating from 'react-rating-stars-component';
    import './restaurant.css';

    import restaurant1 from '../../../images/littleindia.jpg';
    import restaurant2 from '../../../images/naan&curry.png';
    import restaurant3 from '../../../images/image.png';
    import background from '../../../images/background.jpg';

    const sampleRestaurants = [
    {
        id: 1,
        name: 'Little India',
        location: 'U1, Mannheim',
        rating: 4.5,
        image: restaurant1,
        openingHours: 'Monday-Sunday: 11:00 AM - 10:00 PM',
        reviews: [
        { id: 1, user: 'John Doe', rating: 4, comment: 'Great food and service!' },
        { id: 2, user: 'Jane Smith', rating: 5, comment: 'Best Indian restaurant in town!' },
        ],
    },
    {
        id: 2,
        name: 'Naan&Curry',
        location: 'S2, Mannheim',
        rating: 4.2,
        image: restaurant2,
        openingHours: 'Monday-Saturday: 12:00 PM - 9:00 PM',
        reviews: [
        { id: 1, user: 'Alice Johnson', rating: 4, comment: 'Delicious food, but service could be faster.' },
        ],
    },
    {
        id: 3,
        name: 'Raja Rani',
        location: 'Heidelberg',
        rating: 4.8,
        image: restaurant3,
        openingHours: 'Tuesday-Sunday: 5:00 PM - 11:00 PM',
        reviews: [],
    },
    ];

    const RestaurantDetail = () => {
    const { id } = useParams();
    const [userReview, setUserReview] = useState({ user: '', rating: 0, comment: '' });

    const restaurant = sampleRestaurants.find((restaurant) => restaurant.id === parseInt(id));

    const handleInputChange = (e) => {
        setUserReview({ ...userReview, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (newRating) => {
        setUserReview({ ...userReview, rating: newRating });
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        restaurant.reviews.push(userReview);
        setUserReview({ user: '', rating: 0, comment: '' });
    };

    if (!restaurant) {
        return <div className="not-found">Restaurant not found</div>;
    }

    return (
        <div className="restaurant-detail-container">
        <div className="background-image"></div>

        <div className="restaurant-image">
            <img src={restaurant.image} alt={restaurant.name} />
        </div>

        <div className="restaurant-details">
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Opening Hours:</strong> {restaurant.openingHours}</p>
            <div className="rating">
            <p><strong>Rating:</strong> {restaurant.rating}</p>
            <Rating count={5} value={restaurant.rating} edit={false} size={24} activeColor="#ffd700" />
            </div>
        </div>

        <div className="user-reviews">
            <h3>User Reviews</h3>
            {restaurant.reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
            ) : (
            restaurant.reviews.map((review) => (
                <div key={review.id} className="review">
                <p><strong>{review.user}</strong></p>
                <Rating count={5} value={review.rating} edit={false} size={20} activeColor="#ffd700" />
                <p>{review.comment}</p>
                </div>
            ))
            )}
        </div>

        <div className="review-form">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
            <div>
                <input type="text" name="user" placeholder="Your Name" value={userReview.user} onChange={handleInputChange} />
            </div>
            <div>
                <Rating count={5} value={userReview.rating} onChange={handleRatingChange} size={24} activeColor="#ffd700" />
            </div>
            <div>
                <textarea name="comment" placeholder="Your Review" value={userReview.comment} onChange={handleInputChange} />
            </div>
            <div>
                <button type="submit">Submit Review</button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default RestaurantDetail;
