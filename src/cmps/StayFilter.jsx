import React, { useEffect } from 'react'
import { useState } from 'react'
import { utilService } from '../services/util.service'
import { useRef } from 'react'

export function StayFilter({ handleChange, onSetFilter, filterByToEdit }) {
  onSetFilter = useRef(utilService.debounce(onSetFilter))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  const { country } = filterByToEdit

  return (
    <React.Fragment>
      <input type='text' value={country} name='country' id='country' onChange={handleChange} placeholder='Search destinations' />
    </React.Fragment>
  )
}
