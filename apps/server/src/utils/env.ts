import { cleanEnv, num, str, url } from "envalid"

const env = cleanEnv(process.env, {
  PORT: num(),
  CORS_LINKS_LIST: str(),
})

export default env
