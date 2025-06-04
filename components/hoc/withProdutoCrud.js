import React, { useState } from 'react';
import { useError } from '../../contexts/ErrorContext';
import { salvarProduto, excluirProduto, validarFormularioProduto } from '../../utils/produtosUtils';

/**
 * HOC para gerenciar operações CRUD de produtos
 * Fornece estados e funções para criar, editar e excluir produtos
 * 
 * @param {React.Component} WrappedComponent - Componente a ser envolvido
 * @returns {React.Component} Componente com funcionalidades CRUD
 */
const withProdutoCrud = (WrappedComponent) => {
  return function WithProdutoCrudComponent(props) {
    const { handleApiError, showError, showSuccess } = useError();
    
    // Estados para gerenciar formulário e diálogos
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      is_available: true
    });
    
    const [formErrors, setFormErrors] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    
    // Estados para controlar diálogos
    const [dialogOpen, setDialogOpen] = useState({
      form: false,
      delete: false
    });
    
    /**
     * Abre o diálogo de formulário para criar um novo produto
     */
    const handleNovoProduto = () => {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        is_available: true
      });
      setFormErrors({});
      setEditingId(null);
      setDialogOpen(prev => ({ ...prev, form: true }));
    };
    
    /**
     * Abre o diálogo de formulário para editar um produto existente
     * @param {Object} produto - Produto a ser editado
     */
    const handleEditarProduto = (produto) => {
      setFormData({
        name: produto.name,
        description: produto.description || '',
        price: produto.price.toString(),
        category: produto.category.toString(),
        is_available: produto.is_available
      });
      setFormErrors({});
      setEditingId(produto.id);
      setDialogOpen(prev => ({ ...prev, form: true }));
    };
    
    /**
     * Abre o diálogo de confirmação para excluir um produto
     * @param {number} id - ID do produto a ser excluído
     */
    const handleConfirmarExclusao = (id) => {
      setDeleteId(id);
      setDialogOpen(prev => ({ ...prev, delete: true }));
    };
    
    /**
     * Atualiza um campo do formulário
     * @param {Object} e - Evento do input
     */
    const handleFormChange = (e) => {
      const { name, value, checked, type } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
      
      // Limpa o erro do campo quando o usuário começa a digitar
      if (formErrors[name]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };
    
    /**
     * Salva o produto (cria ou atualiza)
     */
    const handleSalvarProduto = async () => {
      // Valida o formulário
      const { errors, isValid } = validarFormularioProduto(formData);
      
      if (!isValid) {
        setFormErrors(errors);
        return;
      }
      
      try {
        // Salva o produto
        const { data, error } = await salvarProduto(formData, editingId);
        
        if (error) {
          handleApiError(error);
          return;
        }
        
        // Produto salvo com sucesso
        showSuccess(`Produto ${editingId ? 'atualizado' : 'criado'} com sucesso!`);
        setDialogOpen(prev => ({ ...prev, form: false }));
        
        // Recarrega os dados
        console.log('Recarregando lista de produtos...');
        if (props.buscarDados && typeof props.buscarDados === 'function') {
          await props.buscarDados();
        } else {
          console.error('Função buscarDados não disponível ou não é uma função');
        }
      } catch (err) {
        console.error('Erro ao salvar produto:', err);
        handleApiError(err);
      }
    };
    
    /**
     * Exclui o produto
     */
    const handleExcluirProduto = async () => {
      if (!deleteId) return;
      
      const { success, error } = await excluirProduto(deleteId);
      
      if (error) {
        handleApiError(error);
      } else {
        showSuccess('Produto excluído com sucesso!');
        setDialogOpen(prev => ({ ...prev, delete: false }));
        
        // Recarrega os dados
        if (props.buscarDados) {
          props.buscarDados();
        }
      }
    };
    
    /**
     * Fecha todos os diálogos
     */
    const handleCloseDialogs = () => {
      setDialogOpen({
        form: false,
        delete: false
      });
    };
    
    return (
      <WrappedComponent
        {...props}
        formData={formData}
        formErrors={formErrors}
        editingId={editingId}
        deleteId={deleteId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleNovoProduto={handleNovoProduto}
        handleEditarProduto={handleEditarProduto}
        handleConfirmarExclusao={handleConfirmarExclusao}
        handleFormChange={handleFormChange}
        handleSalvarProduto={handleSalvarProduto}
        handleExcluirProduto={handleExcluirProduto}
        handleCloseDialogs={handleCloseDialogs}
      />
    );
  };
};

export default withProdutoCrud;
