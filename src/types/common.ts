export type HotelType = {
  hotelId: number
  hotelName: string
  location: {
    country: string
    geo: { lon: number; lat: number }
    name: string
    state: any
  }
  locationId: number
  priceAvg: number
  priceFrom: number
  pricePercentile: {
    3: number
    10: number
    35: number
    50: number
    75: number
    99: number
  }
  stars: number
}
