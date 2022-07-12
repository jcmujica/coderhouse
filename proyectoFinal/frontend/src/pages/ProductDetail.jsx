import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout'
import axios from 'axios';

export const ProductDetail = (props) => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    const getProductById = async (id) => {
        const product = await axios.get(`/api/productos/${id}`);
        console.log(product.data);
        setProduct(product.data);
    };


    useEffect(() => {
        if (id) {
            getProductById(id);
        };
    }, []);

    return (
        <Layout>
            <div className="container flex flex-col items-center gap-5">
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
            </div>
        </Layout>
    )
}
