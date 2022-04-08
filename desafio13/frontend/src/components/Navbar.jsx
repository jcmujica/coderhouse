import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';

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
    },
    {
        name: 'Logout',
        path: '/logout'
    }
];

export const Navbar = () => {
    const location = useLocation();
    const [links, setLinks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        let linksToShow = allLinks.filter(link => link.path !== location.pathname);

        console.log("user", user);

        if (user) {
            linksToShow = linksToShow.filter(link => link.name !== 'Login' && link.name !== 'Register');
        } else if (!user || user.error) {
            linksToShow = linksToShow.filter(link => link.name !== 'Logout');
        };

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
