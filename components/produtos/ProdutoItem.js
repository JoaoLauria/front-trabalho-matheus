import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
  Paper,
  Chip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { formatarPreco } from '../../utils/produtosUtils';

const ProdutoItem = ({ produto, onEditClick, onDeleteClick }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mb: 1, 
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <ListItem
        sx={{
          borderLeft: '4px solid',
          borderLeftColor: produto.is_available ? 'primary.main' : 'grey.400',
          opacity: produto.is_available ? 1 : 0.7
        }}
      >
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {produto.name}
              </Typography>
              {!produto.is_available && (
                <Chip 
                  label="Indisponível" 
                  size="small" 
                  color="default" 
                  sx={{ 
                    bgcolor: 'rgba(0,0,0,0.08)',
                    fontSize: '0.7rem'
                  }} 
                />
              )}
            </Box>
          }
          secondaryTypographyProps={{ component: 'div' }}
          secondary={
            <React.Fragment>
              {produto.description && (
                <Typography 
                  variant="body2" 
                  component="div"
                  color="text.secondary"
                  sx={{ 
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    mb: 0.5
                  }}
                >
                  {produto.description}
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                <Typography variant="body2" component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {formatarPreco(produto.price)}
                </Typography>
              </Box>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton 
            edge="end" 
            aria-label="edit" 
            onClick={() => onEditClick(produto)}
            sx={{ color: 'primary.main' }}
          >
            <Edit />
          </IconButton>
          <IconButton 
            edge="end" 
            aria-label="delete" 
            onClick={() => onDeleteClick(produto)}
            sx={{ color: 'error.main', ml: 1 }}
          >
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

export default ProdutoItem;
