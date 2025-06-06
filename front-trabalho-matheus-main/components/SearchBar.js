;
import { TextField, InputAdornment, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ busca, setBusca }) => {
  const handleClear = () => {
    setBusca('');
  };
  return (
    <Paper 
      elevation={2}
      sx={{ 
        display: 'flex', 
        borderRadius: 2,
        mb: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'primary.light'
      }}
    >
      <TextField
        placeholder="Buscar produtos por nome..."
        variant="outlined"
        fullWidth
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: busca ? (
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
    </Paper>
  );
};

export default SearchBar;
