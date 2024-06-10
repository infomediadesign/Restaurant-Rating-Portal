import React from 'react';

const RatingComponent = ({ rating, setRating }) => {
    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            return (
                <span key={index}
                    style={{
                        cursor: 'pointer',
                        color: rating > index ? 'gold' : 'gray',
                        fontSize: '24px'
                    }}
                    onClick={() => setRating(index + 1)}>&#9733;</span>
            );
        });
    };

    return (
        <div>
            {renderStars()}
        </div>
    );
};

export default RatingComponent;
