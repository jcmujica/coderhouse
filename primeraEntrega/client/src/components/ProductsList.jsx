import { useState, useEffect } from 'react'
import { Card } from './Card'
import axios from 'axios';

export const ProductsList = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const products = await axios.get('/api/productos/');
        setProducts(products.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="w-full flex flex-wrap items-center justify-center pt-24">
            <h1 className="font-bold text-3xl mb-10">Productos</h1>
            <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-8 p-8'>
                {products.length ?
                    products.map(product => (
                        <Card product={product} />
                    )) :
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Ups!</strong>
                        <span className="block sm:inline">No hay productos.</span>
                    </div>
                }
            </div>
        </div>
    )
};
