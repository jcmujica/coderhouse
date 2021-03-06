import { useState, useContext } from 'react'
import { Modal } from './Modal'
import axios from 'axios'
import { CartContext } from '../contexts/cartContext'
import { AuthContext } from '../contexts/authContext'
import { MdAddShoppingCart, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

export const Card = (props) => {
    const navigate = useNavigate();
    const { product, getProducts, isDetail } = props;
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleEdit = () => {
        setShow(true);
    };

    const handleAdd = async () => {
        if (cart?._id) {
            const productList = cart.products;
            let updatedProducts = [];
            const shouldUpdate = productList.find(product => product._id === props.product._id);

            if (shouldUpdate) {
                updatedProducts = cart.products.map(product => {
                    if (product._id === props.product._id) {
                        return {
                            ...product,
                            amount
                        }
                    }
                    return product;
                });
            } else {
                updatedProducts = [...cart.products, {
                    product,
                    amount
                }];
            };

            const updatedCart = {
                ...cart,
                products: updatedProducts
            };

            const newCart = await axios.put(
                `/api/carritos/${cart?._id}`,
                updatedCart,
                {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                }
            );
            setCart(newCart?.data?.data);
            setAmount(0);
        } else {
            const body = {
                user: user._id,
                products: [{ ...product, amount }]
            };

            const cart = await axios.post('/api/carritos', body, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            setCart(cart?.data?.data);
            setAmount(0);
        };
    };

    const handleDelete = async () => {
        await axios.delete(`/api/productos/${product._id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
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

    const cartHasProduct = cart?.products?.find(product => product._id === props.product._id);

    const handleRemoveFromCart = async () => {
        const updatedCart = cart.products.filter(product => product._id !== props.product._id);
        const response = await axios.put(
            `/api/carritos/${cart?._id}`,
            { products: updatedCart },
            {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
        setCart(response.data);
    };

    const handleProductClick = () => {
        navigate(`/detail/${product._id}`);
    };

    const handleStyles = () => {
        let styles = {};
        if (isDetail) {
            styles = {
                box: {
                    flexDirection: 'column',
                    boxShadow: 'none',
                    border: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                image: {
                    height: '500px',
                    width: '300px',
                },
                amountContainer: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '0.5rem',
                    marginTop: '1rem',
                },
                controlsContainer: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '0.5rem',
                    marginTop: '1rem',
                },

            }
        }

        return styles;
    };

    return (
        <>
            <div
                key={product.sku}
                className="bg-white rounded-lg flex border border-gray-200 shadow-md my-5"
                style={handleStyles()?.box}
            >
                <div
                    className="w-40 bg-cover bg-center cursor-pointer"
                    style={{
                        backgroundImage: `url(${product.thumbnail})`,
                        ...handleStyles()?.image
                    }}
                    onClick={handleProductClick}
                >
                </div>
                <div
                    className="p-5 flex w-full justify-between gap-10"
                    style={handleStyles()?.controlsContainer}
                >
                    <div className='flex flex-col justify-center w-full'>
                        <a href={`/detail/${product._id}`}>
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
                        {product?.category &&
                            <div>
                                Categoria:
                                <span className='border border-slate-400 ml-2 p-2 rounded-lg'>
                                    {product?.category}
                                </span>
                            </div>
                        }
                    </div>
                    <div
                        className='flex flex-col w-3/12 gap-2 justify-center'
                        style={{...handleStyles()?.amountContainer}}
                    >
                        <div className='flex items-center justify-center my-5'>
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
                        <button
                            className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={handleRemoveFromCart}
                            disabled={!cartHasProduct}
                        >
                            Eliminar del Carrito <MdDelete />
                        </button>
                        <button
                            href="#"
                            className="flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleAdd}
                            disabled={amount > 0 ? false : true}
                        >
                            Agregar al carrito <MdAddShoppingCart />
                        </button>
                        <button
                            href="#"
                            className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 disabled:opacity-50 disabled:cursor-not-allowed'
                            style={{
                                visibility: user?.isAdmin ? 'visible' : 'hidden'
                            }}
                            onClick={handleEdit}
                        >
                            Editar
                        </button>
                        <button
                            href="#"
                            className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 disabled:opacity-50 disabled:cursor-not-allowed'
                            style={{
                                visibility: user?.isAdmin ? 'visible' : 'hidden'
                            }}
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
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
