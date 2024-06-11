import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext.js";
import background from "../../images/background.jpg";
import "./RestaurantDetail.css";
import Carousel from "../../components/Carousel/Carousel.js";
import Reviews from "./Reviews";
import OpeningHours from "./OpeningHours";
import RatingComponent from "../Ratings/RatingComponent";
import {
  createRating,
  createReply,
  fetchRestaurantDetails,
  fetchRatings,
  fetchOpeningHours,
  fetchRepliesByRating,
  fetchAverageRatings,
} from "../../apiService";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [replyText, setReplyText] = useState("");
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
        const ratings = await fetchRatings(+id);
        console.log("Ratings fetched:", ratings);
        const avgRatings = await fetchAverageRatings();
        console.log("Average ratings fetched:", avgRatings);

        const ratingsWithReplies = await Promise.all(
          ratings.map(async (rating) => {
            console.log("Fetching replies for rating ID:", rating.pk_rating);
            const replies = await fetchRepliesByRating(rating.pk_rating);
            return { ...rating, replies };
          })
        );

        setRestaurant(details);
        setReviews(ratingsWithReplies);
        const hours = await fetchOpeningHours(+id);
        setOpeningHours(hours);
        console.log("Opening hours fetched:", hours);
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
    console.log("Submitting rating:", { rating, reviewText });
    if (rating === 0 || !user || !user.pk_user) {
      alert("Please select a rating and ensure you are logged in.");
      return;
    }
    setIsLoading(true);
    try {
      const newReview = await createRating(
        user.pk_user,
        +id,
        rating,
        reviewText
      );
      console.log("New review submitted:", newReview);
      const preparedReview = {
        ...newReview,
        replies: [],
      };
      setReviews((prevReviews) => [...prevReviews, preparedReview]);
      setRating(0);
      setReviewText("");
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
        replyText,
      });
      const reply = await createReply(user.pk_user, ratingId, replyText);
      console.log("Reply submission successful:", reply);
      const updatedReviews = reviews.map((review) =>
        review.pk_rating === ratingId
          ? { ...review, replies: [...review.replies, reply] }
          : review
      );
      setReviews(updatedReviews);
      setReplyText();
      setReplyTexts((prevReplyTexts) => ({
        ...prevReplyTexts,
        [ratingId]: "",
      }));
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
        <p className="restaurant-description">{restaurant?.description}</p>
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
        <Reviews reviews={reviews} isLoading={isLoading} />
        {reviews.map((review) => (
          <div key={review.pk_rating}>
            <p>{review.review}</p>
            {review.replies.map((reply) => (
              <div key={reply.pk_reply} className="reply">
                <p>{reply.message}</p>
                <small>{new Date(reply.timestamp).toLocaleString()}</small>
              </div>
            ))}
            <input
              type="text"
              value={replyTexts[review.pk_rating] || ""}
              onChange={(e) =>
                handleReplyTextChange(review.pk_rating, e.target.value)
              }
              placeholder="Type your reply here"
            />
            <button onClick={() => handleReplySubmit(review.pk_rating)}>
              Submit Reply
            </button>
          </div>
        ))}
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
      </div>
    </div>
  );
};

export default RestaurantDetail;
