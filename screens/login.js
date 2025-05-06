import React, { useState } from 'react';


export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function validarLogin(e) {
    e.preventDefault();

    if (!usuario || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (usuario === 'admin' && senha === '1234') {
      onLogin();
    } else {
      setErro('Usuário ou senha inválidos.');
    }
  }

  return (
    <div style={styles.loginContainer}>
      <form onSubmit={validarLogin} style={styles.form}>
        <h2>Login do Sistema</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          style={styles.input}
        />

        {erro && <div style={styles.erro}>{erro}</div>}

        <button type="submit" style={styles.button}>Entrar</button>

        <div style={styles.links}>
          <a href="#" onClick={(e) => e.preventDefault()}>Esqueci minha senha</a> | 
          <a href="#" onClick={(e) => e.preventDefault()}> Criar conta</a>
        </div>
      </form>
    </div>
  );
}

const styles = {
  loginContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '350px',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  erro: {
    color: 'red',
    margin: '10px 0',
    fontSize: '14px',
  },
  links: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
  }
};
