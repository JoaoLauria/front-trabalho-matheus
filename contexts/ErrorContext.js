import React, { createContext, useState, useContext } from 'react';
import ErrorSnackbar from '../components/ErrorSnackbar';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState({
    open: false,
    message: '',
    duration: 6000
  });

  const showError = (message, duration = 6000) => {
    setError({
      open: true,
      message,
      duration
    });
  };

  const clearError = () => {
    setError({
      ...error,
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
      
      // Verifica se é um erro de conexão
      if (typeof error !== 'string' && isConnectionError(error)) {
        errorMessage = 'Servidor offline. Verifique sua conexão ou contate o suporte.';
      }
      
      showError(errorMessage);
      return errorMessage;
    }
    return '';
  };

  return (
    <ErrorContext.Provider value={{ showError, clearError, handleApiError, isConnectionError }}>
      {children}
      <ErrorSnackbar
        open={error.open}
        message={error.message}
        onClose={clearError}
        duration={error.duration}
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
