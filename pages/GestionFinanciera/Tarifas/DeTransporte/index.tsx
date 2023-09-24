import { Button } from '@/components/GestionFinanciera/Button';
import { LabelInput } from '@/components/GestionFinanciera/LabelInput';
import { Layout } from '@/components/GestionFinanciera/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DeTransportePage = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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

  return (
    <Layout>
      <div>
        <form className='flex flex-col items-center justify-center gap-6'>
          <legend>TARIFAS DE TRANSPORTE SIN PARADA</legend>
          <LabelInput inputType='number' id='valorPorKm'>
            Valor por kilómetro cubierto
          </LabelInput>
          <LabelInput inputType='number' id='recargo'>
            Recargo
          </LabelInput>
          <div className='flex justify-between items-center self-stretch gap-6'>
            <label htmlFor='vigencia'>Fechas de vigencia</label>
            <ReactDatePicker
              portalId='root-portal'
              selectsStart
              startDate={startDate}
              customInput={datePickerIcon(startDate)}
              popperPlacement='bottom'
              onChange={(start: Date) => {
                setStartDate(start);
              }}
            />
            <ReactDatePicker
              portalId='root-portal'
              selectsEnd
              endDate={endDate}
              customInput={datePickerIcon(endDate)}
              popperPlacement='bottom'
              onChange={(end: Date) => {
                setEndDate(end);
              }}
            />
          </div>
          <div className='flex items-center justify-center gap-6'>
            <Button type='submit' text='GUARDAR' />
            <Button text='REGRESAR' onClick={() => router.back()} />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DeTransportePage;
