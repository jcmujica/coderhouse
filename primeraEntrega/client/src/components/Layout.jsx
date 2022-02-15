import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen h-full">
        <div className="w-full flex items-center justify-center bg-slate-50 h-auto">
          {children}
        </div>
      </div>
    </>
  )
}
