import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import App from "@/App"

const queryClient = new QueryClient()

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

export default Providers
