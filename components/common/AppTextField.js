import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Componente de campo de texto reutilizável
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Rótulo do campo
 * @param {string} props.name - Nome do campo
 * @param {string} props.value - Valor do campo
 * @param {function} props.onChange - Função a ser chamada quando o valor do campo mudar
 * @param {string} props.variant - Variante do campo (outlined, filled, standard)
 * @param {boolean} props.fullWidth - Se o campo deve ocupar toda a largura disponível
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {boolean} props.disabled - Se o campo está desabilitado
 * @param {string} props.error - Mensagem de erro
 * @param {string} props.helperText - Texto de ajuda
 * @param {string} props.type - Tipo do campo (text, password, number, etc)
 * @param {React.ReactNode} props.startAdornment - Elemento a ser exibido no início do campo
 * @param {React.ReactNode} props.endAdornment - Elemento a ser exibido no final do campo
 * @returns {JSX.Element} Componente de campo de texto
 */
const AppTextField = ({
  label,
  name,
  value,
  onChange,
  variant = 'outlined',
  fullWidth = true,
  required = false,
  disabled = false,
  error = null,
  helperText = '',
  type = 'text',
  startAdornment = null,
  endAdornment = null,
  ...props
}) => {
  const inputProps = {};
  
  if (startAdornment) {
    inputProps.startAdornment = (
      <InputAdornment position="start">{startAdornment}</InputAdornment>
    );
  }
  
  if (endAdornment) {
    inputProps.endAdornment = (
      <InputAdornment position="end">{endAdornment}</InputAdornment>
    );
  }
  
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant={variant}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={Boolean(error)}
      helperText={error || helperText}
      type={type}
      InputProps={Object.keys(inputProps).length > 0 ? inputProps : undefined}
      {...props}
    />
  );
};

// Variantes predefinidas
export const TextInput = styled(AppTextField)({});

export const NumberInput = styled((props) => (
  <AppTextField type="number" {...props} />
))({});

export const PasswordInput = styled((props) => (
  <AppTextField type="password" {...props} />
))({});

export const EmailInput = styled((props) => (
  <AppTextField type="email" {...props} />
))({});

export const SearchInput = styled((props) => (
  <AppTextField
    placeholder={props.placeholder || 'Pesquisar...'}
    {...props}
  />
))({});

export const CurrencyInput = styled((props) => {
  const handleChange = (e) => {
    // Remove caracteres não numéricos, exceto ponto
    let value = e.target.value.replace(/[^\d.]/g, '');
    
    // Garante que só exista um ponto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limita a 2 casas decimais
    if (parts.length > 1 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    // Cria um novo evento com o valor formatado
    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value,
        name: e.target.name
      }
    };
    
    if (props.onChange) {
      props.onChange(newEvent);
    }
  };
  
  return (
    <AppTextField
      type="text"
      startAdornment="R$"
      onChange={handleChange}
      {...props}
    />
  );
})({});

export default AppTextField;
