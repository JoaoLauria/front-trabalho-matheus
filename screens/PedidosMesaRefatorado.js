import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import AlertDialog from '../components/AlertDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import StatusChangeDialog from '../components/StatusChangeDialog';
import PedidoItem from '../components/PedidoItem';
import MesaHeader from '../components/MesaHeader';
import ActionButtons from '../components/ActionButtons';
import { calcularTotal, formatarMoeda, getStatusColor } from '../utils/utils';
import ApiService from '../services/ApiService';

export default function PedidosMesa({ navigation, route }) {
  const mesa = route.params?.mesa;
  const [pedidos, setPedidos] = useState([]);
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  });
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    pedido: null,
    acao: 'finalizar'
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarPedidos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const { data, error } = await ApiService.orders.getOrdersByTable(mesa);
      
      console.log('Dados recebidos da API:', JSON.stringify(data, null, 2));
      
      // Análise detalhada da estrutura dos dados
      if (Array.isArray(data) && data.length > 0) {
        const primeiroPedido = data[0];
        console.log('Estrutura do primeiro pedido:', Object.keys(primeiroPedido));
        
        if (primeiroPedido.items && Array.isArray(primeiroPedido.items) && primeiroPedido.items.length > 0) {
          const primeiroItem = primeiroPedido.items[0];
          console.log('Estrutura do primeiro item:', Object.keys(primeiroItem));
          console.log('Valor de product no primeiro item:', primeiroItem.product);
          console.log('Tipo de product:', typeof primeiroItem.product);
          
          if (typeof primeiroItem.product === 'object' && primeiroItem.product !== null) {
            console.log('Propriedades de product:', Object.keys(primeiroItem.product));
          } else if (typeof primeiroItem.product === 'number') {
            console.log('product é um ID numérico, precisamos buscar os detalhes do produto');
          }
          
          console.log('Valor de price:', primeiroItem.price);
          console.log('Valor de quantity:', primeiroItem.quantity);
        }
      }
      
      if (error) {
        throw new Error(error);
      }
      
      if (Array.isArray(data)) {
        console.log('Dados são um array');
        if (data.length > 0) {
          console.log('Exemplo de pedido:', JSON.stringify(data[0], null, 2));
          if (data[0].items && data[0].items.length > 0) {
            console.log('Exemplo de item:', JSON.stringify(data[0].items[0], null, 2));
          }
        }
        setPedidos(data);
      } else if (data && typeof data === 'object') {
        console.log('Dados são um objeto');
        const possibleArrays = ['results', 'orders', 'data', 'items'];
        for (const key of possibleArrays) {
          if (Array.isArray(data[key])) {
            console.log(`Usando array em data.${key}`);
            setPedidos(data[key]);
            return;
          }
        }
        console.log('Nenhum array encontrado no objeto');
        setPedidos([]);
      } else {
        console.log('Dados não são nem array nem objeto');
        setPedidos([]);
      }
    } catch (error) {
      setErro('Não foi possível carregar os pedidos. Tente novamente.');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarPedidos();
  }, [mesa]);

  const handleStatusChange = (pedido, acao) => {
    setStatusDialog({
      open: true,
      pedido,
      acao
    });
  };

  const handleConfirmarStatus = async () => {
    const { pedido, acao } = statusDialog;
    if (!pedido) return;
    
    try {
      const novoStatus = acao === 'finalizar' ? 'finalizado' : 'cancelado';
      
      const { data, error } = await ApiService.orders.updateOrderStatus(pedido.id, novoStatus);
      
      if (error) {
        throw new Error(error);
      }
      
      setStatusDialog(prev => ({ ...prev, open: false }));
      
      setAlertDialog({
        open: true,
        title: 'Sucesso',
        message: `Pedido ${acao === 'finalizar' ? 'finalizado' : 'cancelado'} com sucesso!`,
        type: 'success',
        onConfirm: () => {
          buscarPedidos();
        }
      });
    } catch (error) {
      setAlertDialog({
        open: true,
        title: 'Erro',
        message: `Erro ao atualizar status: ${error.message}`,
        type: 'error'
      });
    }
  };

  const handleFecharConta = () => {
    setConfirmDialog({
      open: true,
      title: 'Confirmar fechamento',
      message: `Tem certeza que deseja fechar a conta da mesa ${typeof mesa === 'object' ? mesa.table_number : mesa}?`,
      onConfirm: fecharConta,
      onCancel: () => setConfirmDialog(prev => ({ ...prev, open: false }))
    });
  };

  const fecharConta = async () => {
    try {
      setConfirmDialog(prev => ({ ...prev, open: false }));
      
      const { data, error } = await ApiService.tables.setTableAvailable(mesa);
      
      if (error) {
        throw new Error(error);
      }
      
      setAlertDialog({
        open: true,
        title: 'Sucesso',
        message: 'Conta fechada com sucesso!',
        type: 'success',
        onConfirm: () => navigation.navigate('Comandas')
      });
    } catch (error) {
      setAlertDialog({
        open: true,
        title: 'Erro',
        message: `Erro ao fechar conta: ${error.message}`,
        type: 'error'
      });
    }
  };

  const total = calcularTotal(pedidos);

  return (
    <Box sx={{ p: 2 }}>
      <MesaHeader 
        mesa={mesa} 
        total={total} 
        onVoltar={() => navigation.navigate('Comandas')} 
      />
      
      <ActionButtons 
        onNovoPedido={() => navigation.navigate('NovoPedido', { mesa })}
        onFecharConta={handleFecharConta}
      />
      
      {carregando ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : erro ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#fff4f4', color: 'error.main', borderRadius: 2 }}>
          <Typography>{erro}</Typography>
        </Paper>
      ) : pedidos.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
          <Typography>Nenhum pedido encontrado para esta mesa.</Typography>
        </Paper>
      ) : (
        <Box>
          {pedidos.map(pedido => (
            <PedidoItem 
              key={pedido.id} 
              pedido={pedido} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </Box>
      )}
      
      <AlertDialog 
        open={alertDialog.open}
        onClose={() => setAlertDialog(prev => ({ ...prev, open: false }))}
        title={alertDialog.title}
        message={alertDialog.message}
        type={alertDialog.type}
        onConfirm={alertDialog.onConfirm}
      />
      
      <ConfirmDialog 
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />
      
      <StatusChangeDialog 
        open={statusDialog.open}
        pedido={statusDialog.pedido}
        acao={statusDialog.acao}
        onClose={() => setStatusDialog(prev => ({ ...prev, open: false }))}
        onConfirm={handleConfirmarStatus}
      />
    </Box>
  );
}
