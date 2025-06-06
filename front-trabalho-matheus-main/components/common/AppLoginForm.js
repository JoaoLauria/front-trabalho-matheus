import React, { useState, useContext } from 'react';
import { LockOutlined } from '@mui/icons-material';
import { AuthContext } from '../../App';
import { useError } from '../../contexts/ErrorContext';
import ApiService from '../../services/ApiService';
import {
  AppBox,
  AppTypography,
  AppTextField,
  AppButton,
  AppAlert,
  AppLink
} from './index';
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

    if (!email) return setErro('O e-mail é obrigatório.');
    if (!isValidEmail(email)) return setErro('Digite um e-mail válido.');
    if (!password) return setErro('A senha é obrigatória.');

    setLoading(true);
    try {
      const { data, error } = await ApiService.users.login(email, password);
      if (error) throw new Error('Usuário ou senha inválidos.');

      if (data?.access) {
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
    <AppBox
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        bgcolor: 'background.default',
        ...sx,
      }}
      {...props}
    >
      <AppBox
        sx={{
          width: '100%',
          maxWidth: 400,
          p: { xs: 3, sm: 4 },
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        {showIcon && (
          <AppBox.FlexBox
            sx={{
              bgcolor: 'primary.main',
              borderRadius: '50%',
              width: 56,
              height: 56,
              mb: 2,
              mx: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LockOutlined sx={{ color: '#fff', fontSize: 28 }} />
          </AppBox.FlexBox>
        )}

        {showTitle && (
          <AppTypography.Title
            variant="h5"
            align="center"
            color="text.primary"
            fontWeight={700}
            gutterBottom
          >
            Login
          </AppTypography.Title>
        )}


        <AppBox component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            sx={{ mt: 3, mb: 2, fontWeight: 600 }}
          >
            Entrar
          </AppButton.PrimaryButton>

          <AppBox.FlexBox
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
              mt: 1,
            }}
          >
            {onCreateAccount && (
              <AppLink.Secondary href="#" onClick={e => { e.preventDefault(); onCreateAccount(); }}>
                Criar conta
              </AppLink.Secondary>
            )}

            
          </AppBox.FlexBox>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default AppLoginForm;
