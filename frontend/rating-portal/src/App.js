import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './pages/HomePage';
import RestaurantList from './components/Restaurant/RestaurantList';
import RestaurantDetail from './components/Restaurant/RestaurantDetail';
import Login from './pages/Login/login.js';
import RegisterUser from './pages/Register/registerUser.js';
import RegisterOwner from './pages/Register/registerOwner.js';

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
      </Routes>      
    </Router>
  );
}

export default App;
