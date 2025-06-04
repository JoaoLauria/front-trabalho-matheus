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

/**
 * Componente de seleção reutilizável
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Rótulo do campo
 * @param {string} props.name - Nome do campo
 * @param {any} props.value - Valor selecionado
 * @param {function} props.onChange - Função a ser chamada quando o valor mudar
 * @param {Array} props.options - Opções de seleção
 * @param {string} props.valueKey - Chave do valor nas opções (padrão: 'id')
 * @param {string} props.labelKey - Chave do rótulo nas opções (padrão: 'name')
 * @param {boolean} props.fullWidth - Se o campo deve ocupar toda a largura disponível
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {boolean} props.disabled - Se o campo está desabilitado
 * @param {string} props.error - Mensagem de erro
 * @param {string} props.helperText - Texto de ajuda
 * @param {boolean} props.multiple - Se permite seleção múltipla
 * @param {Object} props.sx - Estilos adicionais
 * @returns {JSX.Element} Componente de seleção
 */
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
  // Função para renderizar os itens selecionados no modo múltiplo
  const renderValue = (selected) => {
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      return <em>Selecione</em>;
    }
    
    if (multiple) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => {
            // Para lidar com valores numéricos e string
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
    
    // Para lidar com valores numéricos e string
    const selectedValue = typeof selected === 'string' ? selected : selected.toString();
    const option = options.find(opt => {
      const optKey = typeof opt[valueKey] === 'string' ? opt[valueKey] : opt[valueKey].toString();
      return optKey === selectedValue;
    });
    
    return option ? option[labelKey] : selected;
  };
  
  // Extraímos renderValue dos props para não passá-lo para o FormControl
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

// Variantes predefinidas
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
