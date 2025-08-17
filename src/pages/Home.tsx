import React from 'react';
import { Link } from 'react-router-dom';
import { Module } from '../types/module';

interface HomeProps {
  modules: Module[];
}

const Home: React.FC<HomeProps> = ({ modules }) => {
  const sortedModules = [...modules].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">App Launcher</h1>
        <p className="text-gray-600">Choose a utility to get started.</p>
      </div>

      {sortedModules.length === 0 ? (
        <div className="text-gray-600">No utilities found. Add a module under <code>src/util-modules/</code>.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedModules.map((module) => (
            <Link
              key={module.route}
              to={module.route}
              className="group bg-white rounded-lg shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center mr-4">
                  {module.icon ? (
                    typeof module.icon === 'string' ? (
                      <span className="text-xl">{module.icon}</span>
                    ) : (
                      module.icon
                    )
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {module.title}
                  </h2>
                  <p className="text-sm text-gray-500">{module.route}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;