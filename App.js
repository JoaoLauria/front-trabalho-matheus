import React, { useState } from 'react';
import Login from './screens/login';
import Comandas from './screens/comandas';
import Cardapio from './screens/cardapio';

export default function App() {
  const [logado, setLogado] = useState(true);
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

//return logado ? <Comandas /> : <Login onLogin={() => setLogado(true)} />;

  if (mesaSelecionada) {
    return <Cardapio mesa={mesaSelecionada} onVoltar={() => setMesaSelecionada(null)} />;
  }

  return <Comandas selectMesa={setMesaSelecionada} />;
}
