import React from 'react';
import { Avatar } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { AppBox, AppTypography } from './index';

/**
 * Mapeamento de ícones para categorias comuns
 */
const categoryIcons = {
  'Bebidas': <LocalCafeIcon fontSize="large" />,
  'Lanches': <FastfoodIcon fontSize="large" />,
  'Pizza': <LocalPizzaIcon fontSize="large" />,
  'Massas': <LocalDiningIcon fontSize="large" />,
  'default': <RestaurantIcon fontSize="large" />
};

/**
 * Componente para seleção visual de categorias com ícones
 * 
 * @param {Array} categories - Lista de categorias para exibir
 * @param {string|number} selectedCategoryId - ID da categoria selecionada
 * @param {function} onSelectCategory - Função chamada quando uma categoria é selecionada
 * @param {boolean} showAllOption - Se deve mostrar a opção "Todas"
 * @param {object} sx - Estilos adicionais para o componente
 */
const AppCategorySelector = ({ 
  categories = [], 
  selectedCategoryId, 
  onSelectCategory,
  showAllOption = true,
  sx = {},
  ...props 
}) => {
  return (
    <AppBox.ScrollBox 
      sx={{ 
        mb: 2, 
        pb: 1,
        ...sx 
      }}
      {...props}
    >
      {showAllOption && (
        <AppBox.FlexBox
          direction="column"
          onClick={() => onSelectCategory('')}
          sx={{
            cursor: 'pointer',
            minWidth: 60,
            opacity: selectedCategoryId === '' ? 1 : 0.7,
            transition: 'all 0.2s',
            '&:hover': { opacity: 1 },
            mr: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: selectedCategoryId === '' ? 'primary.main' : 'grey.300',
              width: 56, 
              height: 56,
              mb: 0.5
            }}
          >
            <RestaurantIcon fontSize="large" />
          </Avatar>
          <AppTypography.Caption 
            align="center" 
            fontWeight={selectedCategoryId === '' ? 'bold' : 'normal'}
          >
            Todas
          </AppTypography.Caption>
        </AppBox.FlexBox>
      )}

      {categories.map(category => (
        <AppBox.FlexBox
          key={category.id}
          direction="column"
          onClick={() => onSelectCategory(category.id.toString())}
          sx={{
            cursor: 'pointer',
            minWidth: 60,
            opacity: selectedCategoryId === category.id.toString() ? 1 : 0.7,
            transition: 'all 0.2s',
            '&:hover': { opacity: 1 },
            mr: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: selectedCategoryId === category.id.toString() ? 'primary.main' : 'grey.300',
              width: 56, 
              height: 56,
              mb: 0.5
            }}
          >
            {categoryIcons[category.name] || categoryIcons['default']}
          </Avatar>
          <AppTypography.Caption 
            align="center" 
            fontWeight={selectedCategoryId === category.id.toString() ? 'bold' : 'normal'}
          >
            {category.name}
          </AppTypography.Caption>
        </AppBox.FlexBox>
      ))}
    </AppBox.ScrollBox>
  );
};

export default AppCategorySelector;
