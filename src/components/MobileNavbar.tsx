import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <h1 className="text-lg font-semibold">
        <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          Web Utilities
        </Link>
      </h1>
      
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          aria-label="Open sidebar"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
          aria-label="Close sidebar"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MobileNavbar;