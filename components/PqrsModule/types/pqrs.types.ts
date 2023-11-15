import { StatePqrs, TypePqrs } from "./Enum.types";

export interface pqrsType {
    id:               number;
    tipoPqrs:         TypePqrs;
    creadoPor:        number;
    quejaHacia:       number;
    creadoPorRol:     string;
    estadoPqrs:       StatePqrs;
    idAdmin:          number;
    estadoAprobacion: string;
    fechaCreacion:    string;
    descripcionPqrs:  string;
    tipoQueja:        string;
    tipoReclamo:      string;
}


