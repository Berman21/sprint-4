import logo from '../assets/img/Airbnb-Logo.png'
import search from '../assets/img/search.svg'
import hamburger from '../assets/img/hamburger.svg'
import userIcon from '../assets/img/user.svg'
import { OPEN_EXPANDED_HEADER, OPEN_EXPANDED_HEADER_MODAL, SET_FOCUSED_MODAL } from '../store/system.reducer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterExpanded } from './FilterExpanded'
import { Link } from 'react-router-dom'
import { UserModal } from './UserModal'
import { LoginSignup } from './LoginSignup'
import { useClickOutside } from '../customHooks/useCloseModule'

export function DesktopHeader({ onSetFilter }) {
  const [selectedExperience, setSelectedExperience] = useState('stays')
  const [selectedFilterBox, setSelectedFilterBox] = useState('where')
  const isFilterExpanded = useSelector((storeState) => storeState.systemModule.isFilterExpanded)
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const dropdownRef = useClickOutside(onDropdownClickOutside)

  const dispatch = useDispatch()
  function toggleDropdown(ev) {
    ev.preventDefault()
    setIsDropdownActive((prevDropdown) => !prevDropdown)
  }

  function onDropdownClickOutside() {
    setIsDropdownActive(false)
  }

  function onExpandedFilter(ev) {
    ev.preventDefault()
    dispatch({ type: OPEN_EXPANDED_HEADER })
    dispatch({ type: SET_FOCUSED_MODAL })
  }

  function onSetSelectedFilterBox(ev) {
    ev.preventDefault()
    dispatch({ type: OPEN_EXPANDED_HEADER_MODAL })
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

  return (
    <>
      <header className='app-header'>
        <Link to={'/'} className='logo-container'>
          <img className='logo' src={logo} style={{ maxWidth: '100px' }} />
          <p>airbnb</p>
        </Link>
        {!isFilterExpanded && (
          <section className='any-container' onClick={onExpandedFilter}>
            <button>
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
          </section>
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
        {/* <LoginSignup /> */}
        <section className='user-container' onClick={(ev) => toggleDropdown(ev)} ref={dropdownRef}>
          <button className='user-btn'>
            <img className='hamburger' src={hamburger} />
            <img className='user-icon' src={userIcon} />
          </button>
          {isDropdownActive && <UserModal setIsDropdownActive={setIsDropdownActive} />}
        </section>
      </header>

      <FilterExpanded
        onSetFilter={onSetFilter}
        isFilterExpanded={isFilterExpanded}
        selectedFilterBox={selectedFilterBox}
        setSelectedFilterBox={setSelectedFilterBox}
        onSetSelectedFilterBox={onSetSelectedFilterBox}
      />
    </>
  )
}
