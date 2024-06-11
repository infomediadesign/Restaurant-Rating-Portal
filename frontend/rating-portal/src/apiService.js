import axios from 'axios';

const apiBaseURL = 'http://127.0.0.1:5000';
const authHeader = {
    'Authorization': `Basic ${btoa('api_gateway:Xe812C81M9yA')}`,
    'Content-Type': 'application/json'
};
export const fetchRestaurantDetails = async (id) => {
    const response = await axios.post(`${apiBaseURL}/restaurants/fetch_by_id`, {
        pk_restaurant: +id
    }, { headers: authHeader });
    return response.data;
};

export const fetchOpeningHours = async (id) => {
    const response = await axios.post(`${apiBaseURL}/restaurants/opening_hours/fetch_all_by_restaurant_id`, {
        fk_restaurant: +id
    }, { headers: authHeader });
    return response.data;
};

export const createRating = async (id, restaurantId, stars, reviewText) => {
    const response = await axios.post(`${apiBaseURL}/ratings/create`, {
                fk_user: +id,
                fk_restaurant: restaurantId,
                stars: stars,
                review: reviewText
    }, { headers: authHeader });
    return response.data;
};

export const createReply = async (id, ratingId, replyText) => {
    const response = await axios.post(`${apiBaseURL}/ratings/replies/create`, {
                fk_user: +id,
                fk_rating: ratingId,
                message: replyText
    }, { headers: authHeader });
    return response.data;
};

export const fetchRatings = async (id) => {
    const response = await axios.post(`${apiBaseURL}/ratings/fetch_by_restaurant`, {
        restaurant_id: +id
    }, { headers: authHeader });
    return response.data.reviews || [];
};

export const fetchRepliesByRating = async (ratingId) => {
    const response = await axios.post(`${apiBaseURL}/ratings/replies/fetch_by_rating`, {
        rating_id: ratingId
    }, { headers: authHeader });
    return response.data.replies || [];
};