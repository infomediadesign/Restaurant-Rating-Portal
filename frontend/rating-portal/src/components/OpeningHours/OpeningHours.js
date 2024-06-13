import React from 'react';
import "./OpeningHours.css";

const OpeningHours = ({ openingHours }) => {
    if (!openingHours || openingHours.length === 0) return <p>No opening hours available.</p>;

    const getDayName = (dayNumber) => {
        const days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return days[dayNumber - 1];
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        const period = +hours >= 12 ? "PM" : "AM";
        const formattedHours = +hours % 12 || 12; // Converts "00" to "12"
        return `${formattedHours}:${minutes} ${period}`;
    };

    return (
        <div  className="opening-hours-container">
            {openingHours.map((hour, index) => (
                <div key={`hour-${index}`}  className="hour-detail">
                    <strong>{getDayName(hour.week_day)}: </strong> 
                    {formatTime(hour.open_time)} - {formatTime(hour.close_time)}
                </div>
            ))}
        </div>
    );
};

export default OpeningHours;
