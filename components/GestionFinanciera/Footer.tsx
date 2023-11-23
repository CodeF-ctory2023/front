import { Grid, Link, Paper, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Paper
      component='footer'
      className='bottom-0 relative p-6'
      sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
    >
      <Grid
        container
        direction={{ sm: 'row', xs: 'column' }}
        spacing={4}
        justifyContent={'space-around'}
        // color={'primary.contrastText'}
        // sx={{ bgcolor: 'primary.main' }}
      >
        <Grid
          container
          item
          xs
          direction={'column'}
          spacing={0.4}
          alignItems={'center'}
        >
          <Grid item>
            <Typography variant='h4'>SSMU</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2'>
              Experimenta viajes seguros y rápidos
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          direction={'column'}
          spacing={0.4}
          alignItems={'center'}
        >
          <Grid item>
            <Typography variant='h5'>CONTACTO</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2'>+55555555</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2'>mail@mail.com</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          direction={'column'}
          spacing={0.4}
          alignItems={'center'}
        >
          <Grid item>
            <Typography variant='h5'>AYUDA</Typography>
          </Grid>
          <Grid item>
            <Link variant='body2' color={'primary.contrastText'} href='/blank'>
              Políticas de privacidad
            </Link>
          </Grid>
          <Grid item>
            <Link variant='body2' color={'primary.contrastText'} href='/blank'>
              Políticas de uso
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
