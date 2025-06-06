import React from 'react';
import { Divider, IconButton, Badge } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AppBox, AppTypography, AppList } from './index';
import { formatCurrency } from '../../utils';

const AppProductList = ({
  products = [],
  onSelectProduct,
  onAddProduct,
  selectable = true,
  showQuantityControls = false,
  selectedItems = {},
  onQuantityChange,
  sx = {},
  ...props
}) => {
  const handleQuantityChange = (productId, delta) => {
    if (onQuantityChange) {
      const currentQty = selectedItems[productId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      onQuantityChange(productId, newQty);
    }
  };

  if (products.length === 0) {
    return (
      <AppBox sx={{ textAlign: 'center', py: 4, ...sx }} {...props}>
        <AppTypography.Subtitle color="text.secondary">
          Nenhum produto encontrado
        </AppTypography.Subtitle>
      </AppBox>
    );
  }

  return (
    <AppList
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      {products.map((product, index) => (
        <React.Fragment key={product.id}>
          <AppList.AppListItem
            disablePadding
            onClick={selectable ? () => onSelectProduct && onSelectProduct(product) : undefined}
            sx={{
              cursor: selectable ? 'pointer' : 'default',
              opacity: product.is_available === false ? 0.6 : 1,
              bgcolor: selectedItems && selectedItems[product.id] ? 'action.selected' : 'transparent',
              '&:hover': selectable ? { bgcolor: 'action.hover' } : {}
            }}
            primary={
              <AppBox.FlexBox sx={{ p: 0, alignItems: 'center' }}>
                <AppBox.ColumnBox sx={{ flex: 1, p: 0 }}>
                  <AppBox.FlexBox sx={{ alignItems: 'center' }}>
                    <AppTypography.Subtitle>
                      {product.name}
                    </AppTypography.Subtitle>
                    {product.is_available === false && (
                      <AppTypography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        (Indisponível)
                      </AppTypography>
                    )}
                  </AppBox.FlexBox>
                  
                  <AppTypography.Description>
                    {product.description || 'Sem descrição'}
                  </AppTypography.Description>
                  
                  <AppTypography.Price>
                    {formatCurrency(product.price)}
                  </AppTypography.Price>
                </AppBox.ColumnBox>

                {showQuantityControls && (
                  <AppBox.FlexBox sx={{ alignItems: 'center' }}>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, -1);
                      }}
                      disabled={!selectedItems[product.id]}
                    >
                      <RemoveIcon />
                    </IconButton>
                    
                    <Badge 
                      badgeContent={selectedItems[product.id] || 0} 
                      color="primary"
                      sx={{ mx: 1 }}
                    />
                    
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(product.id, 1);
                      }}
                      disabled={product.is_available === false}
                    >
                      <AddIcon />
                    </IconButton>
                  </AppBox.FlexBox>
                )}

                {onAddProduct && !showQuantityControls && (
                  <IconButton 
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddProduct(product);
                    }}
                    disabled={product.is_available === false}
                  >
                    <AddIcon />
                  </IconButton>
                )}
              </AppBox.FlexBox>
            }
          />
          {index < products.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </AppList>
  );
};

AppProductList.Selectable = (props) => (
  <AppProductList selectable={true} {...props} />
);

AppProductList.WithQuantity = (props) => (
  <AppProductList showQuantityControls={true} {...props} />
);

AppProductList.ReadOnly = (props) => (
  <AppProductList selectable={false} {...props} />
);

export default AppProductList;
