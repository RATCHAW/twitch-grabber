import { z } from "zod"

export const twitchClipSchema = z.object({
  body: z.object({
    clip_url: z
      .string()
      .url()
      .startsWith("https://clips.twitch.tv/")
      .or(z.string().url().startsWith("https://www.twitch.tv/")),
  }),
})
