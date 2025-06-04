import React from 'react';

import { useError } from '../contexts/ErrorContext';
import { AppPage, AppButton, AppAlert, AppModal } from '../components/common';
import ProdutoFiltros from '../components/produtos/ProdutoFiltros';
import ProdutoListaCondicional from '../components/produtos/ProdutoListaCondicional';
import ProdutoDialogs from '../components/produtos/ProdutoDialogs';
import withProdutoData from '../components/hoc/withProdutoData';
import withProdutoCrud from '../components/hoc/withProdutoCrud';
import commonStyles from '../styles/commonStyles';

/**
 * Componente para gerenciamento de produtos
 * Utiliza HOCs para separação de responsabilidades:
 * - withProdutoData: gerencia dados, filtros e listagem
 * - withProdutoCrud: gerencia operações de criação, edição e exclusão
 */
function GerenciarProdutos(props) {
  const { 
    // Props do withProdutoData
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
    
    // Props do withProdutoCrud
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
    
    // Props do componente pai
    navigation
  } = props;
  
  const { showError } = useError();
  
  // Componente simplificado que usa as funções dos HOCs
  
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
      
      {/* Filtros */}
      <ProdutoFiltros 
        filtros={filtros} 
        categorias={categorias} 
        handleFiltroChange={handleFiltroChange} 
        limparFiltros={limparFiltros} 
      />
      
      {/* Lista de Produtos */}
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
      
      {/* Diálogos de produto (formulário) */}
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
      
      {/* Modal de Confirmação de Exclusão */}
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

// Aplicar os HOCs ao componente GerenciarProdutos
// withProdutoData deve ser o mais externo para que withProdutoCrud tenha acesso às suas props
export default withProdutoData(withProdutoCrud(GerenciarProdutos));
