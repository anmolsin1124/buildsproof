import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-500 bg-opacity-60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition">
            <h1 className="text-white text-2xl font-bold">Build</h1>
            <h1 className="text-green-400 text-2xl font-bold">Proof</h1>
          </Link>
          <div className="flex space-x-6 items-center gap-4 ">
            <Link to="/" className="text-white hover:text-gray-300 transition font-medium" >Home</Link>
            <a href="#" className="text-white hover:text-gray-300 transition font-medium">Explore</a>
            <a href="#" className="text-white hover:text-gray-300 transition font-medium">Practice</a>
            <a href="#" className="text-white hover:text-gray-300 transition font-medium">About</a>
            <Link to="/login" className="text-white hover:bg-gray-700 transition border border-white px-6 py-2 rounded-full font-medium">Login</Link>
            <Link to="/signup" className="text-black hover:bg-green-400 transition bg-green-300 px-6 py-2 rounded-full font-medium">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
