import React from 'react';

import { Button } from '@mui/material';

export default function Cardapio({ mesa, onVoltar }) {

    return (

    <div style={styles.container}>

    <Button variant="outlined" color="primary" onClick={onVoltar} style={{ marginTop: '16px' }}>Voltar</Button>

        <h2>Cardápio mesa: {mesa}</h2>  

      </div>

    );

  }

  

  const styles = {

    container: {

      padding: '20px',

    }

  };

  

