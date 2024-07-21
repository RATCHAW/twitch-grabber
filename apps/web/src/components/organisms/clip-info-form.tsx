import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { uplaodTwitchClipSchema } from "@repo/validation"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { twitch } from "@/utils/api/twitch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PencilLine } from "lucide-react"
import { useState } from "react"
import { Label } from "../ui/label"

const ClipInfoForm = () => {
  const form = useForm<z.infer<typeof uplaodTwitchClipSchema.shape.body>>({
    resolver: zodResolver(uplaodTwitchClipSchema.shape.body),
    defaultValues: {
      clip_title: "",
      clip_description: "",
    },
  })

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

  const onSubmit = (data: z.infer<typeof uplaodTwitchClipSchema.shape.body>) => {
    mutate(data.clip_url)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-96 border-2 border-black ">
          <CardHeader>
            <CardTitle className="text-center">Upload Twitch clip to Youtube</CardTitle>
            <CardDescription className="text-center hidden"></CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="clip_title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="clip_url" className="text-start">
                        Title
                      </Label>
                      <Input className="bg-transparent " id="clip_url" placeholder="Your video title" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clip_description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="clip_url" className="text-start">
                        Description
                      </Label>
                      <textarea
                        id="clip_url"
                        placeholder="Your video description"
                        className="border-none outline-none  font-semibold"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mx-auto">
            <Button className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Upload Now"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default ClipInfoForm
