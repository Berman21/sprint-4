import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'
import { ReservePage } from './pages/ReservePage'
import { useDispatch, useSelector } from 'react-redux'
import { store } from './store/store'
import { CLOSE_APP_MODAL, CLOSE_EXPANDED_HEADER, REMOVE_FOCUSED_MODAL } from './store/system.reducer'
import { Dashboard } from './cmps/Dashboard'
import { Modal } from './cmps/Modal'
import { TripsPage } from './pages/TripsPage'
import { UserMsg } from './cmps/UserMsg'
import { SOCKET_EVENT_ADD_ORDER, socketService } from './services/socket.service'
import { showSuccessMsg } from './services/event-bus.service'
// const isDashboardPage = window.location.pathname === '/dashboard';

export function RootCmp() {
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const isFocusedModal = useSelector((storeState) => storeState.systemModule.isFocusedModal)
  const [filterByToEdit, setFilterByToEdit] = useState({ country: '', labels: '', ...filterBy })
  const appModal = useSelector((storeState) => storeState.systemModule.appModal)
  const dispatch = useDispatch()

  function closeBackground(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    dispatch({ type: CLOSE_EXPANDED_HEADER })
    dispatch({ type: REMOVE_FOCUSED_MODAL })
    dispatch({ type: CLOSE_APP_MODAL })
  }

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ADD_ORDER, (order) => {
      showSuccessMsg('You got new order')
    })

    // socketService.on('order-status-change', (order) => {
    //   showSuccessMsg('Your order has been Approved!')
    // })

  }, [])


  return (
    <>
      <UserMsg />
      {isFocusedModal && <div className='gray-viewport' onClick={(ev) => closeBackground(ev)}></div>}
      <div className='app-container'>
        {/* {!isDashboardPage && <AppHeader filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />} */}
        <main className='main-app'>
          <Routes>
            <Route path='/' element={<StayIndex filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='stay/:stayId' element={<StayDetails filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />} />
            <Route path='/stay/:stayId/reserve' element={<ReservePage />} />
            <Route path='/trips' element={<TripsPage filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
