import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useNavigation } from '@react-navigation/native';
import { useError } from '../contexts/ErrorContext';
import { 
  carregarDadosProdutos, 
  aplicarFiltrosProdutos, 
  salvarProduto, 
  excluirProduto 
} from '../utils/produtosUtils';
import ProdutoHeader from '../components/produtos/ProdutoHeader';
import ProdutoFiltros from '../components/produtos/ProdutoFiltros';
import ProdutoLista from '../components/produtos/ProdutoLista';
import ProdutoFormDialog from '../components/produtos/ProdutoFormDialog';
import ProdutoDeleteDialog from '../components/produtos/ProdutoDeleteDialog';

const GerenciarProdutos = () => {
  const navigation = useNavigation();
  const { showError, showSuccess, handleApiError } = useError();
  
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtosAgrupados, setProdutosAgrupados] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentProduto, setCurrentProduto] = useState(null);
  
  const [filtros, setFiltros] = useState({
    nome: '',
    categoria: '',
    disponibilidade: ''
  });
  
  useEffect(() => {
    carregarDados();
  }, []);
  
  useEffect(() => {
    aplicarFiltros();
  }, [filtros, produtos]);
  
  const carregarDados = async () => {
    setLoading(true);
    try {
      const { produtos: produtosData, categorias: categoriasData, error } = await carregarDadosProdutos();
      
      if (error) {
        throw error;
      }
      
      setCategorias(categoriasData);
      setProdutos(produtosData);
      setProdutosFiltrados(produtosData);
      
    } catch (error) {
      handleApiError(error, 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };
  
  const aplicarFiltros = () => {
    if (!produtos.length) return;
    
    const { produtosFiltrados: resultado, produtosAgrupados: agrupados } = 
      aplicarFiltrosProdutos(produtos, filtros, categorias);
    
    setProdutosFiltrados(resultado);
    
    if (!filtros.categoria) {
      setProdutosAgrupados(agrupados);
    }
  };
  
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const limparFiltros = () => {
    setFiltros({
      nome: '',
      categoria: '',
      disponibilidade: ''
    });
  };
  
  const handleToggleExpand = (categoriaId) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoriaId)) {
        return prev.filter(id => id !== categoriaId);
      } else {
        return [...prev, categoriaId];
      }
    });
  };
  
  const handleOpenDialog = (produto = null) => {
    setCurrentProduto(produto);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduto(null);
  };
  
  const handleOpenDeleteDialog = (produto) => {
    setCurrentProduto(produto);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentProduto(null);
  };
  
  const handleSaveProduto = async (produtoData, id) => {
    setLoadingSave(true);
    try {
      const { data, error } = await salvarProduto(produtoData, id);
      
      if (error) throw error;
      
      await carregarDados();
      
      handleCloseDialog();
      
      showSuccess(id ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
      
    } catch (error) {
      handleApiError(error, 'Erro ao salvar produto');
    } finally {
      setLoadingSave(false);
    }
  };
  
  const handleDeleteProduto = async () => {
    if (!currentProduto) return;
    
    setLoadingDelete(true);
    try {
      const { success, error } = await excluirProduto(currentProduto.id);
      
      if (error) throw error;
      
      if (success) {
        await carregarDados();
        
        handleCloseDeleteDialog();
        
        showSuccess('Produto excluído com sucesso!');
      }
      
    } catch (error) {
      handleApiError(error, 'Erro ao excluir produto');
    } finally {
      setLoadingDelete(false);
    }
  };
  
  return (
    <Box sx={{ flex: 1, p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <ProdutoHeader 
        onAddClick={() => handleOpenDialog()} 
        loading={loading} 
      />
      
      <ProdutoFiltros 
        filtros={filtros} 
        categorias={categorias} 
        handleFiltroChange={handleFiltroChange} 
        limparFiltros={limparFiltros} 
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : produtosFiltrados.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Nenhum produto encontrado com os filtros selecionados.
          </Typography>
          <Button variant="outlined" onClick={limparFiltros}>Limpar Filtros</Button>
        </Box>
      ) : (
        <ProdutoLista 
          produtosFiltrados={produtosFiltrados}
          produtosAgrupados={produtosAgrupados}
          categorias={categorias}
          filtros={filtros}
          expandedCategories={expandedCategories}
          handleToggleExpand={handleToggleExpand}
          onEditClick={handleOpenDialog}
          onDeleteClick={handleOpenDeleteDialog}
        />
      )}
      
      <ProdutoFormDialog 
        open={openDialog}
        onClose={handleCloseDialog}
        produto={currentProduto}
        categorias={categorias}
        onSave={handleSaveProduto}
        loading={loadingSave}
      />
      
      <ProdutoDeleteDialog 
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        produto={currentProduto}
        onDelete={handleDeleteProduto}
        loading={loadingDelete}
      />
    </Box>
  );
};

export default GerenciarProdutos;
