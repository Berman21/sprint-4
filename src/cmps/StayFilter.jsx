import React, { useEffect } from 'react'
import { useState } from 'react'
import { utilService } from '../services/util.service'
import { useRef } from 'react'

export function StayFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ country: '', ...filterBy })

  onSetFilter = useRef(utilService.debounce(onSetFilter))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      case 'select-multiple':
        const selectedOptions = Array.from(target.selectedOptions, (option) => option.value)
        value = selectedOptions
        break

      default:
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { country } = filterByToEdit

  return (
    <React.Fragment>
      <input type='text' value={country} name='country' id='country' onChange={handleChange} placeholder='Search destinations' />
    </React.Fragment>
  )
}
