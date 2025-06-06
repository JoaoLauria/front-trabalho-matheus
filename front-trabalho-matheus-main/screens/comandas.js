import React, { useEffect, useState, useContext } from 'react';
import { useError } from '../contexts/ErrorContext';
import { Grid, Paper, Typography, Button, Box, Tooltip, CircularProgress, Alert, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Restaurant, EventSeat, ExitToApp, Add, Menu as MenuIcon, Category, RestaurantMenu } from '@mui/icons-material';
import { AuthContext } from '../App';
import ApiService from '../services/ApiService';

export default function Comandas({ navigation }) {
  const { handleApiError } = useError();
  const authContext = useContext(AuthContext);
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [mesaAlvo, setMesaAlvo] = useState(null);
  const [qtdPessoas, setQtdPessoas] = useState('1');

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleGerenciarCategorias = () => {
    handleMenuClose();
    navigation.navigate('GerenciarCategorias');
  };

  const handleNovaMesa = () => {
    handleMenuClose();
    navigation.navigate('CadastroMesa');
  };

  const handleGerenciarProdutos = () => {
    handleMenuClose();
    navigation.navigate('GerenciarProdutos');
  };

  const buscarMesas = async () => {
    setLoading(true);
    setErro('');
    try {
      const { data, error } = await ApiService.tables.getAllTables();
      if (error) throw new Error(error);
      setMesas(Array.isArray(data) ? data : []);
    } catch (error) {
      const errorMsg = 'Não foi possível carregar as mesas.';
      setErro(errorMsg);
      handleApiError(error || errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarMesas();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', buscarMesas);
    return unsubscribe;
  }, [navigation]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Cabeçalho fixo com os textos */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
          px: { xs: 2, sm: 4 },
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, mx: 'auto' }}>
          <Box>
            <IconButton
              color="primary"
              aria-label="menu"
              aria-controls={menuOpen ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuClick}
              sx={{ border: '1px solid', borderColor: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleNovaMesa}>
                <ListItemIcon><Add fontSize="small" /></ListItemIcon>
                <ListItemText>Nova Mesa</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleGerenciarCategorias}>
                <ListItemIcon><Category fontSize="small" /></ListItemIcon>
                <ListItemText>Gerenciar Categorias</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleGerenciarProdutos}>
                <ListItemIcon><RestaurantMenu fontSize="small" /></ListItemIcon>
                <ListItemText>Gerenciar Produtos</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          <Button
            variant="outlined"
            color="error"
            startIcon={<ExitToApp />}
            onClick={authContext.logout}
          >
            Sair
          </Button>
        </Box>

        <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 2, mb: 1, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            Sistema de Comandas
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Selecione uma mesa para visualizar o cardápio
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: { xs: 2, sm: 4 },
          py: 3,
          maxWidth: 1100,
          mx: 'auto',
        }}
      >


        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : erro ? (
          <Alert severity="error" sx={{ my: 2 }}>{erro}</Alert>
        ) : (
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {mesas.map((item) => (
              <Grid item xs={6} sm={6} md={4} lg={3} xl={2} key={item.id}>
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
                          navigation.navigate('PedidosMesa', { mesa: item });
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
                <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    const qtd = parseInt(qtdPessoas);
                    if (qtd < 1 || qtd > mesaAlvo.capacity) {
                      alert(`Informe uma quantidade entre 1 e ${mesaAlvo.capacity}`);
                      return;
                    }
                    // Aqui você deve implementar a ação de abrir mesa com qtdPessoas
                    setModalOpen(false);
                    // Por exemplo, chamar API para abrir a mesa e depois navegar
                    navigation.navigate('PedidosMesa', { mesa: mesaAlvo, seats: qtd });
                  }}
                >
                  Abrir Mesa
                </Button>
              </Box>
            </Box>
          </Box>
        )}

      </Box>
    </Box>
  );
}
