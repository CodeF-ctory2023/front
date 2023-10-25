import { Layout } from '@/components/GestionFinanciera/Layout';
import { Button } from '@/components/GestionFinanciera/Button';

import { useState } from 'react';
import { useRouter } from 'next/router';





const PoliticasDePagoPage = () => {
    const router = useRouter();
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
  
    const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue1(e.target.value);
      setError1(''); // Clear any previous error when input changes.
    };
  
    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue2(e.target.value);
      setError2(''); // Clear any previous error when input changes.
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const numericValue1 = parseFloat(inputValue1);
      const numericValue2 = parseFloat(inputValue2);
  
      if (isNaN(numericValue1) || numericValue1 <= 0 || numericValue1 >= 100) {
        setError1('El valor debe ser mayor que 0 y menor que 100.');
        return;
      }
  
      if (isNaN(numericValue2) || numericValue2 <= 0 || numericValue2 >= 100) {
        setError2('El valor debe ser mayor que 0 y menor que 100.');
        return;
      }
  
      
    };
    const resultado = 100 - (parseFloat(inputValue1) + parseFloat(inputValue2) || 0);    
    return (
<Layout>
                  
<form onSubmit={handleSubmit} className="text-base flex flex-col">
  <div className="flex flex-col md:flex-row gap-6 my-4">
    <div className="flex-1 ">
      <label htmlFor="input1" className="text-left">Porcentaje Socio (%)</label>
    </div>
    <div className="flex-2 ">
      <input id="input1" value={inputValue1} onChange={handleInputChange1} type="number"  name="Porcentaje Socio" className="w-full p-1 bg-gray-200 border border-transparent rounded-lg text-base" />
      {error1 && <p className="text-red-500 text-xs font-semibold absolute mt-2">{error1}</p>}
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-6 my-4">
    <div className="flex-1">
      <label htmlFor="input2" className="text-left">Porcentaje Impuestos (%)</label>
    </div>
    <div className="flex-2">
      <input type="number" id="input2" value={inputValue2} onChange={handleInputChange2} name="Porcentaje Impuestos" className="w-full p-1 bg-gray-200 border border-transparent rounded-lg text-base" />
      {error2 && <p className="text-red-500 text-xs font-semibold absolute mt-2">{error2}</p>}
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-6 my-4">
    <div className="flex-1">
      <label htmlFor="Porcentaje Intermediacion" className="text-left">Porcentaje Intermediación (%)</label>
    </div>
    <div className="flex-2">
      <input type="number" value={resultado} readOnly className="w-full p-1 bg-gray-200 border border-transparent rounded-lg text-base" />
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