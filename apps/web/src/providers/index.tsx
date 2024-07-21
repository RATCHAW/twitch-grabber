import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "@/lib/routes"

const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default Providers
