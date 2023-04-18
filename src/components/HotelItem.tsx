import React from "react"
import heartFilled from "../assets/Vector (2).svg"
import heartEmpty from "../assets/Vector.svg"
import house from "../assets/house.svg"
import Rating from "./Rating"
import classes from '../styles/FavouriteBtn.module.css'
import { HotelType } from "../types/common"

type HotelItemPropsType = {
  hotel: HotelType

  name: string
  date: string
  dayAmount: number
  price: number
  rating: number
  isFavourite?: boolean
  withImage?: boolean

  favHandler: (hotel: HotelType) => void
}

const HotelItem = ({
  hotel,
  name,
  date,
  dayAmount,
  price,
  rating,
  isFavourite,
  withImage,
  favHandler
}: HotelItemPropsType) => {

  const clickHandler = () => {
    favHandler(hotel)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: '85%' }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {withImage && (
          <div
            style={{
              display: "flex",
              borderRadius: "50%",
              height: 64,
              width: 64,
              backgroundColor: "rgba(65, 82, 46, 0.05)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img height={35} src={house} />
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            overflow: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontSize: 17, fontWeight: 300 }}>{name}</p>
            {isFavourite ? <img onClick={clickHandler} className={classes.btn} src={heartFilled} /> : <img onClick={clickHandler} className={classes.btn} src={heartEmpty} />}
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#878787",
              }}
            >
              {date} - {dayAmount} {dayAmount === 1 ? 'день' : dayAmount < 5 ? 'дня' : 'дней'}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flex: withImage ? 75 : 6 }}>
              <Rating rating={rating} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: withImage ? 25 : 4,
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 300 }}>Price:</p>
              <p>{price}₽</p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "8px 0px",
          width: "100%",
          background: "rgba(135, 135, 135, 0.2)",
          height: 1,
        }}
      />
    </div>
  )
}

export default HotelItem
