;
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material';
import { DeleteForever, Close } from '@mui/icons-material';

const ProdutoDeleteDialog = ({ open, onClose, produto, onDelete, loading }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'error.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Confirmar Exclusão</Typography>
        <IconButton color="inherit" onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Tem certeza que deseja excluir o produto:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            {produto?.name}
          </Typography>
          <Typography variant="body2" color="error" sx={{ fontStyle: 'italic' }}>
            Esta ação não pode ser desfeita.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose} 
          color="inherit" 
          variant="outlined"
          startIcon={<Close />}
          sx={{ borderRadius: 2 }}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onDelete} 
          color="error" 
          variant="contained"
          startIcon={loading ? null : <DeleteForever />}
          sx={{ borderRadius: 2, px: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProdutoDeleteDialog;
