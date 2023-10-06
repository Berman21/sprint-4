import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'
import { StayEdit } from './pages/StayEdit'
import { ReservePage } from './pages/ReservePage'

export function RootCmp() {
  return (
    <div className='app-container'>
      <AppHeader />
      <main>
        <Routes>
          <Route path='/' element={<StayIndex />} />
          <Route path='user/:id' element={<UserDetails />} />
          <Route path='stay/:stayId' element={<StayDetails />} />
          <Route path="/stay/edit" element={<StayEdit />} />
          <Route path="/stay/reserve" element={<ReservePage />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
