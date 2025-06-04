import React from 'react';
import { Badge, Fade, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { AppBox, AppTypography, AppModal, AppCartItem, AppEmptyState } from './common';
import { colors } from '../styles/theme';

const CarrinhoModal = ({
  open,
  onClose,
  carrinho,
  handleRemoverDoCarrinho,
  handleSalvar,
  handleAlterarQuantidadeCarrinho,
  loading
}) => {

  const total = carrinho.reduce((acc, item) => {

    let itemTotal = parseFloat(item.produto.price) * item.quantidade;
    

    if (item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0) {
      const adicionaisTotal = item.adicionaisSelecionados.reduce((adcAcc, adc) => {
        return adcAcc + (parseFloat(adc.price) * adc.quantidade);
      }, 0);
      itemTotal += adicionaisTotal;
    }
    
    return acc + itemTotal;
  }, 0);

  const cartHeader = (
    <AppBox.FlexBox sx={{ 
      alignItems: 'center',
      py: 1
    }}>
      <Badge 
        badgeContent={carrinho.length} 
        color="error" 
        sx={{ 
          mr: 1.5,
          '& .MuiBadge-badge': {
            fontSize: '0.75rem',
            fontWeight: 'bold',
            minWidth: '20px',
            height: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }
        }}
      >
        <ShoppingCartIcon sx={{ color: colors.primary.main, fontSize: '1.75rem' }} />
      </Badge>
      <AppTypography.Subtitle 
        component="span" 
        sx={{ 
          fontWeight: 600,
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          color: colors.text.primary
        }}
      >
        Carrinho de Pedidos
      </AppTypography.Subtitle>
    </AppBox.FlexBox>
  );

  return (
    <AppModal.Cart
      open={open}
      onClose={onClose}
      onContinueShopping={onClose}
      onFinishOrder={handleSalvar}
      disableFinish={carrinho.length === 0 || loading}
      loading={loading}
      maxWidth="sm"
      title={cartHeader}
    >
      <AppBox sx={{ 
        bgcolor: 'background.paper', 
        p: 0,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)',
        maxHeight: { xs: '50vh', sm: '60vh' },
        overflowY: 'auto'
      }}>
        <Fade in={true}>
          <div>
            {carrinho.length === 0 ? (
              <AppEmptyState.Cart />
            ) : (
              <AppBox sx={{ p: { xs: 1.5, sm: 2 } }}>
                {carrinho.map((item, index) => (
                  <Paper
                    key={`${item.produto.id}-${index}`}
                    elevation={0}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <AppCartItem
                      item={{
                        id: index,
                        name: item.produto.name,
                        description: item.produto.description,
                        price: parseFloat(item.produto.price),
                        quantity: item.quantidade,
                        observation: item.observacao,
                        additionals: item.adicionaisSelecionados ? item.adicionaisSelecionados.map(adicional => ({
                          id: adicional.id,
                          name: adicional.name,
                          price: parseFloat(adicional.price),
                          quantity: adicional.quantidade
                        })) : []
                      }}
                      onRemove={() => handleRemoverDoCarrinho(index)}
                      onQuantityChange={(_, newQuantity) => handleAlterarQuantidadeCarrinho(index, newQuantity)}
                      showControls={true}
                      sx={{ p: { xs: 1.5, sm: 2 }, mb: 0 }}
                    />
                  </Paper>
                ))}
              </AppBox>
            )}
          </div>
        </Fade>
      </AppBox>
      
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 3,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
        }}
      >
        <AppBox.ColumnBox sx={{ 
          p: { xs: 2, sm: 2.5 }, 
          color: 'white',
        }}>
          <AppBox.SpaceBetweenBox sx={{ alignItems: 'center' }}>
            <AppTypography.Description 
              color="inherit"
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                opacity: 0.9
              }}
            >
              Subtotal:
            </AppTypography.Description>
            <AppTypography.Description 
              color="inherit"
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 500,
                opacity: 0.9
              }}
            >
              R$ {total.toFixed(2)}
            </AppTypography.Description>
          </AppBox.SpaceBetweenBox>
          
          <Fade in={true} timeout={500}>
            <AppBox.SpaceBetweenBox 
              sx={{ 
                alignItems: 'center', 
                mt: 1.5,
                py: 1,
                px: { xs: 1, sm: 1.5 },
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <AppTypography.Subtitle 
                color="inherit" 
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                TOTAL:
              </AppTypography.Subtitle>
              <AppTypography.Subtitle 
                color="inherit" 
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
              >
                R$ {total.toFixed(2)}
              </AppTypography.Subtitle>
            </AppBox.SpaceBetweenBox>
          </Fade>
        </AppBox.ColumnBox>
      </Paper>
    </AppModal.Cart>
  );
};

export default CarrinhoModal;
