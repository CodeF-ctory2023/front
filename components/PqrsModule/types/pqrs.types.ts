export interface pqrsType{
    id: number;
    createdBy: string,
    createdAt: Date,
    state: string,
    type: string,
    subType?: string,
    description: string,
    file?: string,
}