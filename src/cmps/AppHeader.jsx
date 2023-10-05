import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { StayFilter } from './StayFilter'
import { SET_FILTER_BY } from '../store/stay.reducer'
import { useState } from 'react'
import { DesktopHeader } from './DesktopHeader'

export function AppHeader() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.user)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  return (
    <DesktopHeader onSetFilter={onSetFilter} />
    //     {/* <div className='search-bar'>
    //         <StayFilter filterBy={filterBy} onSetFilter={onSetFilter} />
    //       </div> */}

    //     {/* <nav>
    //               // {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}

    //     {/* {user &&
    // //                   <span className="user-info">
    // //                       <Link to={`user/${user._id}`}>
    // //                           {user.imgUrl && <img src={user.imgUrl} />}
    // //                           {user.fullname}
    // //                       </Link>
    // //                       <span className="score">{user.score?.toLocaleString()}</span>
    // //                       <button onClick={onLogout}>Logout</button>
    // //                   </span>
    // //               }
    // //               {!user &&
    // //                   <section className="user-info">
    // //                       <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    // //                   </section>
    // //               } */}
    //     {/* </nav> */}
  )
}
