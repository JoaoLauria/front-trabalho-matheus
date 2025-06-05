;
import { Button, IconButton as MuiIconButton, Tooltip, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { colors } from '../../styles/theme';

const AppButton = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  startIcon,
  endIcon,
  loading = false,
  children,
  sx = {},
  ...props
}) => {
  
  const buttonStyles = {
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 500,
    boxShadow: variant === 'contained' ? '0 4px 10px rgba(0,0,0,0.12)' : 'none',
    transition: 'all 0.2s ease-in-out',
    padding: size === 'large' ? '12px 24px' : size === 'small' ? '6px 16px' : '10px 20px',
    fontSize: size === 'large' ? '1rem' : size === 'small' ? '0.8125rem' : '0.9375rem',
    '&:hover': {
      transform: disabled || loading ? 'none' : 'translateY(-2px)',
      boxShadow: variant === 'contained' ? '0 6px 15px rgba(0,0,0,0.15)' : 'none',
    },
    ...sx
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      sx={buttonStyles}
      {...props}
    >
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={size === 'small' ? 16 : 20} color="inherit" />
          <span>{children}</span>
        </Box>
      ) : (
        <>
          {startIcon && <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{startIcon}</Box>}
          {children}
          {endIcon && <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>{endIcon}</Box>}
        </>
      )}
    </Button>
  );
};

export const IconButton = ({
  icon,
  color = 'default',
  size = 'medium',
  onClick,
  disabled = false,
  tooltip,
  tooltipPlacement = 'top',
  sx = {},
  ...props
}) => {
  
  const iconButtonStyles = {
    borderRadius: '10px',
    padding: size === 'large' ? '12px' : size === 'small' ? '6px' : '8px',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: color === 'default' ? 'rgba(0, 0, 0, 0.04)' : 
                    color === 'primary' ? `${colors.primary.main}15` : 
                    color === 'secondary' ? `${colors.secondary.main}15` : 
                    color === 'error' ? 'rgba(211, 47, 47, 0.15)' : 'rgba(0, 0, 0, 0.04)',
    '&:hover': {
      backgroundColor: color === 'default' ? 'rgba(0, 0, 0, 0.08)' : 
                      color === 'primary' ? `${colors.primary.main}25` : 
                      color === 'secondary' ? `${colors.secondary.main}25` : 
                      color === 'error' ? 'rgba(211, 47, 47, 0.25)' : 'rgba(0, 0, 0, 0.08)',
      transform: disabled ? 'none' : 'translateY(-2px)',
      boxShadow: disabled ? 'none' : '0 3px 8px rgba(0,0,0,0.1)',
    },
    ...sx
  };

  const button = (
    <MuiIconButton
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled}
      sx={iconButtonStyles}
      {...props}
    >
      {icon}
    </MuiIconButton>
  );

  if (tooltip) {
    return (
      <Tooltip 
        title={tooltip} 
        placement={tooltipPlacement}
        arrow
        enterDelay={500}
      >
        <span>{button}</span>
      </Tooltip>
    );
  }

  return button;
};

export const PrimaryButton = styled(AppButton)({});

export const SecondaryButton = styled((props) => (
  <AppButton color="secondary" {...props} />
))({});

export const SuccessButton = styled((props) => (
  <AppButton color="success" {...props} />
))({});

export const ErrorButton = styled((props) => (
  <AppButton color="error" {...props} />
))({});

export const WarningButton = styled((props) => (
  <AppButton color="warning" {...props} />
))({});

export const InfoButton = styled((props) => (
  <AppButton color="info" {...props} />
))({});

export const SaveButton = styled((props) => (
  <AppButton 
    color="primary" 
    startIcon={props.startIcon} 
    {...props}
  >
    {props.children || 'Salvar'}
  </AppButton>
))({});

export const CancelButton = styled((props) => (
  <AppButton 
    variant="outlined" 
    color="inherit" 
    startIcon={props.startIcon} 
    {...props}
  >
    {props.children || 'Cancelar'}
  </AppButton>
))({});

export const DeleteButton = styled((props) => (
  <AppButton 
    color="error" 
    startIcon={props.startIcon} 
    {...props}
  >
    {props.children || 'Excluir'}
  </AppButton>
))({});

export const AddButton = styled((props) => (
  <AppButton 
    color="primary" 
    startIcon={props.startIcon || <AddIcon />} 
    {...props}
  >
    {props.children || 'Adicionar'}
  </AppButton>
))({});

export default AppButton;
AppButton.IconButton = IconButton;
