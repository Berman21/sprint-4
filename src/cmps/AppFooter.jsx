import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { removeFromStayt, checkout } from '../store/stay.actions'
import { UserMsg } from './UserMsg.jsx'

export function AppFooter() {
  const [isStaytShown, setIsStaytShown] = useState(false)
  const stayt = useSelector((storeState) => storeState.stayModule.stayt)
  const count = useSelector((storeState) => storeState.userModule.count)
  const staytTotal = stayt.reduce((acc, stay) => acc + stay.price, 0)

  async function onCheckout() {
    try {
      const score = await checkout(staytTotal)
      showSuccessMsg(`Charged, your new score: ${score.toLocaleString()}`)
    } catch (err) {
      showErrorMsg('Cannot checkout')
    }
  }

  return (
    <footer className='app-footer'>
      <p>coffeerights - count: {count}</p>
      {stayt.length > 0 && (
        <h5>
          <span>{stayt.length}</span> Products in your Stayt
          <button
            className='btn-link'
            onClick={(ev) => {
              ev.preventDefault()
              setIsStaytShown(!isStaytShown)
            }}
          >
            ({isStaytShown ? 'hide' : 'show'})
          </button>
        </h5>
      )}

      {isStaytShown && stayt.length > 0 && (
        <section className='stayt'>
          <h5>Your Stayt</h5>
          <ul>
            {stayt.map((stay, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    removeFromStayt(stay._id)
                  }}
                >
                  x
                </button>
                {stay.vendor}
              </li>
            ))}
          </ul>
          <p>Total: ${staytTotal.toLocaleString()} </p>
          <button onClick={onCheckout}>Checkout</button>
        </section>
      )}
      <UserMsg />
    </footer>
  )
}
