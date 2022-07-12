import { useState, createContext } from 'react';

export const CartContext = createContext({ cart: [] });

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};