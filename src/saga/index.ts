import { call, put, fork, takeEvery } from "redux-saga/effects"
import { hotelsAPI } from "../api/hotels-api"
import { HotelResponseType } from "../api/api"
import { setHotels } from "../features/app/appSlice"

type YieldType = any

export function* handleGetHotels(
  action: any
): Generator<YieldType, any, HotelResponseType> {
  try {
    const response = yield call(
      hotelsAPI.getHotels,
      action.payload?.location,
      action.payload?.checkIn,
      action.payload?.checkOut
    )
    yield put(setHotels(response.data))
  } catch (e) {
    yield put(setHotels([]))
  }
}

export function* watchGetHotels() {
  yield takeEvery("app/getHotels", handleGetHotels)
}

export default function* rootSaga() {
  yield watchGetHotels()
}
