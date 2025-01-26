import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/AuthSlice';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../Images/BrainLogo.png';
import AuthService from '../../services/authService.js';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn} = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      // Call the AuthService logout function
      const isLoggedOut = await AuthService.logout();

      if (isLoggedOut) {
        dispatch(logout());
        navigate('/login'); 
      } else {
        console.log("No active session to log out.");
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
        <Link to="/" >
          <img src={Logo} alt="BrainAcademy logo" className="w-15 h-12" />
        </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } flex-col md:flex-row items-center md:space-x-6 md:ml-auto space-y-4 md:space-y-0 md:flex mt-4 md:mt-0 bg-gray-800 p-4 rounded-lg md:bg-transparent md:p-0`}
        >
          <Link to="/learning" className="text-lg font-semibold text-white md:text-gray-800">
            Get Learning Path 
          </Link>
           <Link to="/courses" className="text-lg font-semibold text-white md:text-gray-800">
            Courses
          </Link>
          <Link to="/practice" className="text-lg font-semibold text-white md:text-gray-800">
            Tests 
          </Link>
         
          <Link to="/askdoubt" className="text-lg font-semibold text-white md:text-gray-800">
            Ask Douts
          </Link>
          <Link to="/about" className="text-lg font-semibold text-white md:text-gray-800">
            Abouts
          </Link>

          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-lg font-semibold text-white bg-red-600 rounded-full hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signup" className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
