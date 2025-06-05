import React from 'react';

import { 

  List, 

  ListItem, 

  ListItemText, 

  ListItemIcon, 

  ListItemAvatar,

  ListItemSecondaryAction,

  Divider,

  Typography,

  Box,

  CircularProgress,

  Fade,

  Paper

} from '@mui/material';

import { styled } from '@mui/material/styles';

import { colors } from '../../styles/theme';

const AppList = ({

  items = [],

  renderItem,

  loading = false,

  emptyMessage = 'Nenhum item encontrado',

  divider = true,

  sx = {},

  ...props

}) => {

  const listStyles = {

    width: '100%',

    borderRadius: 2,

    padding: { xs: 0.5, sm: 1 },

    ...sx

  };

  if (loading) {

    return (

      <Fade in={true} timeout={500}>

        <Paper 

          elevation={0}

          sx={{ 

            display: 'flex', 

            flexDirection: 'column',

            justifyContent: 'center', 

            alignItems: 'center', 

            p: { xs: 3, sm: 4 },

            minHeight: '180px',

            backgroundColor: 'rgba(0, 0, 0, 0.01)',

            borderRadius: 3,

            border: '1px dashed',

            borderColor: 'divider'

          }}

        >

          <CircularProgress 

            size={36} 

            thickness={4} 

            sx={{ 

              color: colors.primary.main,

              opacity: 0.8

            }} 

          />

          <Typography 

            variant="body2" 

            color="text.secondary" 

            sx={{ 

              mt: 2, 

              fontWeight: 500,

              fontSize: { xs: '0.85rem', sm: '0.9rem' },

              letterSpacing: '0.01em'

            }}

          >

            Carregando...

          </Typography>

        </Paper>

      </Fade>

    );

  }

  

  if (!items || items.length === 0) {

    return (

      <Fade in={true} timeout={400}>

        <Paper 

          elevation={0}

          sx={{ 

            display: 'flex', 

            flexDirection: 'column',

            justifyContent: 'center', 

            alignItems: 'center', 

            p: { xs: 3, sm: 4 },

            minHeight: '180px',

            backgroundColor: 'rgba(0, 0, 0, 0.01)',

            borderRadius: 3,

            border: '1px dashed',

            borderColor: 'divider'

          }}

        >

          <Box 

            sx={{ 

              width: 48, 

              height: 48, 

              borderRadius: '50%', 

              backgroundColor: `${colors.primary.light}20`,

              display: 'flex',

              alignItems: 'center',

              justifyContent: 'center',

              mb: 2

            }}

          >

            <Box 

              sx={{ 

                width: 24, 

                height: 24, 

                borderRadius: '50%', 

                backgroundColor: `${colors.primary.light}70`

              }}

            />

          </Box>

          <Typography 

            color="text.secondary" 

            sx={{ 

              fontWeight: 500,

              textAlign: 'center',

              opacity: 0.7,

              fontSize: { xs: '0.9rem', sm: '1rem' },

              maxWidth: '80%'

            }}

          >

            {emptyMessage}

          </Typography>

        </Paper>

      </Fade>

    );

  }

  

  return (

    <Fade in={true} timeout={400}>

      <Paper

        elevation={0}

        sx={{

          borderRadius: 3,

          overflow: 'hidden',

          backgroundColor: 'background.paper',

          border: '1px solid',

          borderColor: 'divider',

          transition: 'all 0.3s ease',

          maxHeight: props.maxHeight || '70vh',

          display: 'flex',

          flexDirection: 'column'

        }}

      >

        <List 

          sx={{

            ...listStyles,

            overflow: 'auto',

            flex: 1

          }} 

          {...props}>

          {items.map((item, index) => (

            <React.Fragment key={item.id || index}>

              {renderItem ? renderItem(item, index) : (

                <ListItem>

                  <ListItemText 

                    primary={item.name || item.title || `Item ${index + 1}`}

                    primaryTypographyProps={{

                      sx: {

                        fontSize: { xs: '0.9375rem', sm: '1rem' },

                        fontWeight: 500

                      }

                    }} 

                  />

                </ListItem>

              )}

              {divider && index < items.length - 1 && 

                <Divider 

                  component="li" 

                  sx={{ 

                    borderColor: 'rgba(0, 0, 0, 0.04)',

                    margin: { xs: '0 12px', sm: '0 16px' },

                    opacity: 0.8

                  }} 

                />}

            </React.Fragment>

          ))}

        </List>

      </Paper>

    </Fade>

  );

};

export const AppListItem = ({

  primary,

  secondary,

  icon,

  avatar,

  action,

  onClick,

  selected = false,

  disabled = false,

  sx = {},

  ...props

}) => {

  

  const listItemStyles = {

    borderRadius: 2,

    padding: { xs: '12px 14px', sm: '14px 18px' },

    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',

    cursor: onClick ? 'pointer' : 'default',

    marginY: 0.5,

    position: 'relative',

    overflow: 'hidden',

    '&:hover': onClick && !disabled ? { 

      backgroundColor: `${colors.primary.main}08`,

      transform: 'translateX(4px)',

      boxShadow: '0 2px 12px rgba(0,0,0,0.04)'

    } : {},

    '&.Mui-selected': {

      backgroundColor: `${colors.primary.main}15`,

      borderLeft: `3px solid ${colors.primary.main}`,

      paddingLeft: { xs: '11px', sm: '15px' },

      '&:hover': {

        backgroundColor: `${colors.primary.main}25`,

      }

    },

    '&:after': selected ? {

      content: '""',

      position: 'absolute',

      top: 0,

      left: 0,

      width: '100%',

      height: '100%',

      background: `radial-gradient(circle at top left, ${colors.primary.main}10 0%, transparent 70%)`,

      pointerEvents: 'none'

    } : {},

    ...sx

  };

  

  const primaryTextProps = {

    component: 'div',

    variant: 'body1',

    sx: {

      fontWeight: 600,

      color: disabled ? 'text.disabled' : selected ? colors.primary.main : 'text.primary',

      fontSize: { xs: '0.9375rem', sm: '1rem' },

      letterSpacing: '0.01em',

      transition: 'color 0.2s ease'

    }

  };

  

  const secondaryTextProps = {

    component: 'div',

    variant: 'body2',

    sx: {

      color: disabled ? 'text.disabled' : 'text.secondary',

      fontSize: { xs: '0.8125rem', sm: '0.875rem' },

      mt: 0.5,

      lineHeight: 1.5,

      opacity: 0.85

    }

  };

  

  const iconStyles = {

    color: disabled ? 'text.disabled' : 

           selected ? colors.primary.main : 

           'text.secondary',

    minWidth: { xs: '40px', sm: '48px' },

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    '& .MuiSvgIcon-root': {

      fontSize: { xs: '1.25rem', sm: '1.4rem' },

      transition: 'transform 0.2s ease',

      ...(onClick && !disabled && {

        '&:hover': {

          transform: 'scale(1.1)'

        }

      })

    }

  };

  return (

    <Fade in={true} timeout={400}>

      <ListItem 

        onClick={onClick}

        selected={selected}

        disabled={disabled}

        sx={listItemStyles}

        {...props}

      >

        {icon && <ListItemIcon sx={iconStyles}>{icon}</ListItemIcon>}

        {avatar && <ListItemAvatar>{avatar}</ListItemAvatar>}

        <ListItemText 

          primary={primary}

          secondary={secondary}

          primaryTypographyProps={primaryTextProps}

          secondaryTypographyProps={secondaryTextProps}

        />

        {action && (

          <ListItemSecondaryAction 

            sx={{ 

              right: { xs: 8, sm: 16 },

              display: 'flex',

              alignItems: 'center',

              gap: 1

            }}

          >

            {action}

          </ListItemSecondaryAction>

        )}

      </ListItem>

    </Fade>

  );

};

export const ClickableList = styled(AppList)(({ theme }) => ({

  '& .MuiListItem-root': {

    cursor: 'pointer',

    transition: 'all 0.2s ease-in-out',

    borderRadius: theme.shape.borderRadius,

    margin: '2px 0',

    '&:hover': {

      backgroundColor: `${colors.primary.main}10`,

      transform: 'translateX(4px)',

      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',

    },

  },

}));

export const DenseList = styled(AppList)(({ theme }) => ({

  '& .MuiListItem-root': {

    padding: '6px 12px',

    borderRadius: theme.shape.borderRadius,

    margin: '1px 0',

  },

  '& .MuiListItemText-root': {

    margin: '2px 0',

  },

  '& .MuiListItemText-primary': {

    fontSize: '0.875rem',

  },

  '& .MuiListItemText-secondary': {

    fontSize: '0.75rem',

  },

}));

export default AppList;

