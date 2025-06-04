import React, { useState, useEffect } from 'react';
import { useError } from '../contexts/ErrorContext';
import { Box, Typography, Alert } from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import ApiService from '../services/ApiService';
import { 
  AppPage, 
  AppButton, 
  AppTextField, 
  AppList, 
  AppDialog, 
  AppSwitch 
} from '../components/common';
import commonStyles from '../styles/commonStyles';

export default function GerenciarCategorias({ navigation }) {
  const { handleApiError, showError, showSuccess } = useError();
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
      showSuccess(`Categoria "${categoriaAtual.name}" excluída com sucesso.`);
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
      
      // Atualizar lista de categorias após salvar
      await buscarCategorias();
      setDialogOpen(false);
      
      // Mostrar mensagem de sucesso
      const mensagem = categoriaAtual
        ? `Categoria "${formData.name}" atualizada com sucesso.`
        : `Categoria "${formData.name}" criada com sucesso.`;
      showSuccess(mensagem);
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
    <AppPage
      title="Gerenciar Categorias"
      showBackButton
      onBackClick={() => navigation.goBack()}
      headerActions={
        <AppButton.AddButton
          onClick={handleNovaCategoria}
        >
          Nova Categoria
        </AppButton.AddButton>
      }
      sx={commonStyles.page}
    >
      {erro && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {erro}
        </Alert>
      )}

      <AppList
        loading={loading && categorias.length === 0}
        items={categorias}
        emptyMessage="Nenhuma categoria encontrada. Crie uma nova categoria para começar."
        divider
        renderItem={(categoria, index) => (
          <AppList.AppListItem
            key={categoria.id}
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" component="span" fontWeight="medium">
                  {categoria.name}
                </Typography>
                {categoria.is_active === false && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    (Inativa)
                  </Typography>
                )}
              </Box>
            }
            secondary={categoria.description || 'Sem descrição'}
            action={
              <Box>
                <AppButton.IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEditarCategoria(categoria)}
                  tooltip="Editar categoria"
                  sx={{ mr: 1 }}
                />
                <AppButton.IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleConfirmarExclusao(categoria)}
                  tooltip="Excluir categoria"
                  color="error"
                />
              </Box>
            }
            sx={commonStyles.listItem}
          />
        )}
        sx={commonStyles.list}
      />

      {/* Diálogo para criar/editar categoria */}
      <AppDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={categoriaAtual ? `Editar Categoria: ${categoriaAtual.name}` : 'Nova Categoria'}
        maxWidth="sm"
        fullWidth
        actions={
          <>
            <AppButton.CancelButton onClick={() => setDialogOpen(false)} />
            <AppButton.SaveButton 
              onClick={handleSalvarCategoria}
              loading={loading}
              disabled={!formData.name.trim()}
            />
          </>
        }
      >
        <Box sx={commonStyles.formContainer}>
          <AppTextField
            autoFocus
            name="name"
            label="Nome da Categoria"
            value={formData.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
          
          <AppTextField
            name="description"
            label="Descrição"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
          />
          
          <AppSwitch
            name="is_active"
            label="Categoria Ativa"
            checked={formData.is_active}
            onChange={handleInputChange}
          />
        </Box>
      </AppDialog>

      {/* Diálogo de confirmação para excluir categoria */}
      <AppDialog.DeleteConfirmDialog
        open={confirmDeleteDialogOpen}
        onClose={() => setConfirmDeleteDialogOpen(false)}
        onConfirm={handleExcluirCategoria}
        title="Confirmar Exclusão"
        loading={loading}
        content={
          <>
            <Typography>
              Tem certeza que deseja excluir a categoria "{categoriaAtual?.name}"?
            </Typography>
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              Esta ação não pode ser desfeita e pode afetar produtos vinculados a esta categoria.
            </Typography>
          </>
        }
      />
    </AppPage>
  );
}
