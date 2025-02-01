import React from 'react';
import { Download, File, Calendar, Mail } from 'lucide-react';

const FileCard = ({ fileName, sender, recipient, date, handleDownload }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          {/* File Info Section */}
          <div className="flex items-start space-x-3 sm:space-x-4 w-full">
            <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
              <File className="h-6 w-6 sm:h-8 sm:w-8 text-[#ce3f21]" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                {fileName}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">From: {sender}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="truncate">To: {recipient}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button 
            className="flex items-center justify-center p-2 hover:bg-blue-50 rounded-full transition-colors duration-200 ml-auto sm:ml-0 mt-2 sm:mt-0"
            onClick={handleDownload}
          >
            <Download className="h-5 w-5 sm:h-6 sm:w-6 text-[#ce3f21]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;