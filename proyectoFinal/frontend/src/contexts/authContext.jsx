import React, { createContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

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

            const user = response.data?.data;
            const error = response.data?.date?.error;
            setUser(user);

            if (error) {
                if (location.pathname !== '/login' && location.pathname !== '/register') {
                    navigate('/login');
                };
            } else if (!error && (location.pathname === '/login' || location.pathname === '/register')) {
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

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken && !token) {
            setToken(localToken);
        }
    }, []);

    const login = async (user) => {
        try {
            const response = await axios.post('/api/user/login', user);
            const resUser = response?.data?.data?.user,
                token = response?.data?.data?.token,
                error = response?.data?.error;

            if (error) {
                return { error };
            }
            localStorage.setItem('token', token);
            localStorage.setItem('userId', resUser?.id);
            setUser(resUser);
            return response;
        } catch (e) {
            console.log(e);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.get('/api/user/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setUser(null);
            return response;
        } catch (e) {
            console.log(e);
        };
    };

    const register = async (user) => {
        try {
            const response = await axios.post('/api/user/register', user);
            const resUser = response?.data?.data?.user,
                token = response?.data?.data?.token,
                error = response?.data?.error;

            if (error) {
                return { error };
            }

            localStorage.setItem('token', token);
            localStorage.setItem('userId', resUser?.id);
            setUser(resUser);
            return response.data;
        } catch (e) {
            console.log(e);
            return e
        };
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, register, token }}>
            {children}
        </AuthContext.Provider>
    )
};