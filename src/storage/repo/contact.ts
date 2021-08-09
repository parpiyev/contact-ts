import { IContact } from "../../models/contact"

export interface IContactAllResponse {
    payloads: IContact[]
    count: number
}

export interface ContactRepo {
    create(payload: IContact): Promise<IContact>
    update(id: string, payload: IContact): Promise<IContact>
    delete(id: string): Promise<any>
    find(query: Object): Promise<IContact[]>
    findOne(query: Object): Promise<IContact>
    findById(id: string): Promise<IContact>
}
