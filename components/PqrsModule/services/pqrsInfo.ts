// eslint-disable-next-line no-restricted-imports
import { pqrsType } from "@/components/PqrsModule/utilities";

export const pqrsInfo: pqrsType[] = [
    {
        id: 1,
        type: 'Queja',
        createdAt: new Date(),
        state: 'Pendiente',
        createdBy: 'Usuario 007',
        description: 'some text here',
        subType: 'Subtipo 1',
        file: 'file.png',
    },
    {
        id: 2,
        type: 'Felicitación',
        createdAt: new Date(),
        state: 'Pendiente',
        createdBy: 'Usuario 007',
        description: 'Me robaron el celular',
        subType: 'Subtipo 1',
        file: 'file.png',
    },
    {
        id: 3,
        type: 'Petición',
        createdAt: new Date(),
        state: 'Finalizado',
        createdBy: 'Usuario 007',
        description: 'Se me quedo el pan',
        subType: 'Subtipo 1',
        file: 'file.png',
    },
]

