import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser? JSON.parse(storedUser) : null;
    });
    const [pkUser, setPkUser] = useState(null);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        if (userData && userData.pk_user) {
            setPkUser(userData.pk_user);
            
        }
    };

    const logout = () => {
        setUser(null);
        setPkUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, pkUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

