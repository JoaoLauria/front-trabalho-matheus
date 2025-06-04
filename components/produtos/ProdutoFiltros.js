import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

import { AppFilter, AppTextField, AppSelect, AppButton } from '../common';

/**
 * Componente de filtros para produtos
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.filtros - Estado atual dos filtros
 * @param {Array} props.categorias - Lista de categorias disponíveis
 * @param {Function} props.handleFiltroChange - Função para alterar os filtros
 * @param {Function} props.limparFiltros - Função para limpar todos os filtros
 */
const ProdutoFiltros = ({ filtros, categorias, handleFiltroChange, limparFiltros }) => {
  const [filtroExpandido, setFiltroExpandido] = useState(true);
  
  // Verifica se algum filtro está ativo
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
