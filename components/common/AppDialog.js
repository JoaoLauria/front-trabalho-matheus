import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton, 
  Typography,
  Box
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AppButton from './AppButton';

/**
 * Componente de diálogo reutilizável
 * 
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.open - Se o diálogo está aberto
 * @param {function} props.onClose - Função a ser chamada quando o diálogo for fechado
 * @param {string} props.title - Título do diálogo
 * @param {React.ReactNode} props.children - Conteúdo do diálogo
 * @param {React.ReactNode} props.actions - Ações do diálogo (botões)
 * @param {string} props.maxWidth - Largura máxima do diálogo (xs, sm, md, lg, xl)
 * @param {boolean} props.fullWidth - Se o diálogo deve ocupar toda a largura disponível
 * @param {function} props.onSave - Função a ser chamada quando o botão de salvar for clicado
 * @param {function} props.onCancel - Função a ser chamada quando o botão de cancelar for clicado
 * @param {boolean} props.loading - Se o diálogo está em estado de carregamento
 * @param {string} props.saveButtonText - Texto do botão de salvar
 * @param {string} props.cancelButtonText - Texto do botão de cancelar
 * @param {boolean} props.hideCloseButton - Se o botão de fechar deve ser ocultado
 * @param {string} props.color - Cor do cabeçalho do diálogo (primary, secondary, success, error, warning, info)
 * @returns {JSX.Element} Componente de diálogo
 */
const AppDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  onSave,
  onCancel,
  loading = false,
  saveButtonText = 'Salvar',
  cancelButtonText = 'Cancelar',
  hideCloseButton = false,
  color = 'primary',
  ...props
}) => {
  // Determina as ações do diálogo
  const dialogActions = actions || (
    <>
      <AppButton.CancelButton 
        onClick={onCancel || onClose} 
        disabled={loading}
      >
        {cancelButtonText}
      </AppButton.CancelButton>
      {onSave && (
        <AppButton.SaveButton 
          onClick={onSave} 
          disabled={loading}
        >
          {saveButtonText}
        </AppButton.SaveButton>
      )}
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
      {...props}
    >
      <DialogTitle
        component="div"
        sx={{
          bgcolor: `${color}.main`,
          color: `${color}.contrastText`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}
      >
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {!hideCloseButton && (
          <IconButton 
            color="inherit" 
            onClick={onClose} 
            size="small"
            disabled={loading}
          >
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent sx={{ pt: 4, pb: 3, px: 3, mt: 1 }}>
        {children}
      </DialogContent>
      {dialogActions && (
        <DialogActions sx={{ p: 2, pt: 1, justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {dialogActions}
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};

// Variantes predefinidas
export const ConfirmDialog = ({
  title = 'Confirmar',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  ...props
}) => (
  <AppDialog
    title={title}
    saveButtonText={confirmText}
    cancelButtonText={cancelText}
    onSave={onConfirm}
    {...props}
  />
);

export const DeleteConfirmDialog = ({
  title = 'Confirmar exclusão',
  message = 'Tem certeza que deseja excluir este item?',
  confirmText = 'Excluir',
  cancelText = 'Cancelar',
  onConfirm,
  content,
  loading,
  ...props
}) => (
  <AppDialog
    title={title}
    color="error"
    saveButtonText={confirmText}
    cancelButtonText={cancelText}
    onSave={onConfirm}
    loading={loading}
    {...props}
  >
    {content || <Typography>{message}</Typography>}
  </AppDialog>
);

export const InfoDialog = ({
  title = 'Informação',
  closeText = 'Fechar',
  ...props
}) => (
  <AppDialog
    title={title}
    color="info"
    actions={
      <AppButton.SaveButton color="info" onClick={props.onClose}>
        {closeText}
      </AppButton.SaveButton>
    }
    {...props}
  />
);

export default AppDialog;
