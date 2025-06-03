import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Chip, Accordion, AccordionSummary, AccordionDetails, 
  List, ListItem, ListItemText, Divider, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Mock de pedidos para a mesa
const pedidosMock = [
  { id: 1, status: 'Pendente', itens: [
    { nome: 'Pizza Margherita', preco: 40 },
    { nome: 'Coca-Cola', preco: 8 },
  ] },
  { id: 2, status: 'Finalizado', itens: [
    { nome: 'Lasanha', preco: 38 },
    { nome: 'Suco de Laranja', preco: 10 },
  ] },
];

function calcularTotal(pedidos) {
  return pedidos.filter(p => p.status != 'Cancelado').reduce((total, pedido) => {
    return total + pedido.itens.reduce((soma, item) => soma + item.preco, 0);
  }, 0);
}

export default function PedidosMesa({ mesa, onNovoPedido, onFecharConta, onVoltar }) {
  const [pedidos, setPedidos] = useState([...pedidosMock]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoAlvo, setPedidoAlvo] = useState(null);
  const [acao, setAcao] = useState('finalizar'); // 'finalizar' ou 'cancelar'

  const total = calcularTotal(pedidos);

  const handleAbrirModal = (pedido, acaoTipo = 'finalizar') => {
    setPedidoAlvo(pedido);
    setAcao(acaoTipo);
    setModalOpen(true);
  };
  const handleFecharModal = () => {
    setModalOpen(false);
    setPedidoAlvo(null);
    setAcao('finalizar');
  };
  const handleConfirmarStatus = () => {
    if (!pedidoAlvo) return;
    setPedidos(pedidos.map(p =>
      p.id === pedidoAlvo.id ? { ...p, status: acao === 'finalizar' ? 'Finalizado' : 'Cancelado' } : p
    ));
    handleFecharModal();
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 4 } }}>
      {/* Botão de Voltar adicionado aqui */}
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={onVoltar}
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>

      <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
        Pedidos da Mesa {mesa}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        {pedidos.map((pedido) => (
          <Accordion key={pedido.id} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600}>Pedido #{pedido.id}</Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip label={pedido.status} color={pedido.status === 'Finalizado' ? 'success' : pedido.status === 'Cancelado' ? 'error' : 'warning'} size="small" />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {pedido.itens.map((item, idx) => (
                  <ListItem key={idx} disableGutters sx={{ pl: 1 }}>
                    <ListItemText primary={item.nome} secondary={`R$ ${item.preco.toFixed(2)}`}/>
                  </ListItem>
                ))}
              </List>
              {pedido.status === 'Pendente' && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleAbrirModal(pedido, 'cancelar')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => handleAbrirModal(pedido, 'finalizar')}
                  >
                    Finalizar
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Total: R$ {total.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
      <Dialog open={modalOpen} onClose={handleFecharModal}>
        <DialogTitle>Confirmar {acao === 'finalizar' ? 'Finalização' : 'Cancelamento'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja marcar o pedido #{pedidoAlvo?.id} como <b>{acao === 'finalizar' ? 'Finalizado' : 'Cancelado'}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFecharModal} color="inherit">Voltar</Button>
          <Button onClick={handleConfirmarStatus} color={acao === 'finalizar' ? 'success' : 'error'} variant="contained">
            {acao === 'finalizar' ? 'Finalizar' : 'Cancelar'}
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="primary" onClick={onNovoPedido}>
          Novo Pedido
        </Button>
        <Button variant="contained" color="secondary" onClick={onFecharConta}>
          Fechar Conta
        </Button>
      </Box>
    </Box>
  );
}
