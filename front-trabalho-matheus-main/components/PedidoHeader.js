;
import { Box, Typography, Badge, IconButton, Paper, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PedidoHeader = ({ mesa, carrinho, onOpenCarrinho, onVoltar }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        p: 1.5,
        borderRadius: 2,
        bgcolor: 'primary.main',
        color: 'white'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton 
          onClick={onVoltar}
          sx={{ 
            color: 'white', 
            mr: 1,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <TableRestaurantIcon sx={{ mr: 1.5, fontSize: 28 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
            Novo Pedido
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip 
              icon={<RestaurantIcon fontSize="small" />} 
              label={`Mesa ${typeof mesa === 'object' ? (mesa?.table_number || mesa?.id) : mesa}`} 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 'bold',
                '& .MuiChip-icon': { color: 'white' }
              }} 
            />
          </Box>
        </Box>
      </Box>
      
      <IconButton 
        onClick={onOpenCarrinho}
        sx={{ 
          bgcolor: 'white', 
          color: 'primary.main',
          '&:hover': { bgcolor: 'grey.100' },
          position: 'relative',
          p: 1.2
        }}
      >
        <Badge 
          badgeContent={carrinho.length} 
          color="error"
          sx={{ 
            '& .MuiBadge-badge': { 
              fontWeight: 'bold',
              fontSize: '0.9rem',
              height: 22,
              minWidth: 22
            } 
          }}
        >
          <ShoppingCartIcon fontSize="medium" />
        </Badge>
      </IconButton>
    </Paper>
  );
};

export default PedidoHeader;
