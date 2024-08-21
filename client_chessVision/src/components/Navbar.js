import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/actions/LoginActions";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogout, setShowlogout] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowlogout(false);
  };
  const handleIconClick = () => {
    setShowlogout((prev) => !prev);
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 text-gray-600 body-font bg-customTeal">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {/* <img className='w-auto h-10 rounded-full' src="" alt="logo" /> */}
          <span className="ml-3 text-2xl">Chess Vision</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/"
            className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/chess"
            className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900"
          >
            Chess
          </Link>
          <Link
            to="/profile"
            className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900"
          >
            Profile
          </Link>
          <Link
            to="/contactus"
            className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900"
          >
            Contact
          </Link>
          <Link
            to="/about-us"
            className="hover:cursor-pointer font-semibold mr-5 hover:text-gray-900"
          >
            About Us
          </Link>
          {user ? (
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-black/70 text-white rounded-full" onClick={handleIconClick}>
                <span className="font-bold text-lg">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              {showLogout && (
                <div className="absolute right-1 mt-44 w-36 h-28 bg-white rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={()=>{navigate('/profile'); setShowlogout(false)}}
                    >
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="py-2 px-4 transform duration-200 bg-slate-300 bg-opacity-50 hover:bg-opacity-50 hover:bg-slate-400 rounded-full hover:cursor-pointer font-bold mr-5 hover:text-gray-900"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="py-2 px-4 transform duration-200 bg-slate-300 bg-opacity-50 hover:bg-opacity-50 hover:bg-slate-400 rounded-full hover:cursor-pointer font-bold mr-5 hover:text-gray-900"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
