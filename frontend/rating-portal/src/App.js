import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './pages/HomePage';
import RestaurantList from './components/Restaurant/RestaurantList';
import RestaurantDetail from './components/Restaurant/RestaurantDetail';
import Login from './pages/Login/login.js';
import RegisterUser from './pages/Register/registerUser.js';
import RegisterOwner from './pages/Register/registerOwner.js';
import OwnerDashboard from './components/OwnerDashboard/OwnerDashboard';
import CreateRestaurant from './components/CreateRestaurant/CreateRestaurant';
import EditRestaurant from './components/EditRestaurant/EditRestaurant';
import ViewRatings from './components/ViewRatings/ViewRatings';
import AddRestaurant from './components/AddRestaurant/AddRestaurant';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path='/register-user' element={<RegisterUser />} />
        <Route path='/register-owner' element={<RegisterOwner />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/create-restaurant" element={<CreateRestaurant />} />
        <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
        <Route path="/view-ratings/:id" element={<ViewRatings />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        
  
      </Routes>      
    </Router>
  );
}

export default App;
