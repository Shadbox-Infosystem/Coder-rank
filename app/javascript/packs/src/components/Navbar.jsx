import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleSignOut = () => {
    // Clear the authentication status from localStorage
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-white font-bold">CoderRank</div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-300">Home</Link>
                <Link to="#" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-300">Link</Link>
                <div className="relative">
                  <button className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-300">Dropdown</button>
                  <ul className="absolute hidden text-gray-700 bg-white shadow-lg rounded-md w-48 right-0">
                    <li><a href="#" className="block px-4 py-2 text-sm">Action</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm">Another action</a></li>
                    <li><a href="#" className="block px-4 py-2 text-sm">Something else here</a></li>
                  </ul>
                </div>
                <Link to="/tests" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:text-gray-300">New Test</Link>
              </div>
            </div>
          </div>
          {isAuthenticated ? (
            <button 
              onClick={handleSignOut} 
              className="flex-shrink-0 text-white font-bold px-3 py-2 rounded-md text-sm font-medium hover:text-gray-300"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              to="/users/sign_in" 
              className="flex-shrink-0 text-white font-bold px-3 py-2 rounded-md text-sm font-medium hover:text-gray-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;