"use client";

import React, { useState, useEffect } from 'react';
import { HiExclamationCircle, HiCheckCircle, HiInformationCircle, HiX } from 'react-icons/hi';

/**
 * Error Feedback Component
 * Displays inline validation errors for form fields
 */
export const FormError = ({ message, className = '' }) => {
  if (!message) return null;
  
  return (
    <div className={`text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1.5 animate-fade-in ${className}`}>
      <HiExclamationCircle size={14} className="flex-shrink-0" />
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
    <div className={`text-green-500 text-sm font-bold mt-1.5 flex items-center gap-1.5 animate-fade-in ${className}`}>
      <HiCheckCircle size={16} className="flex-shrink-0" />
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
    success: 'bg-green-500 shadow-green-500/20',
    error: 'bg-red-500 shadow-red-500/20',
    warning: 'bg-yellow-500 shadow-yellow-500/20',
    info: 'bg-blue-600 shadow-blue-600/20',
  }[type];

  const Icon = {
    success: HiCheckCircle,
    error: HiExclamationCircle,
    warning: HiExclamationCircle,
    info: HiInformationCircle,
  }[type];

  return (
    <div className={`fixed top-6 right-6 ${bgColor} text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] animate-slide-in border border-white/10`}>
      <Icon size={22} />
      <span className="font-bold text-sm tracking-tight">{message}</span>
      <button onClick={() => setIsVisible(false)} className="ml-2 hover:opacity-70 transition-opacity">
        <HiX size={18} />
      </button>
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
    success: 'bg-green-50 border-green-100',
    error: 'bg-red-50 border-red-100',
    warning: 'bg-yellow-50 border-yellow-100',
    info: 'bg-blue-50 border-blue-100',
  };

  const textColors = {
    success: 'text-green-900',
    error: 'text-red-900',
    warning: 'text-yellow-900',
    info: 'text-blue-900',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = {
    success: HiCheckCircle,
    error: HiExclamationCircle,
    warning: HiExclamationCircle,
    info: HiInformationCircle,
  }[type];

  return (
    <div className={`${bgColors[type]} border-2 rounded-2xl p-5 mb-6 animate-fade-in relative overflow-hidden`}>
      <div className="flex items-start gap-4 relative z-10">
        <div className={iconColors[type]}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          {title && <h3 className={`font-bold text-lg leading-tight mb-1.5 ${textColors[type]}`}>{title}</h3>}
          <p className={`text-sm font-medium leading-relaxed mb-4 opacity-80 ${textColors[type]}`}>{message}</p>
          {actions && (
            <div className="flex flex-wrap gap-2">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    action.variant === 'primary' 
                      ? 'bg-green-500 text-white hover:bg-green-600 shadow-sm' 
                      : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200'
                  }`}
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
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <HiX size={20} />
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
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
      <div className={`${sizes[size]} border-green-100 border-t-green-500 rounded-full animate-spin shadow-inner`}></div>
      {message && <p className="text-gray-500 font-bold text-sm tracking-tight">{message}</p>}
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
      className={`disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] ${className}`}
      {...props}
    >
      {loading && <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>}
      <span className={loading ? 'opacity-80' : 'opacity-100'}>{children}</span>
    </button>
  );
};
