import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/cartContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const Navbar = () => {
    const { cart } = useContext(CartContext);
    const showBadge = cart?.productos?.length > 0;

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 fixed w-full">
            <div>
                <button
                    className="block lg:inline-block lg:mt-0 text-white font-bold hover:text-white hover:bg-blue-700 mr-4 text-right py-2 px-6 rounded">
                    <Link to='/'>
                        Productos
                    </Link>
                </button>
                <button
                    className="block lg:inline-block lg:mt-0 text-white font-bold hover:text-white hover:bg-blue-700 mr-4 text-right py-2 px-6 rounded">
                    <Link to='/create'>
                        Crear Producto
                    </Link>
                </button>
            </div>
            <button
                className="block relative lg:inline-block lg:mt-0 text-white font-bold hover:text-white hover:bg-blue-700 mr-4 text-right py-2 pl-6 pr-10 rounded justify-self-end">
                <Link to='/cart'>
                    Carrito
                </Link>
                {showBadge &&
                    <span className='bg-orange-500 rounded-xl w-6 h-6 absolute right-2 bottom-2 flex items-center justify-center'>
                        <AiOutlineShoppingCart />
                    </span>
                }
            </button>
        </nav>
    )
}
