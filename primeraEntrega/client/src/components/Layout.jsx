import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen h-full">
        <div className="w-full flex items-start justify-center bg-slate-50 h-auto pt-36">
          {children}
        </div>
      </div>
    </>
  )
}
