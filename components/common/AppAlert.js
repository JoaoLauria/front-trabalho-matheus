import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const AppAlert = ({ children, severity = 'info', title, sx, ...props }) => {
  return (
    <Alert 
      severity={severity} 
      sx={{ 
        borderRadius: 1,
        ...sx 
      }}
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
};

AppAlert.Error = (props) => <AppAlert severity="error" {...props} />;
AppAlert.Warning = (props) => <AppAlert severity="warning" {...props} />;
AppAlert.Info = (props) => <AppAlert severity="info" {...props} />;
AppAlert.Success = (props) => <AppAlert severity="success" {...props} />;

export default AppAlert;
