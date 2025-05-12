import React, { useState } from 'react';
import Login from './screens/login';
import Comandas from './screens/comandas';
import Cardapio from './screens/cardapio';
import PedidosMesa from './screens/PedidosMesa';
import NovoPedido from './screens/NovoPedido';

export default function App() {
  const [logado, setLogado] = useState(false); // agora inicia deslogado
  const [mesaSelecionada, setMesaSelecionada] = useState(null);
  const [novoPedidoAberto, setNovoPedidoAberto] = useState(false);

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  if (mesaSelecionada && novoPedidoAberto) {
    return (
      <NovoPedido
        onSalvar={(pedido) => {
          setNovoPedidoAberto(false);
          // Aqui você pode adicionar lógica para atualizar pedidos da mesa
          alert('Pedido salvo!');
        }}
        onCancelar={() => setNovoPedidoAberto(false)}
      />
    );
  }

  if (mesaSelecionada) {
    return (
      <PedidosMesa
        mesa={mesaSelecionada}
        onNovoPedido={() => setNovoPedidoAberto(true)}
        onFecharConta={() => alert('Conta fechada!')}
        onVoltar={() => setMesaSelecionada(null)}
      />
    );
  }

  return <Comandas selectMesa={setMesaSelecionada} />;
}
