import React, { useState } from 'react';
import { 
  List, ListItem, ListItemText, Typography, Chip, 
  Box, CircularProgress, Paper, Collapse, IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ProdutosList = ({ 
  loading, 
  error, 
  produtos, 
  produtosPorCategoria, 
  categorias, 
  carrinho, 
  itensSelecionados, 
  handleSelecionarItem 
}) => {
  // Estado para controlar quais categorias estão expandidas
  const [expandedCategories, setExpandedCategories] = useState({});
  
  // Inicializar todas as categorias como expandidas na primeira renderização
  React.useEffect(() => {
    if (Object.keys(expandedCategories).length === 0 && produtosPorCategoria) {
      const initialExpanded = {};
      Object.keys(produtosPorCategoria).forEach(catId => {
        initialExpanded[catId] = true;
      });
      setExpandedCategories(initialExpanded);
    }
  }, [produtosPorCategoria, expandedCategories]);
  
  // Função para alternar a expansão de uma categoria
  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  if (loading) {
    return (
      <ListItem>
        <ListItemText primary="Carregando produtos..." />
      </ListItem>
    );
  }

  if (error) {
    return (
      <ListItem>
        <ListItemText primary={error} />
      </ListItem>
    );
  }

  if (produtos.length === 0) {
    return (
      <ListItem>
        <ListItemText primary="Nenhum produto encontrado" />
      </ListItem>
    );
  }

  return (
    <List sx={{ maxHeight: 'calc(100vh - 320px)', overflow: 'auto' }}>

      {Object.entries(produtosPorCategoria || {}).map(([categoriaNome, produtos]) => {
        // Usamos o nome da categoria diretamente como chave
        const categoryKey = categoriaNome;
        
        return (
          <React.Fragment key={categoryKey}>

            <ListItem 
              sx={{ 
                bgcolor: 'primary.light', 
                color: 'white', 
                py: 0.5,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between'
              }}
              onClick={() => toggleCategoryExpansion(categoryKey)}
            >
              <Typography variant="subtitle2" fontWeight="bold">{categoriaNome}</Typography>
              <IconButton 
                size="small" 
                sx={{ color: 'white', p: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCategoryExpansion(categoryKey);
                }}
              >
                {expandedCategories[categoryKey] !== false ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </ListItem>
            

            <Collapse in={expandedCategories[categoryKey] !== false} timeout="auto" unmountOnExit>
              {produtos
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(produto => {

                const jaEmEdicao = itensSelecionados.some(item => item.id === produto.id);
                const desabilitado = jaEmEdicao;
                
                return (
                  <ListItem 
                    key={produto.id} 
                    onClick={() => !desabilitado && handleSelecionarItem(produto)} 
                    disabled={desabilitado} 
                    sx={{ cursor: desabilitado ? 'default' : 'pointer', pl: 3 }}
                  >
                    <ListItemText
                      primary={produto.name}
                      secondary={
                        <Box component="span">
                          <Typography variant="body2" component="span" display="block">{produto.description}</Typography>
                          <Typography variant="body2" component="span" sx={{ fontWeight: 'bold', display: 'block' }}>
                            R$ {parseFloat(produto.price).toFixed(2)}
                          </Typography>
                        </Box>
                      }
                    />
                    {!desabilitado ? (
                      <Chip 
                        label="Selecionar" 
                        color="primary" 
                        size="small" 
                        sx={{ ml: 2, cursor: 'pointer' }} 
                      />
                    ) : (
                      <Chip 
                        label="Em edição" 
                        color="secondary" 
                        size="small" 
                        sx={{ ml: 2 }} 
                      />
                    )}
                  </ListItem>
                );
              })}
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ProdutosList;
