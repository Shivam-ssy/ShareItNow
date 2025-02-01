import React, { useState } from 'react';
import { Check, Copy, Clock, Link as LinkIcon } from 'lucide-react';

const ResponseCard = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 rounded-xl shadow-lg" style={{ backgroundColor: '#ce3f21' }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-white mb-2">
          <LinkIcon className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Share Download Link</h2>
        </div>
        <div className="flex items-center gap-2 text-white/90">
          <Clock className="w-5 h-5" />
          <p className="text-sm">This link will expire in 24 hours</p>
        </div>
      </div>

      {/* Link Input Group */}
      <div className="bg-white p-1 rounded-lg shadow-inner">
        <div className="flex gap-2">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-md text-gray-700 font-medium focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              copied 
                ? 'bg-[#ce3f21] text-white' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Message */}
      <div className="mt-4 text-white/80 text-sm text-center">
        Share this link with anyone who needs to download the file
      </div>
    </div>
  );
};

export default ResponseCard;