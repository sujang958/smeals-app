import axios from "axios"

const api = axios.create({
  baseURL: "https://asia-northeast3-smeals-school.cloudfunctions.net/meals",
})

export default api
