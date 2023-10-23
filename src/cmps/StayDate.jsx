import React, { useState } from 'react'
import { addDays, format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const pastMonth = new Date()

export function StayDate({ onSetDate }) {
  const disabledDays = []
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  }
  const [range, setRange] = useState()
  // const date = {
  //   from: range.from,
  //   to: range.to
  // }
  // onSetDate(date)
  const today = new Date()

  return (
    <section className='date-picker'>
      <DayPicker
        firstDayOfWeek={1}
        disabledDays={[new Date(), { daysOfWeek: [0, 6] }, { before: new Date() }]}
        // disabled={disabledDays}
        id='test'
        mode='range'
        defaultMonth={pastMonth}
        numberOfMonths={2}
        selected={range}
        onSelect={setRange}
      />
    </section>
  )
}
