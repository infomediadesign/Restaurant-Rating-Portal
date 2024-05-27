import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './pages/HomePage';
import RestaurantList from './components/Restaurant/RestaurantList';
import RestaurantDetail from './components/Restaurant/RestaurantDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>      
    </Router>
  );
}

export default App;
