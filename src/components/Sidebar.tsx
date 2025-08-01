import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Module } from '../types/module';

interface SidebarProps {
  modules: Module[];
}

const Sidebar: React.FC<SidebarProps> = ({ modules }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`bg-gray-800 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className={`border-b border-gray-700 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <h1 className="text-lg font-semibold truncate transition-all duration-300">Web Utilities</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-700 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        <ul className="space-y-2">
          {/* Home Link */}
          <li className={`transition-all duration-300 ${isCollapsed ? 'h-12 flex justify-center' : ''}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-all duration-300 ${
                  isCollapsed 
                    ? 'w-12 h-12 justify-center' 
                    : 'p-3'
                } ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!isCollapsed && <span className="ml-3 transition-all duration-300">Home</span>}
            </NavLink>
          </li>

          {/* Documentation Link */}
          <li className={`transition-all duration-300 ${isCollapsed ? 'h-12 flex justify-center' : ''}`}>
            <NavLink
              to="/docs"
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-all duration-300 ${
                  isCollapsed 
                    ? 'w-12 h-12 justify-center' 
                    : 'p-3'
                } ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!isCollapsed && <span className="ml-3 transition-all duration-300">Documentation</span>}
            </NavLink>
          </li>

          {/* Divider */}
          {modules.length > 0 && (
            <li className="pt-4">
              <div className="border-t border-gray-700 mb-4 transition-all duration-300"></div>
              {!isCollapsed && (
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider transition-all duration-300">
                  Utilities
                </span>
              )}
            </li>
          )}

          {/* Module Links */}
          {modules.map((module) => (
            <li key={module.route} className={isCollapsed ? 'h-12 flex justify-center' : ''}>
              <NavLink
                to={module.route}
                className={({ isActive }) =>
                  `flex items-center rounded-lg transition-all duration-300 ${
                    isCollapsed 
                      ? 'w-12 h-12 justify-center' 
                      : 'p-3'
                  } ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  {module.icon ? (
                    typeof module.icon === 'string' ? (
                      <span className="text-sm">{module.icon}</span>
                    ) : (
                      module.icon
                    )
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </div>
                {!isCollapsed && <span className="ml-3 transition-all duration-300">{module.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;