import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    
    let value = e.target.value.replace(/[^\d.]/g, '');
    
    
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    
    if (parts.length > 1 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    
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
