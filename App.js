import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ErrorProvider } from './contexts/ErrorContext';

import Login from './screens/login';
import Comandas from './screens/comandas';
import Cardapio from './screens/cardapio';
import PedidosMesa from './screens/PedidosMesa';
import NovoPedido from './screens/NovoPedido';
import CadastroUsuario from './screens/cadastro';
import CadastroMesa from './screens/CadastroMesa';
import GerenciarCategorias from './screens/GerenciarCategorias';

const Stack = createNativeStackNavigator();

export const AuthContext = React.createContext();

export default function App() {
  const [logado, setLogado] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const savedToken = localStorage.getItem('accessToken');
        if (savedToken) {
          setToken(savedToken);
          setLogado(true);
        }
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
      }
    };
    
    checkToken();
  }, []);

  const login = (userToken) => {
    setToken(userToken);
    setLogado(true);
    localStorage.setItem('accessToken', userToken);
  };

  const logout = () => {
    setToken(null);
    setLogado(false);
    localStorage.removeItem('accessToken');
  };

  const authContext = React.useMemo(() => ({
    login,
    logout,
    token,
    logado
  }), [token, logado]);

  return (
    <AuthContext.Provider value={authContext}>
      <ErrorProvider>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!logado ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Cadastro" component={CadastroUsuario} />
            </>
          ) : (
            <>
              <Stack.Screen name="Comandas" component={Comandas} />
              <Stack.Screen name="PedidosMesa" component={PedidosMesa} />
              <Stack.Screen name="NovoPedido" component={NovoPedido} />
              <Stack.Screen name="Cardapio" component={Cardapio} />
              <Stack.Screen name="CadastroMesa" component={CadastroMesa} />
              <Stack.Screen name="GerenciarCategorias" component={GerenciarCategorias} />
            </>
          )}
        </Stack.Navigator>
        </NavigationContainer>
      </ErrorProvider>
    </AuthContext.Provider>
  );
}
