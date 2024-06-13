import React from "react";

const RatingComponent = ({
  rating = 0,
  setRating,
  isClickable = true,
  displayNumeric = false,
}) => {
  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      return (
        <span
          key={index}
          style={{
            cursor: isClickable ? "pointer" : "default",
            color: rating > index ? "gold" : "gray",
            fontSize: "24px",
          }}
          onClick={() => isClickable && setRating && setRating(index + 1)}
        >
          &#9733;
        </span>
      );
    });
  };

  return (
    <div>
      {renderStars()}
      {displayNumeric && (
        <span style={{ marginLeft: "8px", fontSize: "16px" }}>
          ({Number(rating).toFixed(1)})
        </span>
      )}
    </div>
  );
};

export default RatingComponent;
