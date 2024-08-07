import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { twitchClipSchema } from "@repo/validation"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { twitch } from "@/utils/api/twitch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
const ClipForm = () => {
  const form = useForm<z.infer<typeof twitchClipSchema.shape.body>>({
    resolver: zodResolver(twitchClipSchema.shape.body),
    defaultValues: {
      clip_url: "",
    },
  })

  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationKey: ["clip"],
    mutationFn: (clip_url: string) => twitch.clipDirectUrl(clip_url),
    onSuccess: (data) => {
      window.open(data.direct_url, "_blank")
    },
    onError: () => {
      form.setError("clip_url", { message: "Couldn't find clip" })
    },
  })

  const onSubmit = (data: z.infer<typeof twitchClipSchema.shape.body>) => {
    mutate(data.clip_url)
  }

  const handleRedirect = () => {
    const isValidUrl = twitchClipSchema.shape.body.safeParse({ clip_url: form.getValues().clip_url })
    if (isValidUrl.success) {
      const url = new URL(isValidUrl.data.clip_url)
      const modifiedUrl = url.pathname
      const parts = modifiedUrl.split("/")
      const clip_id = parts[parts.length - 1]
      navigate(clip_id)
    } else {
      form.setError("clip_url", { message: "Invalid URL" })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <Card className="w-96 border-2 border-black ">
          <CardHeader>
            <CardTitle className="text-center">Twitch Clip Downloader</CardTitle>
            <CardDescription className="text-center">Start by entring a twitch clip URL</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="clip_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter clip URL" className="bg-white" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mx-auto space-x-2">
            <Button onClick={() => handleRedirect()} className="w-full" disabled={isPending} type="button">
              Upload to YouTube
            </Button>
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Download Now"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default ClipForm
