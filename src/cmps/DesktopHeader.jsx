import logo from '../assets/img/Airbnb-Logo.png'
import search from '../assets/img/search.svg'
import hamburger from '../assets/img/hamburger.svg'
import userIcon from '../assets/img/user.svg'
import { store } from '../store/store'
import { CLOSE_EXPANDED_HEADER_MODAL, OPEN_EXPANDED_HEADER, OPEN_EXPANDED_HEADER_MODAL } from '../store/system.reducer'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FilterExpanded } from './FilterExpanded'
import { Link } from 'react-router-dom'

export function DesktopHeader({ onSetFilter }) {
  const [selectedExperience, setSelectedExperience] = useState('stays')
  const [selectedFilterBox, setSelectedFilterBox] = useState('where')
  const isFilterExpanded = useSelector((storeState) => storeState.systemModule.isFilterExpanded)

  function onExpandedFilter(ev) {
    ev.preventDefault()
    store.dispatch({ type: OPEN_EXPANDED_HEADER })
  }

  function onSetSelectedFilterBox(ev) {
    ev.preventDefault()
    store.dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
    const field = ev.currentTarget.getAttribute('name')
    if (selectedFilterBox !== field) setSelectedFilterBox(field)
  }

  function toggleSelected(ev) {
    ev.preventDefault()
    const field = ev.currentTarget.getAttribute('name')
    const value = ev.currentTarget.getAttribute('class')
    if (value === selectedExperience) return
    setSelectedExperience(`${field}`)
  }

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

  return (
    <header className='app-header'>
      <Link to={'/'} className='logo-container'>
        <img className='logo' src={logo} style={{ maxWidth: '100px' }} />
        <p>airbnb</p>
      </Link>
      {!isFilterExpanded && (
        <button className='any-container' onClick={onExpandedFilter}>
          <div className='search-txt anywhere'>Anywhere</div>
          <div className='separator'></div>
          <div className='search-txt any-week'>Any week</div>
          <div className='separator'></div>
          <div className='guests search-txt'>Add guests </div>
          <div className='search-container'>
            <div className='btn-search'>
              <img src={search} />
            </div>
          </div>
        </button>
      )}
      {isFilterExpanded && (
        <section className='searchbar'>
          <section className='experiences'>
            <article className={selectedExperience === 'stays' ? 'selected' : ''} name='stays' onClick={toggleSelected}>
              <span>Stays</span>
            </article>

            <article className={selectedExperience === 'experiences' ? 'selected' : ''} name='experiences' onClick={toggleSelected}>
              <span>Experiences</span>
            </article>

            <article className={selectedExperience === 'online' ? 'selected' : ''} name='online' onClick={toggleSelected}>
              <span>Online Experiences</span>
            </article>
          </section>
        </section>
      )}
      <button className='user-container'>
        <img className='hamburger' src={hamburger} />
        <img className='user-icon' src={userIcon} />
      </button>

      <FilterExpanded
        onSetFilter={onSetFilter}
        isFilterExpanded={isFilterExpanded}
        selectedFilterBox={selectedFilterBox}
        setSelectedFilterBox={setSelectedFilterBox}
        onSetSelectedFilterBox={onSetSelectedFilterBox}
      />
    </header>
  )
}
