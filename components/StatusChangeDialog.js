import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button
} from '@mui/material';

export default function StatusChangeDialog({ 
  open, 
  pedido, 
  acao, 
  onClose, 
  onConfirm 
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="status-dialog-title"
      aria-describedby="status-dialog-description"
    >
      <DialogTitle id="status-dialog-title">
        {acao === 'finalizar' ? 'Finalizar Pedido' : 'Cancelar Pedido'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="status-dialog-description">
          Tem certeza que deseja marcar o pedido #{pedido?.id} como <b>{acao === 'finalizar' ? 'finalizado' : 'cancelado'}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Voltar</Button>
        <Button 
          onClick={onConfirm} 
          color={acao === 'finalizar' ? 'success' : 'error'} 
          variant="contained"
        >
          {acao === 'finalizar' ? 'Finalizar' : 'Cancelar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
