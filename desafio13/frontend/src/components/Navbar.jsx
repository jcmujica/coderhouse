import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const allLinks = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Login',
        path: '/login'
    },
    {
        name: 'Register',
        path: '/register'
    }
];

export const Navbar = () => {
    const location = useLocation();
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const linksToShow = allLinks.filter(link => link.path !== location.pathname);
        setLinks(linksToShow);

    }, [location]);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 fixed w-full">
            <div className="flex items-center w-full justify-end">
                <div className="text-sm flex">
                    {links.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="block lg:inline-block lg:mt-0 text-white hover:text-white hover:bg-blue-700 mr-4 text-right py-2 px-6 rounded"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
