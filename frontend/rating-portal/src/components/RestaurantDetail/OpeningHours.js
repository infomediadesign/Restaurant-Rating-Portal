import React from 'react';

const OpeningHours = ({ openingHours }) => {
    if (!openingHours || openingHours.length === 0) return <p>No opening hours available.</p>;

    const getDayName = (dayNumber) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayNumber - 1];
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        const period = +hours >= 12 ? "PM" : "AM";
        const formattedHours = +hours % 12 || 12; // Converts "00" to "12"
        return `${formattedHours}:${minutes} ${period}`;
    };

    return (
        <div>
            {openingHours.map((hour, index) => (
                <div key={`hour-${index}`}>
                    <strong>{getDayName(hour.week_day)}: </strong> 
                    {formatTime(hour.open_time)} - {formatTime(hour.close_time)}
                </div>
            ))}
        </div>
    );
};

export default OpeningHours;
