    import React, { useState } from 'react';
    import { useParams } from 'react-router-dom';
    import Rating from 'react-rating-stars-component';

    import littleindia from '../../images/littleindia.jpg';
    import naancurry from '../../images/naan&curry.png';
    import image from '../../images/image.png';
    import background from '../../images/background.jpg';

    const sampleRestaurants = [
    {
        id: 1,
        name: 'Little India',
        location: 'U1, Mannheim',
        rating: 4.5,
        image: littleindia,
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
        image: naancurry,
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
        image: image,
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
        return <div style={{ padding: '20px', textAlign: 'center' }}>Restaurant not found</div>;
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', maxWidth: '900px', margin: '0 auto', padding: '20px', position: 'relative' }}>
        {/* Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: `url(${background}) no-repeat center center fixed`, backgroundSize: 'cover', filter: 'brightness(0.8)' }}></div>

        {/* Restaurant Image */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{
                width: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '10px',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
            }}
            />
        </div>

        {/* Restaurant Details */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '36px', color: '#2c3e50', marginBottom: '10px' }}>{restaurant.name}</h1>
            <p style={{ fontSize: '18px', color: '#7f8c8d', marginBottom: '20px' }}>{restaurant.description}</p>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Location:</strong> {restaurant.location}</p>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}><strong>Opening Hours:</strong> {restaurant.openingHours}</p>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ fontSize: '18px', marginRight: '10px' }}><strong>Rating:</strong> {restaurant.rating}</p>
            <Rating
                count={5}
                value={restaurant.rating}
                edit={false}
                size={24}
                activeColor="#ffd700"
            />
            </div>
        </div>

        {/* User Reviews Section */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#2c3e50' }}>User Reviews</h3>
            {restaurant.reviews.length === 0 ? (
            <p style={{ fontSize: '16px' }}>No reviews yet. Be the first to review!</p>
            ) : (
            restaurant.reviews.map((review) => (
                <div key={review.id} style={{ marginBottom: '20px', padding: '10px', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ fontSize: '16px', color: '#2c3e50', marginBottom: '5px' }}><strong>{review.user}</strong></p>
                <Rating
                    count={5}
                    value={review.rating}
                    edit={false}
                    size={20}
                    activeColor="#ffd700"
                />
                <p style={{ fontSize: '16px', color: '#555' }}>{review.comment}</p>
                </div>
            ))
            )}
        </div>

        {/* Review Submission Section */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#2c3e50' }}>Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
            <div style={{ marginBottom: '10px' }}>
                <input type="text" name="user" placeholder="Your Name" value={userReview.user} onChange={handleInputChange} style={{ fontSize: '16px', padding: '8px', width: '100%', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <Rating
                count={5}
                value={userReview.rating}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <textarea name="comment" placeholder="Your Review" value={userReview.comment} onChange={handleInputChange} style={{ fontSize: '16px', padding: '8px', width: '100%', height: '100px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div>
                <button type="submit" style={{ fontSize: '16px', padding: '10px 20px', backgroundColor: '#ff6347', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)' }}>Submit Review</button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default RestaurantDetail;
