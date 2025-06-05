import React from 'react';

import { Fade, Paper, Box, Typography, Alert } from '@mui/material';

import { AppList, AppEmptyState } from '../common';

import CategoriaItem from './CategoriaItem';

import commonStyles from '../../styles/commonStyles';

const restaurantTheme = {

  available: '#4caf50',      

  unavailable: '#f44336',    

  price: '#ff9800',         

  background: '#f9f5f0',     

  cardBg: '#ffffff',         

  shadow: 'rgba(0,0,0,0.1)',  

  categoryBg: '#5c6bc0',     

  categoryLight: '#5c6bc015' 

};

const CategoriaLista = ({ 

  categorias, 

  loading, 

  handleNovaCategoria, 

  handleEditarCategoria, 

  handleConfirmarExclusao,

  erro

}) => {

  

  if (categorias.length === 0 && !loading) {

    return (

      <Fade in={true} timeout={500}>

        <Paper elevation={0} sx={{ overflow: 'hidden' }}>

          <AppEmptyState.Products 

            onAddProduct={handleNovaCategoria}

            title="Nenhuma categoria encontrada"

            description="Crie uma nova categoria para começar a organizar seus produtos."

            sx={{ 

              bgcolor: restaurantTheme.cardBg, 

              borderRadius: 2, 

              border: '1px solid', 

              borderColor: 'divider',

              boxShadow: `0 4px 12px ${restaurantTheme.shadow}`,

              p: { xs: 2, sm: 3 }

            }}

          />

        </Paper>

      </Fade>

    );

  }

  return (

    <Box sx={{ mt: 1 }}>

      {erro && (

        <Alert severity="error" sx={{ mb: 3 }}>

          {erro}

        </Alert>

      )}

      

      <Fade in={true} timeout={400}>

        <Paper 

          elevation={0} 

          sx={{ 

            borderRadius: 2,

            overflow: 'hidden',

            border: '1px solid',

            borderColor: 'divider',

            boxShadow: `0 4px 12px ${restaurantTheme.shadow}`,

            backgroundColor: restaurantTheme.cardBg

          }}

        >

          <Box 

            sx={{ 

              display: 'flex', 

              alignItems: 'center', 

              p: { xs: 2, sm: 2.5 },

              borderBottom: '1px solid',

              borderColor: 'divider',

              gap: 1.5,

              backgroundColor: `${restaurantTheme.categoryBg}08`

            }}

          >

            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.15rem' }, color: '#333333' }}>

              Categorias

            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>

              {categorias.length} {categorias.length === 1 ? 'categoria' : 'categorias'}

            </Typography>

          </Box>

          

          <AppList

            loading={loading}

            items={categorias}

            divider={false}

            renderItem={(categoria) => (

              <CategoriaItem 

                categoria={categoria} 

                onEditClick={handleEditarCategoria}

                onDeleteClick={handleConfirmarExclusao}

              />

            )}

            sx={{

              ...commonStyles.list,

              borderRadius: 0,

              border: 'none',

              p: 1

            }}

          />

        </Paper>

      </Fade>

    </Box>

  );

};

export default CategoriaLista;

