import { NextFunction, Request, Response } from "express"
import ClipDirectUrl from "@/services/clip-direct-url"

const downloadClip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clip_url = req.body.clip_url
    const download_url = await ClipDirectUrl(clip_url)
    return res.status(200).json({ download_url })
  } catch (error) {
    next(error)
  }
}

export default downloadClip
