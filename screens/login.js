import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, Link, CircularProgress } from '@mui/material';
import CadastroUsuario from './cadastro';
import { LockOutlined } from '@mui/icons-material';

export default function Login({ onLogin }) {
  const [telaCadastro, setTelaCadastro] = useState(false);
  React.useEffect(() => {
    // Verifica se já está logado
    const token = localStorage.getItem('accessToken');
    if (token) {
      onLogin(token);
    }
  }, [onLogin]);

  if (telaCadastro) {
    return <CadastroUsuario onVoltar={() => setTelaCadastro(false)} />;
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function validarLogin(e) {
    e.preventDefault();
    setErro('');
    if (!email || !password) {
      setErro('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Usuário ou senha inválidos.');
      }
      const data = await response.json();
      if (data && data.access) {
        localStorage.setItem('accessToken', data.access);
        setLoading(false);
        onLogin(data.access);
      } else {
        setLoading(false);
        setErro('Resposta inválida do servidor.');
      }
    } catch (err) {
      setLoading(false);
      setErro(err.message || 'Erro ao fazer login.');
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
              <Link href="#" underline="hover" onClick={e => { e.preventDefault(); setTelaCadastro(true); }} fontSize={14} color="text.secondary">
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
