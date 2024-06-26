import { Router } from "express"
import clipDirectUrlHandler from "@/controllers/twitch/clip-direct-url-handler"
import validate from "middlewares/validate"
import { twitchClipSchema } from "@repo/validation"
export const twitchRouter: Router = Router()

twitchRouter.post("/clip", validate(twitchClipSchema), clipDirectUrlHandler)
