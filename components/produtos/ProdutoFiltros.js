import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { AppFilter, AppTextField, AppSelect, AppButton } from '../common';

const ProdutoFiltros = ({ filtros, categorias, handleFiltroChange, limparFiltros }) => {
  const [filtroExpandido, setFiltroExpandido] = useState(true);

  const temFiltrosAtivos = filtros.categoria || filtros.nome || filtros.disponibilidade !== '';
  
  return (
    <AppFilter
      title="Filtrar Produtos"
      expanded={filtroExpandido}
      onToggleExpand={() => setFiltroExpandido(!filtroExpandido)}
      onClearFilters={temFiltrosAtivos ? limparFiltros : undefined}
    >
      <AppFilter.FullWidthItem>
        <AppTextField
          name="nome"
          label="Buscar"
          value={filtros.nome}
          onChange={handleFiltroChange}
          fullWidth
          placeholder="Digite o nome ou descrição do produto..."
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            endAdornment: filtros.nome ? (
              <AppButton.IconButton
                icon={<ClearIcon />}
                onClick={() => handleFiltroChange({ target: { name: 'nome', value: '' }})}
                size="small"
              />
            ) : null
          }}
        />
      </AppFilter.FullWidthItem>
      
      <AppFilter.HalfWidthItem>
        <AppSelect
          name="categoria"
          value={filtros.categoria}
          onChange={handleFiltroChange}
          label="Categoria"
          fullWidth
          sx={{ 
            width: '100%', 
            '& .MuiInputBase-root': { width: '100%' },
            '& .MuiSelect-select': { width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' } 
          }}
        >
          <MenuItem value="">Todas Categorias</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id.toString()}>
              {categoria.name}
            </MenuItem>
          ))}
        </AppSelect>
      </AppFilter.HalfWidthItem>

      <AppFilter.HalfWidthItem>
        <AppSelect
          name="disponibilidade"
          value={filtros.disponibilidade}
          onChange={handleFiltroChange}
          label="Disponibilidade"
          fullWidth
          sx={{ 
            width: '100%', 
            '& .MuiInputBase-root': { width: '100%' },
            '& .MuiSelect-select': { width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' } 
          }}
        >
          <MenuItem value="">Todos os Status</MenuItem>
          <MenuItem value="true">Disponíveis</MenuItem>
          <MenuItem value="false">Indisponíveis</MenuItem>
        </AppSelect>
      </AppFilter.HalfWidthItem>
    </AppFilter>
  );
};

export default ProdutoFiltros;
