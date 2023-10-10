import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'
import { StayEdit } from './pages/StayEdit'
import { ReservePage } from './pages/ReservePage'
import { useDispatch, useSelector } from 'react-redux'
import { store } from './store/store'
import { CLOSE_EXPANDED_HEADER, REMOVE_FOCUSED_MODAL } from './store/system.reducer'

export function RootCmp() {
  const isFocusedModal = useSelector((storeState) => storeState.systemModule.isFocusedModal)
  const dispatch = useDispatch()

  function closeBackground(ev) {
    ev.preventDefault()
    ev.storePropagation()
    dispatch({ type: CLOSE_EXPANDED_HEADER })
    dispatch({ type: REMOVE_FOCUSED_MODAL })
  }

  return (
    <>
      {isFocusedModal && <div className='gray-viewport' onClick={(ev) => closeBackground(ev)}></div>}
      <div className='app-container'>
        <AppHeader />
        <main>
          <Routes>
            <Route path='/' element={<StayIndex />} />
            <Route path='user/:id' element={<UserDetails />} />
            <Route path='stay/:stayId' element={<StayDetails />} />
            <Route path='/stay/edit' element={<StayEdit />} />
            <Route path='/stay/reserve' element={<ReservePage />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </>
  )
}
