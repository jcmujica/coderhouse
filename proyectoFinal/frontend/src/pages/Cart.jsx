import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Layout } from '../components/Layout'
import { CartContext } from '../contexts/cartContext'
import { MdDelete } from 'react-icons/md';

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState({});

  const getCart = async () => {
    // se que es redundante porque el carrito ya esta en el contexto pero es para usar el endpoint
    const products = await axios.get(`/api/carrito/${cart.id}/productos`);
    setProducts(products.data);
  };

  useEffect(() => {
    if (cart?.id && !products.id) {
      getCart();
    }
  }, [cart]);

  const handleRemoveFromCart = async (product) => {
    const updatedProducts = products.filter(
      (p) => p.id !== product.id
    );
    const updatedCart = {
      ...cart,
      productos: updatedProducts,
    };
    console.log(updatedCart)
    const newCart = await axios.post(`/api/carrito/${cart.id}/productos`, updatedCart);
    setProducts(newCart.data.productos);
  };

  const handleDeleteCart = async () => {
    await axios.delete(`/api/carrito/${cart.id}`);
    setProducts({});
    setCart({});
  };

  return (
    <Layout>
      {
        products.length > 0 ?
          <div>
            <h1 className='text-5xl'>Carrito</h1>
            <button
              className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2'
              onClick={handleDeleteCart}
            >
              Vaciar carrito
            </button>
            <div className="flex flex-col mt-6">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-md sm:rounded-lg">
                    <table className="min-w-full">
                      <thead className="bg-gray-50 ">
                        <tr>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                            Nombre
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                            SKU
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                            Cantidad
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                            Precio
                          </th>
                          <th scope="col" className="relative py-3 px-6">
                            <span className="sr-only">Eliminar</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} className="bg-white border-b">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                              {product.name}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                              {product.sku}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                              {product.amount}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                              {product.price}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                href="#"
                                className="text-blue-600  hover:underline"
                                onClick={() => handleRemoveFromCart(product)}
                              >
                                <MdDelete />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <div className="flex flex-col mt-6">
            No hay elementos en el carrito
          </div>
      }
    </Layout>
  )
}
