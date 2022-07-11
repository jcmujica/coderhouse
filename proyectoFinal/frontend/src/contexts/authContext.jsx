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
                    'Autorization': token
                }
            });
            console.log({ response });
            setUser(response);

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
        getUser();
    }, []);

    const login = async (user) => {
        try {
            const response = await axios.post('/api/user/login', user);
            localStorage.setItem('token', response?.data?.data?.token);
            localStorage.setItem('userId', response?.data?.data?.user?.id);
            setUser(response);
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
            setUser(response);
            return response;
        } catch (e) {
            console.log(e);
        };
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
};