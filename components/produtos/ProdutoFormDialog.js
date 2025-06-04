import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  CircularProgress,
  Box,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Save, Close } from '@mui/icons-material';
import { validarFormularioProduto } from '../../utils/produtosUtils';

const ProdutoFormDialog = ({ 
  open, 
  onClose, 
  produto, 
  categorias, 
  onSave, 
  loading 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    is_available: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (produto) {
      setFormData({
        name: produto.name || '',
        description: produto.description || '',
        price: produto.price ? String(produto.price) : '',
        category: produto.category || '',
        is_available: produto.is_available !== undefined ? produto.is_available : true
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        is_available: true
      });
    }
    setErrors({});
  }, [produto, open]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'is_available') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'price') {
      const formattedValue = value.replace(/[^0-9.,]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpar erro do campo quando o usuário digita
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const { errors, isValid } = validarFormularioProduto(formData);
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    try {
      if (validateForm()) {
        // Garantir que o preço seja um número válido
        const priceString = String(formData.price).replace(',', '.');
        const priceValue = parseFloat(priceString);
        
        if (isNaN(priceValue)) {
          setErrors(prev => ({
            ...prev,
            price: 'Preço inválido'
          }));
          return;
        }
        
        const produtoData = {
          ...formData,
          price: priceValue,
          category: formData.category ? parseInt(formData.category) : ''
        };
        
        onSave(produtoData, produto ? produto.id : null);
      }
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle 
        component="div"
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}
      >
        <Typography variant="h6" component="h2">
          {produto ? 'Editar Produto' : 'Novo Produto'}
        </Typography>
        <IconButton color="inherit" onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 4, pb: 3, px: 3, mt: 1 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Nome do produto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            variant="outlined"
            autoFocus
          />
          
          <TextField
            fullWidth
            label="Descrição (opcional)"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Preço"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
          />
          
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel id="categoria-label">Categoria</InputLabel>
            <Select
              labelId="categoria-label"
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Categoria"
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5, ml: 2 }}>
                {errors.category}
              </Typography>
            )}
          </FormControl>
          
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_available}
                onChange={handleChange}
                name="is_available"
                color="primary"
              />
            }
            label="Produto disponível"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          onClick={onClose} 
          color="inherit" 
          variant="outlined"
          startIcon={<Close />}
          sx={{ borderRadius: 2, minWidth: '120px' }}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          startIcon={loading ? null : <Save />}
          sx={{ borderRadius: 2, px: 3, minWidth: '120px' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProdutoFormDialog;
