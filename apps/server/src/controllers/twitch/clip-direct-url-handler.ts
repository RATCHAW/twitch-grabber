import { NextFunction, Request, Response } from "express"
import clipDirectUrl from "@/services/clip-direct-url"

const clipDirectUrlHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clip_url = req.body.clip_url
    const download_url = await clipDirectUrl(clip_url)
    return res.status(200).json({ download_url })
  } catch (error) {
    next(error)
  }
}

export default clipDirectUrlHandler
