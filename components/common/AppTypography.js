import React from 'react';
import { Typography, styled } from '@mui/material';

/**
 * Componente Typography personalizado com estilos padrão
 * @param {object} props - Propriedades do componente
 * @returns {JSX.Element} Componente Typography estilizado
 */
const AppTypography = styled(Typography)(({ theme }) => ({
  // Estilos base para todos os textos
}));

/**
 * Variante de Typography para títulos
 */
export const Title = styled(AppTypography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: theme.spacing(2),
}));

/**
 * Variante de Typography para subtítulos
 */
export const Subtitle = styled(AppTypography)(({ theme }) => ({
  fontWeight: 'medium',
  fontSize: '1.2rem',
  marginBottom: theme.spacing(1),
}));

/**
 * Variante de Typography para texto de destaque
 */
export const Highlight = styled(AppTypography)(({ theme }) => ({
  fontWeight: 'medium',
  color: theme.palette.primary.main,
}));

/**
 * Variante de Typography para preços
 */
export const Price = styled(AppTypography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  fontSize: '1.1rem',
}));

/**
 * Variante de Typography para descrições
 */
export const Description = styled(AppTypography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
}));

/**
 * Variante de Typography para mensagens de erro
 */
export const Error = styled(AppTypography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.9rem',
}));

export default AppTypography;
