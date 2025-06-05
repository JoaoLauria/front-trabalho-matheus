import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText,
  Chip,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

const AppSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  valueKey = 'id',
  labelKey = 'name',
  fullWidth = true,
  required = false,
  disabled = false,
  error = null,
  helperText = '',
  multiple = false,
  sx = {},
  ...props
}) => {
  
  const renderValue = (selected) => {
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      return <em>Selecione</em>;
    }
    
    if (multiple) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => {
            
            const optionValue = typeof value === 'string' ? value : value.toString();
            const option = options.find(opt => {
              const optKey = typeof opt[valueKey] === 'string' ? opt[valueKey] : opt[valueKey].toString();
              return optKey === optionValue;
            });
            return (
              <Chip 
                key={value} 
                label={option ? option[labelKey] : value} 
                size="small" 
              />
            );
          })}
        </Box>
      );
    }
    
    
    const selectedValue = typeof selected === 'string' ? selected : selected.toString();
    const option = options.find(opt => {
      const optKey = typeof opt[valueKey] === 'string' ? opt[valueKey] : opt[valueKey].toString();
      return optKey === selectedValue;
    });
    
    return option ? option[labelKey] : selected;
  };
  
  
  const { renderValue: customRenderValue, ...otherProps } = props;
  
  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={!!error} 
      required={required}
      disabled={disabled}
      sx={{ 
        width: '100%',
        '& .MuiInputBase-root': { width: '100%' },
        '& .MuiSelect-select': { width: '100%' },
        ...sx 
      }}
      {...otherProps}
    >
      {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        multiple={multiple}
        renderValue={customRenderValue || (options.length > 0 ? renderValue : undefined)}
        label={label}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300
            }
          }
        }}
      >
        {props.children || options.map((option) => (
          <MenuItem key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
    </FormControl>
  );
};

export const SimpleSelect = styled(AppSelect)({});

export const MultiSelect = styled((props) => (
  <AppSelect multiple {...props} />
))({});

export const CategorySelect = styled((props) => {
  const defaultOptions = props.options || [];
  const allOption = { id: 'all', name: 'Todos' };
  
  const options = [
    allOption,
    ...defaultOptions
  ];
  
  return (
    <AppSelect 
      options={options}
      {...props}
    />
  );
})({});

export const StatusSelect = styled((props) => {
  const defaultOptions = [
    { id: 'active', name: 'Ativo' },
    { id: 'inactive', name: 'Inativo' }
  ];
  
  const options = props.options || defaultOptions;
  
  return (
    <AppSelect 
      options={options}
      {...props}
    />
  );
})({});

export default AppSelect;
