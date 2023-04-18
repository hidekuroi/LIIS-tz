import axios from "axios"
import { HotelType } from "../types/common"

export const instance = axios.create({
  baseURL: "https://engine.hotellook.com/api/v2",
  withCredentials: false,
})

export type HotelResponseType = {
  data: Array<HotelType>
  status: number
  statusText: string
}
