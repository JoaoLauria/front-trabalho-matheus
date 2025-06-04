import React from 'react';
import { IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AppBox, AppTypography } from './index';
import { formatCurrency } from '../../utils';

/**
 * Componente para exibir itens no carrinho com controles de quantidade
 * 
 * @param {Object} item - Item do carrinho com nome, preço, quantidade e adicionais
 * @param {function} onRemove - Função chamada quando o item é removido
 * @param {function} onQuantityChange - Função chamada quando a quantidade é alterada
 * @param {boolean} showControls - Se deve mostrar controles de quantidade e remoção
 * @param {object} sx - Estilos adicionais para o componente
 */
const AppCartItem = ({
  item,
  onRemove,
  onQuantityChange,
  showControls = true,
  sx = {},
  ...props
}) => {
  const handleQuantityChange = (delta) => {
    if (onQuantityChange) {
      const newQuantity = Math.max(1, item.quantity + delta);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const totalItemPrice = item.price * item.quantity;
  const hasAdditionals = item.additionals && item.additionals.length > 0;
  
  return (
    <AppBox sx={{ mb: 2, ...sx }} {...props}>
      <AppBox.FlexBox sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <AppBox.ColumnBox sx={{ flex: 1 }}>
          <AppBox.FlexBox sx={{ alignItems: 'center' }}>
            {showControls && (
              <AppTypography.Subtitle color="primary.main" sx={{ mr: 1 }}>
                {item.quantity}x
              </AppTypography.Subtitle>
            )}
            <AppTypography.Subtitle>
              {item.name}
            </AppTypography.Subtitle>
          </AppBox.FlexBox>
          
          <AppTypography.Price>
            {formatCurrency(item.price)} {item.quantity > 1 && `(Total: ${formatCurrency(totalItemPrice)})`}
          </AppTypography.Price>
          
          {hasAdditionals && (
            <AppBox.Paper sx={{ mt: 1, p: 1, bgcolor: 'grey.100' }}>
              <AppTypography.Caption fontWeight="bold">
                Adicionais:
              </AppTypography.Caption>
              
              {item.additionals.map((additional, index) => (
                <AppBox.FlexBox key={index} sx={{ justifyContent: 'space-between', mt: 0.5 }}>
                  <AppTypography.Caption>
                    {additional.name} (x{additional.quantity})
                  </AppTypography.Caption>
                  <AppTypography.Caption>
                    {formatCurrency(additional.price * additional.quantity)}
                  </AppTypography.Caption>
                </AppBox.FlexBox>
              ))}
            </AppBox.Paper>
          )}
          
          {item.observation && (
            <AppBox sx={{ mt: 1 }}>
              <AppTypography.Caption fontWeight="bold">
                Observação:
              </AppTypography.Caption>
              <AppTypography.Caption>
                {item.observation}
              </AppTypography.Caption>
            </AppBox>
          )}
        </AppBox.ColumnBox>
        
        {showControls && (
          <AppBox.FlexBox>
            <IconButton 
              size="small" 
              color="primary"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            
            <IconButton 
              size="small" 
              color="primary"
              onClick={() => handleQuantityChange(1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            
            <IconButton 
              size="small" 
              color="error"
              onClick={() => onRemove && onRemove(item.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </AppBox.FlexBox>
        )}
      </AppBox.FlexBox>
      
      <Divider sx={{ mt: 2 }} />
    </AppBox>
  );
};

// Variantes do AppCartItem
AppCartItem.ReadOnly = (props) => (
  <AppCartItem showControls={false} {...props} />
);

AppCartItem.WithControls = (props) => (
  <AppCartItem showControls={true} {...props} />
);

export default AppCartItem;
