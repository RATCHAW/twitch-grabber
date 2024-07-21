import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <Outlet />
    </div>
  )
}

export default App
