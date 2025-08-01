import React, { useState, useEffect } from 'react';

const VoidTextBox: React.FC = () => {
  const [text, setText] = useState('');
  const [isVoiding, setIsVoiding] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [voidCount, setVoidCount] = useState(0);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  const CHARACTER_LIMIT = 280;
  const remainingChars = CHARACTER_LIMIT - text.length;

  const sendToVoid = () => {
    if (text.trim() === '') return;

    setIsVoiding(true);
    setIsSent(false);
    
    // Simulate sending to void with animation sequence
    setTimeout(() => {
      // Show "Sent" confirmation
      setIsSent(true);
      
      // After showing confirmation, start fade out
      setTimeout(() => {
        setText('');
        setVoidCount(prev => prev + 1);
        setIsVoiding(false);
        
        // Reset isSent after overlay has faded out completely
        setTimeout(() => {
          setIsSent(false);
        }, 500); // Match the transition duration
      }, 800);
    }, 1200);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= CHARACTER_LIMIT) {
      setText(newText);
    }
  };

  const clearText = () => {
    setText('');
  };

  // Load void count from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem('voidTextBoxCount');
    if (savedCount) {
      setVoidCount(parseInt(savedCount, 10));
    }
    setHasLoadedFromStorage(true);
  }, []);

  // Save void count to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (hasLoadedFromStorage) {
      localStorage.setItem('voidTextBoxCount', voidCount.toString());
    }
  }, [voidCount, hasLoadedFromStorage]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Void Text Box
      </h1>
      <p className="text-gray-600 mb-8">
        Write anything you want and send it into the digital void. Perfect for venting, 
        clearing your mind, or practicing writing without keeping a permanent record. 
        Your words disappear forever once sent.
      </p>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl p-6 mb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">Write into the void...</h2>
          <div className="text-gray-400 text-sm">
            {voidCount > 0 && (
              <span>✨ {voidCount} message{voidCount !== 1 ? 's' : ''} sent to void</span>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type your thoughts, worries, ideas, or anything you want to release into the void..."
            className={`w-full h-40 p-4 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
              isVoiding ? 'opacity-30' : ''
            }`}
            disabled={isVoiding}
          />
          
          {/* Voiding Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black rounded-md transition-all duration-500 ${
            isVoiding ? 'bg-opacity-70 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'
          }`}>
            <div className="text-white text-center">
              <div className="relative h-8 w-8 mx-auto mb-2">
                {/* Spinner - only visible when sending */}
                {!isSent && (
                  <div 
                    key="spinner"
                    className="absolute inset-0 animate-spin rounded-full border-b-2 border-purple-500"
                  ></div>
                )}
                
                {/* Checkmark - only visible when sent */}
                {isSent && (
                  <div 
                    key="checkmark"
                    className={`absolute inset-0 transition-all duration-300 ${
                      isSent ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <p className={`text-sm transition-colors duration-300 ${
                isSent ? 'font-medium text-green-400' : ''
              }`}>
                {!isSent ? 'Sending to the void...' : 'Sent to the void!'}
              </p>
            </div>
          </div>
        </div>

        {/* Character Counter */}
        <div className="flex justify-between items-center mt-3">
          <div className={`text-sm ${
            remainingChars < 20 
              ? 'text-red-400' 
              : remainingChars < 50 
                ? 'text-yellow-400' 
                : 'text-gray-400'
          }`}>
            {remainingChars} characters remaining
          </div>
          
          <div className="flex gap-3">
            {text.trim() && (
              <button
                onClick={clearText}
                disabled={isVoiding}
                className="px-4 py-2 text-gray-400 hover:text-white text-sm border border-gray-600 rounded-md hover:border-gray-500 transition-colors disabled:opacity-50"
              >
                Clear
              </button>
            )}
            
            <button
              onClick={sendToVoid}
              disabled={!text.trim() || isVoiding}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                !text.trim() || isVoiding
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
              }`}
            >
              {isVoiding 
                ? (isSent ? 'Sent!' : 'Voiding...') 
                : 'Send to Void'
              }
            </button>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-purple-900 mb-2">🌌 Digital Catharsis</h3>
          <p className="text-purple-700 text-sm">
            Sometimes we need to get thoughts out of our heads without keeping them. 
            This void provides a safe space to release whatever you're carrying.
          </p>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-indigo-900 mb-2">🔒 Completely Private</h3>
          <p className="text-indigo-700 text-sm">
            Nothing is saved, logged, or stored anywhere. Your words truly disappear 
            into the digital void, ensuring complete privacy and freedom.
          </p>
        </div>
      </div>

      {/* Usage Ideas */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">💡 How to Use the Void</h3>
        <ul className="text-gray-700 text-sm space-y-1">
          <li>• <strong>Vent frustrations</strong> - Get anger or stress off your chest</li>
          <li>• <strong>Release worries</strong> - Write down anxious thoughts and let them go</li>
          <li>• <strong>Practice writing</strong> - Draft ideas without commitment</li>
          <li>• <strong>Process emotions</strong> - Work through feelings safely</li>
          <li>• <strong>Brain dump</strong> - Clear mental clutter before important tasks</li>
          <li>• <strong>Secret thoughts</strong> - Express things you can't say elsewhere</li>
          <li>• <strong>Stream of consciousness</strong> - Let your mind flow freely</li>
        </ul>
      </div>

      {voidCount > 0 && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm">
            <span>🕳️</span>
            <span>You've successfully voided <strong>{voidCount}</strong> message{voidCount !== 1 ? 's' : ''}</span>
            <span>✨</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoidTextBox;