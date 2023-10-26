import React, { useState } from 'react'
import { addDays, format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import { useSelector } from 'react-redux'
import 'react-day-picker/dist/style.css'

import { updateOrderDetails } from '../store/order.actions'


const pastMonth = new Date()

export function StayDate() {

  const order = useSelector(store => store.orderModule.order)

  const disabledDays = []
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  }
  const [range, setRange] = useState()
  const today = new Date()

  function setDateRange(range) {
    setRange(range)
    const date = {
      from: convertDateFormat(range.from),
      to: convertDateFormat(range.to)
    }
    onSetDate(date)
  }

  function onSetDate(date) {
    order.startDate = date.from
    order.endDate = date.to
    updateOrderDetails(order)
}

  function convertDateFormat(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are 0-based
    const year = dateObj.getFullYear();
    console.log(day);
    if(day === 'NaN') return 'SELECT'
    return `${day}/${month}/${year}`;
  }

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
        onSelect={setDateRange}
      />
    </section>
  )
}
