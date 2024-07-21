import { z } from "zod"

export const twitchClipSchema = z.object({
  body: z.strictObject({
    clip_url: z
      .string()
      .min(1, "Clip URL is required")
      .url()
      .startsWith("https://clips.twitch.tv/")
      .or(z.string().url().startsWith("https://www.twitch.tv/")),
  }),
})

export const uplaodTwitchClipSchema = z.object({
  body: z.strictObject({
    clip_url: z
      .string()
      .min(1, "Clip URL is required")
      .url()
      .startsWith("https://clips.twitch.tv/")
      .or(z.string().url().startsWith("https://www.twitch.tv/")),

    clip_title: z.string().min(1, "Clip title is required"),
    clip_description: z.string().optional(),
  }),
})
