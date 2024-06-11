import React, { useState, useEffect } from "react";
import { fetchRatings } from "../../apiService";

const Reviews = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        setIsLoading(true);
        const fetchedRatings = await fetchRatings(restaurantId);
        console.log("Fetched Ratings:", fetchedRatings);
        setReviews(Array.isArray(fetchedRatings) ? fetchedRatings : []);
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRatings();
  }, [restaurantId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.pk_rating}>
            <strong>User {review.fk_user}:</strong> {review.review}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default Reviews;
