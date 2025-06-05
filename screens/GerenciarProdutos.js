import React from 'react';

import { useError } from '../contexts/ErrorContext';
import { AppPage, AppButton, AppAlert, AppModal } from '../components/common';
import ProdutoFiltros from '../components/produtos/ProdutoFiltros';
import ProdutoListaCondicional from '../components/produtos/ProdutoListaCondicional';
import ProdutoDialogs from '../components/produtos/ProdutoDialogs';
import withProdutoData from '../components/hoc/withProdutoData';
import withProdutoCrud from '../components/hoc/withProdutoCrud';
import commonStyles from '../styles/commonStyles';

function GerenciarProdutos(props) {
  const { 
    
    produtos,
    produtosFiltrados,
    produtosAgrupados,
    categorias,
    expandedCategories,
    loading,
    erro,
    filtros,
    filtroExpandido,
    buscarDados,
    handleFiltroChange,
    limparFiltros,
    handleToggleExpand,
    
    
    formData,
    formErrors,
    editingId,
    deleteId,
    dialogOpen,
    handleNovoProduto,
    handleEditarProduto,
    handleConfirmarExclusao,
    handleFormChange,
    handleSalvarProduto,
    handleExcluirProduto,
    handleCloseDialogs,
    
    
    navigation
  } = props;
  
  const { showError } = useError();
  
  
  
  return (
    <AppPage
      title="Gerenciar Produtos"
      showBackButton
      onBackClick={() => navigation.goBack()}
      headerActions={
        <AppButton.AddButton
          onClick={handleNovoProduto}
        >
          Novo Produto
        </AppButton.AddButton>
      }
      sx={commonStyles.page}
    >
      {erro && (
        <AppAlert severity="error" sx={{ mb: 3 }}>
          {erro}
        </AppAlert>
      )}
      
      {}
      <ProdutoFiltros 
        filtros={filtros} 
        categorias={categorias} 
        handleFiltroChange={handleFiltroChange} 
        limparFiltros={limparFiltros} 
      />
      
      {}
      <ProdutoListaCondicional 
        loading={loading}
        filtros={filtros}
        produtosFiltrados={produtosFiltrados}
        produtosAgrupados={produtosAgrupados}
        expandedCategories={expandedCategories}
        handleToggleExpand={handleToggleExpand}
        handleEditarProduto={handleEditarProduto}
        handleConfirmarExclusao={handleConfirmarExclusao}
        handleNovoProduto={handleNovoProduto}
      />
      
      {}
      <ProdutoDialogs 
        dialogOpen={dialogOpen.form}
        formData={formData}
        formErrors={formErrors}
        handleFormChange={handleFormChange}
        handleSalvarProduto={handleSalvarProduto}
        handleExcluirProduto={handleExcluirProduto}
        handleCloseDialogs={handleCloseDialogs}
        categorias={categorias}
        editingId={editingId}
      />
      
      {}
      <AppModal.Delete
        open={dialogOpen.delete}
        onClose={handleCloseDialogs}
        onConfirm={handleExcluirProduto}
        title="Excluir Produto"
        message={
          deleteId && produtos.find(p => p.id === deleteId)
            ? `Tem certeza que deseja excluir o produto "${produtos.find(p => p.id === deleteId).name}"? Esta ação não pode ser desfeita.`
            : `Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.`
        }
      />
    </AppPage>
  );
}

export default withProdutoData(withProdutoCrud(GerenciarProdutos));
