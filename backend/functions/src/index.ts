import * as functions from "firebase-functions"
import { default as V1_RESTServer } from "./v1/rest"
import { default as V2_RESTServer } from "./v2/rest"
import V2_GQLServer from "./v2/graphql"

import "dotenv/config"

const HOSTING_SERVER_REGION = "us-central1"
const SERVER_REGION = "asia-northeast3"

export const meals = functions.https.onRequest(V1_RESTServer.callback())

export const pubusb = functions.pubsub.topic('').onPublish

export const v1 = functions
  .region(SERVER_REGION)
  .https.onRequest(V1_RESTServer.callback())

export const v2 = functions
  .region(SERVER_REGION)
  .https.onRequest(V2_RESTServer.callback())

export const V2_GRAPHQL = functions
  .region(HOSTING_SERVER_REGION)
  .https.onRequest(V2_GQLServer)

// first: asia-northeast3 (seoul) second: asis-northeast2 (osaka) third: us-west1 (origun)
