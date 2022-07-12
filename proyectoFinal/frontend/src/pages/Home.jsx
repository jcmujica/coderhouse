import React, { useEffect } from 'react'
import { Chat } from 'components/Chat';
import { Layout } from '../components/Layout'
import { ProductsList } from '../components/ProductsList'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        console.log({token})
        if (!token) {
            navigate('/login');
        }
    });

    return (
        <Layout>
            <ProductsList />
            <Chat />
        </Layout>
    )
};
