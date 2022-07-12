import { useState, useEffect } from 'react'
import { Card } from './Card'
import axios from 'axios';
import { Modal } from './Modal';

export const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const getProducts = async () => {
        const products = await axios.get('/api/productos/', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        setProducts(products?.data?.data);
    };

    const getProductsByCategory = async () => {
        const products = await axios.get(`/api/productos/categoria/${selectedCategory}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        setProducts(products?.data?.data);
    };

    const handleRemoveCategory = async (category) => {
        const response = await getProducts();
        setProducts(response?.data?.data);
        setSelectedCategory('');
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="w-full flex flex-wrap items-start justify-center">
            <h1 className="font-bold text-3xl mb-10 mt-10">Productos</h1>
            <div className='w-full'>
                <input
                    type="text"
                    placeholder='Filtar por categoria de producto'
                    className="p-2 max-w-screen-lg ml-10 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    value={selectedCategory}
                />
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={getProductsByCategory}
                    disabled={!selectedCategory}
                >
                    Fitrar
                </button>
                {selectedCategory &&
                    <span
                        className="text-purple-500 cursor-pointer mx-10 border-4 px-5 py-2 rounded-lg border-purple-500 bold hover:cursor-move"
                        onClick={handleRemoveCategory}
                    >
                        {selectedCategory}
                    </span>
                }
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
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowModal(true)}
            >
                Add New
            </button>
            <Modal
                show={showModal}
                setShow={setShowModal}
                getProducts={getProducts}
                mode="add"
                product={{}}
            />
        </div>
    )
};
