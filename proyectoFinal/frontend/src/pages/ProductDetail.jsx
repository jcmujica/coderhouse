import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout'
import axios from 'axios';
import { CartContext } from 'contexts/cartContext';

export const ProductDetail = (props) => {
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(0);
    const { cart, setCart } = useContext(CartContext);
    const { id } = useParams();

    console.log(setCart, cart)

    const getProductAmountFromCart = (product) => {
        const productList = cart.productos || [];
        const productInCart = productList.find(p => p._id === product._id);
        return productInCart?.amount || 0;
    };

    const getProductById = async (id) => {
        const product = await axios.get(`/api/productos/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        const productData = product.data.data;
        setProduct(productData);
        setAmount(getProductAmountFromCart(productData));
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
                const amount = 1;
                updatedProducts = [...cart.productos, {
                    ...props.product,
                    amount
                }];
            };

            const updatedCart = {
                ...cart,
                productos: updatedProducts
            };

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


    useEffect(() => {
        if (id) {
            getProductById(id);
        };
    }, []);

    return (
        <Layout>
            <div className="container flex flex-col items-center gap-5 mt-20">
                <h1 className='text-5xl' >{product.name}</h1>
                <div
                    className='w-64 h-80 bg-cover bg-center-top'
                    style={{
                        backgroundImage: `url(${product.thumbnail})`,
                    }}
                >
                </div>
                <p>{product.sku}</p>
                <p>{product.description}</p>
                <p>
                    <small className="text-muted">
                        Precio: ${product.price}
                    </small>
                </p>
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
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleAdd}
                >
                    Anadir al carrito
                </button>
            </div>
        </Layout>
    )
}
