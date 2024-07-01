import env from "@/utils/env"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { prismaClient } from "@repo/prisma"

export const GoogleAuth2Strategy = new GoogleStrategy(
  {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails![0]!.value
    const google_id = profile.id
    const name = profile.displayName

    try {
      const user = await prismaClient.user.upsert({
        where: {
          email,
        },
        create: {
          email,
          google_id,
          name,
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        update: {},
      })

      console.log(user)

      if (!user) return done(null)

      return done(null, user)
    } catch (error) {
      return done(error as Error)
    }
  },
)
