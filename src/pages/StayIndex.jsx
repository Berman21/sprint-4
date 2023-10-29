import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stayService } from '../services/stay.service.local.js'
import { StayList } from '../cmps/StayList.jsx'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL, REMOVE_FOCUSED_MODAL } from '../store/system.reducer.js'
import { useDispatch } from 'react-redux'
import { FilterCarousel } from '../cmps/FilterCarousel.jsx'
import { Modal } from '../cmps/Modal.jsx'

export function StayIndex({ filterByToEdit, setFilterByToEdit }) {
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const dispatch = useDispatch()

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
  return (
    <>
      {appModal && <Modal />}
      <div>
        <section className='category-carousel-container'>
          <section className='category-carousel'>
            <FilterCarousel setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} filterBy={filterBy} />
          </section>
        </section>
        <main>
          {/* <button onClick={onAddStay}>Add Stay ⛐</button> */}
          <StayList filterBy={filterBy} stays={stays} />
          {/* <ul className='stay-list'>
          {stays.map((stay) => (
            <li className='stay-preview' key={stay._id}>
              <h4>{stay.title}</h4>
              <h1>⛐</h1>
              <p>
                Price: <span>${stay.price.toLocaleString()}</span>
              </p>
              <p>
                Owner: <span>{stay.owner && stay.owner.fullname}</span>
              </p>
              {shouldShowActionBtns(stay) && (
                <div>
                  <button
                    onClick={() => {
                      onRemoveStay(stay._id)
                    }}
                  >
                    x
                  </button>
                  <button
                    onClick={() => {
                      onUpdateStay(stay)
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  onAddStayMsg(stay)
                }}
              >
                Add stay msg
              </button>
            </li>
          ))}
        </ul> */}
        </main>
      </div>
    </>

  )
}
