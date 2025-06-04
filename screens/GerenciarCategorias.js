import React, { useState, useEffect } from 'react';
import { useError } from '../contexts/ErrorContext';
import {
  Box, Typography, Button, IconButton, TextField, Paper, List, ListItem,
  ListItemText, ListItemSecondaryAction, Divider, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Switch,
  Alert, Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import ApiService from '../services/ApiService';

export default function GerenciarCategorias({ navigation }) {
  const { handleApiError } = useError();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_active: true
  });

  // Buscar todas as categorias
  const buscarCategorias = async () => {
    setLoading(true);
    setErro('');
    try {
      const { data, error } = await ApiService.categories.getAllCategories();
      
      if (error) {
        throw new Error(error);
      }
      
      setCategorias(data || []);
    } catch (error) {
      const errorMsg = 'Falha ao carregar categorias. Tente novamente.';
      console.error('Erro ao buscar categorias:', error);
      setErro(errorMsg);
      handleApiError(error || errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  // Abrir diálogo para criar nova categoria
  const handleNovaCategoria = () => {
    setCategoriaAtual(null);
    setFormData({
      name: '',
      description: '',
      is_active: true
    });
    setDialogOpen(true);
  };

  // Abrir diálogo para editar categoria existente
  const handleEditarCategoria = (categoria) => {
    setCategoriaAtual(categoria);
    setFormData({
      name: categoria.name || '',
      description: categoria.description || '',
      is_active: categoria.is_active !== false // se is_active for undefined, assume true
    });
    setDialogOpen(true);
  };

  // Abrir diálogo de confirmação para excluir categoria
  const handleConfirmarExclusao = (categoria) => {
    setCategoriaAtual(categoria);
    setConfirmDeleteDialogOpen(true);
  };

  // Excluir categoria
  const handleExcluirCategoria = async () => {
    if (!categoriaAtual) return;
    
    setLoading(true);
    try {
      const { data, error } = await ApiService.categories.deleteCategory(categoriaAtual.id);
      
      if (error) {
        throw new Error(error);
      }
      
      // Atualizar lista de categorias após exclusão
      setCategorias(categorias.filter(cat => cat.id !== categoriaAtual.id));
      setConfirmDeleteDialogOpen(false);
      setCategoriaAtual(null);
    } catch (error) {
      const errorMsg = `Erro ao excluir categoria: ${error?.message || 'Falha na comunicação com o servidor'}`;
      console.error('Erro ao excluir categoria:', error);
      setErro(errorMsg);
      handleApiError(error || errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar campo do formulário
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'is_active' ? checked : value
    });
  };

  // Salvar categoria (criar nova ou atualizar existente)
  const handleSalvarCategoria = async () => {
    setLoading(true);
    setErro('');
    try {
      let response;
      
      if (categoriaAtual) {
        // Atualizar categoria existente
        response = await ApiService.categories.updateCategory(categoriaAtual.id, formData);
      } else {
        // Criar nova categoria
        response = await ApiService.categories.createCategory(formData);
      }
      
      const { data, error } = response;
      
      if (error) {
        throw new Error(error);
      }
      
      // Atualizar lista de categorias
      await buscarCategorias();
      setDialogOpen(false);
    } catch (error) {
      const action = categoriaAtual ? 'atualizar' : 'criar';
      const errorMsg = `Erro ao ${action} categoria: ${error?.message || 'Falha na comunicação com o servidor'}`;
      console.error(`Erro ao ${action} categoria:`, error);
      setErro(errorMsg);
      handleApiError(error || errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1100, mx: 'auto' }}>
      {/* Header com navegação, título e botão de adicionar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            color="primary" 
            onClick={() => navigation.goBack()}
            sx={{ mr: 2 }}
            aria-label="voltar"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={600}>
            Gerenciar Categorias
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNovaCategoria}
          sx={{ ml: 2 }}
        >
          Adicionar
        </Button>
      </Box>
      
      {/* Mensagem de erro, se houver */}
      {erro && <Alert severity="error" sx={{ mb: 3 }}>{erro}</Alert>}

      {/* Conteúdo principal */}
      <Paper elevation={3} sx={{ p: 2 }}>
        {/* Estado de carregamento */}
        {loading && !categorias.length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : categorias.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Nenhuma categoria encontrada.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Clique em "Adicionar" para criar uma nova categoria.
            </Typography>
          </Box>
        ) : (
          <List>
            {categorias.map((categoria, index) => (
              <React.Fragment key={categoria.id}>
                {index > 0 && <Divider />}
                <ListItem sx={{ py: 2 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {categoria.name}
                        </Typography>
                        {!categoria.is_active && (
                          <Typography 
                            component="span" 
                            variant="caption" 
                            color="error"
                            sx={{ ml: 1 }}
                          >
                            (Inativa)
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={categoria.description || 'Sem descrição'}
                  />
                  <Box>
                    <IconButton 
                      aria-label="editar" 
                      onClick={() => handleEditarCategoria(categoria)} 
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      aria-label="excluir" 
                      onClick={() => handleConfirmarExclusao(categoria)} 
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Diálogo para criar/editar categoria */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {categoriaAtual ? `Editar Categoria: ${categoriaAtual.name}` : 'Nova Categoria'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nome da Categoria"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="Descrição"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  name="is_active"
                  color="primary"
                />
              }
              label="Categoria Ativa"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={handleSalvarCategoria} 
            color="primary" 
            variant="contained"
            disabled={loading || !formData.name.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmação para excluir categoria */}
      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a categoria "{categoriaAtual?.name}"?
          </Typography>
          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
            Esta ação não pode ser desfeita e pode afetar produtos vinculados a esta categoria.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialogOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={handleExcluirCategoria} 
            color="error" 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
