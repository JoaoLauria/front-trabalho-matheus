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

  return (
    <>
      {!logado && (
        <Login onLogin={() => setLogado(true)} />
      )}
      
      {logado && mesaSelecionada && novoPedidoAberto && (
        <NovoPedido
          onSalvar={(pedido) => {
            setNovoPedidoAberto(false);
            // Aqui você pode adicionar lógica para atualizar pedidos da mesa
            alert('Pedido salvo!');
          }}
          onCancelar={() => setNovoPedidoAberto(false)}
        />
      )}
      
      {logado && mesaSelecionada && !novoPedidoAberto && (
        <PedidosMesa
          mesa={mesaSelecionada}
          onNovoPedido={() => setNovoPedidoAberto(true)}
          onFecharConta={() => alert('Conta fechada!')}
          onVoltar={() => setMesaSelecionada(null)}  // Esta prop já existe no seu código
/>
)}
      
      {logado && !mesaSelecionada && (
        <Comandas selectMesa={setMesaSelecionada} />
      )}
    </>
  );
}
