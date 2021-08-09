import { NextFunction, Request, Response, Express, Router } from "express"
import { ContactController } from "../controllers/contact"
import { ContactValidator } from "../validators/contact"
import path from "path"
import multer, { Multer } from "multer"

// // rasmdi qaysi faylga saqlashligi
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../", "uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

// foydalanuvchi rasm yubor yatganini tekshirish
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: null, destination: boolean) => void
) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// rasm olchami
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const router = Router({ mergeParams: true })
const controller = new ContactController()
const validator = new ContactValidator()

router
    .route("/")
    .get(controller.getAll)
    .post(upload.array("photo", 10), validator.create, controller.create)
router
    .route("/:id")
    .get(controller.get)
    .patch(validator.update, controller.update)
    .delete(controller.delete)

export default router
