import React from 'react'
import { Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout'
import { ProductsList } from '../components/ProductsList'

export const Home = () => {
    const token = localStorage.getItem('token')

    if (!token) {
        return (
            <Navigate to="/login" replace={true} />
        )
    }

    return (
        <Layout>
            <ProductsList />
        </Layout>
    )
};
