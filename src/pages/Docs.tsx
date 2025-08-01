import React from 'react';

const Docs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Documentation</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Creating a New Utility Module</h2>
          <p className="text-gray-600 mb-6">
            This toolbox uses a modular architecture where each utility is a self-contained module. 
            Follow these steps to create a new utility:
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Folder Structure</h3>
          <p className="text-gray-600 mb-4">
            Create a new folder under <code className="bg-gray-100 px-2 py-1 rounded">src/util-modules/</code> with your module name:
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 font-mono text-sm">
            <pre>{`src/util-modules/
├─ YourModuleName/
│  ├─ index.tsx        # React component (required)
│  └─ meta.ts          # Module metadata (required)`}</pre>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Module Metadata (meta.ts)</h3>
          <p className="text-gray-600 mb-4">
            Create a <code className="bg-gray-100 px-2 py-1 rounded">meta.ts</code> file that exports the module configuration:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
            <pre><code>{`import { ModuleMeta } from '../../types/module';

export const title = 'Your Module Title';
export const route = '/your-module';
export const icon = '🔧'; // Optional: string or React element

// Or export as default:
const meta: ModuleMeta = {
  title: 'Your Module Title',
  route: '/your-module',
  icon: '🔧' // Optional
};

export default meta;`}</code></pre>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Module Component (index.tsx)</h3>
          <p className="text-gray-600 mb-4">
            Create an <code className="bg-gray-100 px-2 py-1 rounded">index.tsx</code> file with your React component:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
            <pre><code>{`import React, { useState } from 'react';

const YourModule: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleProcess = () => {
    // Your utility logic here
    setResult(\`Processed: \${input}\`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Your Module Title
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Input
          </label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter something..."
          />
        </div>
        
        <button
          onClick={handleProcess}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Process
        </button>
        
        {result && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default YourModule;`}</code></pre>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Module Interface</h3>
          <p className="text-gray-600 mb-4">
            Your module metadata must conform to the <code className="bg-gray-100 px-2 py-1 rounded">ModuleMeta</code> interface:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6">
            <pre><code>{`export interface ModuleMeta {
  title: string;        // Display name in sidebar
  route: string;        // URL path (e.g., '/my-tool')
  icon?: ReactElement | string; // Optional icon (emoji or React element)
}`}</code></pre>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Auto-Registration</h3>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-blue-700">
                  <strong>Automatic Discovery:</strong> The build pipeline automatically discovers and registers 
                  any module that follows the folder structure above. No manual registration required!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Styling Guidelines</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Use Tailwind CSS classes for consistent styling</li>
            <li>Follow the existing design patterns (white cards, blue primary color)</li>
            <li>Ensure your module is responsive (works on mobile and desktop)</li>
            <li>Use semantic HTML elements for accessibility</li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Example Module</h3>
          <p className="text-gray-600 mb-4">
            Check out the <code className="bg-gray-100 px-2 py-1 rounded">ExampleModule</code> in the sidebar 
            to see a complete working example of a utility module.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Testing</h3>
          <p className="text-gray-600 mb-4">
            To test your module during development:
          </p>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2">
            <li>Run <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
            <li>Navigate to your module's route in the browser</li>
            <li>Check that it appears in the sidebar navigation</li>
            <li>Test all functionality and responsive behavior</li>
          </ol>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600">
            If you encounter any issues or have questions about creating modules, please refer to the 
            existing modules in <code className="bg-gray-100 px-2 py-1 rounded">src/util-modules/</code> 
            for reference implementations.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Docs;