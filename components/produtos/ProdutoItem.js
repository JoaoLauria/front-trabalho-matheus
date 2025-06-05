;
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
  Paper,
  Chip,
  Fade,
  Tooltip,
  Avatar
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  RestaurantMenu, 
  LocalOffer, 
  CheckCircle, 
  Cancel 
} from '@mui/icons-material';
import { formatCurrency } from '../../utils/formatters/currency';

const ProdutoItem = ({ produto, onEditClick, onDeleteClick }) => {
  
  const restaurantTheme = {
    available: '#4caf50',      
    unavailable: '#f44336',    
    price: '#ff9800',         
    background: '#f9f5f0',     
    cardBg: '#ffffff',         
    shadow: 'rgba(0,0,0,0.1)'  
  };

  return (
    <Fade in={true} timeout={300}>
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 2, 
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'all 0.25s ease-in-out',
          boxShadow: `0 4px 12px ${restaurantTheme.shadow}`,
          backgroundColor: restaurantTheme.cardBg,
          '&:hover': {
            boxShadow: `0 8px 16px ${restaurantTheme.shadow}`,
            transform: 'translateY(-2px)'
          }
        }}
      >
        <ListItem
          sx={{
            p: { xs: 1.5, sm: 2 }
          }}
        >
          {}
          <Avatar 
            sx={{ 
              bgcolor: produto.is_available ? `${restaurantTheme.available}15` : `${restaurantTheme.unavailable}15`,
              color: produto.is_available ? restaurantTheme.available : restaurantTheme.unavailable,
              mr: 2,
              width: 48,
              height: 48
            }}
          >
            <RestaurantMenu />
          </Avatar>

          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    color: '#333333'
                  }}
                >
                  {produto.name}
                </Typography>
                {produto.is_available ? (
                  <Chip 
                    icon={<CheckCircle fontSize="small" />}
                    label="Disponível" 
                    size="small" 
                    sx={{ 
                      bgcolor: `${restaurantTheme.available}15`,
                      color: restaurantTheme.available,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      borderRadius: '12px',
                      height: 24
                    }} 
                  />
                ) : (
                  <Chip 
                    icon={<Cancel fontSize="small" />}
                    label="Indisponível" 
                    size="small" 
                    sx={{ 
                      bgcolor: `${restaurantTheme.unavailable}15`,
                      color: restaurantTheme.unavailable,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      borderRadius: '12px',
                      height: 24
                    }} 
                  />
                )}
              </Box>
            }
            secondaryTypographyProps={{ component: 'div' }}
            secondary={
              <Box component="span">
                {produto.description && (
                  <Typography 
                    variant="body2" 
                    component="span"
                    color="text.secondary"
                    sx={{ 
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      mb: 1,
                      mt: 0.5,
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      color: '#666666'
                    }}
                  >
                    {produto.description}
                  </Typography>
                )}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mt: 0.5,
                    gap: 0.5
                  }}
                >
                  <LocalOffer sx={{ 
                    fontSize: '0.9rem', 
                    color: restaurantTheme.price
                  }} />
                  <Typography 
                    variant="body2" 
                    component="span" 
                    sx={{ 
                      fontWeight: 600, 
                      color: restaurantTheme.price,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' }
                    }}
                  >
                    {formatCurrency(produto.price)}
                  </Typography>
                </Box>
              </Box>
            }
          />
        <ListItemSecondaryAction sx={{ right: { xs: 8, sm: 16 } }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Editar produto" arrow placement="top">
              <IconButton 
                edge="end" 
                aria-label="edit" 
                onClick={() => onEditClick(produto)}
                sx={{ 
                  color: '#5c6bc0',
                  bgcolor: 'rgba(92, 107, 192, 0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(92, 107, 192, 0.15)',
                  },
                  padding: '6px'
                }}
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir produto" arrow placement="top">
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => onDeleteClick(produto.id)}
                sx={{ 
                  color: restaurantTheme.unavailable, 
                  bgcolor: `${restaurantTheme.unavailable}08`,
                  '&:hover': {
                    bgcolor: `${restaurantTheme.unavailable}15`,
                  },
                  padding: '6px'
                }}
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
    </Fade>
  );
};

export default ProdutoItem;
