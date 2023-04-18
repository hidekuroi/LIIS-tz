import React, { useEffect, useState } from "react"
import HotelItem from "./HotelItem"
import chevron from "../assets/select.svg"
import classes from "../styles/FavouriteBtn.module.css"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { HotelType } from "../types/common"
import { HotelTypeWithDate, deleteFavourite } from "../features/app/appSlice"

const Favourites = React.memo(() => {
  const hotels = useTypedSelector((state) => state.app.favourites)
  const dispatch = useAppDispatch()

  const [sortMode, setSortMode] = useState<0 | 1 | 2 | 3>(0)
  const [sortedHotels, setSortedHotels] = useState<HotelTypeWithDate[]>([])

  useEffect(() => {
    if (hotels.length > 1) {
      let arrForSort = [...hotels]
      setSortedHotels(
        arrForSort.sort((a, b) => {
          switch (sortMode) {
            case 0:
              return b.stars - a.stars
            case 1:
              return a.stars - b.stars
            case 2:
              return b.priceAvg - a.priceAvg
            default:
              return a.priceAvg - b.priceAvg
          }
        })
      )
    } else {
      setSortedHotels([...hotels])
    }
  }, [sortMode, hotels])

  const deleteFav = (hotel: HotelType) => {
    dispatch(deleteFavourite(hotel.hotelId))
  }

  const ratingHandler = () => {
    switch (sortMode) {
      case 0:
        setSortMode(1)
        break
      case 1:
        setSortMode(0)
        break
      default:
        setSortMode(0)
        break
    }
  }

  const priceHandler = () => {
    switch (sortMode) {
      case 2:
        setSortMode(3)
        break
      case 3:
        setSortMode(2)
        break
      default:
        setSortMode(2)
        break
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "85%",
          gap: 12,
          marginTop: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <h3>Избранное</h3>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border:
                sortMode === 0 || sortMode === 1
                  ? "1px solid #41522E"
                  : "1px solid #E5E5E5",
              borderRadius: 4,
              padding: "4px 8px",
              display: "flex",
              color: sortMode === 0 || sortMode === 1 ? "#41522E" : "#99A0A3",
              gap: 8,
            }}
            onClick={ratingHandler}
          >
            <p>Рейтинг</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                style={{ opacity: sortMode === 0 ? 1 : 0.5 }}
                src={chevron}
              />
              <img
                style={{
                  transform: "rotate(180deg)",
                  opacity: sortMode === 1 ? 1 : 0.5,
                }}
                src={chevron}
              />
            </div>
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              border:
                sortMode === 2 || sortMode === 3
                  ? "1px solid #41522E"
                  : "1px solid #E5E5E5",
              borderRadius: 4,
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: sortMode === 2 || sortMode === 3 ? "#41522E" : "#99A0A3",
            }}
            onClick={priceHandler}
          >
            <div>Цена</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                style={{ opacity: sortMode === 2 ? 1 : 0.5 }}
                src={chevron}
              />
              <img
                style={{
                  transform: "rotate(180deg)",
                  opacity: sortMode === 3 ? 1 : 0.5,
                }}
                src={chevron}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          overflowY: "auto",
          height: "30.5vh",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {sortedHotels.length ? (
          <>
            {sortedHotels.map((h) => (
              <HotelItem
                key={h.hotelId}
                hotel={h}
                date={h.date}
                dayAmount={h.dayAmount}
                name={h.hotelName}
                price={h.priceAvg}
                rating={h.stars}
                isFavourite
                favHandler={deleteFav}
              />
            ))}
          </>
        ) : (
          <p>Нет избранных</p>
        )}
      </div>
    </div>
  )
})

export default Favourites
