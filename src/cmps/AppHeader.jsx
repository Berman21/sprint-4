import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { SET_FILTER_BY } from '../store/stay.reducer'
import { DesktopHeader } from './DesktopHeader'

export function AppHeader() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.user)

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
    <div className='app-header-container'>
      <DesktopHeader onSetFilter={onSetFilter} />
      {/* <LoginSignup onLogin={onLogin} onSignup={onSignup} /> */}
    </div>
  )
}
