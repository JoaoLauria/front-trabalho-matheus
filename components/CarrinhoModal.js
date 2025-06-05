;
import { Badge, Fade, Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { AppBox, AppTypography, AppModal, AppCartItem, AppEmptyState } from './common';

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
        color="white" 
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
        <ShoppingCartIcon sx={{ color: "white", fontSize: '1.75rem' }} />
      </Badge>
      <AppTypography.Subtitle 
        component="span" 
        sx={{ 
          fontWeight: 600,
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          color: "white"
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
        width: '100%',
        maxWidth: '100%',
        maxHeight: { xs: '50vh', sm: '60vh' },
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        boxSizing: 'border-box'
      }}>
        <Fade in={true}>
          <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
            {carrinho.length === 0 ? (
              <AppEmptyState.Cart />
            ) : (
              <AppBox sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                {carrinho.map((item, index) => (
                    <AppCartItem
                      key={`${item.produto.id}-${index}`}
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
                      sx={{
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    />
                ))}
              </AppBox>
            )}
          </div>
        </Fade>
      </AppBox>
      
      <Paper 
        elevation={2}
        sx={{
          mt: 2,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'primary.main',
          boxShadow: 3
        }}
      >
        <AppBox.ColumnBox sx={{ 
          p: 2,
          color: 'white',
        }}>
          <Fade in={true} timeout={500}>
            <AppBox.SpaceBetweenBox 
              sx={{ 
                alignItems: 'center', 
                py: 1.5,
                px: 2,
                borderRadius: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            >
              <AppTypography.Subtitle 
                color="inherit" 
                fontWeight="bold"
                sx={{ fontSize: '1.2rem' }}
              >
                TOTAL:
              </AppTypography.Subtitle>
              <AppTypography.Subtitle 
                color="inherit" 
                fontWeight="bold"
                sx={{ fontSize: '1.2rem' }}
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
