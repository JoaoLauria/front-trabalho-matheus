import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  CircularProgress,
  Fade,
  Tooltip
} from '@mui/material';
import { Add, ArrowBack, Restaurant } from '@mui/icons-material';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/theme';

const ProdutoHeader = ({ onAddClick, loading }) => {
  const navigation = useNavigation();

  return (
    <Fade in={true} timeout={400}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: 3, 
          borderRadius: 3,
          background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {}
        <Box 
          sx={{ 
            position: 'absolute',
            top: -20,
            right: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: { xs: 'none', sm: 'block' }
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: -30,
            right: 40,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            display: { xs: 'none', sm: 'block' }
          }} 
        />

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', md: 'center' },
            position: 'relative',
            zIndex: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
            <Tooltip title="Voltar" arrow placement="top">
              <IconButton 
                onClick={() => navigation.goBack()} 
                sx={{ 
                  mr: 1.5, 
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)'
                  }
                }}
                size="small"
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Restaurant sx={{ fontSize: { xs: 28, sm: 32 }, color: 'white', opacity: 0.9 }} />
              <Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}
                >
                  Gerenciar Produtos
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    mt: 0.5
                  }}
                >
                  Adicione, edite ou remova produtos do cardápio
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={loading ? null : <Add />}
            onClick={onAddClick}
            disabled={loading}
            sx={{
              borderRadius: 8,
              py: { xs: 1, sm: 1.2 },
              px: { xs: 2, sm: 3 },
              bgcolor: 'white',
              color: colors.primary.main,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              }
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="primary" />
                <Box component="span">Carregando...</Box>
              </Box>
            ) : (
              'Adicionar Produto'
            )}
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default ProdutoHeader;
