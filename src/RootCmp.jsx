import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { StayDetails } from './pages/StayDetails'
import { StayIndex } from './pages/StayIndex'
import { StayEdit } from './pages/StayEdit'

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
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
