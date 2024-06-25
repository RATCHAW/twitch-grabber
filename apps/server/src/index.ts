import express, { NextFunction, Request, Response } from "express"
import env from "./utils/env"

const app = express()
app.use(
  express.json({
    limit: "20mb",
  }),
)
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  return res.status(500).json({
    message: "Internal server error",
  })
})

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
