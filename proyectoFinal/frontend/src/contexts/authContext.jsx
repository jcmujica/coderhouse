import React, { createContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                return;
            };
            const response = await axios.get(`/api/user/${userId}`, {
                headers: {
                    'Authorization': token
                }
            });

            console.log({ response: response?.data?.data }            )
            const user = response.data?.data;
            setUser(user);

            if (response.error) {
                if (location.pathname !== '/login' && location.pathname !== '/register') {
                    navigate('/login');
                };
            } else if (!response.error && (location.pathname === '/login' || location.pathname === '/register')) {
                navigate('/');
            } else if (!response && location.pathname === '/logout') {
                navigate('/login');
            };

        } catch (e) {
            console.log(e);
        };
    };

    useEffect(() => {
        getUser()
    }, [user?._id]);

    const login = async () => {
        try {
            const response = await axios.post('/api/user/login', user);
            const { user, token } = response.data?.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user?.id);
            setUser(user);
            return response;
        } catch (e) {
            console.log(e);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get('/api/user/logout');
            setUser(null);
            return response;
        } catch (e) {
            console.log(e);
        };
    };

    const register = async (user) => {
        try {
            const response = await axios.post('/api/user/register', user);
            const { user, token } = response.data?.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user?.id);
            setUser(user);
            return response.data;
        } catch (e) {
            console.log(e);
            return e
        };
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
};