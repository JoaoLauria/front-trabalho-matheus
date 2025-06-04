import React from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export default function ActionButtons({ onNovoPedido, onFecharConta }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mb: 3 }}>
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={onNovoPedido}
        startIcon={<AddIcon />}
        sx={{ borderRadius: 2 }}
      >
        Novo Pedido
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={onFecharConta}
        startIcon={<CloseIcon />}
        sx={{ borderRadius: 2 }}
      >
        Fechar Conta
      </Button>
    </Box>
  );
}
