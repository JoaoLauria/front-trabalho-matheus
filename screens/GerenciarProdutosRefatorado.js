import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/ApiService';
import { useError } from '../contexts/ErrorContext';

// Componentes
import ProdutoHeader from '../components/produtos/ProdutoHeader';
import ProdutoFiltros from '../components/produtos/ProdutoFiltros';
import ProdutoLista from '../components/produtos/ProdutoLista';
import ProdutoFormDialog from '../components/produtos/ProdutoFormDialog';
import ProdutoDeleteDialog from '../components/produtos/ProdutoDeleteDialog';

const GerenciarProdutos = () => {
  const navigation = useNavigation();
  const { showError, handleApiError } = useError();
  
  // Estados
  const [loading, setLoading] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [produtosAgrupados, setProdutosAgrupados] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  
  // Estados para diálogos
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentProduto, setCurrentProduto] = useState(null);
  
  // Estado para filtros
  const [filtros, setFiltros] = useState({
    nome: '',
    categoria: '',
    disponibilidade: ''
  });
  
  // Efeito para carregar dados iniciais
  useEffect(() => {
    carregarDados();
  }, []);
  
  // Efeito para aplicar filtros quando eles mudam
  useEffect(() => {
    aplicarFiltros();
  }, [filtros, produtos]);
  
  // Função para carregar produtos e categorias
  const carregarDados = async () => {
    setLoading(true);
    try {
      // Carregar categorias
      const { data: categoriasData, error: categoriasError } = await ApiService.getCategories();
      if (categoriasError) throw new Error(categoriasError);
      setCategorias(categoriasData);
      
      // Carregar produtos
      const { data: produtosData, error: produtosError } = await ApiService.getProducts();
      if (produtosError) throw new Error(produtosError);
      setProdutos(produtosData);
      setProdutosFiltrados(produtosData);
      
    } catch (error) {
      handleApiError(error, 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };
  
  // Função para aplicar filtros
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
  
  // Função para lidar com mudanças nos filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para limpar todos os filtros
  const limparFiltros = () => {
    setFiltros({
      nome: '',
      categoria: '',
      disponibilidade: ''
    });
  };
  
  // Funções para expandir/colapsar categorias
  const handleToggleExpand = (categoriaId) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoriaId)) {
        return prev.filter(id => id !== categoriaId);
      } else {
        return [...prev, categoriaId];
      }
    });
  };
  
  // Funções para diálogo de criação/edição
  const handleOpenDialog = (produto = null) => {
    setCurrentProduto(produto);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduto(null);
  };
  
  // Funções para diálogo de exclusão
  const handleOpenDeleteDialog = (produto) => {
    setCurrentProduto(produto);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentProduto(null);
  };
  
  // Função para salvar produto (criar ou editar)
  const handleSaveProduto = async (produtoData, id) => {
    setLoadingSave(true);
    try {
      let response;
      
      if (id) {
        // Editar produto existente
        response = await ApiService.updateProduct(id, produtoData);
      } else {
        // Criar novo produto
        response = await ApiService.createProduct(produtoData);
      }
      
      if (response.error) throw new Error(response.error);
      
      // Recarregar dados após salvar
      await carregarDados();
      
      // Fechar diálogo
      handleCloseDialog();
      
      // Mostrar mensagem de sucesso
      showError({
        message: id ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!',
        severity: 'success'
      });
      
    } catch (error) {
      handleApiError(error, 'Erro ao salvar produto');
    } finally {
      setLoadingSave(false);
    }
  };
  
  // Função para excluir produto
  const handleDeleteProduto = async () => {
    if (!currentProduto) return;
    
    setLoadingDelete(true);
    try {
      const response = await ApiService.deleteProduct(currentProduto.id);
      
      if (response.error) throw new Error(response.error);
      
      // Recarregar dados após excluir
      await carregarDados();
      
      // Fechar diálogo
      handleCloseDeleteDialog();
      
      // Mostrar mensagem de sucesso
      showError({
        message: 'Produto excluído com sucesso!',
        severity: 'success'
      });
      
    } catch (error) {
      handleApiError(error, 'Erro ao excluir produto');
    } finally {
      setLoadingDelete(false);
    }
  };
  
  return (
    <Box sx={{ flex: 1, p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Cabeçalho */}
      <ProdutoHeader 
        onAddClick={() => handleOpenDialog()} 
        loading={loading} 
      />
      
      {/* Filtros */}
      <ProdutoFiltros 
        filtros={filtros} 
        categorias={categorias} 
        handleFiltroChange={handleFiltroChange} 
        limparFiltros={limparFiltros} 
      />
      
      {/* Lista de produtos */}
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
      
      {/* Diálogo de criação/edição de produto */}
      <ProdutoFormDialog 
        open={openDialog}
        onClose={handleCloseDialog}
        produto={currentProduto}
        categorias={categorias}
        onSave={handleSaveProduto}
        loading={loadingSave}
      />
      
      {/* Diálogo de confirmação de exclusão */}
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
