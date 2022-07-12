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

            const user = response.data?.data;
            const error = response.data?.data?.error;
            console.log({user})
            setUser(user);

            if (error) {
                if (location.pathname !== '/login' && location.pathname !== '/register') {
                    console.log("redirecting to login")
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
    }, [user?.id]);

    const login = async (user) => {
        try {
            const response = await axios.post('/api/user/login', user);
            const resUser = response?.data?.data?.user,
                token = response?.data?.data?.token,
                error = response?.data?.error;

            if (error) {
                return { error };
            }

            if (token && resUser?.id) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', resUser?.id);
                setUser(resUser);
                return response;
            } else {
                return { error: 'Error al iniciar sesión' };
            };
        } catch (e) {
            console.log(e);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post('/api/user/logout');
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

            if (token && resUser?.id) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', resUser?.id);
                setUser(resUser);
                return response;
            } else {
                return { error: 'Error al registrarse' };
            }
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