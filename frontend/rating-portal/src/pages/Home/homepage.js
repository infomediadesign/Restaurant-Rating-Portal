import React from "react";
import "./homepage.css";
import myImage from "../../images/homepageimg.jpg";
import Navbar from "../../components/navbar";

const Home = () => {
  return (
    <div className="container">
      <div>
        <Navbar/>
      </div>
      <div className="content">
        <div className="left-content">
          <h2>Welcome to EatInsight.</h2>
          <p>Discover the essence of culinary excellence with our trusted restaurant ratings and reviews platform. Explore, indulge, and make informed dining choices for unforgettable gastronomic adventures.</p>
          <div className="buttons">
            <button class="btn-signup">SIGN UP</button>
            <button class="btn-owner">SIGN UP AS OWNER</button>
          </div>

        </div>
        <div className="image-container">
          <img src={myImage} className="img" alt="homepage" />
        </div>
      </div>
    </div>
  );
};

export default Home;
