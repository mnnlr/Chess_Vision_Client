import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
function NavFooter() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <section className='flex-grow mt-36 sm:mt-32 md:mt-28 lg:mt-20'>
        <Outlet />
      </section>
      <Footer />
    </div>
  )
}

export default NavFooter