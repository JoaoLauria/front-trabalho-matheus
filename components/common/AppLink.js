import React from 'react';
import { Link } from '@mui/material';

const AppLink = ({ children, onClick, sx, ...props }) => {
  return (
    <Link
      underline="hover"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        fontSize: 14,
        color: 'text.secondary',
        transition: 'color 0.2s',
        '&:hover': {
          color: 'primary.main',
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

AppLink.Primary = (props) => <AppLink color="primary.main" {...props} />;
AppLink.Secondary = (props) => <AppLink color="text.secondary" {...props} />;
AppLink.Action = (props) => (
  <AppLink
    sx={{
      fontWeight: 'medium',
      color: 'primary.main',
      '&:hover': {
        color: 'primary.dark',
      },
    }}
    {...props}
  />
);

export default AppLink;
