import React from 'react';

import { Box, styled } from '@mui/material';

const AppBox = styled(Box)(({ theme }) => ({

  padding: theme.spacing(2),

  borderRadius: theme.shape.borderRadius,

}));

export const FlexBox = styled(AppBox)(({ theme }) => ({

  display: 'flex',

  alignItems: 'center',

}));

export const CenterBox = styled(AppBox)(({ theme }) => ({

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'center',

}));

export const SpaceBetweenBox = styled(AppBox)(({ theme }) => ({

  display: 'flex',

  alignItems: 'center',

  justifyContent: 'space-between',

}));

export const ColumnBox = styled(AppBox)(({ theme }) => ({

  display: 'flex',

  flexDirection: 'column',

}));

export default AppBox;

