;
import { Box, Typography, Paper, CircularProgress, IconButton, Fade } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { colors } from '../../styles/theme';

const AppPage = ({
  title,
  children,
  loading = false,
  showBackButton = false,
  onBackClick,
  headerActions,
  footer,
  paper = true,
  sx = {},
  ...props
}) => {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    }
  };
  
  return (
    <Fade in={true} timeout={300}>
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: 'background.default',
          minHeight: '100vh',
          maxHeight: '100vh',
          overflow: 'auto',
          p: { xs: 1.5, sm: 2 }, 
          ...sx
        }}
        {...props}
      >
        {}
        {(title || showBackButton || headerActions) && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 2,
              px: { xs: 1, sm: 2 },
              py: 1.5,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {showBackButton && (
                <IconButton 
                  onClick={handleBackClick} 
                  sx={{ 
                    mr: 1.5,
                    color: colors.primary.main,
                    backgroundColor: 'rgba(255, 87, 34, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 87, 34, 0.15)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                  size="medium"
                >
                  <ArrowBack fontSize="small" />
                </IconButton>
              )}
              {title && (
                <Typography 
                  variant="h5" 
                  component="h1" 
                  fontWeight="600"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    color: colors.text.primary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: { xs: '200px', sm: '300px', md: 'none' }
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>
            {headerActions && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                {headerActions}
              </Box>
            )}
          </Box>
        )}
        
        {}
        {loading ? (
          <Box 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              p: 4,
              minHeight: '200px'
            }}
          >
            <CircularProgress size={48} thickness={4} />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 2, fontWeight: 500 }}
            >
              Carregando...
            </Typography>
          </Box>
        ) : (
          paper ? (
            <Paper 
              elevation={0} 
              sx={{ 
                flex: 1, 
                borderRadius: { xs: 2.5, sm: 3 },
                overflow: 'auto',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'box-shadow 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                }
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1 }}>
                {children}
              </Box>
            </Paper>
          ) : (
            <Box sx={{ flex: 1 }}>
              {children}
            </Box>
          )
        )}
        
        {}
        {footer && (
          <Box sx={{ mt: 2.5, mb: 1 }}>
            {footer}
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default AppPage;
