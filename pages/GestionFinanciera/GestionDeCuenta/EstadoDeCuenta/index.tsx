import { Layout } from '@/components/GestionFinanciera/Layout';
import { Button } from '@/components/GestionFinanciera/Button';



import { useRouter } from 'next/router';


import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const EstadoDeCuentaPage = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };
  const columnStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };
  

    const router = useRouter();
  
    return (
        <Layout >
                  <div>
        
                  <legend className="px-4 py-8" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '250px',marginTop: '-100px' }}>Estado de cuenta</legend>



                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      
      <div className="p-4">
        <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: 'bold'}} >USUARIO</h2>
        <p className="mb-4">pepito123</p>
        <p className="mb-4">juanito24</p>
        <p className="mb-4">cesar35</p>
      </div>

   
      <div className="p-4">
        <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: 'bold'}} >FECHA Y HORA</h2>
        <p className="mb-4">10-10-23 11:05</p>
        <p className="mb-4">10-10-23 15:05</p>
        <p className="mb-4">11-10-23 20:05</p>
      </div>

      
      <div className="p-4">
        <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: 'bold'}} >VALOR</h2>
        <p className="mb-4">$1000</p>
        <p className="mb-4">$1552</p>
        <p className="mb-4">$548182</p>
      </div>

     
      <div className="p-4">
        <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: 'bold'}} >ESTADO</h2>
        <p className="mb-4"> Por liquidar</p>
        <p className="mb-4">Por liquidar</p>
        <p className="mb-4">Por liquidar</p>
      </div>
    </div>
    </div>
    <div className='flex items-center justify-center gap-20' >
            
            <Button text='REGRESAR' onClick={() => router.back()} />
          </div>
        </Layout>


        );
    };
    
    export default EstadoDeCuentaPage;