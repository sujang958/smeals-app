import { Middleware } from "@koa/router"
import axios from "axios"

const Schools: Middleware = async (ctx, next): Promise<any> => {
  const { name } = ctx.query
  if (!name) {
    ctx.status = 404
    ctx.header["content-type"] = "application/json"
    ctx.body = JSON.stringify({
      error: true,
      message: "학교 검색 결과가 없습니다.",
    })
    return next()
  }

  const { data } = await axios.get(
    `https://open.neis.go.kr/hub/schoolInfo?type=JSON&key=${
      process.env.NEIS_KEY
    }&SCHUL_NM=${encodeURIComponent(name as string)}`
  )
  if (!data.schoolInfo) {
    ctx.status = 404
    ctx.header["content-type"] = "application/json"
    ctx.body = JSON.stringify({
      error: true,
      message: `${data.RESULT.MESSAGE}`,
    })
    return next()
  }
  const rSchools: any[] = []
  const schools: any[] = data.schoolInfo[1].row
  schools.map((v) => {
    rSchools.push({
      code: v.SD_SCHUL_CODE,
      scCode: v.ATPT_OFCDC_SC_CODE,
      name: v.SCHUL_NM,
      where: v.ORG_RDNMA,
      site: v.HMPG_ADRES,
    })
  })
  ctx.status = 200
  ctx.header["content-type"] = "application/json"
  ctx.body = JSON.stringify({
    error: false,
    schools: rSchools,
  })
  return next()
}

export default Schools
