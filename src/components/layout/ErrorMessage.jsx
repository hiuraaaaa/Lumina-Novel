import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Terjadi kesalahan', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Oops! Ada Masalah
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
