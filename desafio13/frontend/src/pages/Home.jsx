import { useState, useEffect, useContext } from 'react'
import { Layout } from 'components/Layout';
import socketIOClient from "socket.io-client";
import { useNavigate } from 'react-router';
import { AuthContext } from 'contexts/authContext';

export const Home = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

    const getMessages = async () => {
        const socket = socketIOClient('/api/messages');
        socket.on('listMessages', (msgs) => {
            console.log("listMessages", msgs);
            setMessages(msgs);
        });
    };

    const getProducts = async () => {
        const socket = socketIOClient('/api/products');
        socket.on('listProducts', (prods) => {
            setProducts(prods);
        });
    };

    const submitProduct = async (e) => {
        e.preventDefault()


    };

    useEffect(() => {
        getMessages();
        getProducts();
    }, []);

    if (user?.error) {
        navigate('/login');
    };

    return (
        <Layout>
            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg></div>
                    <div className="flex justify-between items-center w-full">
                        <p className="font-bold">Bienvenido {user?.username || ''}</p>
                    </div>
                </div>
            </div>
            <div className="flex min-h-screen h-full" onSubmit={submitProduct}>
                <div className="w-full h-full flex flex-col items-center bg-slate-50 pt-36">
                    <h1 className="font-bold text-3xl mb-10">Ingrese Producto</h1>
                    <div>
                        <form className="w-full max-w-lg p-6">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                        Nombre
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="name" type="text" name="name" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
                                        Precio
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="price" type="text" name="price" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                                        Foto URL
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="image" type="text" placeholder="https://" name="thumbnail" />
                                </div>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                id="submitProductButton">
                                Enviar
                            </button>
                        </form>
                    </div>
                    <h1 className="font-bold text-3xl mb-10">Chat</h1>
                    <div className="w-full max-w-lg p-6">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                                    Nombre
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="firstName" type="text" name="firstName" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                                    Apellido
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="lastName" type="text" name="lastName" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="age">
                                    Edad
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="age" type="text" name="age" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="alias">
                                    Alias
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="alias" type="text" name="alias" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="avatar">
                                    Avatar
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="avatar" type="text" name="avatar" />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="email" type="text" name="email" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                                    Mensaje
                                </label>
                                <div className="flex">
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded-r-none"
                                        id="message" type="text" name="message" />
                                    <button
                                        className="bg-blue-500 h-max hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-l-none mb-3"
                                        id="submitMessageButton">
                                        Enviar
                                    </button>
                                </div>
                                <div className="w-full text-red-700 hidden" id="error">
                                    Debe completar todos los campos para enviar un mensaje!
                                </div>
                                <div id="chatbox" className="mt-12 min-h-16 w-full bg-white py-3 px-4 mb-3">
                                    {messages.map((message, index) => (
                                        <p>
                                            <span className="font-bold text-blue-500">{message.alias}</span>
                                            <span className="font-bold text-stone-500 text-xs">{message.date}</span>:
                                            <span className="text-gray-700 italic">{message.text}</span>
                                        </p>))}
                                    <span className="block sm:inline">No hay mensajes.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full min-h-screen h-full flex flex-col items-center pt-36 ">
                    <h1 className="font-bold text-3xl mb-10">Productos</h1>
                    <table className="table-auto mb-16">
                        <thead>
                            <tr>
                                <th className="px-4 py-1">Nombre</th>
                                <th className="px-4 py-1">Precio</th>
                                <th className="px-4 py-1">Foto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr>
                                    <td className="border px-4 py-1">{product.name}</td>
                                    <td className="border px-4 py-1">{product.price}</td>
                                    <td className="border px-4 py-1">
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Ups!</strong>
                        <span className="block sm:inline">No hay productos.</span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
