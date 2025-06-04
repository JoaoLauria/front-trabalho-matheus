import React from 'react';
import { Collapse, Fade, Paper, Box, Typography, IconButton, Divider, Badge, Avatar } from '@mui/material';
import { 
  ExpandLess as ExpandLessIcon, 
  ExpandMore as ExpandMoreIcon,
  Category as CategoryIcon,
  Restaurant as RestaurantIcon,
  RestaurantMenu as RestaurantMenuIcon,
  Fastfood as FastfoodIcon
} from '@mui/icons-material';

import { AppList, AppBox, AppTypography, AppEmptyState } from '../common';
import ProdutoItem from './ProdutoItem';
import { formatCurrency } from '../../utils/formatters/currency';
import commonStyles from '../../styles/commonStyles';
import { colors } from '../../styles/theme';

// Definir cores para tema de restaurante
const restaurantTheme = {
  available: '#4caf50',      // Verde para produtos disponíveis
  unavailable: '#f44336',    // Vermelho para produtos indisponíveis
  price: '#ff9800',         // Laranja para preços
  background: '#f9f5f0',     // Fundo bege claro para tema de restaurante
  cardBg: '#ffffff',         // Branco para o fundo do card
  shadow: 'rgba(0,0,0,0.1)',  // Sombra suave
  categoryBg: '#f5f5f5',     // Cinza claro para fundo de categoria
  categoryActive: '#5c6bc0'  // Azul indigo para categoria ativa
};

/**
 * Componente que renderiza a lista de produtos de forma condicional:
 * - Lista simples quando há filtro de categoria
 * - Lista agrupada por categoria quando não há filtro de categoria
 */
const ProdutoListaCondicional = ({
  loading,
  filtros,
  produtosFiltrados,
  produtosAgrupados,
  expandedCategories,
  handleToggleExpand,
  handleEditarProduto,
  handleConfirmarExclusao,
  handleNovoProduto
}) => {
  // Se não há produtos para mostrar, exibe o estado vazio
  if (produtosFiltrados.length === 0 && !loading) {
    return (
      <Fade in={true} timeout={500}>
        <Paper elevation={0} sx={{ overflow: 'hidden' }}>
          <AppEmptyState.Products 
            onAddProduct={handleNovoProduto}
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

  // Se há filtro de categoria, mostra lista simples
  if (filtros.categoria) {
    const categoryName = produtosFiltrados[0]?.categoria?.name || 'Produtos';
    
    return (
      <Box sx={{ mt: 1 }}>
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
                backgroundColor: `${restaurantTheme.categoryActive}08`
              }}
            >
              <Avatar
                sx={{ 
                  bgcolor: `${restaurantTheme.categoryActive}15`,
                  color: restaurantTheme.categoryActive,
                  width: 40,
                  height: 40
                }}
              >
                <RestaurantMenuIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.15rem' }, color: '#333333' }}>
                  {categoryName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                  {produtosFiltrados.length} item{produtosFiltrados.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Box>
            
            <AppList
              loading={loading}
              items={produtosFiltrados}
              divider={false}
              renderItem={(produto) => (
                <ProdutoItem 
                  produto={produto} 
                  onEditClick={handleEditarProduto}
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
  }

  // Se não há filtro de categoria, mostra agrupado por categoria
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2.5,
      maxHeight: '100%',
      overflow: 'auto',
      pb: 2
    }}>
      {Object.values(produtosAgrupados).map(grupo => {
        if (!grupo.produtos.length) return null;
        
        const isExpanded = expandedCategories.includes(grupo.categoria.id);
        
        // Escolher um ícone aleatório para cada categoria para dar variedade visual
        const categoryIcons = [<RestaurantIcon />, <RestaurantMenuIcon />, <FastfoodIcon />];
        const iconIndex = grupo.categoria.id % 3;
        const categoryIcon = categoryIcons[iconIndex];
        
        return (
          <Box key={grupo.categoria.id}>
            <Fade in={true} timeout={400}>
              <Paper 
                elevation={0}
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: `0 4px 12px ${restaurantTheme.shadow}`,
                  backgroundColor: restaurantTheme.cardBg,
                  transition: 'all 0.3s ease'
                }}
              >
                <Box 
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: { xs: 1.5, sm: 2 },
                    borderBottom: isExpanded ? '1px solid' : 'none',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    bgcolor: isExpanded ? `${restaurantTheme.categoryActive}08` : restaurantTheme.cardBg,
                    transition: 'background-color 0.3s ease'
                  }}
                  onClick={() => handleToggleExpand(grupo.categoria.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{ 
                        bgcolor: isExpanded 
                          ? `${restaurantTheme.categoryActive}15` 
                          : `${restaurantTheme.price}15`,
                        color: isExpanded 
                          ? restaurantTheme.categoryActive 
                          : restaurantTheme.price,
                        width: 40,
                        height: 40
                      }}
                    >
                      {categoryIcon}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          fontSize: { xs: '0.95rem', sm: '1.05rem' },
                          color: isExpanded ? restaurantTheme.categoryActive : '#333333'
                        }}
                      >
                        {grupo.categoria.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                      >
                        {grupo.produtos.length} produto{grupo.produtos.length !== 1 ? 's' : ''}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: isExpanded ? restaurantTheme.categoryActive : '#757575',
                      bgcolor: isExpanded ? `${restaurantTheme.categoryActive}15` : 'transparent',
                      '&:hover': {
                        bgcolor: isExpanded ? `${restaurantTheme.categoryActive}25` : 'rgba(0,0,0,0.04)'
                      },
                      transition: 'all 0.2s ease',
                      width: 32,
                      height: 32
                    }}
                  >
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                
                <Collapse in={isExpanded} timeout={300}>
                  <AppList
                    items={grupo.produtos}
                    divider={false}
                    renderItem={(produto) => (
                      <ProdutoItem 
                        produto={produto} 
                        onEditClick={handleEditarProduto}
                        onDeleteClick={handleConfirmarExclusao}
                      />
                    )}
                    sx={{
                      ...commonStyles.list,
                      borderRadius: 0,
                      border: 'none',
                      bgcolor: restaurantTheme.cardBg,
                      p: 1
                    }}
                  />
                </Collapse>
              </Paper>
            </Fade>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProdutoListaCondicional;
