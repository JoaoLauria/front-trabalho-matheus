import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ErrorProvider } from './contexts/ErrorContext';

// Importando as telas
import Login from './screens/login';
import Comandas from './screens/comandas';
import Cardapio from './screens/cardapio';
import PedidosMesa from './screens/PedidosMesa';
import NovoPedido from './screens/NovoPedido';
import CadastroUsuario from './screens/cadastro';
import CadastroMesa from './screens/CadastroMesa';
import GerenciarCategorias from './screens/GerenciarCategorias';

// Criando os navegadores
const Stack = createNativeStackNavigator();

// Criando o contexto de autenticação para compartilhar o estado de login
export const AuthContext = React.createContext();

export default function App() {
  const [logado, setLogado] = useState(false);
  const [token, setToken] = useState(null);

  // Verificar se o usuário já está logado ao iniciar o app
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

  // Função para fazer login
  const login = (userToken) => {
    setToken(userToken);
    setLogado(true);
    localStorage.setItem('accessToken', userToken);
  };

  // Função para fazer logout
  const logout = () => {
    setToken(null);
    setLogado(false);
    localStorage.removeItem('accessToken');
  };

  // Contexto de autenticação
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
            // Rotas para usuários não autenticados
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Cadastro" component={CadastroUsuario} />
            </>
          ) : (
            // Rotas para usuários autenticados
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
