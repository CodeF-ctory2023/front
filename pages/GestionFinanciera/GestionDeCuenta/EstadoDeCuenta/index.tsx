import { Layout } from '@/components/GestionFinanciera/Layout';
import * as React from 'react';
import { Button, Grid,TableContainer,Table,TableHead,TableCell,TableRow,TableBody,Paper,Typography } from '@mui/material';

import { useRouter } from 'next/router';


function createData(
  Usuario: string,
  FechayHora: String,
  Valor: String,
  Estado: String,
  
) {
  return { Usuario, FechayHora, Valor, Estado };
}

const rows = [
  createData('Juan', "10-10-23 11:05", "$14000", "Por liquidar" ),
  createData('Jose'," 10-10-23 01:05", "$5555", "Por liquidar"),
  createData('David', "10-1-23 11:05", "$5554242", "Por liquidar"),
  createData('Andrés', "9-10-21 11:05", "$34234"," Por liquidar"),
  createData('Daniel', "1-8-22 11:05", "$2131321", "Por liquidar"),
];





const EstadoDeCuentaPage = () => {
 

    const router = useRouter();
  
    return (
      <Layout>
        <div style={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop:-60,gap: '30px' }}>
        <Typography variant='subtitle1' fontWeight={800}>
              TARIFAS DE TRANSPORTE SIN PARADA
            </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
    <TableCell><strong>USUARIO</strong></TableCell>
    <TableCell align="right"><strong>FECHA Y HORA</strong></TableCell>
    <TableCell align="right"><strong>VALOR&nbsp;(g)</strong></TableCell>
    <TableCell align="right"><strong>ESTADO&nbsp;(g)</strong></TableCell>
</TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Usuario}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Usuario}
              </TableCell>
              <TableCell align="right">{row.FechayHora}</TableCell>
              <TableCell align="right">{row.Valor}</TableCell>
              <TableCell align="right">{row.Estado}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       <Grid item>
          <Button
            variant='contained'
            size='large'
            className='w-full'
            onClick={() => router.push('/GestionFinanciera/GestionDeCuenta')}
          >
            REGRESAR
          </Button>
        </Grid>
        </div>
    </Layout>
  );
};



    
    export default EstadoDeCuentaPage;