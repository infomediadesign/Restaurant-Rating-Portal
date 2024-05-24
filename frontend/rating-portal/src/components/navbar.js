import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
  return (
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
  );
};

export default Navbar;