import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppBox, AppTypography, AppButton } from './index';

/**
 * Componente de modal padronizado para uso em toda a aplicação
 * 
 * @param {boolean} open - Se o modal está aberto ou não
 * @param {function} onClose - Função chamada quando o modal é fechado
 * @param {string} title - Título do modal
 * @param {ReactNode} children - Conteúdo do modal
 * @param {ReactNode} actions - Ações do modal (botões)
 * @param {string} maxWidth - Largura máxima do modal (xs, sm, md, lg, xl)
 * @param {boolean} fullWidth - Se o modal deve ocupar toda a largura disponível
 * @param {object} sx - Estilos adicionais para o modal
 */
const AppModal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  sx = {},
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          ...sx
        }
      }}
      {...props}
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            py: 1.5
          }}
        >
          <AppTypography.Subtitle color="inherit">
            {title}
          </AppTypography.Subtitle>
          
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: 'inherit' }}
            aria-label="fechar"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      
      <DialogContent dividers sx={{ p: 2, maxHeight: '80vh', overflow: 'auto' }}>
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions sx={{ p: 2, bgcolor: 'grey.50' }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

// Variantes do AppModal
AppModal.Cart = ({
  open,
  onClose,
  title,
  children,
  onContinueShopping,
  onFinishOrder,
  disableFinish = false,
  loading = false,
  ...props
}) => (
  <AppModal
    open={open}
    onClose={onClose}
    title={title}
    actions={
      <>
        <AppButton.SecondaryButton onClick={onContinueShopping}>
          Continuar Comprando
        </AppButton.SecondaryButton>
        <AppButton.SuccessButton 
          onClick={onFinishOrder}
          disabled={disableFinish}
          loading={loading}
        >
          Finalizar Pedido
        </AppButton.SuccessButton>
      </>
    }
    {...props}
  >
    {children}
  </AppModal>
);

AppModal.Confirmation = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmação",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  children,
  loading = false,
  ...props
}) => (
  <AppModal
    open={open}
    onClose={onClose}
    title={title}
    actions={
      <>
        <AppButton.CancelButton onClick={onClose}>
          {cancelText}
        </AppButton.CancelButton>
        <AppButton.ConfirmButton 
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </AppButton.ConfirmButton>
      </>
    }
    {...props}
  >
    {children}
  </AppModal>
);

AppModal.Delete = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmar Exclusão",
  children,
  loading = false,
  ...props
}) => (
  <AppModal
    open={open}
    onClose={onClose}
    title={title}
    actions={
      <>
        <AppButton.CancelButton onClick={onClose}>
          Cancelar
        </AppButton.CancelButton>
        <AppButton.DeleteButton 
          onClick={onConfirm}
          loading={loading}
        >
          Excluir
        </AppButton.DeleteButton>
      </>
    }
    {...props}
  >
    {children || (
      <AppBox.ColumnBox>
        <AppTypography>
          Tem certeza que deseja excluir este item?
        </AppTypography>
        <AppTypography.Error sx={{ display: 'block', mt: 1 }}>
          Esta ação não pode ser desfeita.
        </AppTypography.Error>
      </AppBox.ColumnBox>
    )}
  </AppModal>
);

AppModal.Form = ({
  open,
  onClose,
  onSave,
  title,
  children,
  saveDisabled = false,
  loading = false,
  ...props
}) => (
  <AppModal
    open={open}
    onClose={onClose}
    title={title}
    actions={
      <>
        <AppButton.CancelButton onClick={onClose}>
          Cancelar
        </AppButton.CancelButton>
        <AppButton.SaveButton 
          onClick={onSave}
          disabled={saveDisabled}
          loading={loading}
        >
          Salvar
        </AppButton.SaveButton>
      </>
    }
    {...props}
  >
    {children}
  </AppModal>
);

export default AppModal;
