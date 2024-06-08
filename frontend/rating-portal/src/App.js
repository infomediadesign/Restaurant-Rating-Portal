// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import RestaurantList from './components/Restaurant/RestaurantList';
import RestaurantDetail from './components/Restaurant/RestaurantDetail';
import AddRestaurantPicture from './components/Restaurant/AddRestaurantPicture';
import Login from './pages/Login/login';
import RegisterUser from './pages/Register/registerUser';
import RegisterOwner from './pages/Register/registerOwner';
import OwnerDashboard from './components/OwnerDashboard/OwnerDashboard';
import CreateRestaurant from './components/CreateRestaurant/CreateRestaurant';
import EditRestaurant from './components/EditRestaurant/EditRestaurant';
import ViewRatings from './components/ViewRatings/ViewRatings';
import AddRestaurant from './components/AddRestaurant/AddRestaurant';
import UserReviews from './components/UserReviews/UserReviews';
import { UserProvider } from './components/UserContext/UserContext';
import MyProfilePage from './components/MyProfile/MyProfile';

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
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
          <Route path="/view-ratings/:id" element={<ViewRatings />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/my-reviews" element={<UserReviews />} />
          <Route path='/my-profile' element={<MyProfilePage />} />
          <Route path='/add-restaurant-picture' element={<AddRestaurantPicture />}/>
                  </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
