import React, { useState } from 'react';

const TextTransformer: React.FC = () => {
  const [input, setInput] = useState('');
  const [transformType, setTransformType] = useState<'uppercase' | 'lowercase' | 'reverse' | 'words'>('uppercase');
  const [result, setResult] = useState('');

  const transformText = () => {
    let transformed = '';
    
    switch (transformType) {
      case 'uppercase':
        transformed = input.toUpperCase();
        break;
      case 'lowercase':
        transformed = input.toLowerCase();
        break;
      case 'reverse':
        transformed = input.split('').reverse().join('');
        break;
      case 'words':
        transformed = input
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      default:
        transformed = input;
    }
    
    setResult(transformed);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Text Transformer
      </h1>
      <p className="text-gray-600 mb-8">
        Transform text using various formatting options. This is an example utility module 
        demonstrating the modular architecture.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Input Section */}
        <div className="mb-6">
          <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            id="input-text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            rows={4}
            placeholder="Enter your text here..."
          />
        </div>

        {/* Transform Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transformation Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { value: 'uppercase', label: 'UPPERCASE' },
              { value: 'lowercase', label: 'lowercase' },
              { value: 'reverse', label: 'Reverse' },
              { value: 'words', label: 'Title Case' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="transform"
                  value={option.value}
                  checked={transformType === option.value}
                  onChange={(e) => setTransformType(e.target.value as typeof transformType)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={transformText}
            disabled={!input.trim()}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Transform Text
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-3 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Result
              </label>
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <div className="p-3 bg-gray-50 rounded-md border">
              <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">About This Module</h3>
        <p className="text-blue-700 text-sm">
          This is an example utility module that demonstrates how to create modular utilities 
          in this toolbox. The module provides text transformation capabilities with a clean, 
          user-friendly interface. Check out the source code in{' '}
          <code className="bg-blue-100 px-1 rounded">src/util-modules/TextTransformer/</code> 
          to see how it's implemented.
        </p>
      </div>
    </div>
  );
};

export default TextTransformer;