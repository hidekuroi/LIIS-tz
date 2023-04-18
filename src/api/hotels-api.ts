import { HotelResponseType, instance,  } from "./api"

export type IsAuthResponseType = {
  id: number
  email: string
  login: string
}

export const hotelsAPI = {
  getHotels(location = 'Москва', checkIn = `2023-04-18`, checkOut= `2023-04-19`, limit = 10) {
    return instance
      .get<HotelResponseType>(`cache.json?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&currency=rub`)
      .then((response) => response)
  },
}
