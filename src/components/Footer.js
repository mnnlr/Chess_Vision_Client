import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-3 py-7 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between">
        <div className="w-64 flex-shrink-0 mx-auto text-center md:text-center">
          <a className="flex title-font font-medium items-center justify-center text-gray-900">
            <img src="" alt="logo" className='w-10 h-10 text-white p-2 rounded-full' />
            <span className="ml-3 text-3xl">Chess Vision</span>
          </a>
          <p className="mt-2 text-sm text-gray-800">Air plant banjo lyft occupy retro adaptogen indego</p>
        </div>
        <div className="flex-grow flex flex-wrap justify-center text-center md:text-right m-3">
          <div className="lg:w-1/4 md:w-1/3 w-full px-4 text-center md:text-right">
            <h2 className="title-font font-bold text-gray-900 tracking-widest text-lg mb-3">Pages</h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/" className="text-gray-600 font-semibold hover:text-gray-800 cursor-pointer">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 font-semibold hover:text-gray-800 cursor-pointer">About</Link>
              </li>
              <li>
                <Link to='/contact-us' className="text-gray-600 font-semibold hover:text-gray-800 cursor-pointer">Contact Us</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/3 w-full px-4 text-center md:text-right">
            <h2 className="title-font font-bold text-gray-900 tracking-widest text-lg mb-3">Support</h2>
            <nav className="list-none mb-10">
              <li>
                <Link to='/cosntact-us' className="text-gray-600 font-semibold hover:text-gray-800 cursor-pointer">Contact Us</Link>
              </li>
              <li>
                <Link to='/about-us' className="text-gray-600 font-semibold hover:text-gray-800 cursor-pointer">About</Link>
              </li>
              <li>
                <Link to='/chess-players' className="text-gray-600 font-semibold hover:text-gray-800 cursor-pointer">Populer Chess Players</Link>
              </li>
            </nav>
          </div>
          <div className="flex flex-col justify-center items-center md:items-end w-full md:w-1/3 px-4 text-center md:text-right">
            <p className="text-black text-sm mb-2">© 2024 MNNLR —
              <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-black ml-1 cursor-pointer" target="_blank">@ANAND</a>
            </p>
            <span className="inline-flex justify-center md:justify-end">
              <a className="text-gray-900 hover:scale-110 transform transition-transform cursor-pointer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a className="ml-3 text-gray-900 hover:scale-110 transform transition-transform cursor-pointer">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a className="ml-3 text-gray-900 hover:scale-110 transform transition-transform cursor-pointer">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a className="ml-3 text-gray-900 hover:scale-110 transform transition-transform cursor-pointer">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer