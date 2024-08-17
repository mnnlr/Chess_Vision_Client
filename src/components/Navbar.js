import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // <div>
    //   <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
    //     <div className="navbar-logo">Chess Vision</div>
    //     <ul className="navbar-links">
    //       <li><a href="#home">Home</a></li>
    //       <li><a href="#about">About</a></li>
    //       <li><a href="/contactus">Contact</a></li>
    //       <li><a href="/profile">Profile</a></li>
    //     </ul>
    //     <button className="sign-in-btn">Sign In</button>
    //   </nav>
    // </div>
    <header className="fixed top-0 left-0 w-full z-50 text-gray-600 body-font bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {/* <img className='w-auto h-10 rounded-full' src="" alt="logo" /> */}
          <span className="ml-3 text-2xl">Chess Vision</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to='/' className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900">Home</Link>
          <Link to='/profile' className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900">Profile</Link>
          <Link to='/contactus' className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900">Contact</Link>
          <Link to='/signin' className="py-2 px-4 transform duration-200 bg-slate-300 bg-opacity-50 hover:bg-opacity-50 hover:bg-slate-400 rounded-full hover:cursor-pointer font-bold mr-5 hover:text-gray-900">Sign In</Link>
          <Link to='login' className="py-2 px-4 transform duration-200 bg-slate-300 bg-opacity-50 hover:bg-opacity-50 hover:bg-slate-400 rounded-full hover:cursor-pointer font-bold mr-5 hover:text-gray-900">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar