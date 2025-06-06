;
import { AppPage, AppBox } from './index';
import AppCard from './AppCard';

const AppAuthLayout = ({
  children,
  maxWidth = 420,
  sx = {},
  cardSx = {},
  ...props
}) => {
  return (
    <AppPage 
      paper={false} 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        ...sx
      }}
      {...props}
    >
      <AppBox sx={{ width: '100%', maxWidth, mx: 'auto' }}>
        <AppCard
          elevation={6}
          sx={{
            p: { xs: 3, sm: 6 },
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ...cardSx
          }}
        >
          {children}
        </AppCard>
      </AppBox>
    </AppPage>
  );
};

export default AppAuthLayout;
