import { useState, useContext } from 'react'
import { Modal } from './Modal'
import axios from 'axios'
import { CartContext } from '../contexts/cartContext'
import { AuthContext } from '../contexts/authContext'
import { MdDelete } from 'react-icons/md';
import { ROLES } from '../constants/auth'
import { useNavigate } from 'react-router-dom'

export const Card = (props) => {
    const navigate = useNavigate();
    const { product, getProducts } = props;
    const { cart, setCart } = useContext(CartContext);
    const { role } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleEdit = () => {
        setShow(true);
    };

    const handleAdd = async () => {
        if (cart?._id) {
            const productList = cart.productos;
            let updatedProducts = [];
            const shouldUpdate = productList.find(product => product._id === props.product._id);

            if (shouldUpdate) {
                updatedProducts = cart.productos.map(product => {
                    if (product._id === props.product._id) {
                        return {
                            ...product,
                            amount
                        }
                    }
                    return product;
                });
            } else {
                updatedProducts = [...cart.productos, {
                    ...props.product,
                    amount
                }];
            };

            const updatedCart = {
                ...cart,
                productos: updatedProducts
            };

            console.log('updatedCart', updatedCart);

            const newCart = await axios.post(`/api/carrito/${cart?._id}/productos`,
                updatedCart);
            setCart(newCart.data);
        } else {
            const cart = await axios.post('/api/carrito', {
                productos: [{ ...product, amount }]
            });
            setCart(cart.data);
        };
    };

    const handleDelete = async () => {
        await axios.delete(`/api/productos/${product._id}`);
        getProducts();
    };

    const handleAmount = (action) => {
        if (action === 'increase') {
            if (amount < product.stock) {
                setAmount(amount + 1);
            }
        } else if (action === 'decrease') {
            if (amount > 0) {
                setAmount(amount - 1);
            }
        };
    };

    const cartHasProduct = cart?.productos?.find(product => product._id === props.product._id);

    const handleRemoveFromCart = async () => {
        const updatedCart = cart.productos.filter(product => product._id !== props.product._id);
        const response = await axios.put(`/api/carrito/${cart?._id}/productos`,
            { productos: updatedCart });
        setCart(response.data);
    };

    const handleProductClick = () => {
        navigate(`/detail/${product._id}`);
    };

    return (
        <>
            <div
                key={product.sku}
                className="bg-white rounded-lg flex border border-gray-200 shadow-md my-5 mx-10"
            >
                <div
                    className="w-40 bg-cover bg-center cursor-pointer"
                    style={{
                        backgroundImage: `url(${product.thumbnail})`,
                    }}
                    onClick={handleProductClick}
                >
                </div>
                <div className="p-5 flex w-full justify-between">
                    <div className=''>
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                {product.name}
                            </h5>
                        </a>
                        <p className="font-normal text-gray-700">
                            {product.description}
                        </p>
                        <p className="font-bold text-gray-700 mb-3">
                            {`USD: ${product.price}`}
                        </p>
                    </div>
                    <div className='flex '>
                        <div className='flex flex-column items-center justify-center ml-6'>
                            <div className='flex items-center justify-center mx-auto'>
                                <a
                                    href="#"
                                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2"
                                    onClick={() => handleAmount('decrease')}
                                >
                                    -
                                </a>
                                <span className='font-bold mx-3'>{amount}</span>
                                <a
                                    href="#"
                                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2"
                                    onClick={() => handleAmount('increase')}
                                >
                                    +
                                </a>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <button
                                    className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 disabled:opacity-50 cursor-not-allowed'
                                    onClick={handleRemoveFromCart}
                                    disabled={!cartHasProduct}
                                >
                                    Eliminar del Carrito <MdDelete />
                                </button>
                                <button
                                    href="#"
                                    className="flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 mb-5 disabled:opacity-50 cursor-not-allowed"
                                    onClick={handleAdd}
                                    disabled={amount > 0 ? false : true}
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <button
                                href="#"
                                className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 disabled:opacity-50 cursor-not-allowed'
                                style={{
                                    visibility: role === ROLES.ADMIN ? 'visible' : 'hidden'
                                }}
                                onClick={handleEdit}
                            >
                                Editar
                            </button>
                            <button
                                href="#"
                                className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 disabled:opacity-50 cursor-not-allowed'
                                style={{
                                    visibility: role === ROLES.ADMIN ? 'visible' : 'hidden'
                                }}
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                product={product}
                setShow={setShow}
                getProducts={getProducts}
            />
        </>
    )
}
