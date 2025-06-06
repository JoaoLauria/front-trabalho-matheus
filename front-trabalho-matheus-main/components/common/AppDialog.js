;

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

import AppButton from './AppButton';

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

