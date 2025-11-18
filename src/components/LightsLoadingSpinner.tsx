import React from 'react';

interface LightsLoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LightsLoadingSpinner: React.FC<LightsLoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-2 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
};

export default LightsLoadingSpinner;
