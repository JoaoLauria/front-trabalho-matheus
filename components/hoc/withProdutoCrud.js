import React, { useState } from 'react';
import { useError } from '../../contexts/ErrorContext';
import { salvarProduto, excluirProduto, validarFormularioProduto } from '../../utils/produtosUtils';

const withProdutoCrud = (WrappedComponent) => {
  return function WithProdutoCrudComponent(props) {
    const { handleApiError, showError, showSuccess } = useError();

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

    const [dialogOpen, setDialogOpen] = useState({
      form: false,
      delete: false
    });

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

    const handleConfirmarExclusao = (id) => {
      setDeleteId(id);
      setDialogOpen(prev => ({ ...prev, delete: true }));
    };

    const handleFormChange = (e) => {
      const { name, value, checked, type } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));

      if (formErrors[name]) {
        setFormErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const handleSalvarProduto = async () => {
      
      const { errors, isValid } = validarFormularioProduto(formData);
      
      if (!isValid) {
        setFormErrors(errors);
        return;
      }
      
      try {
        
        const { data, error } = await salvarProduto(formData, editingId);
        
        if (error) {
          handleApiError(error);
          return;
        }

        showSuccess(`Produto ${editingId ? 'atualizado' : 'criado'} com sucesso!`);
        setDialogOpen(prev => ({ ...prev, form: false }));

        if (props.buscarDados && typeof props.buscarDados === 'function') {
          await props.buscarDados();
        } else {
          
        }
      } catch (err) {
        
        handleApiError(err);
      }
    };

    const handleExcluirProduto = async () => {
      if (!deleteId) return;
      
      const { success, error } = await excluirProduto(deleteId);
      
      if (error) {
        handleApiError(error);
      } else {
        showSuccess('Produto excluído com sucesso!');
        setDialogOpen(prev => ({ ...prev, delete: false }));

        if (props.buscarDados) {
          props.buscarDados();
        }
      }
    };

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
