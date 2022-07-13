import React from 'react'
import { Navbar } from 'components/Navbar'

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='mt-20 px-8'>
                {children}
            </div>
        </>
    )
}
