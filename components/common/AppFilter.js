import React from 'react';
import { Grid, Collapse, Paper } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppBox, AppTypography, AppButton } from './index';

/**
 * Componente de filtro padronizado para uso em toda a aplicação
 * 
 * @param {ReactNode} children - Elementos de filtro a serem renderizados
 * @param {boolean} expanded - Se o filtro está expandido ou não
 * @param {function} onToggleExpand - Função chamada quando o botão de expandir/recolher é clicado
 * @param {string} title - Título do filtro
 * @param {function} onClearFilters - Função chamada quando o botão de limpar filtros é clicado
 * @param {object} sx - Estilos adicionais para o componente
 */
const AppFilter = ({
  children,
  expanded = true,
  onToggleExpand,
  title = "Filtros",
  onClearFilters,
  sx = {},
  ...props
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        mb: 3,
        overflow: 'hidden',
        borderRadius: 2,
        ...sx
      }}
      {...props}
    >
      <AppBox.FlexBox
        sx={{
          p: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: expanded ? '1px solid' : 'none',
          borderColor: 'divider',
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          minHeight: '56px'
        }}
      >
        <AppBox.FlexBox sx={{ alignItems: 'center' }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <AppTypography.Subtitle color="inherit">
            {title}
          </AppTypography.Subtitle>
        </AppBox.FlexBox>

        <AppBox.FlexBox>
          {onClearFilters && expanded && (
            <AppButton
              variant="text"
              onClick={onClearFilters}
              size="small"
              sx={{ color: 'inherit', mr: 1 }}
            >
              Limpar
            </AppButton>
          )}
          
          {onToggleExpand && (
            <AppButton.IconButton
              onClick={onToggleExpand}
              icon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              tooltip={expanded ? "Recolher filtros" : "Expandir filtros"}
              size="small"
              sx={{ color: 'inherit' }}
            />
          )}
        </AppBox.FlexBox>
      </AppBox.FlexBox>

      <Collapse in={expanded}>
        <AppBox sx={{ p: 3, pt: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </AppBox>
      </Collapse>
    </Paper>
  );
};

// Variantes do AppFilter
AppFilter.Item = ({ children, xs = 12, sm = 6, md = 4, lg, ...props }) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg} {...props} sx={{ overflow: 'visible', width: '100%', ...props.sx }}>
    {children}
  </Grid>
);

AppFilter.FullWidthItem = (props) => (
  <AppFilter.Item xs={12} sm={12} md={12} {...props} />
);

AppFilter.HalfWidthItem = ({ sx, ...props }) => (
  <AppFilter.Item xs={12} sm={6} md={6} sx={{ minWidth: '250px', ...sx }} {...props} />
);

export default AppFilter;
