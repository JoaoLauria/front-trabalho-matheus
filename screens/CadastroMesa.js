import React, { useState } from 'react';
import {
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default function CadastroMesa({ navigation }) {
  const [numeroMesa, setNumeroMesa] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async () => {
    // Validação básica
    if (!numeroMesa) {
      setSnackbar({
        open: true,
        message: 'O número da mesa é obrigatório',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/tables/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table_number: numeroMesa,
          capacity: capacidade ? Number(capacidade) : 4,
          is_available: true
        })
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Mesa cadastrada com sucesso!',
          severity: 'success'
        });
        
        // Limpar campos
        setNumeroMesa('');
        setCapacidade('');
        setDescricao('');
        
        // Voltar para a tela de comandas imediatamente
        // A lista será atualizada automaticamente pelo useEffect com o listener de foco
        navigation.navigate('Comandas');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar mesa');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Erro: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 4, 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <RestaurantIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" component="h1" color="primary.main" fontWeight={700}>
            Cadastro de Mesa
          </Typography>
        </Box>

        <TextField
          label="Número da Mesa"
          variant="outlined"
          fullWidth
          required
          value={numeroMesa}
          onChange={(e) => setNumeroMesa(e.target.value)}
          helperText="Ex: A1, B2, 101, etc."
          sx={{ mb: 2 }}
        />

        <TextField
          label="Capacidade (pessoas)"
          variant="outlined"
          fullWidth
          type="number"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Descrição (opcional)"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigation.navigate('Comandas')}
            sx={{ flex: 1 }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            disabled={loading}
            sx={{ flex: 1 }}
          >
            {loading ? 'Salvando...' : 'Cadastrar Mesa'}
          </Button>
        </Box>
      </Paper>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
