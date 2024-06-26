import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { twitchClipSchema } from "@repo/validation"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { twitch } from "@/utils/api/twitch"
const ClipForm = () => {
  const form = useForm<z.infer<typeof twitchClipSchema.shape.body>>({
    resolver: zodResolver(twitchClipSchema.shape.body),
    defaultValues: {
      clip_url: "",
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

  const onSubmit = (data: z.infer<typeof twitchClipSchema.shape.body>) => {
    mutate(data.clip_url)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-y-4 flex-col h-full justify-center items-center"
      >
        <FormField
          control={form.control}
          name="clip_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Clip URL</FormLabel>
              <FormControl>
                <Input className="w-96" {...field} />
              </FormControl>
              <FormDescription>Enter the URL of the clip</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>{isPending ? "Loading..." : "Download"}</Button>
      </form>
    </Form>
  )
}

export default ClipForm
