import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Chip, List, ListItem, ListItemText, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { formatarDataHora, formatarMoeda, getStatusColor } from '../utils/utils';

export default function PedidoItem({ pedido, onStatusChange }) {

  const getProductName = (item) => {

    if (item.product_details && item.product_details.name) {
      return item.product_details.name;
    }

    if (item.product && typeof item.product === 'object' && item.product.name) {
      return item.product.name;
    }
    if (item.product_name) {
      return item.product_name;
    }
    if (item.name) {
      return item.name;
    }
    return 'Produto';
  };


  const getProductPrice = (item) => {

    if (item.subtotal && !isNaN(parseFloat(item.subtotal))) {
      return parseFloat(item.subtotal);
    }

    if (item.product_details && item.product_details.price && !isNaN(parseFloat(item.product_details.price))) {

      const quantity = parseInt(item.quantity || 1);
      return parseFloat(item.product_details.price) * quantity;
    }

    if (item.price && !isNaN(parseFloat(item.price))) {
      return parseFloat(item.price);
    }
    if (item.product && item.product.price && !isNaN(parseFloat(item.product.price))) {
      return parseFloat(item.product.price);
    }
    if (item.product_price && !isNaN(parseFloat(item.product_price))) {
      return parseFloat(item.product_price);
    }
    return 0;
  };


  const getAdditionals = (item) => {

    if (Array.isArray(item.additionals_items) && item.additionals_items.length > 0) {
      return item.additionals_items;
    }

    if (Array.isArray(item.additionals) && item.additionals.length > 0) {
      return item.additionals;
    }
    if (Array.isArray(item.adicionais) && item.adicionais.length > 0) {
      return item.adicionais;
    }
    return [];
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
          {formatarMoeda(pedido.total || 0)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          {pedido.items?.map((item, index) => {
            const productName = getProductName(item);
            const productPrice = getProductPrice(item);
            const additionals = getAdditionals(item);
            
            return (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start" disablePadding sx={{ py: 1 }}>
                  <ListItemText
                    primary={`${item.quantity}x ${productName}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {formatarMoeda(productPrice)}
                        </Typography>
                        {additionals.length > 0 && (
                          <Typography component="div" variant="body2" sx={{ ml: 2 }}>
                            Adicionais:
                            {additionals.map((adicional, idx) => (
                              <Typography key={idx} component="div" variant="body2" sx={{ ml: 2 }}>
                                • {adicional.name || adicional.nome || 'Adicional'} 
                                  (+{formatarMoeda(adicional.price || adicional.preco || 0)})
                              </Typography>
                            ))}
                          </Typography>
                        )}
                        {(item.observation || item.notes) && (
                          <Typography component="div" variant="body2" sx={{ ml: 2, fontStyle: 'italic' }}>
                            Obs: {item.observation || item.notes}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
                {index < pedido.items.length - 1 && <Divider component="li" />}
              </React.Fragment>
            );
          })}
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
