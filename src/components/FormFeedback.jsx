import React, { useState, useEffect } from 'react';

/**
 * Error Feedback Component
 * Displays inline validation errors for form fields
 */
export const FormError = ({ message, className = '' }) => {
  if (!message) return null;
  
  return (
    <div className={`text-red-600 text-sm font-medium mt-1 flex items-center gap-1.5 ${className}`}>
      <span className="text-lg">⚠️</span>
      <span>{message}</span>
    </div>
  );
};

/**
 * Success Message Component
 * Displays success feedback
 */
export const SuccessMessage = ({ message, className = '' }) => {
  if (!message) return null;
  
  return (
    <div className={`text-green-600 text-sm font-medium mt-1 flex items-center gap-1.5 ${className}`}>
      <span className="text-lg">✓</span>
      <span>{message}</span>
    </div>
  );
};

/**
 * Toast Notification Component
 * Temporary notification that auto-dismisses
 */
export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }[type];

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: 'ℹ️',
  }[type];

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-in`}>
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{message}</span>
    </div>
  );
};

/**
 * Alert Box Component
 * Reusable alert for important messages
 */
export const Alert = ({ 
  type = 'info',
  title,
  message,
  onClose,
  actions
}) => {
  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`${bgColors[type]} border rounded-lg p-4 mb-4`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <div className="flex-1">
          {title && <h3 className={`font-semibold ${textColors[type]} mb-1`}>{title}</h3>}
          <p className={`text-sm ${textColors[type]} mb-3`}>{message}</p>
          {actions && (
            <div className="flex gap-2">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${action.variant === 'primary' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Loading Spinner Component
 */
export const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-green-500 rounded-full animate-spin`}></div>
      {message && <p className="text-gray-600 font-medium">{message}</p>}
    </div>
  );
};

/**
 * Loading Button Component
 * Button with loading state
 */
export const LoadingButton = ({ 
  loading = false, 
  disabled = false,
  children,
  className = '',
  ...props 
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={`disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
      <span>{children}</span>
    </button>
  );
};
