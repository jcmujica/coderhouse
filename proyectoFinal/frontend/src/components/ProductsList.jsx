import { useState, useEffect, useContext } from 'react'
import { Card } from './Card'
import axios from 'axios';
import { AuthContext } from 'contexts/authContext';

export const ProductsList = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const products = await axios.get('/api/productos/', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        setProducts(products?.data?.data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="w-full flex flex-wrap items-start justify-center">
            <h1 className="font-bold text-3xl mb-10 mt-10">Productos</h1>
            <div className='w-full'>
                {products.length ?
                    products.map((product, i) => (
                        <Card
                            product={product}
                            key={`${product.sku}-${i}`}
                            getProducts={getProducts}
                        />
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
