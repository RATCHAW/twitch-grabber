import { NextFunction, Request, Response } from "express"
import clipDirectUrl from "@/services/clip-direct-url"

const clipDirectUrlHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clip_url = req.body.clip_url
    const direct_url = await clipDirectUrl(clip_url)
    if (!direct_url) {
      return res.status(404).json({ message: "Invalid clip URL" })
    }
    return res.status(200).json({ direct_url })
  } catch (error) {
    next(error)
  }
}

export default clipDirectUrlHandler
