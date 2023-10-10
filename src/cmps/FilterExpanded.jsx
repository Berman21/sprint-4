import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_EXPANDED_HEADER_MODAL, OPEN_EXPANDED_HEADER_MODAL } from '../store/system.reducer'
import { StayFilter } from './StayFilter'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { useClickOutside } from '../customHooks/useCloseModule'
import { store } from '../store/store'
import { LongTxt } from './LongTxt'
import { StayDate } from './StayDate'
import { StayLocation } from './StayLocation'
import searchFilter from '../assets/img/search-filter.svg'
import { StayGusts } from './StayGuests'
import { CountryFilter } from './CountryFilter'

export function FilterExpanded({ onSetFilter, filterBy, isFilterExpanded, selectedFilterBox, onSetSelectedFilterBox, setSelectedFilterBox }) {
  const isExpandedModalOpen = useSelector((storeState) => storeState.systemModule.isExpandedModalOpen)
  const [filterByToEdit, setFilterByToEdit] = useState({ country: '', ...filterBy })

  const isFirstTimeExpandedRef = useRef(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFilterExpanded) isFirstTimeExpandedRef.current = true
  }, [isFilterExpanded])
  const modalContainerRef = useRef(null)

  // function handleChange({ target }) {
  //   const field = target.name
  //   const value = target.type === 'number' ? +target.value : target.value
  //   setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  // }

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

  function handleItemClick(item) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, country: item }))
  }

  function onClickModal() {
    if (isFilterExpanded) {
      if (!isFirstTimeExpandedRef.current) {
        dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
        setSelectedFilterBox('all')
      } else {
        dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
      }
      isFirstTimeExpandedRef.current = false
    }
  }

  const dropdownRef = useClickOutside(() => {
    if (modalContainerRef.current && modalContainerRef.current.contains(event.target)) {
      return
    }
    onClickModal()
  })

  // function displayGuestsFilter() {
  //   // ******** At least 1 Adult from this point ********
  //   let guestsStr = ''
  //   const guests = filterBy.guests.adults + filterBy.guests.children
  //   guestsStr += `${guests} ${guests > 1 ? 'guests' : 'guest'}` //keep it guests/guests in case of i18
  //   const infants = filterBy.guests.infants
  //   if (infants > 0) {
  //     guestsStr += ` ,${infants} ${infants > 1 ? 'infants' : 'infant'}`
  //   }
  //   const pets = filterBy.guests.pets
  //   if (pets > 0) {
  //     guestsStr += ` ,${pets} ${pets > 1 ? 'pets' : 'pet'}`
  //   }
  //   return guestsStr
  // }

  return (
    <section className={`filter-expanded-container full ${isFilterExpanded ? '' : 'folded'}`}>
      <section className={`filter-expanded ${selectedFilterBox === 'all' ? ' all' : ''}`}>
        <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name='where' onClick={onSetSelectedFilterBox}>
          <section className='where'>
            <h3>Where</h3>
            <StayFilter handleChange={handleChange} filterByToEdit={filterByToEdit} onSetFilter={onSetFilter} />
          </section>
        </article>

        <article
          className={`check-in-container${selectedFilterBox === 'check-in' ? ' active' : ''}`}
          name='check-in'
          onClick={onSetSelectedFilterBox}
        >
          <section className='check-in'>
            <h3>Check in</h3>
            <span>{filterBy ? format(filterBy, 'y-MM-dd') : 'Add dates'}</span>
          </section>
        </article>

        <article
          className={`check-out-container${selectedFilterBox === 'check-out' ? ' active' : ''}`}
          name='check-out'
          onClick={onSetSelectedFilterBox}
        >
          <section className='check-out'>
            <h3>Check out</h3>
            <span>{filterBy ? format(filterBy, 'y-MM-dd') : 'Add dates'}</span>
          </section>
        </article>

        <article className={`who-container${selectedFilterBox === 'who' ? ' active' : ''}`} name='who' onClick={onSetSelectedFilterBox}>
          <section className='who-search'>
            <section className='who'>
              <h3>Who</h3>
              <span>
                Add guests
                {/* {filterBy.guests.adults > 0 ? <LongTxt txt={displayGuestsFilter()} length={11} askShowMore={false} /> : } */}
              </span>
            </section>
            <section className='btn-search-container'>
              <button className='btn-filter'>
                <img src={searchFilter} />
              </button>
            </section>
          </section>
        </article>

        <div className='size-less'>
          {isExpandedModalOpen && selectedFilterBox !== 'all' && (
            <div className={`modal ${`${selectedFilterBox}-modal`}`}>
              {selectedFilterBox === 'where' && (
                <>
                  <CountryFilter handleItemClick={handleItemClick} /> <StayLocation handleItemClick={handleItemClick} />
                </>
              )}
              {(selectedFilterBox === 'check-in' || selectedFilterBox === 'check-out') && <StayDate />}
              {selectedFilterBox === 'who' && <StayGusts />}
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
