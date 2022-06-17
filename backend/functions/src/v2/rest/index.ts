import Koa from "koa"
import Router from "@koa/router"

import Schools from "./routes/schools"
import Meals from "./routes/meals"
import cors from "@koa/cors"

const app = new Koa()
const router = new Router({ prefix: "/v2" })

router.get("/schools", Schools)
router.get("/meals", Meals)

app.use((ctx, next) => {
  console.log(ctx.URL)
  ctx.res.setHeader("Content-Type", "application/json")
  next()
})
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

export default app
