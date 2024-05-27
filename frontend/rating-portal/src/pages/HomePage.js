    import React from 'react';
    import RestaurantList from '../components/Restaurant/RestaurantList';

    const HomePage = () => {
    return (
        <div style={{ padding: '20px' }}>
        {/* Background Image */}
        <div
            style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'url(./../../images/background.jpg) no-repeat center center fixed',
            backgroundSize: 'cover',
            filter: 'brightness(0.7)',
            }}
        ></div>
        
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Restaurants Near You</h1>
        <RestaurantList />
        </div>
    );
    };

    export default HomePage;
