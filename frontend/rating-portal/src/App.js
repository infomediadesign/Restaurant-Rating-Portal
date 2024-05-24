import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/homepage';
import RestaurantList from './pages/restaurant/RestaurantList';
import RestaurantDetail from './pages/restaurant/RestaurantDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>      
    </Router>
  );
}

export default App;
