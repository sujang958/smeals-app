import { AxiosError } from "axios"
import { RequestHandler } from "express"
import client, { DEFAULT_ARGS } from "../../utils/api"
import { ErrorResponse } from "../types/errorResponse"

const Meals: RequestHandler = async (req, res) => {
  const { code, scCode, date } = req.query
  if (!code || !scCode || !date)
    return res.status(400).send({
      ok: false,
      statusCode: 400,
      message: "Missing query",
    } as ErrorResponse)
  if (date.length !== 8 || isNaN(Number(date)))
    return res.status(400).send({
      ok: false,
      statusCode: 400,
      message: "Wrong date format",
    } as ErrorResponse)

  try {
    const { data } = await client.get("/mealServiceDietInfo", {
      params: {
        ...DEFAULT_ARGS,
        SD_SCHUL_CODE: code,
        ATPT_OFCDC_SC_CODE: scCode,
        MLSV_YMD: date,
      },
    })

    if (!("mealServiceDietInfo" in data))
      return res.status(404).send({
        ok: false,
        statusCode: 404,
        message: "Can't find meals",
      } as ErrorResponse)

    const mealSource = data.mealServiceDietInfo[1].row as any[]

    return res.send({
      meals: mealSource.map((mealSrc) => ({
        kcal: mealSrc.CAL_INFO,
        type: mealSrc.MMEAL_SC_NM,
        date: mealSrc.MLSV_YMD,
        dishes: (mealSrc.DDISH_NM as string)
          .split("<br/>")
          .map((dish) => dish.split("(")[0].trim().replace(/\*/gi, "")),
        nutrients: (mealSrc.NTR_INFO as string)
          .split("<br/>")
          .map((ntrSrc) => ntrSrc.split(":"))
          .map(([name, value]) => [name.trim(), value.trim()]),
      })),
      schoolName: mealSource[0].ATPT_OFCDC_SC_NM,
    })
  } catch (e) {
    if (e instanceof AxiosError)
      return res.status(404).send({
        ok: false,
        statusCode: 404,
        message: "Can't find meals",
      } as ErrorResponse)

    return res.status(500).send({
      ok: false,
      statusCode: 500,
      message: "Something went wrong on the server",
    } as ErrorResponse)
  }
}

export default Meals
