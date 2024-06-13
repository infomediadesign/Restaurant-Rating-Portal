import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RestaurantList.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import RatingComponent from "../../components/Ratings/RatingComponent";
import { fetchAverageRatings } from "../../apiService";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [averageRatings, setAverageRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/restaurants/fetch_all",
          {},
          {
            headers: {
              Authorization: `Basic ${btoa("api_gateway:Xe812C81M9yA")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRestaurants(response.data);
        const avgRatings = await fetchAverageRatings();
        setAverageRatings(avgRatings);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const results = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(results);
  }, [searchQuery, restaurants]);

  const SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="bg-container">
      <div className="container">
        <h1 className="text-center mb-4">Restaurants Near You</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {filteredRestaurants.length > 0 ? (
          <div className="row">
            {filteredRestaurants.map((restaurant) => (
              <div className="col-md-4 mb-4" key={restaurant.pk_restaurant}>
                <div
                  className="card"
                  onClick={() =>
                    navigate(`/restaurant/${restaurant.pk_restaurant}`)
                  }
                >
                  <Slider {...SliderSettings}>
                    {restaurant.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          className="card-img-top"
                          alt={restaurant.name}
                        />
                      </div>
                    ))}
                  </Slider>
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">Genre: {restaurant.genre}</p>
                    <p className="card-text">
                      Address:{" "}
                      {`${restaurant.house_number} ${restaurant.street_name}, ${restaurant.city}`}
                    </p>
                    <RatingComponent
                      rating={
                        parseFloat(averageRatings[restaurant.pk_restaurant]) ||
                        0
                      }
                      isClickable={false}
                      displayNumeric={true}
                    />
                    {restaurant.verified ? (
                      <span className="badge bg-success">Verified</span>
                    ) : (
                      <span className="badge bg-danger">Not Verified</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No Restaurants Found</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
