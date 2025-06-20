import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Switch,
  Tooltip,
  Divider,
  Paper,
  Grid,
  Collapse,
  Chip,
  Avatar,
  InputBase
} from '@mui/material';
import { 
  Add, 
  ArrowBack, 
  Cancel,
  Category,
  Check,
  CheckCircle,
  Close, 
  Delete, 
  DeleteForever,
  Description,
  Edit, 
  ExpandLess, 
  ExpandMore, 
  FilterList,
  RestaurantMenu, 
  Save,
  Search,
  Warning
} from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { ApiService } from '../services/ApiService';
import { AuthContext } from '../App';
import { useError } from '../contexts/ErrorContext';

const GerenciarProdutos = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const { showError, handleApiError } = useError();

  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtosAgrupados, setProdutosAgrupados] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentProduto, setCurrentProduto] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados para filtros
  const [filtros, setFiltros] = useState({
    categoria: '',  // '' significa todas as categorias
    nome: '',
    disponibilidade: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    is_available: true
  });

  // Buscar produtos e categorias ao carregar a tela
  useEffect(() => {
    buscarCategorias();
    buscarProdutos();
  }, []);

  // Aplicar filtros quando os filtros mudarem
  useEffect(() => {
    aplicarFiltros();
  }, [filtros, produtos]);

  // FunÃ§Ã£o para buscar produtos
  const buscarProdutos = async () => {
    setLoading(true);
    const { data, error } = await ApiService.products.getProducts();
    setLoading(false);

    if (error) {
      handleApiError(error);
      return;
    }

    setProdutos(data);
  };

  // FunÃ§Ã£o para buscar categorias
  const buscarCategorias = async () => {
    const { data, error } = await ApiService.categories.getAllCategories();
    
    if (error) {
      handleApiError(error);
      return;
    }

    setCategorias(data);
    
    // Inicializa todas as categorias como expandidas
    const expandedState = {};
    data.forEach(cat => {
      expandedState[cat.id] = true;
    });
    setExpandedCategories(expandedState);
  };
  
  // FunÃ§Ã£o para aplicar filtros
  const aplicarFiltros = () => {
    if (!produtos.length) return;
    
    let resultado = [...produtos];
    
    // Filtrar por nome
    if (filtros.nome) {
      const termoBusca = filtros.nome.toLowerCase();
      resultado = resultado.filter(produto => 
        produto.name.toLowerCase().includes(termoBusca) || 
        (produto.description && produto.description.toLowerCase().includes(termoBusca))
      );
    }
    
    // Filtrar por categoria
    if (filtros.categoria) {
      resultado = resultado.filter(produto => produto.category === parseInt(filtros.categoria));
    }
    
    // Filtrar por disponibilidade
    if (filtros.disponibilidade !== '') {
      const disponivel = filtros.disponibilidade === 'true';
      resultado = resultado.filter(produto => produto.is_available === disponivel);
    }
    
    setProdutosFiltrados(resultado);
    
    // Agrupar por categoria se estiver mostrando todas as categorias
    if (!filtros.categoria) {
      const agrupados = {};
      
      // Inicializar grupos vazios para todas as categorias
      categorias.forEach(categoria => {
        agrupados[categoria.id] = {
          categoria: categoria,
          produtos: []
        };
      });
      
      // Adicionar produtos aos grupos
      resultado.forEach(produto => {
        if (agrupados[produto.category]) {
          agrupados[produto.category].produtos.push(produto);
        }
      });
      
      setProdutosAgrupados(agrupados);
    }
  };
  
  // FunÃ§Ã£o para alternar expansÃ£o de categoria
  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  // FunÃ§Ã£o para limpar filtros
  const limparFiltros = () => {
    setFiltros({
      categoria: '',
      nome: '',
      disponibilidade: ''
    });
  };
  
  // FunÃ§Ã£o para atualizar filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FunÃ§Ã£o para abrir o diÃ¡logo de criaÃ§Ã£o/ediÃ§Ã£o
  const handleOpenDialog = (produto = null) => {
    if (produto) {
      setCurrentProduto(produto);
      setFormData({
        name: produto.name,
        description: produto.description || '',
        price: produto.price.toString(),
        category: produto.category,
        is_available: produto.is_available
      });
    } else {
      setCurrentProduto(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: categorias.length > 0 ? categorias[0].id : '',
        is_available: true
      });
    }
    setOpenDialog(true);
  };

  // FunÃ§Ã£o para fechar o diÃ¡logo
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduto(null);
  };

  // FunÃ§Ã£o para lidar com mudanÃ§as no formulÃ¡rio
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'is_available') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      // Permitir apenas nÃºmeros e um ponto decimal
      const regex = /^\d*\.?\d{0,2}$/;
      if (value === '' || regex.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // FunÃ§Ã£o para salvar produto (criar ou atualizar)
  const handleSaveProduto = async () => {
    // Validar campos obrigatÃ³rios
    if (!formData.name || !formData.price || !formData.category) {
      showError('Por favor, preencha todos os campos obrigatÃ³rios.');
      return;
    }

    setLoading(true);
    
    // Preparar dados para envio
    const produtoData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    let response;
    if (currentProduto) {
      // Atualizar produto existente
      response = await ApiService.products.updateProduct(currentProduto.id, produtoData);
    } else {
      // Criar novo produto
      response = await ApiService.products.createProduct(produtoData);
    }

    setLoading(false);
    
    if (response.error) {
      handleApiError(response.error);
      return;
    }

    // Fechar diÃ¡logo e atualizar lista
    handleCloseDialog();
    buscarProdutos();
  };

  // FunÃ§Ã£o para confirmar exclusÃ£o
  const handleConfirmDelete = (produto) => {
    setCurrentProduto(produto);
    setOpenDeleteDialog(true);
  };

  // FunÃ§Ã£o para excluir produto
  const handleDeleteProduto = async () => {
    if (!currentProduto) return;
    
    setLoading(true);
    const { error } = await ApiService.products.deleteProduct(currentProduto.id);
    setLoading(false);
    
    if (error) {
      handleApiError(error);
      return;
    }

    setOpenDeleteDialog(false);
    setCurrentProduto(null);
    buscarProdutos();
  };

  // FunÃ§Ã£o para formatar preÃ§o
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, mx: 'auto' }}>
      {/* CabeÃ§alho */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigation.goBack()} sx={{ mr: 1, color: 'white' }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                Gerenciar Produtos
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Adicione, edite ou remova produtos do cardÃ¡pio
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              borderRadius: 2,
              py: 1,
              px: 2,
              bgcolor: 'white',
              color: '#1976d2',
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s'
              }
            }}
          >
            Adicionar Produto
          </Button>
        </Box>
      </Paper>

      {/* Ãrea de filtros */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          background: 'linear-gradient(to right bottom, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        {/* Barra de busca estilizada */}
        <Box sx={{ mb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              bgcolor: 'rgba(0,0,0,0.03)',
              px: 2,
              py: 0.5,
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.04)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              },
              transition: 'all 0.2s'
            }}
          >
            <Search color="primary" sx={{ mr: 1 }} />
            <InputBase
              placeholder="Buscar produtos por nome ou descriÃ§Ã£o..."
              fullWidth
              value={filtros.nome}
              onChange={(e) => handleFiltroChange({ target: { name: 'nome', value: e.target.value } })}
              sx={{ py: 1 }}
            />
            {filtros.nome && (
              <IconButton 
                size="small" 
                onClick={() => handleFiltroChange({ target: { name: 'nome', value: '' } })}
                sx={{ color: 'grey.500' }}
              >
            sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 2,
              background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => navigation.goBack()} sx={{ mr: 1, color: 'white' }}>
                  <ArrowBack />
                </IconButton>
                <Box>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Gerenciar Produtos
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Adicione, edite ou remova produtos do cardÃ¡pio
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 2,
                  bgcolor: 'white',
                  color: '#1976d2',
                  boxShadow: 3,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s'
            <CircularProgress />
          </Box>
        ) : produtosFiltrados.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Nenhum produto encontrado com os filtros selecionados.
            </Typography>
            <Button variant="outlined" onClick={limparFiltros}>Limpar Filtros</Button>
          </Box>
        ) : filtros.categoria ? (
          // ExibiÃ§Ã£o normal quando uma categoria especÃ­fica estÃ¡ selecionada
          <List sx={{ p: 0 }}>
            {produtosFiltrados.map((produto) => (
              <Paper 
                key={produto.id} 
                elevation={0} 
                sx={{ 
                  mb: 0.5, 
                  borderLeft: produto.is_available ? '4px solid #4caf50' : '4px solid #f44336',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <ListItem
                  divider
                  sx={{ py: 1.5 }}
                  secondaryAction={
                    <Box>
                      <Tooltip title="Editar">
                        <IconButton 
                          edge="end" 
                          aria-label="editar" 
                          onClick={() => handleOpenDialog(produto)}
                          sx={{ mr: 1 }}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton 
                          edge="end" 
                          aria-label="excluir" 
                          onClick={() => handleConfirmDelete(produto)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>{produto.name}</Typography>
                        {!produto.is_available && (
                          <Chip 
                            label="IndisponÃ­vel" 
                            size="small"
                            color="error"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {produto.description || 'Sem descriÃ§Ã£o'}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {formatarPreco(produto.price)}
                          </Typography>
                          <Chip 
                            label={categorias.find(cat => cat.id === produto.category)?.name || 'Desconhecida'}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        ) : (
          // ExibiÃ§Ã£o agrupada por categorias quando "Todas" estÃ¡ selecionado
          <List sx={{ p: 0 }}>
            {Object.values(produtosAgrupados)
              .filter(grupo => grupo.produtos.length > 0)
              .map(grupo => (
                <React.Fragment key={grupo.categoria.id}>
                  <ListItem 
                    button 
                    onClick={() => toggleCategoryExpansion(grupo.categoria.id)}
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <RestaurantMenu sx={{ mr: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {grupo.categoria.name}
                          </Typography>
                          <Chip 
                            label={grupo.produtos.length}
                            size="small"
                            sx={{ ml: 1, bgcolor: 'rgba(255,255,255,0.3)', color: 'white' }}
                          />
                        </Box>
                      } 
                    />
                    {expandedCategories[grupo.categoria.id] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={expandedCategories[grupo.categoria.id]} timeout="auto">
                    <List component="div" disablePadding sx={{ bgcolor: 'background.paper' }}>
                      {grupo.produtos.map(produto => (
                        <Paper 
                          key={produto.id} 
                          elevation={0} 
                          sx={{ 
                            ml: 2,
                            mr: 2,
                            mb: 0.5, 
                            borderLeft: produto.is_available ? '4px solid #4caf50' : '4px solid #f44336',
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                          }}
                        >
                          <ListItem
                            divider
                            sx={{ py: 1.5 }}
                            secondaryAction={
                              <Box>
                                <Tooltip title="Editar">
                                  <IconButton 
                                    edge="end" 
                                    aria-label="editar" 
                                    onClick={() => handleOpenDialog(produto)}
                                    sx={{ mr: 1 }}
                                    color="primary"
                                  >
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Excluir">
                                  <IconButton 
                                    edge="end" 
                                    aria-label="excluir" 
                                    onClick={() => handleConfirmDelete(produto)}
                                    color="error"
                                  >
                                    <Delete />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            }
                          >
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="h6" sx={{ fontWeight: 500 }}>{produto.name}</Typography>
                                  {!produto.is_available && (
                                    <Chip 
                                      label="IndisponÃ­vel" 
                                      size="small"
                                      color="error"
                                      sx={{ ml: 1 }}
                                    />
                                  )}
                                </Box>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {produto.description || 'Sem descriÃ§Ã£o'}
                                  </Typography>
                                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                      {formatarPreco(produto.price)}
                                    </Typography>
                                  </Box>
                                </Box>
                              }
                            />
                          </ListItem>
                        </Paper>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))
            }
          </List>
        )}
      </Paper>

      {/* DiÃ¡logo de criaÃ§Ã£o/ediÃ§Ã£o de produto */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {currentProduto ? <Edit sx={{ mr: 1 }} /> : <Add sx={{ mr: 1 }} />}
            <Typography variant="h6">
              {currentProduto ? 'Editar Produto' : 'Novo Produto'}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent sx={{ px: 3, py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Nome do Produto"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                name="name"
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RestaurantMenu color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="DescriÃ§Ã£o"
                type="text"
                fullWidth
                value={formData.description}
                onChange={handleChange}
                name="description"
                variant="outlined"
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="PreÃ§o"
                type="number"
                fullWidth
                value={formData.price}
                onChange={handleChange}
                name="price"
                required
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" error={!!formErrors.category}>
                <InputLabel id="categoria-label">Categoria</InputLabel>
                <Select
                  labelId="categoria-label"
                  value={formData.category}
                  onChange={handleChange}
                  name="category"
                  label="Categoria"
                  startAdornment={<Category sx={{ ml: 1, mr: 0.5, color: 'primary.main' }} />}
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  mt: 1, 
                  borderRadius: 2,
                  bgcolor: formValues.is_available ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                  borderColor: formValues.is_available ? 'success.main' : 'error.main'
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_available}
                      onChange={handleChange}
                      name="is_available"
                      color={formData.is_available ? "success" : "error"}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {formData.is_available ? 
                        <CheckCircle sx={{ mr: 1, color: 'success.main' }} /> : 
                        <Cancel sx={{ mr: 1, color: 'error.main' }} />
                      }
                      <Typography>
                        {formData.is_available ? "Produto DisponÃ­vel" : "Produto IndisponÃ­vel"}
                      </Typography>
                    </Box>
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={handleCloseDialog} 
            color="inherit"
            startIcon={<Close />}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSaveProduto} 
            color="primary" 
            variant="contained"
            startIcon={<Save />}
            sx={{
              borderRadius: 2,
              px: 3
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DiÃ¡logo de confirmaÃ§Ã£o de exclusÃ£o */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ 
          bgcolor: 'error.main', 
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DeleteForever sx={{ mr: 1 }} />
            <Typography variant="h6">
              Confirmar exclusÃ£o
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenDeleteDialog(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent sx={{ px: 3, py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Warning sx={{ color: 'error.main', mr: 2, fontSize: 40 }} />
            <Typography variant="body1">
              Tem certeza que deseja excluir o produto <strong>"{currentProduto?.name}"</strong>?
            </Typography>
          </Box>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              mt: 2, 
              borderRadius: 2,
              bgcolor: 'rgba(244, 67, 54, 0.05)',
              borderColor: 'error.light'
            }}
          >
            <Typography variant="body2" color="error.dark">
              Esta aÃ§Ã£o nÃ£o pode ser desfeita e o produto serÃ¡ removido permanentemente do sistema.
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={() => setOpenDeleteDialog(false)} 
            color="inherit"
            startIcon={<Close />}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteProduto} 
            color="error" 
            variant="contained"
            startIcon={<DeleteForever />}
            sx={{
              borderRadius: 2,
              px: 3
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default GerenciarProdutos;
