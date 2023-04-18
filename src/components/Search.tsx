import React, { useCallback, useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { changeParams, getHotels } from "../features/app/appSlice"
import { dateToString } from "../utils/dateToString"

const Search = React.memo(() => {
  const currentDate = useTypedSelector((state) => state.app.date)
  const defaultLocation = useTypedSelector((state) => state.app.location)

  const dispatch = useAppDispatch()

  const [date, setDate] = useState<string>(dateToString(currentDate))
  const [location, setLocation] = useState<string>(defaultLocation)
  const [dayAmount, setDayAmount] = useState<number>(1)

  const handleChangeLocation = useCallback((text: string) => {
    setLocation(text)
  }, [])

  const handleChangeDate = useCallback((text: string) => {
    setDate(text)
  }, [])

  const handleChangeDayAmount = useCallback((days: string) => {
    setDayAmount(Number(days))
  }, [])

  const handleSearch = () => {
    let tempDate = new Date(date)
    let checkInDate = dateToString(tempDate)
    let checkOutDate = dateToString(
      new Date(tempDate.getTime() + 86400000 * dayAmount)
    )

    dispatch(
      getHotels({
        location,
        checkIn: checkInDate,
        checkOut: checkOutDate,
      })
    )
    dispatch(changeParams({ date: tempDate, daysAmount: dayAmount, location }))
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "85%",
        height: "100%",
        justifyContent: "space-between",
        margin: 32,
        gap: 16,
      }}
    >
      <Input title="Локация" value={location} onChange={handleChangeLocation} />
      <Input
        title="Дата заселения"
        type="date"
        value={date}
        onChange={handleChangeDate}
      />
      <Input
        title="Количество дней"
        onChange={handleChangeDayAmount}
        value={dayAmount}
        type="number"
      />
      <div style={{ marginTop: 16 }}>
        <Button title="Найти" onClick={handleSearch} />
      </div>
    </div>
  )
})

export default Search
