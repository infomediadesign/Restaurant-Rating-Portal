import React, { createContext, useState, useEffect, useCallback } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [pkUser, setPkUser] = useState(() => {
        const storedPkUser = localStorage.getItem('pkUser');
        return storedPkUser ? JSON.parse(storedPkUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        if (user && user.pk_user) {
            localStorage.setItem('pkUser', JSON.stringify(user.pk_user));
        } else {
            localStorage.removeItem('pkUser');
        }
    }, [user]);

    const login = useCallback((userData) => {
        setUser(userData);
        if (userData && userData.pk_user) {
            setPkUser(userData.pk_user);
            localStorage.setItem('pkUser', JSON.stringify(userData.pk_user));
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setPkUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('pkUser');
    },[]);

    return (
        <UserContext.Provider value={{ user, pkUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
