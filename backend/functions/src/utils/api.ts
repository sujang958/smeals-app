import axios from "axios"
import { config } from "dotenv"

config()

const client = axios.create({
  baseURL: "https://open.neis.go.kr/hub",
})

export default client

export const DEFAULT_ARGS = {
  type: "json",
  key: process.env.NEIS_KEY as string,
  pSize: 200,
}
