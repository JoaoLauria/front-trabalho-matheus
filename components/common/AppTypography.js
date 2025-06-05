;

import { Typography, styled } from '@mui/material';

const AppTypography = styled(Typography)(({ theme }) => ({

}));

export const Title = styled(AppTypography)(({ theme }) => ({

  fontWeight: 'bold',

  fontSize: '1.5rem',

  marginBottom: theme.spacing(2),

}));

export const Subtitle = styled(AppTypography)(({ theme }) => ({

  fontWeight: 'medium',

  fontSize: '1.2rem',

  marginBottom: theme.spacing(1),

}));

export const Highlight = styled(AppTypography)(({ theme }) => ({

  fontWeight: 'medium',

  color: theme.palette.primary.main,

}));

export const Price = styled(AppTypography)(({ theme }) => ({

  fontWeight: 'bold',

  color: theme.palette.primary.main,

  fontSize: '1.1rem',

}));

export const Description = styled(AppTypography)(({ theme }) => ({

  color: theme.palette.text.secondary,

  fontSize: '0.9rem',

}));

export const Error = styled(AppTypography)(({ theme }) => ({

  color: theme.palette.error.main,

  fontSize: '0.9rem',

}));

export default AppTypography;

