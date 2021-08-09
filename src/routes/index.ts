import express from "express"
import path from "path"
import sampleRouter from "./contact"

const router = express.Router({ mergeParams: true })

router.use("/contact", sampleRouter)
router.use("/api/file", express.static(path.join(__dirname, "../", "uploads")))

export default router
