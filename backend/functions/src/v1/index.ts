import * as Express from "express"
import * as Cors from "cors"
import Schools from "./routes/schools"
import Meals from "./routes/meals"

const V1App = Express()

V1App.use(Cors())
V1App.use((_, res) => res.set("Content-Type", "application/json"))

V1App.get("/schools", Schools)
V1App.get("/meals", Meals)

export default V1App
