import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SET_APP_MODAL_LOGIN } from '../store/system.reducer'
import { setAppModal } from '../store/system.action'

export function UserModal({ setIsDropdownActive }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const appModal = useSelector((storeState) => storeState.userModule.appModal)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onOpenModal(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    setIsDropdownActive(false)
    // dispatch({ type: SET_APP_MODAL_LOGIN })

  }

  function onDashboard() {
    return navigate(`/dashboard`)
  }

  return (
    <section className='dropdown-modal flex'>
      {loggedInUser ? (
        <>
          <Link className='dropdown-option'>
            <span>Trips</span>
          </Link>
          <Link className='dropdown-option'>
            <span>Wishlist</span>
          </Link>
          <Link className='dropdown-option'>
            <span>Dashboard</span>
          </Link>
          <Link className='dropdown-option'>
            <span>Logout</span>
          </Link>
        </>
      ) : (
        <>
          <article className='dropdown-option' onClick={(ev) => onOpenModal(ev)}>
            <span>Log in</span>
          </article>
          <article className='dropdown-option' onClick={(ev) => onOpenModal(ev)}>
            <span>Sign up</span>
          </article>
          <article className='dropdown-option' onClick={() => onDashboard()}>
            <span>Dashboard</span>
          </article>
        </>
      )}
    </section>
  )
}
