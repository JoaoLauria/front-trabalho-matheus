import React from 'react';
import {
  Box,
  Paper,
  InputBase,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import { Search, Close, Category, FilterList } from '@mui/icons-material';

const ProdutoFiltros = ({ filtros, categorias, handleFiltroChange, limparFiltros }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(to right bottom, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            bgcolor: 'rgba(0,0,0,0.03)',
            px: 2,
            py: 0.5,
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.04)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            },
            transition: 'all 0.2s'
          }}
        >
          <Search color="primary" sx={{ mr: 1 }} />
          <InputBase
            placeholder="Buscar produtos por nome ou descrição..."
            fullWidth
            value={filtros.nome}
            onChange={(e) => handleFiltroChange({ target: { name: 'nome', value: e.target.value } })}
            sx={{ py: 1 }}
          />
          {filtros.nome && (
            <IconButton 
              size="small" 
              onClick={() => handleFiltroChange({ target: { name: 'nome', value: '' } })}
              sx={{ color: 'grey.500' }}
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </Paper>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="categoria-filtro-label">Categoria</InputLabel>
          <Select
            labelId="categoria-filtro-label"
            value={filtros.categoria}
            onChange={(e) => handleFiltroChange({ target: { name: 'categoria', value: e.target.value } })}
            label="Categoria"
            startAdornment={<Category sx={{ ml: 1, mr: 0.5, color: 'primary.main' }} />}
          >
            <MenuItem value="">
              <em>Todas as categorias</em>
            </MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="disponibilidade-filtro-label">Disponibilidade</InputLabel>
          <Select
            labelId="disponibilidade-filtro-label"
            value={filtros.disponibilidade}
            onChange={(e) => handleFiltroChange({ target: { name: 'disponibilidade', value: e.target.value } })}
            label="Disponibilidade"
          >
            <MenuItem value="">
              <em>Todos os produtos</em>
            </MenuItem>
            <MenuItem value="true">Disponíveis</MenuItem>
            <MenuItem value="false">Indisponíveis</MenuItem>
          </Select>
        </FormControl>
        
        {(filtros.categoria || filtros.nome || filtros.disponibilidade !== '') && (
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={limparFiltros}
            startIcon={<FilterList />}
            sx={{ height: 56 }}
          >
            Limpar Filtros
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ProdutoFiltros;
