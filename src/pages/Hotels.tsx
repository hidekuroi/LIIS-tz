import React, { useEffect } from "react"
import Card from "../components/Card"
import Header from "../components/Header"
import Favourites from "../components/Favourites"
import Search from "../components/Search"
import HotelList from "../components/HotelList"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { getHotels } from "../features/app/appSlice"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { dateToString } from "../utils/dateToString"
import { useNavigate } from "react-router-dom"

const Hotels = () => {
  const dispatch = useAppDispatch()
  const checkInDate = useTypedSelector((state) => state.app.date)
  const dayAmount = useTypedSelector((state) => state.app.daysAmount)
  const location = useTypedSelector((state) => state.app.location)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      dispatch(
        getHotels({
          location,
          checkIn: dateToString(checkInDate),
          checkOut: dateToString(
            new Date(checkInDate.getTime() + 86400000 * dayAmount)
          ),
        })
      )
    } else navigate("/login")
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 24,
            marginRight: "15vw",
            marginLeft: "15vw",
            height: "88vh",
            // marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              flex: 35,
              height: "100%",
            }}
          >
            <Card>
              <Search />
            </Card>
            <Card>
              <Favourites />
            </Card>
          </div>
          <div
            style={{
              display: "flex",
              flex: 65,
              // height: '80vh'
            }}
          >
            <Card>
              <HotelList />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hotels
