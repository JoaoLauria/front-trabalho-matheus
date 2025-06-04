import React from 'react';
import { Box, Typography, Paper, Chip, IconButton } from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MesaHeader({ mesa, total, onVoltar }) {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: 2,
        bgcolor: 'primary.main',
        color: 'white'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={onVoltar}
            sx={{ 
              color: 'white', 
              mr: 1,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <TableRestaurantIcon sx={{ mr: 1.5, fontSize: 28 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Mesa {typeof mesa === 'object' ? mesa.table_number : mesa}
            </Typography>
            {mesa.people_count && (
              <Chip
                icon={<PeopleIcon fontSize="small" />}
                label={`${mesa.people_count} pessoas`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
            )}
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2">Total da Conta</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            R$ {parseFloat(total).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
