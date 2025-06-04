import React, { createContext, useState, useContext } from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    duration: 6000,
    severity: 'error'
  });

  const showError = (message, duration = 6000) => {
    setNotification({
      open: true,
      message,
      duration,
      severity: 'error'
    });
  };
  
  const showSuccess = (message, duration = 6000) => {
    setNotification({
      open: true,
      message,
      duration,
      severity: 'success'
    });
  };

  const clearNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };


  const isConnectionError = (error) => {
    if (!error || !error.message) return false;
    
    return [
      'Failed to fetch',
      'Network Error',
      'ECONNREFUSED',
      'timeout',
      'Network request failed'
    ].some(term => error.message.includes(term));
  };


  const handleApiError = (error) => {
    if (error) {
      let errorMessage = typeof error === 'string' 
        ? error 
        : error.message || 'Ocorreu um erro inesperado';
      
      if (typeof error !== 'string' && isConnectionError(error)) {
        errorMessage = 'Servidor offline. Verifique sua conexão ou contate o suporte.';
      }
      
      showError(errorMessage);
      return errorMessage;
    }
    return '';
  };

  return (
    <ErrorContext.Provider value={{ showError, showSuccess, clearNotification, handleApiError, isConnectionError }}>
      {children}
      <ErrorSnackbar
        open={notification.open}
        message={notification.message}
        onClose={clearNotification}
        duration={notification.duration}
        severity={notification.severity}
      />
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError deve ser usado dentro de um ErrorProvider');
  }
  return context;
}
