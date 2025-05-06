import React, { useState } from 'react';
import Login from './screens/login';
import Comandas from './screens/comandas';

export default function App() {
  const [logado, setLogado] = useState(false);

  //return logado ? <Comandas /> : <Login onLogin={() => setLogado(true)} />;
  return <Comandas />
}
