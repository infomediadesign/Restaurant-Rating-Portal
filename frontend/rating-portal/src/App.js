import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/homepage';
import RestaurantList from '/Users/riddhiodedra/Desktop/sad-01-24-gitguardians/frontend/rating-portal/src/pages/Home/restaurant/RestaurantList.js';
import RestaurantDetail from '/Users/riddhiodedra/Desktop/sad-01-24-gitguardians/frontend/rating-portal/src/pages/Home/restaurant/RestaurantDetail.js';
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
