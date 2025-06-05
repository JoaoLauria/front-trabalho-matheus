;
import { IconButton, Divider, Grid, Paper, Typography, Tooltip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AppBox, AppTypography } from './';
import { formatCurrency } from '../../utils';

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

  const hasAdditionals = item.additionals && item.additionals.length > 0;

  const subtotal = item.price * item.quantity;

  return (
    <Paper elevation={1} sx={{ mb: 2, p: { xs: 1.5, sm: 2 }, borderRadius: 2, width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden', ...sx }} {...props}>
      {}
      <AppBox.FlexBox sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        {}
        <Box sx={{ width: '33%', flexShrink: 1, mr: 1 }}>
          <Tooltip title={item.name} placement="top-start">
            <AppTypography.Subtitle 
              sx={{ 
                fontWeight: 'bold', 
                color: 'primary.main', 
                textAlign: 'left',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%'
              }}
            >
              {item.name}
            </AppTypography.Subtitle>
          </Tooltip>
        </Box>
        
        {}
        <Box sx={{ width: '16%', textAlign: 'center', flexShrink: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 'medium', display: 'block' }}>
            Preço
          </Typography>
          <AppTypography.Price sx={{ display: 'block' }}>
            {formatCurrency(item.price)}
          </AppTypography.Price>
        </Box>
        
        {}
        <Box sx={{ width: '25%', textAlign: 'center', flexShrink: 0 }}>
          {showControls ? (
            <AppBox.FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <IconButton 
                size="small" 
                color="primary"
                onClick={() => handleQuantityChange(-1)}
                disabled={item.quantity <= 1}
                sx={{ minWidth: '28px', width: '28px', height: '28px', p: 0.5 }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              
              <AppTypography.Subtitle sx={{ mx: 0.5, minWidth: '24px', textAlign: 'center' }}>
                {item.quantity}
              </AppTypography.Subtitle>
              
              <IconButton 
                size="small" 
                color="primary"
                onClick={() => handleQuantityChange(1)}
                sx={{ minWidth: '28px', width: '28px', height: '28px', p: 0.5 }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </AppBox.FlexBox>
          ) : (
            <AppBox.FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ fontWeight: 'medium', display: 'block' }}>
                Qtd: {item.quantity}
              </Typography>
            </AppBox.FlexBox>
          )}
        </Box>
        
        {}
        <Box sx={{ width: '16%', textAlign: 'center', flexShrink: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 'medium', display: 'block' }}>
            Subtotal
          </Typography>
          <AppTypography.Price sx={{ display: 'block' }}>
            {formatCurrency(subtotal)}
          </AppTypography.Price>
        </Box>
        
        {}
        <Box sx={{ width: '10%', textAlign: 'center', flexShrink: 0 }}>
          {showControls && (
            <IconButton 
              size="medium" 
              color="error"
              onClick={onRemove}
              aria-label="Remover item"
              sx={{ color: 'white', bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          )}
        </Box>
      </AppBox.FlexBox>
      
      {}
      {hasAdditionals && (
        <Paper sx={{ mt: 1, p: 1.5, bgcolor: 'primary.light', borderRadius: 1.5 }}>
          <Typography variant="caption" fontWeight="bold" sx={{ color: 'primary.contrastText', display: 'block', mb: 0.5 }}>
            Adicionais
          </Typography>
          
          <Grid container spacing={1}>
            {item.additionals.map((additional, index) => (
              <Grid item xs={12} key={index}>
                <AppBox.FlexBox sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'primary.contrastText' }}>
                    {additional.name} (x{additional.quantity})
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.contrastText', fontWeight: 'medium', minWidth: '60px', textAlign: 'right' }}>
                    {formatCurrency(additional.price * additional.quantity)}
                  </Typography>
                </AppBox.FlexBox>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      
      {}
      {item.observation && (
        <Paper sx={{ mt: 1, p: 1.5, bgcolor: 'grey.100', borderRadius: 1.5 }}>
          <Typography variant="caption" fontWeight="bold" sx={{ display: 'block', mb: 0.5 }}>
            Observação
          </Typography>
          <Typography variant="caption" sx={{ display: 'block' }}>
            {item.observation}
          </Typography>
        </Paper>
      )}
      
      <Divider sx={{ mt: 2 }} />
    </Paper>
  );
};

AppCartItem.ReadOnly = (props) => (
  <AppCartItem showControls={false} {...props} />
);

AppCartItem.WithControls = (props) => (
  <AppCartItem showControls={true} {...props} />
);

export default AppCartItem;
