import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Chip, List, ListItem, ListItemText, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const formatarDataHora = (dataString) => {
  const data = new Date(dataString);
  return data.toLocaleString('pt-BR');
};

export default function PedidoItem({ pedido, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pendente': return 'warning';
      case 'finalizado': return 'success';
      case 'cancelado': return 'error';
      default: return 'default';
    }
  };

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Pedido #{pedido.id} - {formatarDataHora(pedido.created_at)}
        </Typography>
        <Chip 
          label={pedido.status || 'Pendente'} 
          color={getStatusColor(pedido.status)} 
          size="small"
          sx={{ mr: 1 }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          R$ {parseFloat(pedido.total).toFixed(2)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          {pedido.items?.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" disablePadding sx={{ py: 1 }}>
                <ListItemText
                  primary={`${item.quantity}x ${item.product.name}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        R$ {parseFloat(item.price).toFixed(2)}
                      </Typography>
                      {item.additionals?.length > 0 && (
                        <Typography component="div" variant="body2" sx={{ ml: 2 }}>
                          Adicionais:
                          {item.additionals.map((adicional, idx) => (
                            <Typography key={idx} component="div" variant="body2" sx={{ ml: 2 }}>
                              • {adicional.name} (+R$ {parseFloat(adicional.price).toFixed(2)})
                            </Typography>
                          ))}
                        </Typography>
                      )}
                      {item.observation && (
                        <Typography component="div" variant="body2" sx={{ ml: 2, fontStyle: 'italic' }}>
                          Obs: {item.observation}
                        </Typography>
                      )}
                    </>
                  }
                />
              </ListItem>
              {index < pedido.items.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
        
        {pedido.status?.toLowerCase() === 'pendente' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
            <Chip 
              label="Finalizar" 
              color="success" 
              onClick={() => onStatusChange(pedido, 'finalizar')}
              clickable
            />
            <Chip 
              label="Cancelar" 
              color="error" 
              onClick={() => onStatusChange(pedido, 'cancelar')}
              clickable
            />
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
