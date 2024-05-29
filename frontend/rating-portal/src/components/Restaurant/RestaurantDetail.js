    import React, { useState } from 'react';
    import { useParams } from 'react-router-dom';
    import Rating from 'react-rating-stars-component';
    import './RestaurantDetail.css';

    import image1 from '../../images/image1.png';
    import image2 from '../../images/image2.jpg';
    import image3 from '../../images/image3.png';
    import image4 from '../../images/image4.png';
    import image5 from '../../images/image5.png';
    import image6 from '../../images/image6.jpg';
    import background from '../../images/background.jpg';
    

    const sampleRestaurants = [
        {
            id: 1,
            name: 'Little India',
            location: 'U1, Mannheim',
            rating: 4.5,
            image: image1,
            openingHours: 'Monday-Sunday: 11:00 AM - 22:00 PM',
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
            image: image2,
            openingHours: 'Monday-Saturday: 12:00 PM - 21:00 PM',
            reviews: [
                { id: 1, user: 'Alice Johnson', rating: 4, comment: 'Delicious food, but service could be faster.' },
            ],
        },
        {
            id: 3,
            name: 'Raja Rani',
            location: 'Heidelberg',
            rating: 4.8,
            image: image3,
            openingHours: 'Tuesday-Sunday: 17:00 PM - 23:00 PM',
            reviews: [],
        },
        {
            id: 4,
            name: 'Spice Villa',
            location: 'Frankfurt',
            rating: 4.7,
            image: image4,
            openingHours: 'Monday-Sunday: 12:00 PM - 23:00 PM',
            reviews: [
                { id: 1, user: 'Tom Hanks', rating: 5, comment: 'Amazing ambiance and food!' },
            ],
        },
        {
            id: 5,
            name: 'Curry House',
            location: 'Berlin',
            rating: 4.3,
            image: image5,
            openingHours: 'Monday-Friday: 13:00 PM - 22:00 PM',
            reviews: [
                { id: 1, user: 'Sandra Bullock', rating: 4, comment: 'Good food, decent service.' },
            ],
        },
        {
            id: 6,
            name: 'Tandoori Palace',
            location: 'Hamburg',
            rating: 4.3,
            image: image6,
            openingHours: 'Monday-Friday: 14:00 PM - 23:00 PM',
            reviews: [
                { id: 1, user: 'Leonardo Dcaprio', rating: 5, comment: 'Good food, decent service.' },
            ],
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
            return <div style={{ padding: '20px', textAlign: 'center' }}>Restaurant not found</div>;
        }

    return (
        <div className="restaurant-detail-container">
            {/* Background Image */}
            <div className="restaurant-detail-background" style={{ backgroundImage: `url(${background})` }}></div>

            {/* Restaurant Image */}
            <div className="restaurant-image-container">
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
            </div>

            {/* Restaurant Information */}
            <div className="restaurant-info-container">
                <h1 className="restaurant-name">{restaurant.name}</h1>
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-location"><strong>Location:</strong> {restaurant.location}</p>
                <p className="restaurant-hours"><strong>Opening Hours:</strong> {restaurant.openingHours}</p>
                <div className="restaurant-rating-container">
                    <p className="restaurant-rating"><strong>Rating:</strong> {restaurant.rating}</p>
                    <Rating count={5} value={restaurant.rating} edit={false} size={24} activeColor="#ffd700" />
                </div>
            </div>

            {/* User Reviews */}
            <div className="user-reviews-container">
                <h3 className="user-reviews-title">User Reviews</h3>
                {restaurant.reviews.length === 0 ? (
                    <p className="no-reviews-message">No reviews yet. Be the first to review!</p>
                ) : (
                    restaurant.reviews.map((review) => (
                        <div key={review.id} className="user-review">
                            <p className="user-review-user"><strong>{review.user}</strong></p>
                            <Rating count={5} value={review.rating} edit={false} size={20} activeColor="#ffd700" />
                            <p className="user-review-comment">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Review Form */}
            <div className="review-form-container">
                <h3 className="review-form-title">Write a Review</h3>
                <form onSubmit={handleSubmitReview}>
                    <div className="review-form-group">
                        <input type="text" name="user" placeholder="Your Name" value={userReview.user} onChange={handleInputChange} className="review-form-input" />
                    </div>

                    <div className="review-form-group">
                        <Rating count={5} value={userReview.rating} onChange={handleRatingChange} size={24} activeColor="#ffd700" />
                    </div>

                    <div className="review-form-group">
                        <textarea name="comment" placeholder="Your Review" value={userReview.comment} onChange={handleInputChange} className="review-form-textarea" />
                    </div>

                    <div className="review-form-group">
                        <button type="submit" className="review-form-button">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
    export default RestaurantDetail;
