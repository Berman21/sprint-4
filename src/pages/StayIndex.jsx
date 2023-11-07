import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.js'
import { StayList } from '../cmps/StayList.jsx'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL, REMOVE_FOCUSED_MODAL } from '../store/system.reducer.js'
import { useDispatch } from 'react-redux'
import { FilterCarousel } from '../cmps/FilterCarousel.jsx'
import { Modal } from '../cmps/Modal.jsx'

import filterSvg from '../assets/img/filterSvg.svg'
import { StayFilter } from '../cmps/StayFilter.jsx'
import footerImg from '../assets/img/footer.svg'
import { AppHeader } from '../cmps/AppHeader.jsx'
import useIsMobile from '../customHooks/useIsMobile.js'

export function StayIndex({ filterByToEdit, setFilterByToEdit }) {
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const dispatch = useDispatch()
  const [isStayFilterOpen, toggleStayFilterOpen] = useState(false)
  const [isModalActive, setIsModalActive] = useState(false)
  const isMobile = useIsMobile()


  useEffect(() => {
    loadStays(filterBy)
  }, [filterBy])

  useEffect(() => {
    function handleScroll() {
      dispatch({ type: CLOSE_EXPANDED_HEADER })
      dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
      dispatch({ type: REMOVE_FOCUSED_MODAL })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  async function onRemoveStay(stayId) {
    try {
      await removeStay(stayId)
      showSuccessMsg('Stay removed')
    } catch (err) {
      showErrorMsg('Cannot remove stay')
    }
  }

  async function onAddStay() {
    const stay = stayService.getEmptyStay()
    stay.title = prompt('Title?')
    try {
      const savedStay = await addStay(stay)
      showSuccessMsg(`Stay added (id: ${savedStay._id})`)
    } catch (err) {
      showErrorMsg('Cannot add stay')
    }
  }

  async function onUpdateStay(stay) {
    const price = +prompt('New price?')
    const staytoSave = { ...stay, price }
    try {
      const savedStay = await updateStay(staytoSave)
      showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
    } catch (err) {
      showErrorMsg('Cannot update stay')
    }
  }

  function onAddStayMsg(stay) {
    console.log(`TODO Adding msg to stay`)
  }
  function shouldShowActionBtns(stay) {
    const user = userService.getLoggedinUser()
    if (!user) return false
    if (user.isAdmin) return true
    return stay.owner?._id === user._id
  }

  function toggleStayFilter() {
    toggleStayFilterOpen(!isStayFilterOpen)
  }

  return (
    <>
      {appModal && <Modal modalHeaderContent={<h3>Log in or sign up</h3>} isModalActive={isModalActive} setIsModalActive={setIsModalActive} modalType={appModal} />}
      <AppHeader filterByToEdit={filterByToEdit} setIsModalActive={setIsModalActive} setFilterByToEdit={setFilterByToEdit} />

      <div>

        <section className='category-carousel-container'>

          <section className='category-carousel'>
            <FilterCarousel setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} filterBy={filterBy} />
          </section>

          {!isMobile && <section className='filter-btn-container'>
            <button className='filter-btn' onClick={toggleStayFilter}><img src={filterSvg} />Filters</button>
          </section>
          }

        </section>
        {isStayFilterOpen &&
          <StayFilter toggleStayFilter={toggleStayFilter} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />}
        <main>
          <StayList filterBy={filterBy} stays={stays} />

        </main>
        {!isMobile && <footer className='app-footer'>
          <div><span className='footer-airbnb'>© 2023 Airbnb, Inc.</span> <span className='footer-dot'>·</span> Terms <span className='footer-dot'>·</span> Sitemap <span className='footer-dot'>·</span>  Privacy <span className='footer-dot'>·</span> Your Privacy Choices  <img src={footerImg} /></div>
        </footer>
        }

        {isMobile && <footer className='mobile-footer'>

        </footer>}
      </div>
    </>

  )
}
