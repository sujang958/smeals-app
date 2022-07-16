import { AxiosError } from "axios"
import { RequestHandler } from "express"
import client, { DEFAULT_ARGS } from "../../utils/api"
import { ErrorResponse } from "../types/errorResponse"

const Schools: RequestHandler = async (req, res) => {
  try {
    const { data } = await client.get("/schoolInfo", {
      params: {
        ...DEFAULT_ARGS,
        SCHUL_NM: "query" in req.query ? req.query.query : "교",
      },
    })

    if (!("schoolInfo" in data))
      return res.status(404).send({
        ok: false,
        statusCode: 404,
        message: "Can't find schools",
      } as ErrorResponse)

    const schools = data.schoolInfo[1].row as any[]

    res.send(
      schools.map((school) => ({
        code: school.SD_SCHUL_CODE,
        scCode: school.ATPT_OFCDC_SC_CODE,
        name: school.SCHUL_NM,
        where: school.ORG_RDNMA,
        site: school.HMPG_ADRES,
      }))
    )
  } catch (e) {
    if (e instanceof AxiosError)
      return res.status(404).send({
        ok: false,
        statusCode: 404,
        message: "Can't find schools",
      } as ErrorResponse)

    res.status(500).send({
      ok: false,
      statusCode: 500,
      message: "Something went wrong on the server",
    } as ErrorResponse)
  }
}

export default Schools
