import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'
import { ReservePage } from './pages/ReservePage'
import { useDispatch, useSelector } from 'react-redux'
import { store } from './store/store'
import { CLOSE_EXPANDED_HEADER, REMOVE_FOCUSED_MODAL } from './store/system.reducer'
import { Dashboard } from './cmps/Dashboard'

export function RootCmp() {
  const isFocusedModal = useSelector((storeState) => storeState.systemModule.isFocusedModal)
  const dispatch = useDispatch()

  function closeBackground(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    dispatch({ type: CLOSE_EXPANDED_HEADER })
    dispatch({ type: REMOVE_FOCUSED_MODAL })
  }

  return (
    <>
      {isFocusedModal && <div className='gray-viewport' onClick={(ev) => closeBackground(ev)}></div>}
      <div className='app-container'>
        <AppHeader />
        <main className='main-app'>
          <Routes>
            <Route path='/' element={<StayIndex />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='stay/:stayId' element={<StayDetails />} />
            <Route path='/stay/:stayId/reserve' element={<ReservePage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
