;
import { MenuItem } from '@mui/material';

import { AppModal, AppTextField, AppSelect, AppSwitch, AppBox } from '../common';
import { formatCurrency } from '../../utils/formatters/currency';

const ProdutoDialogs = ({
  dialogOpen,
  formData,
  formErrors,
  handleFormChange,
  handleSalvarProduto,
  handleExcluirProduto,
  handleCloseDialogs,
  categorias,
  editingId
}) => {
  return (
    <>
      {}
      <AppModal.Form
        open={dialogOpen}
        onClose={handleCloseDialogs}
        title={editingId ? "Editar Produto" : "Novo Produto"}
        onSave={handleSalvarProduto}
      >
        <AppTextField
          name="name"
          label="Nome do Produto"
          value={formData.name || ''}
          onChange={handleFormChange}
          required
          fullWidth
          margin="normal"
          error={!!formErrors?.name}
          helperText={formErrors?.name}
        />
        
        <AppTextField
          name="description"
          label="Descrição"
          value={formData.description || ''}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        
        <AppTextField
          name="price"
          label="Preço"
          value={formData.price || ''}
          onChange={handleFormChange}
          required
          fullWidth
          margin="normal"
          type="number"
          step="0.01"
          error={!!formErrors?.price}
          helperText={formErrors?.price || (formData.price ? `Valor formatado: ${formatCurrency(formData.price)}` : '')}
        />
        
        <AppSelect
          name="category"
          label="Categoria"
          value={formData.category || ''}
          onChange={handleFormChange}
          required
          fullWidth
          margin="normal"
          sx={{ mt: 2, mb: 2 }}
          error={!!formErrors?.category}
          helperText={formErrors?.category}
        >
          <MenuItem value="">
            <em>Selecione uma categoria</em>
          </MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.id.toString()}>
              {categoria.name}
            </MenuItem>
          ))}
        </AppSelect>
        
        <AppBox sx={{ mt: 2 }}>
          <AppSwitch
            name="is_available"
            label="Disponível"
            checked={formData.is_available !== false}
            onChange={handleFormChange}
          />
        </AppBox>
      </AppModal.Form>
    </>
  );
};

export default ProdutoDialogs;
