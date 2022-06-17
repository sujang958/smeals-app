import { Middleware } from "@koa/router"
import axios from "axios"

const Meals: Middleware = async (ctx, next): Promise<any> => {
  const { code, scCode, date } = ctx.query
  if (!code || !scCode) {
    ctx.status = 400
    ctx.body = JSON.stringify({
      error: true,
      message: "Meals are not found",
    })
    return next()
  }
  const { data } = await axios.get(
    `https://open.neis.go.kr/hub/mealServiceDietInfo?type=JSON&key=${
      process.env.NEIS_KEY
    }&SD_SCHUL_CODE=${code}&ATPT_OFCDC_SC_CODE=${scCode}${
      date ? `&MLSV_YMD=${date}` : ""
    }`
  )
  if (!data.mealServiceDietInfo) {
    ctx.status = 404
    ctx.body = JSON.stringify({
      error: true,
      message: `${data.RESULT.MESSAGE}`,
    })
    return next()
  }
  const mealSources: any[] = data.mealServiceDietInfo[1].row
  const meals: any[] = []
  mealSources.map((v) => {
    meals.push({
      date: v.MLSV_YMD,
      type: v.MMEAL_SC_NM,
      school: v.SD_SCHUL_NM,
      meal: v.DDISH_NM.split(/<br*\/>/),
      calories: v.CAL_INFO,
      nutrient: v.NTR_INFO.split(/<br*\/>/).map((v: any) => ({
        name: v.split(" : ")[0],
        value: v.split(" : ")[1],
      })),
    })
  })

  ctx.status = 200
  ctx.body = JSON.stringify({
    error: false,
    meals,
  })
  return next()
}

export default Meals
