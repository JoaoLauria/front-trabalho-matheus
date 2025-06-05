;
import { 
  Paper, Typography, Box, IconButton, 
  Button, TextField, Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ItensSelecionados = ({ 
  itensSelecionados, 
  handleRemoverItem, 
  handleAlterarQuantidade, 
  handleObservacaoInput, 
  handleToggleAdicional,
  handleAlterarQtdAdicional,
  handleAdicionarCompleto,
  inputObservacoes
}) => {
  if (itensSelecionados.length === 0) {
    return (
      <Box sx={{ mb: 3, maxWidth: '100%', overflowX: 'hidden' }}>
        <Typography variant="h6" sx={{ mb: 2, bgcolor: 'primary.main', color: 'white', p: 1, borderRadius: 1 }}>
          Itens Selecionados
        </Typography>
        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
          <Typography variant="body2" color="text.secondary">
            Selecione um produto para adicionar ao pedido.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3, maxWidth: '100%', overflowX: 'hidden' }}>
      <Typography variant="h6" sx={{ mb: 2, bgcolor: 'primary.main', color: 'white', p: 1, borderRadius: 1 }}>
        Itens Selecionados
      </Typography>
      
      {itensSelecionados.map((item, index) => (
        <Paper key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'primary.light' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '1px solid', borderColor: 'grey.300', pb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>
            <Typography variant="subtitle1" color="primary.main" fontWeight="bold">R$ {parseFloat(item.price).toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
            <Typography variant="body2" sx={{ mr: 2 }}>Quantidade:</Typography>
            <IconButton 
              size="small" 
              onClick={() => handleAlterarQuantidade(index, Math.max(1, item.quantidade - 1))}
              sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'grey.300', mr: 1 }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 1, fontWeight: 'bold' }}>{item.quantidade}</Typography>
            <IconButton 
              size="small" 
              onClick={() => handleAlterarQuantidade(index, item.quantidade + 1)}
              sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'grey.300', ml: 1 }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {item.adicionais && item.adicionais.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>Adicionais:</Typography>
              <Paper variant="outlined" sx={{ p: 1 }}>
                {item.adicionais.map((adicional, adcIndex) => (
                  <Box key={adcIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1, borderBottom: adcIndex < item.adicionais.length - 1 ? '1px dashed' : 'none', borderColor: 'grey.200', pb: 1 }}>
                    <Checkbox
                      checked={adicional.selecionado}
                      onChange={(e) => handleToggleAdicional(index, adcIndex, e.target.checked)}
                      size="small"
                      color="primary"
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {adicional.name}
                    </Typography>
                    <Typography variant="body2" color="primary.main" fontWeight="bold">
                      R$ {parseFloat(adicional.price).toFixed(2)}
                    </Typography>
                    {adicional.selecionado && (
                      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, bgcolor: 'grey.50', borderRadius: 1, p: 0.5 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleAlterarQtdAdicional(index, adcIndex, Math.max(1, adicional.quantidade - 1))}
                          sx={{ p: 0.5 }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1, fontWeight: 'bold' }}>{adicional.quantidade}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => handleAlterarQtdAdicional(index, adcIndex, adicional.quantidade + 1)}
                          sx={{ p: 0.5 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                ))}
              </Paper>
            </Box>
          )}

          <TextField
            label="Observações"
            multiline
            rows={2}
            fullWidth
            value={inputObservacoes[index] || ''}
            onChange={(e) => handleObservacaoInput(index, e.target.value)}
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ bgcolor: 'white' }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button 
              variant="outlined" 
              color="error" 
              startIcon={<DeleteIcon />}
              onClick={() => handleRemoverItem(index)}
              sx={{ borderRadius: 2 }}
            >
              Remover
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              endIcon={<ShoppingCartIcon />}
              onClick={() => handleAdicionarCompleto(index)}
              sx={{ borderRadius: 2 }}
            >
              Adicionar ao Carrinho
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ItensSelecionados;
