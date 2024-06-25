import express from "express"
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

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})
