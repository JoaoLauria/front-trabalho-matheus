import React, { useState, useContext } from 'react';
import { useError } from '../contexts/ErrorContext';
import { Box, Paper, Typography, TextField, Button, Alert, Link, CircularProgress } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { AuthContext } from '../App';
import ApiService from '../services/ApiService';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const { handleApiError, isConnectionError } = useError();

  async function validarLogin(e) {
    e.preventDefault();
    setErro('');
    if (!email || !password) {
      setErro('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await ApiService.users.login(email, password);
      
      if (error) {
        throw new Error('Usuário ou senha inválidos.');
      }
      
      if (data && data.access) {
        authContext.login(data.access); // Usa a função login do contexto
      } else {
        setErro('Resposta inválida do servidor.');
      }
    } catch (error) {
      const errorMsg = 'Erro ao fazer login. Verifique suas credenciais.';
      
      setErro(errorMsg);
      handleApiError(error || errorMsg);
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 4 } }}>
      <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
        <Paper elevation={6} sx={{ p: { xs: 3, sm: 6 }, borderRadius: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LockOutlined sx={{ color: '#fff', fontSize: 32 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom align="center">
            Login do Sistema
          </Typography>
          <Box component="form" onSubmit={validarLogin} sx={{ width: '100%', mt: 1 }}>
            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              autoComplete="email"
              autoFocus
              variant="outlined"
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              autoComplete="current-password"
              variant="outlined"
            />
            {erro && <Alert severity="error" sx={{ mt: 2 }}>{erro}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, fontWeight: 700, borderRadius: 2, py: 1.2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Link href="#" underline="hover" onClick={e => e.preventDefault()} fontSize={14} color="text.secondary">
                Esqueci minha senha
              </Link>
              <Link href="#" underline="hover" onClick={e => { e.preventDefault(); navigation.navigate('Cadastro'); }} fontSize={14} color="text.secondary">
                Criar conta
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

// Estilos antigos removidos. Agora todo o layout usa componentes e sx do Material UI para responsividade e modernidade.
