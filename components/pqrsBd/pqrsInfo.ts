// eslint-disable-next-line no-restricted-imports
import { pqrsType } from "../PqrsModule/utilities";

export const pqrsInfo: pqrsType[] = [
    {
        type: 'Queja',
        createdAt: new Date(),
        state: 'Pendiente',
        createdBy: 'Usuario 007',
        description: 'some text here',
        subType: 'Subtipo 1',
        file: 'file.png',
    },
]