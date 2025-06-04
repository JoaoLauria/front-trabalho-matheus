import React from 'react';
import { Box, styled } from '@mui/material';

/**
 * Componente Box personalizado com estilos padrão
 * @param {object} props - Propriedades do componente
 * @returns {JSX.Element} Componente Box estilizado
 */
const AppBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

/**
 * Variante de Box para conteúdo flexível
 */
export const FlexBox = styled(AppBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

/**
 * Variante de Box para conteúdo centralizado
 */
export const CenterBox = styled(AppBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

/**
 * Variante de Box para conteúdo com espaçamento entre itens
 */
export const SpaceBetweenBox = styled(AppBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

/**
 * Variante de Box para conteúdo em coluna
 */
export const ColumnBox = styled(AppBox)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default AppBox;
