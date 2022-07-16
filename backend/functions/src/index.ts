import * as functions from "firebase-functions"
import V1App from "./v1"

export const v1 = functions
  .region("asia-northeast3", "asia-northeast2")
  .https.onRequest(V1App)
