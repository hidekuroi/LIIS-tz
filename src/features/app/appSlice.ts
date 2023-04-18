import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HotelResponseType } from "../../api/api"
import { HotelType } from "../../types/common"

export type HotelTypeWithDate = HotelType & {
  date: string
  dayAmount: number
}

interface AppStateType {
  isFetching: boolean
  hotels: Array<HotelType>
  favourites: Array<HotelTypeWithDate>

  favouritesCount: number

  daysAmount: number
  location: string
  date: Date
}

const currentDate = new Date()

const initialState: AppStateType = {
  isFetching: false,
  hotels: [],
  favourites: [],

  favouritesCount: 0,

  daysAmount: 1,
  location: "Москва",
  date: currentDate,
}

//*REDUCER
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    getHotels(
      state,
      action: PayloadAction<{
        location: string
        checkIn: string
        checkOut: string
      }>
    ) {
      state.isFetching = true
    },
    setHotels(state, action: PayloadAction<Array<HotelType>>) {
      state.hotels = action.payload
      state.isFetching = false
    },
    addFavourite(state, action: PayloadAction<HotelTypeWithDate>) {
      state.favourites.push(action.payload)
      state.favouritesCount += 1
    },
    deleteFavourite(state, action: PayloadAction<number>) {
      state.favourites = state.favourites.filter(
        (h) => h.hotelId !== action.payload
      )
      state.favouritesCount = state.favourites.length
    },
    changeParams(
      state,
      action: PayloadAction<{
        location: string
        date: Date
        daysAmount: number
      }>
    ) {
      state.location = action.payload.location
      state.daysAmount = action.payload.daysAmount
      state.date = action.payload.date
    },
  },
})

export const {
  getHotels,
  setHotels,
  addFavourite,
  deleteFavourite,
  changeParams,
} = appSlice.actions

export default appSlice.reducer
