import { NextFunction, Request, Response, Express } from "express"
import { storagee } from "../storage/main"
import catchAsync from "../utils/catchAsync"

export class ContactController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const contacts = await storagee.contact.find(req.body)

        res.status(200).json({ success: true, data: { contacts } })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const contact = await storagee.contact.findById(req.params.id)

        res.status(200).json({ success: true, data: { contact } })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let photos = []
        for (let item of req.files as Express.Multer.File[]) {
            photos.push(`/api/file/${item.filename}`)
        }

        const contact = await storagee.contact.create({ ...req.body, photo: photos })

        res.status(201).json({ success: true, data: { contact } })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const contact = await storagee.contact.update(req.params.id, req.body)

        res.status(200).json({ success: true, data: { contact } })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storagee.contact.delete(req.params.id)

        res.status(204).json({ success: true, data: null })
    })
}
