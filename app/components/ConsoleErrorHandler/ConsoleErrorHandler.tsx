'use client';

import { useEffect } from 'react';

const ConsoleErrorHandler = () => {
  useEffect(() => {
    // Override console.error to handle errors gracefully
    const originalError = console.error;
    console.error = (...args) => {
      // Log the error but don't break the app
      originalError.apply(console, args);
      
      // You can add error reporting here
      if (process.env.NODE_ENV === 'production') {
        // Send to error tracking service
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      console.error = originalError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
};

export default ConsoleErrorHandler;
