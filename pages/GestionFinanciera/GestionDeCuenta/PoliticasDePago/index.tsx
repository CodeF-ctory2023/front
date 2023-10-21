import { Layout } from '@/components/GestionFinanciera/Layout';
import { Button } from '@/components/GestionFinanciera/Button';


import { useRouter } from 'next/router';





const PoliticasDePagoPage = () => {
    const router = useRouter();
    
    return (
<Layout>
                  
<form className="text-base" >
  <div className="flex flex-col md:flex-row gap-6 my-4">
    <div className="flex-1">
      <label htmlFor="Porcentaje Socio" className="text-left">Porcentaje Socio (%)</label>
    </div>
    <div className="flex-2">
      <input type="number" id="Porcentaje Socio" name="Porcentaje Socio" className="w-full p-1 bg-gray-200 border border-transparent rounded-lg text-base" />
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-6 my-4">
    <div className="flex-1">
      <label htmlFor="Porcentaje Impuestos" className="text-left">Porcentaje Impuestos (%)</label>
    </div>
    <div className="flex-2">
      <input type="number" id="Porcentaje Impuestos" name="Porcentaje Impuestos" className="w-full p-1 bg-gray-200 border border-transparent rounded-lg text-base" />
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-6 my-4">
    <div className="flex-1">
      <label htmlFor="Porcentaje Intermediacion" className="text-left">Porcentaje Intermediación (%)</label>
    </div>
    <div className="flex-2">
      <input type="number" id="Porcentaje Intermediacion" name="Porcentaje Intermediacion" className="w-full p-1 bg-gray-200 border border-transparent rounded-lg text-base" />
    </div>
  </div>

  <div className='flex items-center justify-center gap-20'>
            <Button type='submit' text='GUARDAR' />
            <Button text='REGRESAR' onClick={() => router.back()} />
          </div>
          </form >
        </Layout>


        );
    };
    
    export default PoliticasDePagoPage;