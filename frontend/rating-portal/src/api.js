import axios from "axios";

const API_URL = "http://127.0.0.1:5002";

export const fetchRestaurants = async () => {
const username = "api_gateway";
const userPassword = "Xe812C81M9yA";
const token = btoa(`${username}:${userPassword}`);

    const response = await axios.post(
        `${API_URL}/fetch_all`,
        {},
        {
        headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
        },
        }
    );
    return response.data;
    };

    export const submitRating = async (ratingData) => {
    const username = "api_gateway";
    const userPassword = "Xe812C81M9yA";
    const token = btoa(`${username}:${userPassword}`);

    const response = await axios.post(
        `${API_URL}/ratings/fetch_by_rating`,
        ratingData,
        {
        headers: {
            Authorization: `Basic ${token}`,
            "Content-Type": "application/json",
        },
        }
    );
    return response.data;
    };
