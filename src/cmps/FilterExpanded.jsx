import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { OPEN_EXPANDED_HEADER_MODAL } from '../store/system.reducer'

export function FilterExpanded({ isFilterExpanded, selectedFilterBox, onSetSelectedFilterBox }) {
  const isExpandedModalOpen = useSelector((storeState) => storeState.systemModule.isExpandedModalOpen)
  const isFirstTimeExpandedRef = useRef(true)

  useEffect(() => {
    if (!isFilterExpanded) isFirstTimeExpandedRef.current = true
  }, [isFilterExpanded])

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  }
  return (
    <section className={`filter-expanded-container full ${isFilterExpanded ? '' : 'folded'}`}>
      <section className={`filter-expanded ${selectedFilterBox === 'all' ? ' all' : ''}`}>
        <article className={`where-container${selectedFilterBox === 'where' ? ' active' : ''}`} name='where' onClick={onSetSelectedFilterBox}>
          <section className='where'>
            <h3 className='fs12 lh16 ff-circular-bold'>Where</h3>
            <input
              autoComplete='off'
              className='fs14 lh18'
              name='filterText'
              //   value={filterBy.filterText}
              //   onChange={handleChange}
              placeholder='Search destinations'
            ></input>
          </section>
        </article>
      </section>
    </section>
  )
}
