import { cleanEnv, num, str, url } from "envalid"

const env = cleanEnv(process.env, {
  PORT: num(),
  CORS_LINKS_LIST: str(),

  CLIENT_BASE_URL: url(),

  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
})

export default env
