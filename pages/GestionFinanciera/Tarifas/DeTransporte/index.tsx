import { Button } from '@/components/GestionFinanciera/Button';
import { Layout } from '@/components/GestionFinanciera/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DeTransportePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    valorPorKm: '',
    recargo: '',
    startDate: new Date(),
    endDate: new Date(),
  });
  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const datePickerIcon = (selectedDate: Date) => (
    <div className='flex gap-1'>
      <label>{`${selectedDate.getDate()}/${selectedDate.getMonth()}/${selectedDate.getFullYear()}`}</label>
      <Image
        className='hover:cursor-pointer'
        src='/calendar-days.svg'
        width={24}
        height={24}
        alt=''
      />
    </div>
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    e.target.setCustomValidity('');
    const [name, value] = [e.target.name, e.target.value];
    let regex = /./;
    if (inputType == 'int') {
      regex = /^[0-9\b]+$/;
    } else if (inputType == 'float') {
      regex = /^[0-9\b]*(\.)?[0-9\b]*$/;
    }
    if (value === '' || regex.test(value)) {
      setFormData((prevData) => {
        return { ...prevData, [name]: value };
      });
    }
  };
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    evt.currentTarget.valorPorKm.setCustomValidity('');
    evt.currentTarget.recargo.setCustomValidity('');
    if (formData.valorPorKm.length == 0) {
      evt.currentTarget.valorPorKm.setCustomValidity('Rellene este campo');
    }
    if (formData.recargo.length == 0) {
      evt.currentTarget.recargo.setCustomValidity('Rellene este campo');
    }
    setTriedToSubmit(true);
    if (formData.startDate >= formData.endDate) {
      return;
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        valorKm: formData.valorPorKm,
        recargo: formData.recargo,
        fechaInicio: formData.startDate,
        fechaFin: formData.endDate,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) {
          router.reload();
          return response.json();
        }
      })
      // eslint-disable-next-line no-console
      .then((json) => console.log(json));
  };

  return (
    <Layout>
      <div>
        <form
          className='flex flex-col items-center justify-center text-center gap-6 p-5 rounded-xl shadow-gray-300 shadow-xl'
          onSubmit={handleSubmit}
        >
          <legend className='font-semibold text-lg pb-4'>
            TARIFAS DE TRANSPORTE SIN PARADA
          </legend>
          <div className='flex justify-between items-center self-stretch gap-6'>
            <label htmlFor='valorPorKm'>Valor por kilómetro cubierto</label>
            <div className='pad-5 rounded-sm'>
              <input
                type='text'
                value={formData.valorPorKm}
                onChange={(e) => handleChange(e, 'int')}
                id='valorPorKm'
                name='valorPorKm'
                className='p-1.5 outline outline-1 invalid:outline-red-700'
              ></input>
            </div>
          </div>
          <div className='flex justify-between items-center self-stretch gap-6'>
            <label htmlFor='valorPorKm'>% Recargo</label>
            <div className='pad-5 rounded-sm'>
              <input
                type='text'
                value={formData.recargo}
                onChange={(e) => {
                  handleChange(e, 'float');
                  if (parseFloat(e.target.value) > 30) {
                    e.target.setCustomValidity(
                      'Ingrese un valor no mayor al 30%'
                    );
                  } else {
                    e.target.setCustomValidity('');
                  }
                }}
                id='recargo'
                name='recargo'
                className='p-1.5 outline outline-1 invalid:outline-red-700'
              ></input>
            </div>
          </div>
          <div className='flex justify-between items-center self-stretch gap-6'>
            <label htmlFor='vigencia'>Fechas de vigencia</label>
            <ReactDatePicker
              portalId='root-portal'
              selectsStart
              startDate={formData.startDate}
              customInput={datePickerIcon(formData.startDate)}
              popperPlacement='bottom'
              onChange={(start: Date) => {
                setFormData((prevData) => {
                  return { ...prevData, startDate: start };
                });
              }}
            />
            <ReactDatePicker
              portalId='root-portal'
              selectsEnd
              endDate={formData.endDate}
              customInput={datePickerIcon(formData.endDate)}
              popperPlacement='bottom'
              onChange={(end: Date) => {
                setFormData((prevData) => {
                  return { ...prevData, endDate: end };
                });
              }}
            />
          </div>
          {triedToSubmit && formData.startDate >= formData.endDate && (
            <p className='text-red-700'>El rango de fechas es inválido</p>
          )}
          <div className='flex items-center justify-center gap-6 pt-4'>
            <Button type='submit' text='GUARDAR' />
            <Button text='REGRESAR' onClick={() => router.back()} />
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default DeTransportePage;
