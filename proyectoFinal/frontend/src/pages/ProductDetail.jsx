import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout'
import axios from 'axios';
import { CartContext } from 'contexts/cartContext';
import { Card } from 'components/Card';

export const ProductDetail = (props) => {
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState({});
    const { cart, setCart } = useContext(CartContext);
    const { id } = useParams();

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
    };

    const getProducts = async () => {
        const products = await axios.get('/api/productos/', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        setProducts(products?.data?.data);
    };

    useEffect(() => {
        if (id) {
            getProductById(id);
        };
    }, []);

    return (
        <Layout>
            <Card
                product={product}
                getProducts={getProducts}
                isDetail
            />
        </Layout>
    )
}
