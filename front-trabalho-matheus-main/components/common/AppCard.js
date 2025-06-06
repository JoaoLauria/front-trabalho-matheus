;
import { Card, CardHeader, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const AppCard = ({
  title,
  subheader,
  avatar,
  action,
  children,
  footer,
  sx = {},
  ...props
}) => {
  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden', ...sx }} {...props}>
      {(title || subheader || avatar || action) && (
        <CardHeader
          title={title && <Typography variant="h6" component="h2">{title}</Typography>}
          subheader={subheader}
          avatar={avatar}
          action={action}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardActions>
          {footer}
        </CardActions>
      )}
    </Card>
  );
};

export const PrimaryCard = styled(AppCard)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '& .MuiCardHeader-title': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.primary.contrastText,
    opacity: 0.8,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.primary.contrastText,
  },
}));

export const SecondaryCard = styled(AppCard)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  '& .MuiCardHeader-title': {
    color: theme.palette.secondary.contrastText,
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.secondary.contrastText,
    opacity: 0.8,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.secondary.contrastText,
  },
}));

export const InfoCard = styled(AppCard)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
  },
  '& .MuiCardHeader-title': {
    color: theme.palette.info.contrastText,
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.info.contrastText,
    opacity: 0.8,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.info.contrastText,
  },
}));

export const SuccessCard = styled(AppCard)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  '& .MuiCardHeader-title': {
    color: theme.palette.success.contrastText,
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.success.contrastText,
    opacity: 0.8,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.success.contrastText,
  },
}));

export const WarningCard = styled(AppCard)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  '& .MuiCardHeader-title': {
    color: theme.palette.warning.contrastText,
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.warning.contrastText,
    opacity: 0.8,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.warning.contrastText,
  },
}));

export const ErrorCard = styled(AppCard)(({ theme }) => ({
  '& .MuiCardHeader-root': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  '& .MuiCardHeader-title': {
    color: theme.palette.error.contrastText,
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.error.contrastText,
    opacity: 0.8,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.error.contrastText,
  },
}));

export default AppCard;
