import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const MyProfilePage = () => {
    const { pkUser } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                if (!pkUser) {
                    setError("User ID is missing. Please log in to view your profile.");
                    setLoading(false);
                    return;
                }

                const username = 'api_gateway';
                const userPassword = 'Xe812C81M9yA';
                const token = btoa(`${username}:${userPassword}`);

                const response = await axios.post(
                    'http://localhost:5000/users/fetch_by_id',
                    { user_id: pkUser },
                    {
                        headers: {
                            'Authorization': `Basic ${token}`
                        }
                    }
                );
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                setError("Error loading profile data. Please try again later.");
                setLoading(false);
            }
        };

        if (pkUser) {
            fetchProfileData();
        }
    }, [pkUser]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>My Profile</h1>
            {profileData && (
                <div>
                    <p><strong>First Name:</strong> {profileData.given_name}</p>
                    <p><strong>Surname:</strong> {profileData.surname}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                </div>
            )}
        </div>
    );
};

export default MyProfilePage;
