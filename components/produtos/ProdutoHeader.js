import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  CircularProgress
} from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';

const ProdutoHeader = ({ onAddClick, loading }) => {
  const navigation = useNavigation();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigation.goBack()} sx={{ mr: 1, color: 'white' }}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
              Gerenciar Produtos
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Adicione, edite ou remova produtos do cardápio
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={onAddClick}
          sx={{
            borderRadius: 2,
            py: 1,
            px: 2,
            bgcolor: 'white',
            color: '#1976d2',
            boxShadow: 3,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
              boxShadow: 6,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s'
            }
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Adicionar Produto'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProdutoHeader;
