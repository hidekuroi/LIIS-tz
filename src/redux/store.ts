import { configureStore } from "@reduxjs/toolkit"
import appReducer from "../features/app/appSlice"
import createSagaMiddleWare from "redux-saga"
import rootSaga from "../saga"

const saga = createSagaMiddleWare()

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: [saga],
})

saga.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
