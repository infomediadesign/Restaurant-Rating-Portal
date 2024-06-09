import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import './MyProfile.css';

const MyProfilePage = () => {
    const { pkUser } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});

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

    const handleEdit = () => {
        setEditing(true);
        setFormData({
            given_name: profileData.given_name,
            surname: profileData.surname,
            email: profileData.email
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            const username = 'api_gateway';
            const userPassword = 'Xe812C81M9yA';
            const token = btoa(`${username}:${userPassword}`);

            const response = await axios.post(
                'http://localhost:5000/users/update',
                {
                    user_id: pkUser,
                    ...formData
                },
                {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                }
            );
            setProfileData(response.data);
            setEditing(false);
        } catch (error) {
            setError("Error updating profile data. Please try again later.");
        }
    };

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-heading">My Profile</h1>
            {editing ? (
                <div className="profile-data">
                    <input type="text" name="given_name" value={formData.given_name} onChange={handleChange} />
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className="profile-data">
                    <p className="profile-item"><strong>First Name:</strong> {profileData.given_name}</p>
                    <p className="profile-item"><strong>Surname:</strong> {profileData.surname}</p>
                    <p className="profile-item"><strong>Email:</strong> {profileData.email}</p>
                    <button className="edit-btn" onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default MyProfilePage;
