import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SET_MODAL_LOGIN, SET_MODAL_SIGNUP } from '../store/system.reducer'
import { setAppModal } from '../store/system.action'

export function UserModal({ setIsDropdownActive }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  function onOpenModal(ev, modalType) {
    ev.preventDefault()
    ev.stopPropagation()
    setIsDropdownActive(false)
    setAppModal(modalType)
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
          <article className='dropdown-option' onClick={(ev) => onOpenModal(ev, SET_MODAL_LOGIN)}>
            <span>Log in</span>
          </article>
          <article className='dropdown-option' onClick={(ev) => onOpenModal(ev, SET_MODAL_SIGNUP)}>
            <span>Sign up</span>
          </article>
        </>
      )}
    </section>
  )
}