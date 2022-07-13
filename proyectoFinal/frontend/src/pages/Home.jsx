import React, { useEffect } from 'react'
import { Layout } from '../components/Layout'
import { ProductsList } from '../components/ProductsList'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    });

    return (
        <Layout>
            <ProductsList />
        </Layout>
    )
};
