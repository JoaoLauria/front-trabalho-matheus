;
import { 
  FormControlLabel, 
  Switch, 
  FormGroup, 
  FormHelperText,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

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
