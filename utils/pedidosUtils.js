export const formatarDataHora = (dataString) => {
  const data = new Date(dataString);
  return data.toLocaleString('pt-BR');
};

export const calcularTotal = (pedidos) => {
  if (!Array.isArray(pedidos)) {
    return 0;
  }
  
  return pedidos
    .filter(p => p && p.status && p.status.toLowerCase() !== 'cancelado')
    .reduce((total, pedido) => total + parseFloat(pedido.total || 0), 0);
};
