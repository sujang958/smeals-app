import Koa from "koa"
import Router from "@koa/router"

import Schools from "./routes/schools"
import Meals from "./routes/meals"
import cors from "@koa/cors"

const app = new Koa()
const router = new Router()

router.get("/schools", Schools)
router.get("/meals", Meals)

app.use((ctx, next) => {
  ctx.res.setHeader("Content-Type", "application/json")
  next()
})
app.use(cors())
app.use(router.routes()).use(router.allowedMethods())

export default app
