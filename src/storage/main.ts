import { ContactStorage } from "./mongo/contact"

interface IStorage {
    contact: ContactStorage
}

export let storagee: IStorage = {
    contact: new ContactStorage()
}
