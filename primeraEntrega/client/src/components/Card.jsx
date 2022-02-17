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
        if (cart?.id) {
            const productList = cart.productos;
            let updatedProducts = [];
            const shouldUpdate = productList.find(product => product.id === props.product.id);

            if (shouldUpdate) {
                updatedProducts = cart.productos.map(product => {
                    if (product.id === props.product.id) {
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

            const newCart = await axios.post(`/api/carrito/${cart?.id}/productos`,
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
        await axios.delete(`/api/productos/${product.id}`);
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

    const cartHasProduct = cart?.productos?.find(product => product.id === props.product.id);

    const handleRemoveFromCart = async () => {
        const updatedCart = cart.productos.filter(product => product.id !== props.product.id);
        const response = await axios.put(`/api/carrito/${cart?.id}/productos`,
            { productos: updatedCart });
        setCart(response.data);
    };

    const handleProductClick = () => {
        navigate(`/detail/${product.id}`);
    };

    return (
        <>
            <div key={product.sku} className="w-80 bg-white rounded-lg border border-gray-200 shadow-md">
                <div
                    className="w-full h-48 bg-cover bg-top-center cursor-pointer"
                    style={{
                        backgroundImage: `url(${product.thumbnail})`,
                    }}
                    onClick={handleProductClick}
                >
                </div>
                <div className="p-5">
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
                    <div className='mb-5'>
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
                    {cartHasProduct ? <div className='flex justify-center mb-3'>
                        <button
                            className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2'
                            onClick={handleRemoveFromCart}
                        >
                            Eliminar del Carrito <MdDelete />
                        </button>
                    </div> :
                        amount > 0 && <a
                            href="#"
                            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 mb-5"
                            onClick={handleAdd}
                        >
                            Agregar al carrito
                        </a>
                    }
                    {role === ROLES.ADMIN && <div>
                        <a
                            href="#"
                            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2"
                            onClick={handleEdit}
                        >
                            Editar
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2"
                            onClick={handleDelete}
                        >
                            Eliminar
                        </a>
                    </div>}
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
