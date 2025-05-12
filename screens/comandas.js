import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button, Box, Tooltip, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Restaurant, EventSeat } from '@mui/icons-material';
//import { Directions } from 'react-native-gesture-handler';

export default function Comandas({ selectMesa }) {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [mesaAlvo, setMesaAlvo] = useState(null);
  const [qtdPessoas, setQtdPessoas] = useState(1);

  useEffect(() => {
    async function fetchMesas() {
      setLoading(true);
      setErro('');
      try {
        const response = await fetch('http://localhost:8000/tables/');
        if (!response.ok) throw new Error('Erro ao buscar mesas.');
        const data = await response.json();
        setMesas(data);
      } catch (err) {
        setErro(err.message || 'Erro desconhecido.');
      } finally {
        setLoading(false);
      }
    }
    fetchMesas();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1100, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={700} align="center" gutterBottom color="primary.main">
        Sistema de Comandas
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom color="text.secondary">
        Selecione uma mesa para visualizar o cardápio
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : erro ? (
        <Alert severity="error" sx={{ my: 2 }}>{erro}</Alert>
      ) : (
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {mesas.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Tooltip title={`Mesa ${item.table_number} (${item.seats} lugares)`} arrow>
                <Paper elevation={4} sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 10,
                  },
                }}>
                  <Restaurant sx={{ fontSize: 48, mb: 1, color: item.is_available ? 'success.main' : 'error.main' }} />
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Mesa {item.table_number}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventSeat sx={{ fontSize: 20, mr: 0.5, color: item.is_available ? 'success.main' : 'error.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      {item.seats} lugares
                    </Typography>
                  </Box>
                  {item.is_available ? (
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      size="large"
                      sx={{
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => {
                        setMesaAlvo(item);
                        setQtdPessoas(item.seats || 1);
                        setModalOpen(true);
                      }}
                    >
                      Abrir Mesa
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => selectMesa(item.table_number)}
                    >
                      Selecionar
                    </Button>
                  )}

                </Paper>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Abrir Mesa</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Informe a quantidade de pessoas na mesa:</Typography>
          <TextField
            type="number"
            value={qtdPessoas}
            onChange={e => setQtdPessoas(Math.max(1, parseInt(e.target.value)||1))}
            inputProps={{ min: 1, style: { width: 80 } }}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="inherit">Cancelar</Button>
          <Button 
            onClick={() => {
              if (!mesaAlvo) return;
              // Atualiza seats e disponibilidade localmente
              setMesas(mesas.map(m => m.id === mesaAlvo.id ? { ...m, seats: qtdPessoas, is_available: false } : m));
              setModalOpen(false);
              selectMesa(mesaAlvo.table_number);
            }}
            color="success"
            variant="contained"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
