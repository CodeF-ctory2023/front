export type StatePqrs = 'Pendiente' | 'Proceso' | 'Finalizado';

export type TypePqrs =
  | 'Queja'
  | 'Reclamo'
  | 'Sugerencia'
  | 'Felicitacion'
  | 'Peticion';

export type Complain =
  | 'Mal comportamientoDelConductor'
  | 'EstadoDelVehiculo'
  | 'CobroInadecuado'
  | 'ConduccionPeligrosa'
  | 'SituacionesAnomalasConPasajeros'
  | 'Otros' | null;

export type Grievance =
  | 'SancionesInjustas'
  | 'ProblemasDeFacturacion'
  | 'Otros' | null;

  export type Approved = 'Aprobado' | 'Rechazado' | 'Indefinido';
