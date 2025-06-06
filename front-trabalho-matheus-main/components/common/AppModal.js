;
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppBox, AppTypography, AppButton } from './index';
import { colors } from '../../styles/theme';

const AppModal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  sx = {},
  headerColor = colors.primary.light,
  headerTextColor = colors.primary.contrastText,
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
            bgcolor: headerColor,
            color: headerTextColor,
            py: 1.5,
            '& .MuiTypography-root': {
              display: 'block'
            }
          }}
        >
          <Box component="span">
            <AppTypography.Subtitle color="inherit" component="span">
              {title}
            </AppTypography.Subtitle>
          </Box>
          
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
      
      <DialogContent dividers sx={{ p: 2, maxHeight: '80vh', overflow: 'auto', overflowX: 'hidden' }}>
        <Box sx={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', boxSizing: 'border-box' }}>
          {children}
        </Box>
      </DialogContent>
      
      {actions && (
        <DialogActions sx={{ p: 2, bgcolor: 'grey.50' }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

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
    headerColor={colors.warning.main}
    headerTextColor={colors.warning.contrastText}
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
      <AppBox.ColumnBox sx={{ alignItems: 'center', textAlign: 'center' }}>
        <AppTypography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Tem certeza que deseja excluir este item?
        </AppTypography>
        <Box sx={{ 
          bgcolor: colors.warning.light, 
          p: 2, 
          borderRadius: 1, 
          border: '1px solid', 
          borderColor: colors.warning.main,
          width: '100%',
          mb: 1
        }}>
          <AppTypography.Error sx={{ display: 'block', fontWeight: 'bold' }}>
            ATENÇÃO: Esta ação não pode ser desfeita!
          </AppTypography.Error>
        </Box>
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

