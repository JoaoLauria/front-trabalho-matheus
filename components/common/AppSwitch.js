import React from 'react';
import { 
  FormControlLabel, 
  Switch, 
  FormGroup, 
  FormHelperText,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Componente de switch reutilizável
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Rótulo do switch
 * @param {string} props.name - Nome do switch
 * @param {boolean} props.checked - Se o switch está marcado
 * @param {function} props.onChange - Função a ser chamada quando o valor mudar
 * @param {boolean} props.disabled - Se o switch está desabilitado
 * @param {string} props.error - Mensagem de erro
 * @param {string} props.helperText - Texto de ajuda
 * @param {string} props.color - Cor do switch (primary, secondary, success, error, warning, info)
 * @param {string} props.size - Tamanho do switch (small, medium)
 * @param {Object} props.sx - Estilos adicionais
 * @returns {JSX.Element} Componente de switch
 */
const AppSwitch = ({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  error = null,
  helperText = '',
  color = 'primary',
  size = 'medium',
  sx = {},
  ...props
}) => {
  return (
    <FormGroup sx={sx}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            name={name}
            color={color}
            size={size}
            disabled={disabled}
            {...props}
          />
        }
        label={
          <Typography 
            variant="body1" 
            color={disabled ? 'text.disabled' : 'text.primary'}
          >
            {label}
          </Typography>
        }
      />
      {(error || helperText) && (
        <FormHelperText error={Boolean(error)}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormGroup>
  );
};

// Variantes predefinidas
export const StatusSwitch = styled((props) => {
  const { value, onChange, ...otherProps } = props;
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <AppSwitch
        checked={value === true || value === 'active' || value === 1}
        onChange={handleChange}
        {...otherProps}
      />
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ ml: 1 }}
      >
        {props.checked ? 'Ativo' : 'Inativo'}
      </Typography>
    </Box>
  );
})({});

export const AvailabilitySwitch = styled((props) => (
  <AppSwitch
    label={props.label || 'Disponível'}
    {...props}
  />
))({});

export default AppSwitch;
