import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { twitchClipSchema } from "@repo/validation"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const ClipForm = () => {
  const form = useForm<z.infer<typeof twitchClipSchema.shape.body>>({
    resolver: zodResolver(twitchClipSchema.shape.body),
  })

  return (
    <Form {...form}>
      <form className="flex space-y-4 flex-col h-full justify-center items-center">
        <FormField
          control={form.control}
          name="clip_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clip URL</FormLabel>
              <FormControl>
                <Input className="w-96" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Download</Button>
      </form>
    </Form>
  )
}

export default ClipForm
