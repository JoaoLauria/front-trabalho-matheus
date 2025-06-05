import React, { useState, useContext } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { AuthContext } from '../../App';
import { useError } from '../../contexts/ErrorContext';
import ApiService from '../../services/ApiService';
import { AppBox, AppTypography, AppTextField, AppButton, AppAlert, AppLink } from './index';
import { isValidEmail } from '../../utils';

const AppLoginForm = ({
  onSuccess,
  onForgotPassword,
  onCreateAccount,
  showIcon = true,
  showTitle = true,
  sx = {},
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const { handleApiError } = useError();

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    
    
    if (!email) {
      setErro('O e-mail é obrigatório.');
      return;
    }
    
    if (!isValidEmail(email)) {
      setErro('Digite um e-mail válido.');
      return;
    }
    
    if (!password) {
      setErro('A senha é obrigatória.');
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await ApiService.users.login(email, password);
      
      if (error) {
        throw new Error('Usuário ou senha inválidos.');
      }
      
      if (data && data.access) {
        authContext.login(data.access);
        if (onSuccess) onSuccess(data);
      } else {
        setErro('Resposta inválida do servidor.');
      }
    } catch (error) {
      const errorMsg = 'Erro ao fazer login. Verifique suas credenciais.';
      
      setErro(errorMsg);
      handleApiError(error || errorMsg);
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppBox sx={{ width: '100%', ...sx }} {...props}>
      {showIcon && (
        <AppBox.FlexBox sx={{ 
          bgcolor: 'primary.main', 
          borderRadius: '50%', 
          p: 2, 
          mb: 2,
          alignItems: 'center', 
          justifyContent: 'center',
          mx: 'auto'
        }}>
          <LockOutlined sx={{ color: '#fff', fontSize: 32 }} />
        </AppBox.FlexBox>
      )}
      
      {showTitle && (
        <AppTypography.Title color="primary.main" gutterBottom align="center">
          Login do Sistema
        </AppTypography.Title>
      )}
      
      <AppBox component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 1 }}>
        <AppTextField
          label="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          autoComplete="email"
          autoFocus
        />
        
        <AppTextField
          label="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          fullWidth
          autoComplete="current-password"
        />
        
        {erro && <AppAlert.Error sx={{ mt: 2 }}>{erro}</AppAlert.Error>}
        
        <AppButton.PrimaryButton
          type="submit"
          fullWidth
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          Entrar
        </AppButton.PrimaryButton>
        
        <AppBox.FlexBox sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          {onCreateAccount && (
            <AppLink.Secondary href="#" onClick={e => { e.preventDefault(); onCreateAccount(); }}>
              Criar conta
            </AppLink.Secondary>
          )}
        </AppBox.FlexBox>
      </AppBox>
    </AppBox>
  );
};

export default AppLoginForm;
