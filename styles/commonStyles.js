import { colors, spacing, shape, shadows } from './theme';

const commonStyles = {
  
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  page: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: 0,
  },
  pageContainer: {
    padding: spacing.md,
    backgroundColor: colors.background.default,
    minHeight: '100vh',
  },
  contentContainer: {
    padding: spacing.md,
    backgroundColor: colors.background.paper,
    borderRadius: shape.borderRadius,
    boxShadow: shadows[1],
  },
  sectionContainer: {
    marginBottom: spacing.lg,
  },

  card: {
    borderRadius: shape.cardBorderRadius,
    boxShadow: shadows[1],
    backgroundColor: colors.background.card,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: spacing.md,
    backgroundColor: colors.primary.main,
    color: colors.primary.contrastText,
  },
  cardContent: {
    padding: spacing.md,
  },
  cardFooter: {
    padding: spacing.md,
    borderTop: `1px solid ${colors.divider}`,
    backgroundColor: colors.grey[50],
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    padding: spacing.sm,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },

  input: {
    width: '100%',
  },

  buttonContainer: {
    display: 'flex',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  buttonContainerEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.md,
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: colors.grey[100],
    fontWeight: 500,
  },
  tableCell: {
    padding: spacing.sm,
    borderBottom: `1px solid ${colors.divider}`,
  },

  list: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    borderRadius: shape.borderRadius,
    overflow: 'hidden',
    backgroundColor: colors.background.paper,
    boxShadow: shadows[1],
  },
  listItem: {
    padding: spacing.md,
    borderBottom: `1px solid ${colors.divider}`,
    '&:last-child': {
      borderBottom: 'none',
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  mt: {
    xs: { marginTop: spacing.xs },
    sm: { marginTop: spacing.sm },
    md: { marginTop: spacing.md },
    lg: { marginTop: spacing.lg },
    xl: { marginTop: spacing.xl },
  },
  mb: {
    xs: { marginBottom: spacing.xs },
    sm: { marginBottom: spacing.sm },
    md: { marginBottom: spacing.md },
    lg: { marginBottom: spacing.lg },
    xl: { marginBottom: spacing.xl },
  },
  ml: {
    xs: { marginLeft: spacing.xs },
    sm: { marginLeft: spacing.sm },
    md: { marginLeft: spacing.md },
    lg: { marginLeft: spacing.lg },
    xl: { marginLeft: spacing.xl },
  },
  mr: {
    xs: { marginRight: spacing.xs },
    sm: { marginRight: spacing.sm },
    md: { marginRight: spacing.md },
    lg: { marginRight: spacing.lg },
    xl: { marginRight: spacing.xl },
  },
  m: {
    xs: { margin: spacing.xs },
    sm: { margin: spacing.sm },
    md: { margin: spacing.md },
    lg: { margin: spacing.lg },
    xl: { margin: spacing.xl },
  },
  p: {
    xs: { padding: spacing.xs },
    sm: { padding: spacing.sm },
    md: { padding: spacing.md },
    lg: { padding: spacing.lg },
    xl: { padding: spacing.xl },
  },

  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  textBold: {
    fontWeight: 700,
  },
  textMuted: {
    color: colors.text.secondary,
  },

  statusChip: {
    borderRadius: '16px',
    padding: '4px 12px',
    fontSize: '0.75rem',
    fontWeight: 500,
    display: 'inline-block',
  },
  statusSuccess: {
    backgroundColor: colors.success.light,
    color: colors.success.dark,
  },
  statusError: {
    backgroundColor: colors.error.light,
    color: colors.error.dark,
  },
  statusWarning: {
    backgroundColor: colors.warning.light,
    color: colors.warning.dark,
  },
  statusInfo: {
    backgroundColor: colors.info.light,
    color: colors.info.dark,
  },

  fadeIn: {
    animation: 'fadeIn 0.3s ease-in-out',
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  },

  responsive: {
    xs: {
      display: 'block',
      '@media (min-width: 600px)': {
        display: 'none',
      },
    },
    sm: {
      display: 'none',
      '@media (min-width: 600px)': {
        display: 'block',
      },
      '@media (min-width: 960px)': {
        display: 'none',
      },
    },
    md: {
      display: 'none',
      '@media (min-width: 960px)': {
        display: 'block',
      },
      '@media (min-width: 1280px)': {
        display: 'none',
      },
    },
    lg: {
      display: 'none',
      '@media (min-width: 1280px)': {
        display: 'block',
      },
    },
  },
};

export default commonStyles;
