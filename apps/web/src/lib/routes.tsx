import App from "@/App"
import ClipForm from "@/components/organisms/clip-form"
import ClipInfoForm from "@/components/organisms/clip-info-form"
import { RouteObject } from "react-router-dom"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <ClipForm />,
      },
      {
        path: "/:clip_id",
        element: <ClipInfoForm />,
      },
    ],
  },
]

export default routes
