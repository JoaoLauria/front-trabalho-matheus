import React from 'react';
import { Snackbar, Alert } from '@mui/material';

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
