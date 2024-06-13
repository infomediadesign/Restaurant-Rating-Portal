import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../components/UserContext/UserContext.js";
import background from "../../images/background.jpg";
import "./RestaurantDetail.css";
import Carousel from "../../components/Carousel/Carousel.js";
import OpeningHours from "../../components/OpeningHours/OpeningHours.js";
import RatingComponent from "../../components/Ratings/RatingComponent.js";
import {
  createRating,
  createReply,
  fetchRestaurantDetails,
  fetchRatings,
  fetchOpeningHours,
  fetchRepliesByRating,
  fetchAverageRatings,
} from "../../apiService.js";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [replyTexts, setReplyTexts] = useState({});
  const [openingHours, setOpeningHours] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Effect running: Fetching restaurant details and ratings.");
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching restaurant details for ID:", id);
        const details = await fetchRestaurantDetails(+id);
        console.log("Restaurant details fetched:", details);

        const ratingsResponse = await fetchRatings(+id);
        const ratings = ratingsResponse.ratings || [];
        console.log("Ratings fetched:", ratings);

        const ratingsWithReplies = await Promise.all(
          ratings.map(async (rating) => {
            const replies = await fetchRepliesByRating(rating.pk_rating);
            return { ...rating, replies };
          })
        );

        setRestaurant(details);
        setReviews(ratingsWithReplies.reverse());

        const hours = await fetchOpeningHours(+id);
        setOpeningHours(hours);
        console.log("Opening hours fetched:", hours);

        const avgRatings = await fetchAverageRatings();
        console.log("Average ratings fetched:", avgRatings);
        setAverageRating(parseFloat(avgRatings[id]) || 0);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
        console.log("Fetching process completed.");
      }
    };
    fetchDetails();
  }, [id]);

  const handleRatingSubmit = async () => {
    if (!user || !user.pk_user) {
      alert("You must be logged in to submit a rating.");
      setRating(0);
      return;
    }
    console.log("Submitting rating:", { rating, reviewText });
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    setIsLoading(true);
    try {
      const response = await createRating(
        user.pk_user,
        +id,
        rating,
        reviewText
      );
      console.log("New review submitted:", response);

      const maxPkRating = Math.max(...reviews.map((r) => r.pk_rating), 0);

      const newReview = {
        fk_restaurant: +id,
        fk_user: user.pk_user,
        pk_rating: maxPkRating + 1,
        review: reviewText,
        stars: rating,
        replies: [],
        timestamp: new Date().toISOString(),
      };

      setReviews((prevReviews) => [newReview, ...prevReviews]);
      setRating(0);
      setReviewText("");
      console.log("Updated reviews state:", reviews);
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating.");
    } finally {
      setIsLoading(false);
      console.log("Rating submission process completed.");
    }
  };

  const handleReplySubmit = async (ratingId) => {
    console.log("Attempting to submit reply for rating ID:", ratingId);
    if (!ratingId) {
      console.error("No rating ID provided");
      alert("No rating ID provided");
      return;
    }
    if (!user || !user.pk_user) {
      alert("You must be logged in to reply.");
      return;
    }
    setIsLoading(true);
    try {
      console.log("Submitting reply:", {
        userId: user.pk_user,
        ratingId,
        replyText: replyTexts[ratingId],
      });
      const reply = await createReply(
        user.pk_user,
        ratingId,
        replyTexts[ratingId]
      );
      console.log("Reply submission successful:", reply);

      const updatedReplies = await fetchRepliesByRating(ratingId);

      const updatedReviews = reviews.map((review) =>
        review.pk_rating === ratingId
          ? { ...review, replies: updatedReplies }
          : review
      );
      setReviews(updatedReviews);
      setReplyTexts((prevReplyTexts) => ({
        ...prevReplyTexts,
        [ratingId]: "",
      }));
      console.log("Updated reviews state with new reply:", updatedReviews);
      alert("Reply submitted successfully!");
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("Failed to submit reply.");
    } finally {
      setIsLoading(false);
      console.log("Reply submission process completed.");
    }
  };

  const handleReplyTextChange = (ratingId, text) => {
    setReplyTexts((prevReplyTexts) => ({
      ...prevReplyTexts,
      [ratingId]: text,
    }));
  };

  return (
    <div
      className="bg-container"
      style={{
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        {restaurant?.images && <Carousel images={restaurant.images} />}
        <h1 className="restaurant-name">{restaurant?.name}</h1>
        {restaurant?.verified ? (
          <span className="badge bg-success">Verified</span>
        ) : (
          <span className="badge bg-danger">Not Verified</span>
        )}
        <div className="card-body">
          <p className="card-text">Genre: {restaurant?.genre}</p>
          <p className="card-text">
            Address:{" "}
            {`${restaurant?.house_number} ${restaurant?.street_name}, ${restaurant?.city}`}
          </p>
          <RatingComponent
            rating={averageRating}
            isClickable={false}
            displayNumeric={true}
          />
        </div>
        <OpeningHours openingHours={openingHours} />
        <RatingComponent rating={rating} setRating={setRating} />
        <input
          type="text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter review"
        />
        <button onClick={handleRatingSubmit} disabled={isLoading}>
          Submit Rating
        </button>
        <div className="reviews-list">
          <h3>User Reviews:</h3>
          {reviews.map((rating) => (
            <div key={rating.pk_rating} className="review-item">
              <RatingComponent
                rating={rating.stars}
                isClickable={false}
                displayNumeric={true}
              />

              <p>{rating.review}</p>
              <small className="timestamp">{new Date(rating.timestamp).toLocaleString()}</small> 
              {rating.replies && rating.replies.length > 0 ? (
                rating.replies.map((reply) => (
                  <div key={reply.pk_reply} className="reply">
                    <p>{reply.message}</p>
                    <small className="timestamp">{new Date(reply.timestamp).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p className="no-replies">No replies yet.</p>
              )}
              <input
                type="text"
                value={replyTexts[rating.pk_rating] || ""}
                onChange={(e) =>
                  handleReplyTextChange(rating.pk_rating, e.target.value)
                }
                placeholder="Type your reply here"
              />
              <button onClick={() => handleReplySubmit(rating.pk_rating)}>
                Submit Reply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
