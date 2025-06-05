import React from 'react';
import { Snackbar, Alert, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const AppSnackbar = ({
  open,
  message,
  onClose,
  duration = 6000,
  severity = 'info',
  variant = 'filled',
  position = 'bottom-center',
  ...props
}) => {
  
  const getPosition = () => {
    const positions = {
      'top-left': { vertical: 'top', horizontal: 'left' },
      'top-center': { vertical: 'top', horizontal: 'center' },
      'top-right': { vertical: 'top', horizontal: 'right' },
      'bottom-left': { vertical: 'bottom', horizontal: 'left' },
      'bottom-center': { vertical: 'bottom', horizontal: 'center' },
      'bottom-right': { vertical: 'bottom', horizontal: 'right' },
    };
    
    return positions[position] || positions['bottom-center'];
  };
  
  const { vertical, horizontal } = getPosition();
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
      {...props}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant={variant}
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
        {message || 'Notificação'}
      </Alert>
    </Snackbar>
  );
};

export const SuccessSnackbar = styled((props) => (
  <AppSnackbar severity="success" {...props} />
))({});

export const ErrorSnackbar = styled((props) => (
  <AppSnackbar severity="error" {...props} />
))({});

export const InfoSnackbar = styled((props) => (
  <AppSnackbar severity="info" {...props} />
))({});

export const WarningSnackbar = styled((props) => (
  <AppSnackbar severity="warning" {...props} />
))({});

export default AppSnackbar;
