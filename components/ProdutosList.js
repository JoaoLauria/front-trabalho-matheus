import React from 'react';
import { 
  List, ListItem, ListItemText, Typography, Chip, 
  Box, CircularProgress, Paper 
} from '@mui/material';

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

      {Object.entries(produtosPorCategoria || {}).map(([catId, produtos]) => {

        const categoria = categorias.find(c => c.id.toString() === catId);
        const categoriaNome = categoria ? categoria.name : 'Sem categoria';
        
        return (
          <React.Fragment key={catId}>

            <ListItem sx={{ bgcolor: 'primary.light', color: 'white', py: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">{categoriaNome}</Typography>
            </ListItem>
            

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
                        <>
                          <Typography variant="body2" component="span">{produto.description}</Typography>
                          <Typography variant="body2" component="div" sx={{ fontWeight: 'bold' }}>
                            R$ {parseFloat(produto.price).toFixed(2)}
                          </Typography>
                        </>
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
              })
            }
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default ProdutosList;
