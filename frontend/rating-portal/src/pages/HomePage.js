    import React from 'react';
    import RestaurantList from '../pages/Restaurant/RestaurantList';


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
        <RestaurantList />
        </div>
    );
    };

    export default HomePage;
