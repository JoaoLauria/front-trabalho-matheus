;
import { InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { AppBox, AppTextField } from './index';

const AppSearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Buscar...", 
  sx = {},
  ...props 
}) => {
  const handleClear = () => {
    onChange('');
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <AppBox.Paper
      elevation={2}
      sx={{ 
        display: 'flex', 
        borderRadius: 2,
        mb: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'primary.light',
        ...sx
      }}
      {...props}
    >
      <AppTextField
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton 
                size="small" 
                onClick={handleClear}
                sx={{ color: 'grey.500' }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: { 
            borderRadius: 2,
            '& fieldset': { border: 'none' },
            fontSize: '1.1rem'
          }
        }}
      />
    </AppBox.Paper>
  );
};

AppSearchBar.Product = (props) => (
  <AppSearchBar 
    placeholder="Buscar produtos por nome..."
    {...props}
  />
);

AppSearchBar.Category = (props) => (
  <AppSearchBar 
    placeholder="Buscar categorias..."
    {...props}
  />
);

AppSearchBar.Order = (props) => (
  <AppSearchBar 
    placeholder="Buscar pedidos..."
    {...props}
  />
);

export default AppSearchBar;
