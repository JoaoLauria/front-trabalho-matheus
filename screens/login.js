;
import { AppLoginForm, AppAuthLayout } from '../components/common';

export default function Login({ navigation }) {
  const handleCreateAccount = () => {
    navigation.navigate('Cadastro');
  };
  
  const handleForgotPassword = () => {

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
