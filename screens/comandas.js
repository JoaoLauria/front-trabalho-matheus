import React from 'react';
import { Button, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Restaurant } from '@mui/icons-material';
//import { Directions } from 'react-native-gesture-handler';

export default function Comandas({selectMesa}) {

  let mesas = [
    {
      id: 1,
      table_number: "1",
      seats: 4,
      its_available: true
    },
    {
      id: 2,
      table_number: "2",
      seats: 4,
      its_available: true
    },
    {
      id: 3,
      table_number: "3",
      seats: 4,
      its_available: true
    },
    {
      id: 4,
      table_number: "4",
      seats: 4,
      its_available: true
    },
    {
      id: 5,
      table_number: "5",
      seats: 4,
      its_available: true
    },
    {
      id: 6,
      table_number: "6",
      seats: 4,
      its_available: true
    },
    {
      id: 7,
      table_number: "7",
      seats: 4,
      its_available: true
    },
  ]
  return (
    <div style={styles.container}>
      <h2>Sistema de Comandas</h2>
      <p>Mesas:</p>

      <div style={styles.gridContainer}>
        {mesas.map((item) => (
          <div key={item.id} style={styles.gridItem}>
            <ListItem disableGutters>
              <ListItemButton>
                <Button variant="contained" color="primary" style={styles.button} fullWidth onClick={() => selectMesa(item.table_number)}>
                  <Restaurant style={styles.icon} />{item.table_number}
                </Button>
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  gridItem: {
    width: 'calc(33.33% - 10px)',
    boxSizing: 'border-box',
  },
  button: {
    textTransform: 'none',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
    marginRight: '8px',
  },
};
