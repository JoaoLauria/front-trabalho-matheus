import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Chip, Accordion, AccordionSummary, AccordionDetails, 
  List, ListItem, ListItemText, Divider, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Função para formatar data e hora
const formatarDataHora = (dataString) => {
  const data = new Date(dataString);
  return data.toLocaleString('pt-BR');
};

function calcularTotal(pedidos) {
  // Garantir que pedidos seja um array antes de usar filter
  if (!Array.isArray(pedidos)) {
    console.error('pedidos não é um array:', pedidos);
    return 0;
  }
  
  return pedidos
    .filter(p => p && p.status && p.status.toLowerCase() !== 'cancelado')
    .reduce((total, pedido) => total + parseFloat(pedido.total || 0), 0);
}

export default function PedidosMesa({ navigation, route }) {
  // Log dos parâmetros recebidos para debug
  console.log('PedidosMesa - route.params:', route.params);
  
  const mesa = route.params?.mesa; // Usar o valor recebido diretamente
  const [pedidos, setPedidos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoAlvo, setPedidoAlvo] = useState(null);
  const [acao, setAcao] = useState('finalizar'); // 'finalizar' ou 'cancelar'
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Buscar pedidos da mesa da API
  const buscarPedidos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      // Log para debug
      console.log('Buscando pedidos para mesa:', mesa);
      
      // Usar diretamente o valor recebido na navegação
      const response = await fetch(`http://localhost:8000/tables/${mesa}/orders/`);
      
      // Log da resposta para debug
      console.log('Status da resposta:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Garantir que pedidos seja sempre um array
      if (Array.isArray(data)) {
        setPedidos(data);
      } else if (data && typeof data === 'object') {
        // Se a API retornar um objeto com uma propriedade que contém o array
        const possibleArrays = ['results', 'orders', 'data', 'items'];
        for (const key of possibleArrays) {
          if (Array.isArray(data[key])) {
            setPedidos(data[key]);
            return;
          }
        }
        // Se não encontrou um array em nenhuma propriedade conhecida
        console.error('Resposta da API não contém um array:', data);
        setPedidos([]);
      } else {
        console.error('Resposta da API não é um array nem um objeto:', data);
        setPedidos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      setErro('Não foi possível carregar os pedidos. Tente novamente.');
      setPedidos([]);
    } finally {
      setCarregando(false);
    }
  };

  // Carregar pedidos ao montar o componente
  useEffect(() => {
    console.log('useEffect executado com mesa:', mesa);
    buscarPedidos();
  }, [mesa]);

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
  const handleConfirmarStatus = async () => {
    if (!pedidoAlvo) return;
    
    try {
      // Atualizar o status do pedido na API
      const novoStatus = acao === 'finalizar' ? 'finalizado' : 'cancelado';
      
      const response = await fetch(`http://localhost:8000/orders/${pedidoAlvo.id}/status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: novoStatus
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
      }
      
      // Atualizar localmente após confirmação da API
      setPedidos(pedidos.map(p =>
        p.id === pedidoAlvo.id ? { ...p, status: novoStatus } : p
      ));
      
      handleFecharModal();
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      alert('Não foi possível atualizar o status do pedido. Tente novamente.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 4 } }}>
      {/* Botão de Voltar adicionado aqui */}
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={() => navigation.navigate('Comandas')}
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>

      <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
        Pedidos da Mesa {mesa}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        {carregando ? (
          <Typography>Carregando pedidos...</Typography>
        ) : erro ? (
          <Typography color="error">{erro}</Typography>
        ) : pedidos.length === 0 ? (
          <Typography>Nenhum pedido encontrado para esta mesa.</Typography>
        ) : (
          <>
            {pedidos.map((pedido) => (
              <Accordion key={pedido.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight={600}>Pedido #{pedido.id}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatarDataHora(pedido.created_at)}
                      </Typography>
                      <Chip 
                        label={pedido.status} 
                        color={
                          pedido.status.toLowerCase() === 'finalizado' ? 'success' : 
                          pedido.status.toLowerCase() === 'cancelado' ? 'error' : 'warning'
                        } 
                        size="small" 
                      />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {pedido.items.map((item) => (
                      <ListItem key={item.id} disableGutters sx={{ pl: 1 }}>
                        <ListItemText 
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>{item.quantity}x {item.product_details.name}</Typography>
                              <Typography>R$ {parseFloat(item.subtotal).toFixed(2)}</Typography>
                            </Box>
                          } 
                          secondary={item.product_details.description}
                        />
                        {/* Renderizar adicionais e observações fora do ListItemText */}
                        {(item.additionals_items.length > 0 || item.notes) && (
                          <Box sx={{ pl: 2, pb: 1 }}>
                            {item.additionals_items.length > 0 && item.additionals_items.map((adicional) => (
                              <Typography key={adicional.id} variant="caption" display="block" sx={{ ml: 2 }}>
                                + {adicional.quantity}x {adicional.additional_details.name} 
                                (R$ {parseFloat(adicional.additional_details.price).toFixed(2)})
                              </Typography>
                            ))}
                            {item.notes && (
                              <Typography variant="caption" display="block" sx={{ fontStyle: 'italic', mt: 0.5, ml: 2 }}>
                                Obs: {item.notes}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </ListItem>
                    ))}
                  </List>
                  {pedido.status.toLowerCase() === 'pendente' && (
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
          </>
        )}
      </Paper>
      <Dialog open={modalOpen} onClose={handleFecharModal}>
        <DialogTitle>Confirmar {acao === 'finalizar' ? 'Finalização' : 'Cancelamento'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja marcar o pedido #{pedidoAlvo?.id} como <b>{acao === 'finalizar' ? 'finalizado' : 'cancelado'}</b>?
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
        <Button variant="outlined" color="primary" onClick={() => navigation.navigate('NovoPedido', { mesa })}>
          Novo Pedido
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={async () => {
            try {
              // Chamar o endpoint para marcar a mesa como disponível
              console.log('Fechando conta da mesa ID:', mesa);
              const response = await fetch(`http://localhost:8000/tables/${mesa}/set-available/`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              if (!response.ok) {
                throw new Error(`Erro ao fechar conta: ${response.status}`);
              }
              
              alert('Conta fechada com sucesso!');
              navigation.navigate('Comandas');
            } catch (error) {
              console.error('Erro ao fechar conta:', error);
              alert(`Erro ao fechar conta: ${error.message}`);
            }
          }}
        >
          Fechar Conta
        </Button>
      </Box>
    </Box>
  );
}
