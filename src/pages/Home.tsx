import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Extensible Web Utilities Toolbox
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A modular collection of web utilities built with React and TypeScript
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900">Modular Design</h2>
          </div>
          <p className="text-gray-600">
            Each utility is a self-contained module that can be easily added, removed, or modified 
            without affecting other components.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900">Auto-Discovery</h2>
          </div>
          <p className="text-gray-600">
            New utilities are automatically detected and registered in the navigation. 
            Just create a new folder in the util-modules directory!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900">TypeScript</h2>
          </div>
          <p className="text-gray-600">
            Built with TypeScript for better development experience, type safety, 
            and improved code maintainability.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900">Documentation</h2>
          </div>
          <p className="text-gray-600">
            Comprehensive documentation on how to create and integrate new utility modules. 
            Check out the Documentation page to get started!
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h3>
        <p className="text-gray-600 mb-6">
          Browse the available utilities in the sidebar or check out the documentation 
          to learn how to create your own modules.
        </p>
        <div className="space-x-4">
          <a
            href="/docs"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;