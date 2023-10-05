import React, { useState } from 'react'
import { addDays, format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const css = `
.rdp-day_range_start,.rdp-day_range_end,.rdp-day_range_start:hover,.rdp-day_range_end:hover {
  background-color: rgb(0 0 0);
}

.rdp-day_range_middle {
  background-color: rgb(247 247 247);
  color: black;
}

.rdp-day_range_middle:hover {
  background-color: rgb(247 247 247);
  color: black;
  
}
.rdp:not([dir='rtl']) .rdp-day_range_start:not(.rdp-day_range_middle){
  
}

.rdp-button:hover:not([disabled]):hover {
  border: black 1px solid;
}
`

const pastMonth = new Date()

export function StayDate() {
  const disabledDays = []
  const defaultSelected = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  }
  const [range, setRange] = useState(defaultSelected)

  let footer = <p>Please pick the first day.</p>
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}-{format(range.to, 'PPP')}
        </p>
      )
    }
  }

  return (
    <>
      <style>{css}</style>
      <DayPicker disabled={disabledDays} id='test' mode='range' defaultMonth={pastMonth} numberOfMonths={2} selected={range} onSelect={setRange} />
    </>
  )
}
