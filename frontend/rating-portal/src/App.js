import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import RestaurantList from "./pages/Restaurant/RestaurantList";
import RestaurantDetail from './pages/RestaurantDetail/RestaurantDetail';
import OpeningHours from "./components/OpeningHours/OpeningHours";
import RatingComponent from "./components/Ratings/RatingComponent";
import AddRestaurantPicture from "./components/AddRestaurantPicture";
import Login from "./pages/Login/login";
import RegisterUser from "./pages/Register/registerUser";
import RegisterOwner from "./pages/Register/registerOwner";
import OwnerDashboard from "./components/OwnerDashboard/OwnerDashboard";
import CreateRestaurant from "./components/CreateRestaurant/CreateRestaurant";
import EditRestaurant from "./components/EditRestaurant/EditRestaurant";
import ViewRatings from "./components/ViewRatings/ViewRatings";
import AddRestaurant from "./components/AddRestaurant/AddRestaurant";
import { UserProvider } from "./components/UserContext/UserContext";
import MyProfilePage from "./components/MyProfile/MyProfile";
import MyReviews from "./components/MyReviews/MyReviews";
import Reviews from "./pages/RestaurantDetail/Reviews";


function App() {

  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/opening-hours" element={<OpeningHours />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
          <Route path="/view-ratings/:id" element={<ViewRatings />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/rating" element={<RatingComponent />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route path="/add-resturant-picture" element={<AddRestaurantPicture />}/>
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
