import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import AlertDialog from '../components/AlertDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import StatusChangeDialog from '../components/StatusChangeDialog';
import PedidoItem from '../components/PedidoItem';
import MesaHeader from '../components/MesaHeader';
import ActionButtons from '../components/ActionButtons';
import { calcularTotal } from '../utils/pedidosUtils';

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
      const response = await fetch(`http://localhost:8000/tables/${mesa}/orders/`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setPedidos(data);
      } else if (data && typeof data === 'object') {
        const possibleArrays = ['results', 'orders', 'data', 'items'];
        for (const key of possibleArrays) {
          if (Array.isArray(data[key])) {
            setPedidos(data[key]);
            return;
          }
        }
        setPedidos([]);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      setErro('Não foi possível carregar os pedidos. Tente novamente.');
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
      
      const response = await fetch(`http://localhost:8000/orders/${pedido.id}/status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
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
      
      const response = await fetch(`http://localhost:8000/tables/${mesa}/set-available/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao fechar conta: ${response.status}`);
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
      <MesaHeader mesa={mesa} total={total} />
      
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
