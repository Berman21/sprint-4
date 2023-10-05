import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { CLOSE_EXPANDED_HEADER_MODAL, OPEN_EXPANDED_HEADER_MODAL } from '../store/system.reducer'
import { StayFilter } from './StayFilter'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { useClickOutside } from '../customHooks/useCloseModule'
import { store } from '../store/store'
import { LongTxt } from './LongTxt'
import { StayDate } from './StayDate'

export function FilterExpanded({ onSetFilter, filterBy, isFilterExpanded, selectedFilterBox, onSetSelectedFilterBox, setSelectedFilterBox }) {
  const isExpandedModalOpen = useSelector((storeState) => storeState.systemModule.isExpandedModalOpen)
  const isFirstTimeExpandedRef = useRef(true)

  useEffect(() => {
    if (!isFilterExpanded) isFirstTimeExpandedRef.current = true
  }, [isFilterExpanded])

  const dropdownRef = useClickOutside(onClickModal)

  // function handleChange({ target }) {
  //   const field = target.name
  //   const value = target.type === 'number' ? +target.value : target.value
  //   setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  // }

  function onClickModal() {
    if (isFilterExpanded) {
      if (!isFirstTimeExpandedRef.current) {
        store.dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
        setSelectedFilterBox('all')
      } else {
        store.dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
      }
      isFirstTimeExpandedRef.current = false
    }
  }

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
      <section className={`filter-expanded ${selectedFilterBox === 'all' ? ' all' : ''}`} ref={dropdownRef}>
        <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name='where' onClick={onSetSelectedFilterBox}>
          <section className='where'>
            <h3 className='fs12 lh16 ff-circular-bold'>Where</h3>
            <StayFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          </section>
        </article>

        <article
          className={`check-in-container${selectedFilterBox === 'check-in' ? ' active' : ''}`}
          name='check-in'
          onClick={onSetSelectedFilterBox}
        >
          <section className='check-in'>
            <h3 className='fs12 lh16 ff-circular-bold'>Check in</h3>
            <span className='fs14 lh18'>{filterBy ? format(filterBy, 'y-MM-dd') : 'Add dates'}</span>
          </section>
        </article>

        <article
          className={`check-out-container${selectedFilterBox === 'check-out' ? ' active' : ''}`}
          name='check-out'
          onClick={onSetSelectedFilterBox}
        >
          <section className='check-out'>
            <h3 className='fs12 lh16 ff-circular-bold'>Check out</h3>
            <span className='fs14 lh18'>{filterBy ? format(filterBy, 'y-MM-dd') : 'Add dates'}</span>
          </section>
        </article>

        <article className={`who-container${selectedFilterBox === 'who' ? ' active' : ''}`} name='who' onClick={onSetSelectedFilterBox}>
          <section className='who-search'>
            <section className='who'>
              <h3 className='fs12 lh16 ff-circular-bold'>Who</h3>
              <span className='fs14 lh18'>
                {/* <StayDate /> */}
                Add guests
                {/* {filterBy.guests.adults > 0 ? <LongTxt txt={displayGuestsFilter()} length={11} askShowMore={false} /> : } */}
              </span>
            </section>
            <section className='btn-search-container'>
              <button
              // onClickButton={(ev) => onSubmit(ev)}
              // content={
              //   <section className='search'>
              //     <section className='svg-container'>{/* <SvgHandler svgName={SEARCH} /> */}</section>
              //     <span className='fs16 lh16'>Search</span>
              //   </section>
              // }
              // borderRadius={'32px'}
              />
            </section>
          </section>
        </article>

        {/* <div className='size-less'>
          {isExpandedModalOpen && selectedFilterBox !== 'all' && (
            <div className={`modal ${`${selectedFilterBox}-modal`}`}>
              {selectedFilterBox === 'where' && <LocationFilter filterBy={filterBy} onSubmit={onSubmit} handleChange={handleChange} />}
              {(selectedFilterBox === 'check-in' || selectedFilterBox === 'check-out') && (
                <DateFilter filterBy={filterBy} onSetFilterDates={onSetFilterDates} />
              )}
              {selectedFilterBox === 'who' && (
                <GuestCountFilter filterBy={filterBy} setFilterBy={setFilterBy} handleGuestCountChange={handleGuestCountChange} />
              )}
            </div>
          )}
        </div> */}
      </section>
    </section>
  )
}
