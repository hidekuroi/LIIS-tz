import React from "react"
import img from "../assets/car1.png"
import img1 from "../assets/car2.png"
import img2 from "../assets/car3.png"
import { HotelType } from "../types/common"

type CarouselPropsType = {
  hotels?: HotelType[]
}

const Carousel = React.memo(({ hotels }: CarouselPropsType) => {
  let imgArr = []

  for (let i = 0; i < 9; i++) {
    let randomValue = Math.floor(Math.random() * 3)
    randomValue === 0
      ? imgArr.push(img)
      : randomValue === 1
      ? imgArr.push(img1)
      : imgArr.push(img2)
  }

  return (
    <div style={{ width: "38vw", display: "flex", gap: 12, overflowX: "auto" }}>
      {/* <div style={{position: 'absolute', color: 'red'}}>{`<`}</div> */}
      <div style={{ display: "flex" }}>
        {imgArr.map((i, index) => (
          <img key={index} src={i} />
        ))}
      </div>
    </div>
  )
})

export default Carousel
