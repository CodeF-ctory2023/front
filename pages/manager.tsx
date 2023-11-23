import { Button } from '@mui/material';
import React from 'react';

export default function Manager() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center font-roboto">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">¿Listo para empezar?</h1>
        <p className="text-xl">Administra las solicitudes o</p>
        <p className="text-xl">Gestiona los socios.</p>
      </section>
      
      <div className="space-x-5">
        <Button variant="contained" color="primary" href="/manage/requests">
          Solicitudes
        </Button>
        <Button variant="contained" color="primary">
          Gestión Socios
        </Button>
      </div>

      <div className="absolute top-5 right-5">
        <Button variant="contained" color="secondary">
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
