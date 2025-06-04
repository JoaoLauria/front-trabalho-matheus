import React from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * Componente para exibir notificações em um Snackbar
 * @param {boolean} open - Se o Snackbar está aberto ou não
 * @param {string} message - Mensagem a ser exibida
 * @param {function} onClose - Função para fechar o Snackbar
 * @param {number} duration - Duração em ms que o Snackbar ficará visível (padrão: 6000ms)
 * @param {string} severity - Tipo de alerta (error, success, info, warning)
 * @returns {JSX.Element} Componente Snackbar com Alert
 */
export default function ErrorSnackbar({ open, message, onClose, duration = 6000, severity = 'error' }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ 
          width: '100%',
          boxShadow: 3,
          '& .MuiAlert-icon': {
            fontSize: '1.2rem'
          },
          '& .MuiAlert-message': {
            fontSize: '0.95rem',
            fontWeight: 500
          }
        }}
      >
        {message || 'Ocorreu um erro. Tente novamente.'}
      </Alert>
    </Snackbar>
  );
}
