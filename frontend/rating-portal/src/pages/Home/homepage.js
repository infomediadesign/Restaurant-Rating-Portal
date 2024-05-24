import React from "react";
import { NavLink } from "react-router-dom";
import "./homepage.css";
import myImage from "../../images/homepageimg.jpg";

const Home = () => {
  return (
    <div className="container">
      <nav data-testid="main_nav" className="navbar">
        <NavLink to="/" data-testid="brandName">
          EatInsight
        </NavLink>
        <NavLink to="/restaurants" className="nav-link" activeClassName="active">
          RESTAURANTS
        </NavLink>
        <NavLink to="/aboutus" className="nav-link" activeClassName="active">
          ABOUT US
        </NavLink>
        <NavLink to="/contactus" className="nav-link" activeClassName="active">
          CONTACT US
        </NavLink>
        <NavLink to="/login" className="nav-link" activeClassName="active">
          SIGN IN
        </NavLink>
      </nav>
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
