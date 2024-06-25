import { Router } from "express"
import downloadClip from "@/controllers/twitch/download-clip"

export const authRouter: Router = Router()

authRouter.post("/download", downloadClip)
