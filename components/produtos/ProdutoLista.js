;
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
  Collapse,
  IconButton,
  Fade,
  Divider,
  Badge
} from '@mui/material';
import { ExpandMore, ExpandLess, Category } from '@mui/icons-material';
import ProdutoItem from './ProdutoItem';
import { colors } from '../../styles/theme';

const ProdutoLista = ({ 
  produtosFiltrados, 
  produtosAgrupados, 
  categorias, 
  filtros, 
  expandedCategories,
  handleToggleExpand,
  onEditClick, 
  onDeleteClick 
}) => {
  if (!filtros.categoria) {
    return (
      <Fade in={true} timeout={500}>
        <List sx={{ p: 0 }}>
          {Object.values(produtosAgrupados)
            .filter(grupo => grupo.produtos.length > 0)
            .map(grupo => (
              <Fade in={true} key={grupo.categoria.id} timeout={300}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    mb: 3, 
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <ListItem 
                    onClick={() => handleToggleExpand(grupo.categoria.id)}
                    sx={{
                      borderLeft: '4px solid',
                      borderLeftColor: colors.primary.main,
                      cursor: 'pointer',
                      py: { xs: 1.5, sm: 2 },
                      px: { xs: 2, sm: 3 },
                      background: `linear-gradient(135deg, ${colors.primary.light}15 0%, ${colors.primary.main}05 100%)`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary.light}25 0%, ${colors.primary.main}10 100%)`
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Category sx={{ color: colors.primary.main, opacity: 0.7 }} />
                      <ListItemText 
                        primary={
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              fontSize: { xs: '1.1rem', sm: '1.25rem' },
                              color: 'text.primary'
                            }}
                          >
                            {grupo.categoria.name}
                          </Typography>
                        }
                        secondary={
                          <Badge 
                            badgeContent={grupo.produtos.length} 
                            color="primary" 
                            sx={{ 
                              '& .MuiBadge-badge': {
                                fontSize: '0.7rem',
                                height: '18px',
                                minWidth: '18px',
                                padding: '0 4px'
                              }
                            }}
                          >
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'text.secondary',
                                fontSize: { xs: '0.8rem', sm: '0.85rem' }
                              }}
                            >
                              produto{grupo.produtos.length !== 1 ? 's' : ''}
                            </Typography>
                          </Badge>
                        }
                      />
                    </Box>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        ml: 1,
                        bgcolor: expandedCategories.includes(grupo.categoria.id) ? 
                          'rgba(25, 118, 210, 0.08)' : 'transparent',
                        color: colors.primary.main,
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(25, 118, 210, 0.15)'
                        }
                      }}
                    >
                      {expandedCategories.includes(grupo.categoria.id) ? 
                        <ExpandLess /> : 
                        <ExpandMore />
                      }
                    </IconButton>
                  </ListItem>
                  <Divider />
                  <Collapse in={expandedCategories.includes(grupo.categoria.id)} timeout={300}>
                    <List component="div" disablePadding sx={{ px: { xs: 1, sm: 2 }, pt: 2, pb: 1 }}>
                      {grupo.produtos.map(produto => (
                        <ProdutoItem 
                          key={produto.id}
                          produto={produto}
                          onEditClick={onEditClick}
                          onDeleteClick={onDeleteClick}
                        />
                      ))}
                    </List>
                  </Collapse>
                </Paper>
              </Fade>
            ))
          }
        </List>
      </Fade>
    );
  }
  
  return (
    <Fade in={true} timeout={400}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 3,
          background: `linear-gradient(135deg, ${colors.primary.light}10 0%, ${colors.primary.main}05 100%)`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            mb: 3,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Category sx={{ color: colors.primary.main }} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.2rem', sm: '1.3rem' },
                color: 'text.primary'
              }}
            >
              {categorias.find(c => c.id === parseInt(filtros.categoria))?.name}
            </Typography>
          </Box>
          
          <Badge 
            badgeContent={produtosFiltrados.length} 
            color="primary" 
            sx={{ 
              ml: { xs: 0, sm: 2 },
              mt: { xs: 1, sm: 0 },
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                height: '20px',
                minWidth: '20px'
              }
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
            >
              produto{produtosFiltrados.length !== 1 ? 's' : ''}
            </Typography>
          </Badge>
        </Box>
        
        <List sx={{ p: 0 }}>
          {produtosFiltrados.map((produto, index) => (
            <ProdutoItem 
              key={produto.id}
              produto={produto}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </List>
      </Paper>
    </Fade>
  );
};

export default ProdutoLista;
