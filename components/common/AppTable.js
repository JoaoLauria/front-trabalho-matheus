import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  TablePagination
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Componente de tabela reutilizável
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.columns - Colunas da tabela
 * @param {Array} props.data - Dados da tabela
 * @param {boolean} props.loading - Se a tabela está em estado de carregamento
 * @param {string} props.emptyMessage - Mensagem a ser exibida quando a tabela estiver vazia
 * @param {boolean} props.pagination - Se deve exibir paginação
 * @param {number} props.page - Página atual
 * @param {number} props.rowsPerPage - Número de linhas por página
 * @param {function} props.onPageChange - Função a ser chamada quando a página mudar
 * @param {function} props.onRowsPerPageChange - Função a ser chamada quando o número de linhas por página mudar
 * @param {number} props.totalCount - Total de registros
 * @param {Object} props.sx - Estilos adicionais
 * @returns {JSX.Element} Componente de tabela
 */
const AppTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'Nenhum registro encontrado',
  pagination = false,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  totalCount = 0,
  sx = {},
  ...props
}) => {
  // Função para renderizar o conteúdo da célula
  const renderCell = (column, row) => {
    if (column.render) {
      return column.render(row[column.field], row);
    }
    
    return row[column.field];
  };
  
  // Função para renderizar o corpo da tabela
  const renderTableBody = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
            <CircularProgress size={32} />
          </TableCell>
        </TableRow>
      );
    }
    
    if (!data || data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
            <Typography color="text.secondary">{emptyMessage}</Typography>
          </TableCell>
        </TableRow>
      );
    }
    
    return data.map((row, index) => (
      <TableRow 
        key={row.id || index}
        hover
        sx={{ 
          '&:last-child td, &:last-child th': { border: 0 },
          cursor: props.onRowClick ? 'pointer' : 'default'
        }}
        onClick={props.onRowClick ? () => props.onRowClick(row) : undefined}
      >
        {columns.map((column) => (
          <TableCell 
            key={column.field} 
            align={column.align || 'left'}
            sx={column.cellSx}
          >
            {renderCell(column, row)}
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table size="medium" {...props}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.field} 
                  align={column.align || 'left'}
                  sx={{ 
                    fontWeight: 600,
                    backgroundColor: 'grey.100',
                    ...column.headerSx
                  }}
                  width={column.width}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableBody()}
          </TableBody>
        </Table>
      </TableContainer>
      
      {pagination && (
        <TablePagination
          component="div"
          count={totalCount || data.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      )}
    </Box>
  );
};

// Variantes predefinidas
export const SimpleTable = styled(AppTable)({});

export const DenseTable = styled((props) => (
  <AppTable 
    size="small"
    {...props}
  />
))({});

export default AppTable;
