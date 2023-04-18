import React from "react"
import starFilled from "../assets/starFilled.svg"
import star from "../assets/star.svg"

type RatingPropsType = {
  rating: number
}

const Rating = ({ rating }: RatingPropsType) => {
  let filledArr: Array<number> = []
  let emptyArr: Array<number> = []

  for (let i = 0; i < rating; i++) {
    filledArr.push(i)
  }
  for (let k = 0; k < 5 - rating; k++) {
    emptyArr.push(5 - k)
  }
  return (
    <div>
      {filledArr.map((num) => (
        <img key={num} height={17} src={starFilled} />
      ))}
      {emptyArr.map((num) => (
        <img key={num} height={17} src={star} />
      ))}
    </div>
  )
}

export default Rating
