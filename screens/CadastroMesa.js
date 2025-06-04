import React, { useState } from 'react';
import { useError } from '../contexts/ErrorContext';
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
import ApiService from '../services/ApiService';

export default function CadastroMesa({ navigation }) {
  const { handleApiError, isConnectionError } = useError();
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
      const tableData = {
        table_number: numeroMesa,
        capacity: capacidade ? Number(capacidade) : 4,
        is_available: true
      };
      
      const { data, error } = await ApiService.tables.createTable(tableData);
      
      if (error) {
        throw new Error(error);
      }
      
      setSnackbar({
        open: true,
        message: 'Mesa cadastrada com sucesso!',
        severity: 'success'
      });
      

      setNumeroMesa('');
      setCapacidade('');
      setDescricao('');
      

      navigation.navigate('Comandas');
    } catch (error) {
      const errorMsg = `Erro: ${error?.message || 'Falha ao cadastrar mesa'}`;
      
      handleApiError(error || errorMsg);
      
      setSnackbar({
        open: true,
        message: errorMsg,
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
