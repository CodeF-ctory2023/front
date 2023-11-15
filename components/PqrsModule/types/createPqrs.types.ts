import { Approved, Complain, Grievance, StatePqrs, TypePqrs } from "./Enum.types";

export interface createPqrsType {
    id?:               number;
    tipoPqrs:         TypePqrs;
    creadoPor:        number;
    quejaHacia:       number;
    creadoPorRol:     string;
    estadoPqrs:       StatePqrs;
    admin:            number;
    fechaCreacion:    Date;
    estadoAprobacion: Approved;
    descripcionPqrs:  string;
    tipoQueja?:        Complain;
    tipoReclamo?:      Grievance;
}
