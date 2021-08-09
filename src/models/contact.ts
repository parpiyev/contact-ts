import mongoose, { Schema, Document } from "mongoose"
import { v4 as uuidv4 } from "uuid"

export interface IContact extends Document {
    _id: string
    firsName: string
    lastName: string
    phone: number
    photo: string[]
    description: string
}

let contactSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    photo: {
        type: Array
    },
    description: {
        type: String
    }
})

export default mongoose.model<IContact>("Contact", contactSchema)
