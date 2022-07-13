import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Layout } from '../components/Layout'
import { CartContext } from '../contexts/cartContext'
import { MdDelete } from 'react-icons/md';
import { AuthContext } from 'contexts/authContext';

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleRemoveFromCart = async (product) => {
    const updatedProducts = products.filter(
      (p) => p._id !== product._id
    );
    const updatedCart = {
      ...cart,
      products: updatedProducts,
    };
    console.log(updatedCart)
    const newCart = await axios.post(`/api/carrito/${cart._id}/productos`, updatedCart);
    setProducts(newCart.data.products);
  };

  const handleDeleteCart = async () => {
    await axios.delete(`/api/carrito/${cart._id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    setProducts([]);
    setCart({});
  };

  const getOrders = async () => {
    const orders = await axios.get(`/api/ordenes/user/${user._id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    setOrders(orders?.data?.data);
  };

  const handleBuy = async () => {
    const order = await axios.post(`/api/ordenes/`, cart, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    getOrders();
  };

  useEffect(() => {
    if (user) getOrders();
    if (cart?.products?.length === 0) {
      setProducts({});
    } else {
      setProducts(cart.products);
    }
  }, [cart, user]);

  console.log({ orders })

  return (
    <Layout>
      <>
        {
          products?.length > 0 ?
            <div>
              <h1 className='text-5xl font-bold mb-20'>
                {/* {`Carrito de ${user.name}`} */}
              </h1>
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
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase flex justify-center">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product._id} className="bg-white border-b">
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
                              <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap flex justify-center">
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
              <button
                className='flex justify-center items-center gap-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mx-2 my-5'
                onClick={handleBuy}
              >
                Comprar
              </button>
            </div> :
            <div className="flex flex-col mt-6">
              No hay elementos en el carrito
            </div>
        }
        <div className="flex flex-col mt-6">
          <h1 className='text-5xl my-20 font-bold'>
            {/* {`Ordenes de ${user.name}`} */}
          </h1>
          <div className="flex flex-col mt-6">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 ">
                      <tr>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                          ID
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                          Items
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                          Total
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                          Fecha
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                          Estado
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase flex justify-center">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map(order => (
                        <tr key={order._id} className="bg-white border-b">
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                            {order._id}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                            {order.items}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                            {order.total}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            {order.createdAt}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            {order.status}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap flex justify-center">
                            <a
                              href="#"
                              className="text-blue-600  hover:underline"
                              onClick={() => handleRemoveFromCart(order)}
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
        </div>
      </>
    </Layout>
  )
}
