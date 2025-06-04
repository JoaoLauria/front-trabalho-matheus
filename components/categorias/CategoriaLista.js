import React from 'react';
import { Fade, Paper, Box, Typography, Alert } from '@mui/material';
import { AppList, AppEmptyState } from '../common';
import CategoriaItem from './CategoriaItem';
import commonStyles from '../../styles/commonStyles';

// Definir cores para tema de restaurante
const restaurantTheme = {
  available: '#4caf50',      // Verde para categorias ativas
  unavailable: '#f44336',    // Vermelho para categorias inativas
  price: '#ff9800',         // Laranja para destaques
  background: '#f9f5f0',     // Fundo bege claro para tema de restaurante
  cardBg: '#ffffff',         // Branco para o fundo do card
  shadow: 'rgba(0,0,0,0.1)',  // Sombra suave
  categoryBg: '#5c6bc0',     // Azul indigo para categoria
  categoryLight: '#5c6bc015' // Azul indigo claro para fundo
};

/**
 * Componente que renderiza a lista de categorias
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.categorias - Lista de categorias para exibir
 * @param {boolean} props.loading - Indica se está carregando dados
 * @param {Function} props.handleNovaCategoria - Função para criar nova categoria
 * @param {Function} props.handleEditarCategoria - Função para editar categoria
 * @param {Function} props.handleConfirmarExclusao - Função para confirmar exclusão
 * @param {string} props.erro - Mensagem de erro, se houver
 * @returns {React.Component} Componente de lista de categorias
 */
const CategoriaLista = ({ 
  categorias, 
  loading, 
  handleNovaCategoria, 
  handleEditarCategoria, 
  handleConfirmarExclusao,
  erro
}) => {
  // Se não há categorias para mostrar, exibe o estado vazio
  if (categorias.length === 0 && !loading) {
    return (
      <Fade in={true} timeout={500}>
        <Paper elevation={0} sx={{ overflow: 'hidden' }}>
          <AppEmptyState.Products 
            onAddProduct={handleNovaCategoria}
            title="Nenhuma categoria encontrada"
            description="Crie uma nova categoria para começar a organizar seus produtos."
            sx={{ 
              bgcolor: restaurantTheme.cardBg, 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider',
              boxShadow: `0 4px 12px ${restaurantTheme.shadow}`,
              p: { xs: 2, sm: 3 }
            }}
          />
        </Paper>
      </Fade>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      {erro && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {erro}
        </Alert>
      )}
      
      <Fade in={true} timeout={400}>
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: `0 4px 12px ${restaurantTheme.shadow}`,
            backgroundColor: restaurantTheme.cardBg
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              p: { xs: 2, sm: 2.5 },
              borderBottom: '1px solid',
              borderColor: 'divider',
              gap: 1.5,
              backgroundColor: `${restaurantTheme.categoryBg}08`
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.15rem' }, color: '#333333' }}>
              Categorias
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              {categorias.length} {categorias.length === 1 ? 'categoria' : 'categorias'}
            </Typography>
          </Box>
          
          <AppList
            loading={loading}
            items={categorias}
            divider={false}
            renderItem={(categoria) => (
              <CategoriaItem 
                categoria={categoria} 
                onEditClick={handleEditarCategoria}
                onDeleteClick={handleConfirmarExclusao}
              />
            )}
            sx={{
              ...commonStyles.list,
              borderRadius: 0,
              border: 'none',
              p: 1
            }}
          />
        </Paper>
      </Fade>
    </Box>
  );
};

export default CategoriaLista;
