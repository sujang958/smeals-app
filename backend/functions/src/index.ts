import * as functions from "firebase-functions"
import { default as V1_RESTServer } from "./v1/rest"
import { default as V2_RESTServer } from "./v2/rest"
import V2_GQLServer from "./v2/graphql"

import "dotenv/config"

const SERVER_REGION = "us-central1"

export const meals = functions.https.onRequest(V1_RESTServer.callback())

export const V1 = functions
  .region(SERVER_REGION)
  .https.onRequest(V1_RESTServer.callback())

export const V2_REST = functions
  .region(SERVER_REGION)
  .https.onRequest(V2_RESTServer.callback())

export const V2_GRAPHQL = functions
  .region(SERVER_REGION)
  .https.onRequest(V2_GQLServer)

// first: asia-northeast3 (seoul) second: asis-northeast2 (osaka) third: us-west1 (origun)
