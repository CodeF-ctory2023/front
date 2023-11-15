import { Footer } from '@/components/GestionFinanciera/Footer';
import { NavBar } from '@/components/GestionFinanciera/NavBar';
import { CircularProgress, Grid } from '@mui/material';
import { Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    // <ThemeRegistry options={{ key: 'mui' }}>
    //   </ThemeRegistry>
    <Grid
      container
      direction={'column'}
      justifyContent='space-between'
      gap={{ xs: 12 }}
      alignContent='center'
      alignItems='center'
      minHeight='100vh'
      height={{sm: '100vh'}}
      wrap='nowrap'
    >
      <Grid item>
        <NavBar />
      </Grid>
      <Grid item className='flex justify-center w-fit px-6'>
        <Suspense fallback={<CircularProgress />}>{children}</Suspense>
      </Grid>
      <Grid item width='100vw'>
        <Footer />
      </Grid>
    </Grid>
  );
};
