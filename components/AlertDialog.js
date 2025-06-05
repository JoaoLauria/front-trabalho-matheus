import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button,
  Typography,
  Box
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

const AlertDialog = ({ 
  open, 
  onClose, 
  title, 
  message, 
  type = 'info', 
  confirmText = 'OK',
  onConfirm = null
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon fontSize="large" color="error" />;
      case 'success':
        return <CheckCircleIcon fontSize="large" color="success" />;
      default:
        return <InfoIcon fontSize="large" color="primary" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'error':
        return 'error.main';
      case 'success':
        return 'success.main';
      default:
        return 'primary.main';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: '300px'
        }
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 1 }}>
            {getIcon()}
          </Box>
          <Typography variant="h6" component="div" sx={{ color: getColor() }}>
            {title || (type === 'error' ? 'Erro' : type === 'success' ? 'Sucesso' : 'Aviso')}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ color: 'text.primary' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          color={type === 'error' ? 'error' : type === 'success' ? 'success' : 'primary'}
          autoFocus
          sx={{ borderRadius: 2 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
