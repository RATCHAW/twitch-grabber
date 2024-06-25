import { cleanEnv, num, str, url } from "envalid"

const env = cleanEnv(process.env, {
  PORT: num(),
})

export default env
