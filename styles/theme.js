import { createTheme } from '@mui/material/styles';

// Definição de cores principais do sistema - Esquema mais moderno
const colors = {
  primary: {
    main: '#FF5722', // Laranja vibrante
    light: '#FF8A65',
    dark: '#E64A19',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#2196F3', // Azul moderno
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#ffffff',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#ffffff',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#ffffff',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#f8f9fa', // Cinza mais claro e moderno
    paper: '#ffffff',
    card: '#ffffff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

// Definição de espaçamentos
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Definição de bordas e sombras - Mais arredondadas para estilo mobile
const shape = {
  borderRadius: 12,
  cardBorderRadius: 16,
  buttonBorderRadius: 12,
  inputBorderRadius: 8,
};

// Definição de sombras
const shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
];

// Criação do tema
const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    grey: colors.grey,
    background: colors.background,
    text: colors.text,
    divider: colors.divider,
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: shape.borderRadius,
  },
  shadows: shadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.buttonBorderRadius,
          textTransform: 'none',
          boxShadow: 'none',
          padding: '12px 24px', // Botões maiores para toque em mobile
          fontSize: '1rem',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: shadows[2],
            transform: 'translateY(-2px)', // Efeito sutil de elevação
          },
        },
        contained: {
          boxShadow: shadows[2],
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: colors.primary.dark,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: colors.secondary.dark,
          },
        },
        outlined: {
          borderWidth: '2px', // Bordas mais visíveis
          '&:hover': {
            borderWidth: '2px',
          },
        },
        // Botão de tamanho pequeno para ações secundárias
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: shape.cardBorderRadius,
          boxShadow: shadows[2],
          overflow: 'hidden',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: shadows[4],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
          '& .MuiOutlinedInput-root': {
            borderRadius: shape.inputBorderRadius,
            fontSize: '1rem',
            transition: 'box-shadow 0.2s ease-in-out',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(255, 87, 34, 0.2)', // Sombra sutil na cor primária quando focado
            },
            '& fieldset': {
              borderWidth: '1px',
              transition: 'border-color 0.2s ease-in-out',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '1rem',
          },
          '& .MuiInputHelperText-root': {
            marginTop: '4px',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: shape.cardBorderRadius,
          boxShadow: shadows[5],
          overflow: 'hidden',
          maxWidth: '95%', // Evita que o diálogo fique muito próximo das bordas em mobile
          margin: '16px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          fontSize: '1.25rem',
          fontWeight: 600,
          borderBottom: `1px solid ${colors.grey[200]}`,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:first-of-type': {
            paddingTop: '24px',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          borderTop: `1px solid ${colors.grey[200]}`,
          '& .MuiButton-root': {
            minWidth: '120px', // Botões mais largos para melhor toque em mobile
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          padding: '12px 16px', // Mais espaço para toque em mobile
          marginBottom: '4px',
          transition: 'background-color 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: colors.grey[100],
          },
          '&.Mui-selected': {
            backgroundColor: `${colors.primary.light}20`, // Versão transparente da cor primária
            '&:hover': {
              backgroundColor: `${colors.primary.light}30`,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '42px', // Ícones mais próximos do texto
          color: colors.primary.main, // Ícones na cor primária
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1rem',
          fontWeight: 500,
        },
        secondary: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: shadows[3],
        },
        colorPrimary: {
          backgroundColor: '#ffffff',
          color: colors.text.primary,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 16px',
          '@media (min-width: 600px)': {
            padding: '0 24px',
          },
          minHeight: '64px',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: shape.borderRadius,
            boxShadow: shadows[4],
            padding: '12px 16px',
          },
          // Posicionamento melhor para mobile
          '@media (min-width: 600px)': {
            top: '24px',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        icon: {
          opacity: 1,
          padding: '0px 12px 0px 0px',
        },
        message: {
          padding: '8px 0',
          fontSize: '0.9375rem',
        },
        action: {
          paddingLeft: '16px',
        },
        // Cores mais vibrantes para os alertas
        standardSuccess: {
          backgroundColor: '#E8F5E9',
          color: '#2E7D32',
        },
        standardError: {
          backgroundColor: '#FFEBEE',
          color: '#C62828',
        },
        standardWarning: {
          backgroundColor: '#FFF8E1',
          color: '#F57F17',
        },
        standardInfo: {
          backgroundColor: '#E3F2FD',
          color: '#1565C0',
        },
      },
    },
  },
});

// Exporta o tema e as constantes para uso em outros componentes
export { colors, spacing, shape, shadows };
export default theme;
