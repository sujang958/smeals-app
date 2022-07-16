import * as functions from "firebase-functions"
import V1App from "./v1"

export const v1 = functions.https.onRequest(V1App)
