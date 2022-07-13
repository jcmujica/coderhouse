import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';

export const CartContext = createContext({ cart: [] });

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState({});
    const userId = user?._id;

    const getCart = async () => {
        try {
            const response = await axios.get(`/api/carritos/user/${userId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });

            const cart = response?.data?.data;
            setCart(cart);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (userId) {
            getCart();
        }

    }, [userId]);

    return (
        <CartContext.Provider value={{ cart, setCart, getCart }}>
            {children}
        </CartContext.Provider>
    );
};