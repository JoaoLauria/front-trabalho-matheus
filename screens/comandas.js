import React, { useEffect, useState, useContext } from 'react';
import { Grid, Paper, Typography, Button, Box, Tooltip, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Restaurant, EventSeat, ExitToApp, Add } from '@mui/icons-material';
import { AuthContext } from '../App';

export default function Comandas({ navigation }) {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [mesaAlvo, setMesaAlvo] = useState(null);
  const [qtdPessoas, setQtdPessoas] = useState('1');

  // Função para buscar mesas do servidor
  const fetchMesas = async () => {
    setLoading(true);
    setErro('');
    try {
      const response = await fetch('http://localhost:8000/tables/');
      if (!response.ok) throw new Error('Erro ao buscar mesas.');
      const data = await response.json();
      
      // Garantir que mesas seja sempre um array
      if (Array.isArray(data)) {
        setMesas(data);
      } else if (data && typeof data === 'object') {
        // Se a API retornar um objeto com uma propriedade que contém o array
        // Por exemplo: { results: [...] } ou { tables: [...] }
        const possibleArrays = ['results', 'tables', 'data', 'items'];
        for (const key of possibleArrays) {
          if (Array.isArray(data[key])) {
            setMesas(data[key]);
            return;
          }
        }
        // Se não encontrou um array em nenhuma propriedade conhecida
        console.error('Resposta da API não contém um array:', data);
        setMesas([]);
      } else {
        console.error('Resposta da API não é um array nem um objeto:', data);
        setMesas([]);
      }
    } catch (err) {
      console.error('Erro ao buscar mesas:', err);
      setErro(err.message || 'Erro desconhecido.');
      setMesas([]);
    } finally {
      setLoading(false);
    }
  };

  // Buscar mesas quando o componente montar
  useEffect(() => {
    fetchMesas();
  }, []);
  
  // Atualizar mesas quando a tela receber foco (voltar de outra tela)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMesas();
    });
    
    return unsubscribe;
  }, [navigation]);

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1100, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigation.navigate('CadastroMesa')}
        >
          Nova Mesa
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<ExitToApp />}
          onClick={() => {
            const { logout } = useContext(AuthContext);
            logout();
          }}
        >
          Sair
        </Button>
      </Box>
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
              <Tooltip title={`Mesa ${item.table_number} - Capacidade: ${item.capacity} lugares`} arrow>
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
                      Capacidade: {item.capacity} lugares
                    </Typography>
                  </Box>
                  
                  {!item.is_available && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        Ocupação atual: {item.seats} pessoas
                      </Typography>
                    </Box>
                  )}
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
                        setQtdPessoas(1); 
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
                      onClick={() => {
                        console.log('Navegando para PedidosMesa com ID da mesa:', item.id);
                        navigation.navigate('PedidosMesa', { mesa: item.id });
                      }}
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
      {modalOpen && mesaAlvo && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setModalOpen(false)}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 2,
              width: '90%',
              maxWidth: 400,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" gutterBottom>Abrir Mesa {mesaAlvo.table_number}</Typography>
            
            <Typography gutterBottom>Informe a quantidade de pessoas na mesa:</Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
              <Button 
                variant="outlined" 
                onClick={() => {
                  const atual = parseInt(qtdPessoas) || 0;
                  if (atual > 1) setQtdPessoas(atual - 1);
                }}
              >
                -
              </Button>
              
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={qtdPessoas}
                onChange={(e) => {
                  // Aceitar apenas números
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setQtdPessoas(value);
                }}
                style={{
                  width: '60px',
                  padding: '8px',
                  fontSize: '18px',
                  textAlign: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              
              <Button 
                variant="outlined" 
                onClick={() => {
                  const atual = parseInt(qtdPessoas) || 0;
                  setQtdPessoas(atual + 1);
                }}
              >
                +
              </Button>
            </Box>
            
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Capacidade máxima: {mesaAlvo.capacity} pessoas
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
              <Button onClick={() => setModalOpen(false)} color="inherit">
                Cancelar
              </Button>
              
              <Button 
                onClick={async () => {
                  try {
                    const response = await fetch(`http://localhost:8000/tables/${mesaAlvo.id}/set-unavailable/`, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        people_count: qtdPessoas
                      })
                    });
                    
                    if (!response.ok) {
                      throw new Error('Erro ao abrir a mesa');
                    }
                    
                    setMesas(mesas.map(m => m.id === mesaAlvo.id ? { ...m, seats: qtdPessoas, is_available: false } : m));
                    setModalOpen(false);
                    // Passar o ID da mesa em vez do número
                    console.log('Navegando para PedidosMesa com ID da mesa:', mesaAlvo.id);
                    navigation.navigate('PedidosMesa', { mesa: mesaAlvo.id });
                  } catch (error) {
                    console.error('Erro ao abrir mesa:', error);
                  }
                }}
                color="success"
                variant="contained"
              >
                Confirmar
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
