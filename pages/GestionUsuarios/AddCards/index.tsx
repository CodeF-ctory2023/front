import {Navbar} from '@/components/GestionUsuarios/NavBar';
import {Aside} from '@/components/GestionUsuarios/Aside';
import React, { useState } from 'react';


const PaymentManager: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<Array<any>>([]);
  const [type, setType] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  const addPaymentMethod = () => {
    const newMethod = {
      id: Date.now(),
      type,
      number,
      expiry,
      cvv,
    };

    setPaymentMethods([...paymentMethods, newMethod]);


    setType('');
    setNumber('');
    setExpiry('');
    setCvv('');
  };


  const deletePaymentMethod = (id: number) => {
    const updatedMethods = paymentMethods.filter((method) => method.id !== id);
    setPaymentMethods(updatedMethods);
  };

  return (

    <>
    <Navbar />
    <Aside />
    <section className="fixed top-12 pt-20 pb-40 w-full h-screen flex flex-col items-center text-left justify-center">
    
    <div className="font-sans bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Métodos de Pago</h1>

      <ul className="list-none p-0 flex gap-3 max-w-xl flex-wrap">
        {paymentMethods.map((method) => (
          <li key={method.id} className="paymentMethod bg-white p-4 mb-4 border border-gray-300 rounded">
            <strong className="block mb-2 text-lg font-semibold">{method.type}</strong>
            <p className="mb-2">Número: {method.number}</p>
            <p className="mb-2">Fecha de Vencimiento: {method.expiry}</p>
            <p className="mb-2">CVV: {method.cvv}</p>
            <button
              onClick={() => deletePaymentMethod(method.id)}
              className="deleteButton bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <label htmlFor="type" className="block mb-1">
          Tipo de tarjeta:
        </label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="number" className="block mb-1">
          Número de tarjeta:
        </label>
        <input
          type="text"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="expiry" className="block mb-1">
          Fecha de Vencimiento (MM/YY):
        </label>
        <input
          type="text"
          id="expiry"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cvv" className="block mb-1">
          Código de Seguridad (CVV):
        </label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300"
          required
        />
      </div>

      <button
        type="button"
        onClick={addPaymentMethod}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar Método de Pago
      </button>
    </div>
    </section>
    </>
  );
};

export default PaymentManager;