import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Form = () => {
  return (
    <form className="flex space-y-4 flex-col h-full justify-center items-center">
      <Input className="w-96" />
      <Button>Download</Button>
    </form>
  )
}

export default Form
