import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

export default function CadastroUsuario({ onVoltar }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    cep: '',
    address: '',
    address_number: '',
    address_complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil',
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [buscandoCep, setBuscandoCep] = useState(false);

  // Busca ViaCEP
  async function buscarCep(cep) {
    setBuscandoCep(true);
    setErro('');
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();
      if (dados.erro) {
        setErro('CEP não encontrado.');
        setForm(f => ({ ...f, address: '', neighborhood: '', city: '', state: '' }));
      } else {
        setForm(f => ({
          ...f,
          address: dados.logradouro || '',
          neighborhood: dados.bairro || '',
          city: dados.localidade || '',
          state: dados.uf || '',
        }));
      }
    } catch (e) {
      setErro('Erro ao buscar CEP.');
    }
    setBuscandoCep(false);
  }

  // Atualiza campos do formulário
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    // Busca CEP quando 8 dígitos
    if (name === 'cep' && value.length === 8) {
      buscarCep(value);
    }
  }

  // Submete cadastro
  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setLoading(true);
    try {
      const resposta = await fetch('http://localhost:8080/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!resposta.ok) {
        const erroData = await resposta.json();
        throw new Error(erroData.detail || 'Erro ao cadastrar usuário.');
      }
      setSucesso('Usuário cadastrado com sucesso!');
      setForm({
        email: '', password: '', full_name: '', cep: '', address: '', address_number: '', address_complement: '', neighborhood: '', city: '', state: '', country: 'Brasil',
      });
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar usuário.');
    }
    setLoading(false);
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 4 } }}>
      <Box sx={{ width: '100%', maxWidth: 480, mx: 'auto' }}>
        <Paper elevation={6} sx={{ p: { xs: 3, sm: 6 }, borderRadius: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom align="center">
            Cadastro de Usuário
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <TextField label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} margin="normal" fullWidth required autoComplete="email" variant="outlined" />
            <TextField label="Senha" name="password" type="password" value={form.password} onChange={handleChange} margin="normal" fullWidth required autoComplete="new-password" variant="outlined" />
            <TextField label="Nome Completo" name="full_name" value={form.full_name} onChange={handleChange} margin="normal" fullWidth required variant="outlined" />
            <TextField label="CEP" name="cep" value={form.cep} onChange={handleChange} margin="normal" fullWidth required variant="outlined" inputProps={{ maxLength: 8 }} helperText="Apenas números" />
            <TextField label="Endereço" name="address" value={form.address} onChange={handleChange} margin="normal" fullWidth required variant="outlined" disabled={buscandoCep} />
            <TextField label="Número" name="address_number" value={form.address_number} onChange={handleChange} margin="normal" fullWidth required variant="outlined" />
            <TextField label="Complemento" name="address_complement" value={form.address_complement} onChange={handleChange} margin="normal" fullWidth variant="outlined" />
            <TextField label="Bairro" name="neighborhood" value={form.neighborhood} onChange={handleChange} margin="normal" fullWidth required variant="outlined" disabled={buscandoCep} />
            <TextField label="Cidade" name="city" value={form.city} onChange={handleChange} margin="normal" fullWidth required variant="outlined" disabled={buscandoCep} />
            <TextField label="Estado" name="state" value={form.state} onChange={handleChange} margin="normal" fullWidth required variant="outlined" disabled={buscandoCep} />
            <TextField label="País" name="country" value={form.country} onChange={handleChange} margin="normal" fullWidth required variant="outlined" />
            {erro && <Alert severity="error" sx={{ mt: 2 }}>{erro}</Alert>}
            {sucesso && <Alert severity="success" sx={{ mt: 2 }}>{sucesso}</Alert>}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, fontWeight: 700, borderRadius: 2, py: 1.2 }} disabled={loading || buscandoCep}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Cadastrar'}
            </Button>
            <Button fullWidth variant="outlined" color="secondary" sx={{ mb: 1, borderRadius: 2 }} onClick={onVoltar} disabled={loading}>
              Voltar para Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
