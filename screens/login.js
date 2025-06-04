import React from 'react';
import { AppLoginForm, AppAuthLayout } from '../components/common';

export default function Login({ navigation }) {
  const handleCreateAccount = () => {
    navigation.navigate('Cadastro');
  };
  
  const handleForgotPassword = () => {
    // Implementar a navegação para a tela de recuperação de senha
    console.log('Navegar para recuperação de senha');
  };

  return (
    <AppAuthLayout>
      <AppLoginForm 
        onForgotPassword={handleForgotPassword}
        onCreateAccount={handleCreateAccount}
      />
    </AppAuthLayout>
  );
}
