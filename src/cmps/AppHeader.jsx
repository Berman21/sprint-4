import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
// import { LoginSignup } from './LoginSignup.jsx'
import { SET_FILTER_BY } from '../store/stay.reducer'
import { DesktopHeader } from './DesktopHeader'
import { UserMsg } from './UserMsg'


export function AppHeader({ filterByToEdit, setFilterByToEdit, setIsModalActive }) {
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
      console.log('signup 2');
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }



  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  return (
    <div className='app-header-container'>
      <UserMsg />
      <DesktopHeader setIsModalActive={setIsModalActive} filterByToEdit={filterByToEdit} setFilterByToEdit={setFilterByToEdit} onSetFilter={onSetFilter} />
      {/* <LoginSignup onLogin={onLogin} onSignup={onSignup} /> */}
    </div>
  )
}
