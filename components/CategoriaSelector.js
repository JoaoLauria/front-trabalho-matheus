import React from 'react';
import { Box, Avatar, Typography, Chip } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';


const categoriaIcons = {
  'Bebidas': <LocalCafeIcon fontSize="large" />,
  'Lanches': <FastfoodIcon fontSize="large" />,
  'Pizza': <LocalPizzaIcon fontSize="large" />,
  'Massas': <LocalDiningIcon fontSize="large" />,
  'default': <RestaurantIcon fontSize="large" />
};

const CategoriaSelector = ({ categorias = [], categoriaId, setCategoriaId }) => {
  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', mb: 2, pb: 1 }}>

      <Box 
        onClick={() => setCategoriaId('')}
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          cursor: 'pointer',
          minWidth: 60,
          opacity: categoriaId === '' ? 1 : 0.7,
          transition: 'all 0.2s',
          '&:hover': { opacity: 1 },
          mr: 2
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: categoriaId === '' ? 'primary.main' : 'grey.300',
            width: 56, 
            height: 56,
            mb: 0.5
          }}
        >
          <RestaurantIcon fontSize="large" />
        </Avatar>
        <Typography variant="caption" align="center" fontWeight={categoriaId === '' ? 'bold' : 'normal'}>
          Todas
        </Typography>
      </Box>
      

      {categorias.map(categoria => (
        <Box 
          key={categoria.id}
          onClick={() => setCategoriaId(categoria.id.toString())}
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            cursor: 'pointer',
            minWidth: 60,
            opacity: categoriaId === categoria.id.toString() ? 1 : 0.7,
            transition: 'all 0.2s',
            '&:hover': { opacity: 1 },
            mr: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: categoriaId === categoria.id.toString() ? 'primary.main' : 'grey.300',
              width: 56, 
              height: 56,
              mb: 0.5
            }}
          >
            {categoriaIcons[categoria.name] || categoriaIcons['default']}
          </Avatar>
          <Typography variant="caption" align="center" fontWeight={categoriaId === categoria.id.toString() ? 'bold' : 'normal'}>
            {categoria.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CategoriaSelector;
