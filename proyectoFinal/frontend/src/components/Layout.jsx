import React, { useContext } from 'react'
import { Navbar } from 'components/Navbar'
import { Chat } from './Chat'
import { AuthContext } from 'contexts/authContext';
import { Loading } from 'components/Loading';

export const Layout = ({ children }) => {
    const { user } = useContext(AuthContext);
    const loading = !user && (!['/login', '/register'].includes(window.location.pathname));

    return (
        <>
            <Navbar />
            {!loading ?
                <div className='my-20 px-8'>
                    {children}
                </div> :
                <Loading />}
            {!loading && <Chat />}
        </>
    )
};