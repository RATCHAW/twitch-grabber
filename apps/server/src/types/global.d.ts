import { Express } from "express"

declare global {
  namespace Express {
    export interface User {
      id: number
      google_id: string
    }
  }
}
