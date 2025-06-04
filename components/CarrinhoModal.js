import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, 
  List, ListItem, ListItemText, IconButton, Box, Badge, Paper, Divider, Chip
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  Close as CloseIcon, 
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

const CarrinhoModal = ({
  open,
  onClose,
  carrinho,
  handleRemoverDoCarrinho,
  handleSalvar,
  handleAlterarQuantidadeCarrinho,
  loading
}) => {

  const total = carrinho.reduce((acc, item) => {

    let itemTotal = parseFloat(item.produto.price) * item.quantidade;
    

    if (item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0) {
      const adicionaisTotal = item.adicionaisSelecionados.reduce((adcAcc, adc) => {
        return adcAcc + (parseFloat(adc.price) * adc.quantidade);
      }, 0);
      itemTotal += adicionaisTotal;
    }
    
    return acc + itemTotal;
  }, 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="carrinho-dialog-title"
      PaperProps={{
        sx: { borderRadius: 2, overflow: 'hidden' }
      }}
    >
      <DialogTitle 
        id="carrinho-dialog-title"
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Badge badgeContent={carrinho.length} color="error" sx={{ mr: 1 }}>
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="h6" component="span">Carrinho de Pedidos</Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, bgcolor: 'grey.50' }}>
        {carrinho.length === 0 ? (
          <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
            <Typography align="center" variant="h6" color="text.secondary">
              Seu carrinho está vazio
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Adicione itens para continuar
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {carrinho.map((item, index) => (
              <Paper 
                key={`${item.produto.id}-${index}`}
                elevation={0} 
                sx={{ 
                  m: 1, 
                  p: 1, 
                  borderRadius: 1, 
                  border: '1px solid', 
                  borderColor: 'grey.200',
                  bgcolor: 'white'
                }}
              >
                <ListItem
                  alignItems="flex-start"
                  disableGutters
                  sx={{ px: 1, display: 'flex', flexDirection: 'column', width: '100%' }}
                >
                  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', bgcolor: 'grey.100', borderRadius: 1, p: 0.5 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleAlterarQuantidadeCarrinho(index, Math.max(1, item.quantidade - 1))}
                          sx={{ p: 0.5 }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1, fontWeight: 'bold' }}>{item.quantidade}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => handleAlterarQuantidadeCarrinho(index, item.quantidade + 1)}
                          sx={{ p: 0.5 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.produto.name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary.main" sx={{ mr: 1 }}>
                        R$ {(parseFloat(item.produto.price) * item.quantidade).toFixed(2)}
                      </Typography>
                      <IconButton 
                        onClick={() => handleRemoverDoCarrinho(index)}
                        color="error"
                        sx={{ bgcolor: 'error.light', color: 'white', '&:hover': { bgcolor: 'error.main' }, ml: 1 }}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <ListItemText
                    sx={{ ml: 4, mt: 0 }}
                    secondary={
                      <Box>

                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                          {item.produto.description}
                        </Typography>
                        
                        {item.observacao && (
                          <Paper variant="outlined" sx={{ p: 0.5, mt: 1, bgcolor: 'grey.50', borderColor: 'grey.200' }}>
                            <Typography variant="caption" display="block">
                              <strong>Observação:</strong> {item.observacao}
                            </Typography>
                          </Paper>
                        )}
                        
                        {item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" color="primary.main" fontWeight="bold">
                              Adicionais:
                            </Typography>
                            {item.adicionaisSelecionados.map(adicional => (
                              <Box key={adicional.id} sx={{ display: 'flex', justifyContent: 'space-between', ml: 1, mt: 0.5 }}>
                                <Typography variant="caption">
                                  + {adicional.quantidade}x {adicional.name}
                                </Typography>
                                <Typography variant="caption" fontWeight="bold">
                                  R$ {(parseFloat(adicional.price) * adicional.quantidade).toFixed(2)}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        )}
      </DialogContent>
      
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'primary.dark',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">
            Subtotal:
          </Typography>
          <Typography variant="body1">
            R$ {total.toFixed(2)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            TOTAL:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            R$ {total.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      
      <DialogActions sx={{ p: 2, bgcolor: 'grey.100' }}>
        <Button 
          onClick={onClose} 
          color="inherit"
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Continuar Comprando
        </Button>
        <Button 
          onClick={handleSalvar} 
          color="success" 
          variant="contained"
          disabled={carrinho.length === 0 || loading}
          sx={{ 
            borderRadius: 2,
            fontWeight: 'bold',
            px: 3
          }}
        >
          {loading ? 'Salvando...' : 'Finalizar Pedido'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarrinhoModal;
