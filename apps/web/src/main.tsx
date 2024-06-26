import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/global.css"
import Providers from "./providers/index.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>,
)
