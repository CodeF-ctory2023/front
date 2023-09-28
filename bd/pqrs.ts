interface Pqrs {
    id: number;
    pqrsType: PqrsTypes;
    createdBy: string;
    complainTo?: string;
    pqrsState: PqrsStates;
    admin: string;
    creattedAt: Date;
    approved: Approved;
    pqrsDescription: string;

}

enum PqrsTypes {
    Queja =  "QUEJA",
    Reclamo =  "RECLAMO",
    Sugerencia =  "SUGERENCIA",
    Felicitacion  =  "FELICITACION",
    Peticion = "PETICION"
}

enum PqrsStates {
    Pendiente = "PENDIENTE",
    EnProceso = "EN PROCESO",
    Finalizado = "FINALIZADO"
}

enum Approved {
    Indefinido = "INDEFINIDO",
    Valido = "VALIDO",
    Invalido = "INVALIDO"
}

    

const PqrsList:Pqrs[] = [
    {id: 1,
    pqrsType: PqrsTypes.Queja,
    createdBy: "Juan",
    complainTo: "Pedro",
    pqrsState: PqrsStates.Pendiente,
    admin: "Maria",
    creattedAt: new Date(),
    approved: Approved.Indefinido,
    pqrsDescription: "No me gusta el servicio"
    },
]

export {PqrsList};