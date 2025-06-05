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
import { Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material';

const getCategoryIcon = (categoryName) => {
  if (!categoryName) return <CategoryIcon />;
  
  const name = categoryName.toLowerCase();
  
  if (name.includes('bebida') || name.includes('drink') || name.includes('suco')) {
    return <LocalBarIcon />;
  } else if (name.includes('café') || name.includes('cafe') || name.includes('coffee')) {
    return <LocalCafeIcon />;
  } else if (name.includes('sobremesa') || name.includes('doce') || name.includes('dessert') || name.includes('sweet')) {
    return <CakeIcon />;
  } else if (name.includes('pizza') || name.includes('massa')) {
    return <LocalPizzaIcon />;
  } else if (name.includes('lanche') || name.includes('sanduíche') || name.includes('sandwich') || name.includes('burger')) {
    return <FastfoodIcon />;
  } else if (name.includes('chá') || name.includes('cha') || name.includes('tea')) {
    return <EmojiFoodBeverageIcon />;
  } else {
    
    return <RestaurantIcon />;
  }
};

const CategoriaItem = ({ categoria, onEditClick, onDeleteClick }) => {
  
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
              bgcolor: categoria.is_active !== false ? `${restaurantTheme.available}15` : `${restaurantTheme.unavailable}15`,
              color: categoria.is_active !== false ? restaurantTheme.available : restaurantTheme.unavailable,
              mr: 2,
              width: 48,
              height: 48
            }}
          >
            {getCategoryIcon(categoria.name)}
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
                  {categoria.name}
                </Typography>
                {categoria.is_active !== false ? (
                  <Chip 
                    icon={<CheckCircle fontSize="small" />}
                    label="Ativa" 
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
                    label="Inativa" 
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
                {categoria.description && (
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
                    {categoria.description || 'Sem descrição'}
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
                  <Typography 
                    variant="body2" 
                    component="span" 
                    sx={{ 
                      color: '#666666',
                      fontSize: { xs: '0.8rem', sm: '0.85rem' }
                    }}
                  >
                    {categoria.produtos_count ? `${categoria.produtos_count} produtos vinculados` : 'Nenhum produto vinculado'}
                  </Typography>
                </Box>
              </Box>
            }
          />
        <ListItemSecondaryAction sx={{ right: { xs: 8, sm: 16 } }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Editar categoria" arrow placement="top">
              <IconButton 
                edge="end" 
                aria-label="edit" 
                onClick={() => onEditClick(categoria)}
                sx={{ 
                  color: restaurantTheme.categoryBg,
                  bgcolor: `${restaurantTheme.categoryBg}08`,
                  '&:hover': {
                    bgcolor: `${restaurantTheme.categoryBg}15`,
                  },
                  padding: '6px'
                }}
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir categoria" arrow placement="top">
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => onDeleteClick(categoria)}
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

export default CategoriaItem;
