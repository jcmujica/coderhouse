import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';

export const Navbar = () => {
    const { cart } = useContext(CartContext);
    const showBadge = cart.length > 0;

    const handleRestoreProducts = () => {
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 fixed w-full">
            <div>
                <button
                    className="block lg:inline-block lg:mt-0 text-white hover:text-white hover:bg-blue-700 mr-4 text-right py-2 px-6 rounded">
                    <Link to='/'>
                        Productos
                    </Link>
                </button>
                <button
                    className="block lg:inline-block lg:mt-0 text-white hover:text-white hover:bg-blue-700 mr-4 text-right py-2 px-6 rounded">
                    <Link to='/create'>
                        Crear Producto
                    </Link>
                </button>
            </div>
            <button
                className="block relative lg:inline-block lg:mt-0 text-white hover:text-white hover:bg-blue-700 mr-4 text-right py-2 px-6 rounded justify-self-end">
                <Link to='/cart'>
                    Carrito
                </Link>
                {showBadge && <span className='bg-orange-500 rounded-xl w-4 h-4 block absolute right-0 bottom-3'></span>}
            </button>
        </nav>
    )
}
