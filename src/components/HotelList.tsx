import React from "react"
import HotelItem from "./HotelItem"
import Carousel from "./Carousel"
import chevronRight from "../assets/chevronRIght.svg"
import { HotelType } from "../types/common"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { addFavourite, deleteFavourite } from "../features/app/appSlice"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { dateToString } from "../utils/dateToString"

const HotelList = React.memo(() => {
  const hotels = useTypedSelector((state) => state.app.hotels)
  const favs = useTypedSelector((state) => state.app.favourites)
  const favCount = useTypedSelector((state) => state.app.favouritesCount)
  const isFetching = useTypedSelector((state) => state.app.isFetching)
  const location = useTypedSelector((state) => state.app.location)
  const date = useTypedSelector((state) => state.app.date)
  const daysAmount = useTypedSelector((state) => state.app.daysAmount)

  const dispatch = useAppDispatch()

  const formattedDate: string = date
    .toLocaleDateString("ru", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    .split(" г.")[0]

  const addToFav = (hotel: HotelType) => {
    dispatch(
      addFavourite({ ...hotel, date: formattedDate, dayAmount: daysAmount })
    )
  }

  const deleteFav = (hotel: HotelType) => {
    dispatch(deleteFavourite(hotel.hotelId))
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        gap: 28,
      }}
    >
      <div
        style={{
          width: "85%",
          flexDirection: "column",
          display: "flex",

          gap: 28,
        }}
      >
        <div
          style={{
            marginTop: 48,
            width: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 6,
              alignItems: "center",
              gap: 20,
            }}
          >
            <h2 style={{ fontSize: 32 }}>Отели</h2>
            <img height={17} width={11} src={chevronRight} />
            <h3 style={{ fontSize: 32 }}>{location}</h3>
          </div>
          <div
            style={{
              flex: 4,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p style={{ fontWeight: 400, fontSize: 24 }}>{formattedDate}</p>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <Carousel hotels={hotels} />
        </div>
        <div style={{ width: "100%" }}>
          <p style={{ fontWeight: 300, fontSize: 17 }}>
            Добавлено в Избранное:{" "}
            <span style={{ fontWeight: 500 }}>{favCount}</span> отеля
          </p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          overflowY: "auto",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isFetching ? (
          <>Загрузка...</>
        ) : hotels?.length ? (
          hotels.map((h) => {
            let isFav = favs.find((f) => f.hotelId === h.hotelId) ? true : false
            return (
              <HotelItem
                hotel={h}
                date={formattedDate}
                dayAmount={daysAmount}
                name={h.hotelName}
                price={h.priceAvg}
                rating={h.stars}
                isFavourite={isFav}
                key={h.hotelId}
                withImage={true}
                favHandler={isFav ? deleteFav : addToFav}
              />
            )
          })
        ) : (
          <>Нет результатов</>
        )}
      </div>
    </div>
  )
})

export default HotelList
