import { Router } from "express"
import clipDirectUrlHandler from "@/controllers/twitch/clip-direct-url-handler"

export const twitchRouter: Router = Router()

twitchRouter.post("/clip", clipDirectUrlHandler)
