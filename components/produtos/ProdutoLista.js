import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
  Collapse,
  IconButton
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ProdutoItem from './ProdutoItem';

const ProdutoLista = ({ 
  produtosFiltrados, 
  produtosAgrupados, 
  categorias, 
  filtros, 
  expandedCategories,
  handleToggleExpand,
  onEditClick, 
  onDeleteClick 
}) => {
  if (!filtros.categoria) {
    return (
      <List sx={{ p: 0 }}>
        {Object.values(produtosAgrupados)
          .filter(grupo => grupo.produtos.length > 0)
          .map(grupo => (
            <React.Fragment key={grupo.categoria.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'rgba(0,0,0,0.02)'
                }}
              >
                <ListItem 
                  onClick={() => handleToggleExpand(grupo.categoria.id)}
                  sx={{
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                    cursor: 'pointer'
                  }}
                >
                  <ListItemText 
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {grupo.categoria.name}
                      </Typography>
                    }
                    secondary={`${grupo.produtos.length} produto${grupo.produtos.length !== 1 ? 's' : ''}`}
                  />
                  {expandedCategories.includes(grupo.categoria.id) ? 
                    <ExpandLess color="primary" /> : 
                    <ExpandMore color="primary" />
                  }
                </ListItem>
                <Collapse in={expandedCategories.includes(grupo.categoria.id)} timeout="auto">
                  <List component="div" disablePadding sx={{ px: 2, pb: 2 }}>
                    {grupo.produtos.map(produto => (
                      <ProdutoItem 
                        key={produto.id}
                        produto={produto}
                        onEditClick={onEditClick}
                        onDeleteClick={onDeleteClick}
                      />
                    ))}
                  </List>
                </Collapse>
              </Paper>
            </React.Fragment>
          ))
        }
      </List>
    );
  }
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        borderRadius: 2,
        background: 'linear-gradient(to right bottom, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {categorias.find(c => c.id === parseInt(filtros.categoria))?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''}
        </Typography>
      </Box>
      
      <List sx={{ p: 0 }}>
        {produtosFiltrados.map(produto => (
          <ProdutoItem 
            key={produto.id}
            produto={produto}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </List>
    </Paper>
  );
};

export default ProdutoLista;
