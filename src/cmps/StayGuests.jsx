import { useSelector, useDispatch } from 'react-redux'

import { updateOrder } from '../store/order.actions'

import plus from '../assets/img/plus.svg'
import minus from '../assets/img/minus.svg'
import { useEffect } from 'react'

export function StayGusts({ width = 326 }) {

  const order = useSelector(store => store.orderModule.order)
  
  useEffect(()=>{

  },[order])
  
  function onAddGuest(type, diff) {
    order.guests[type] += diff
    updateOrder(order)
  }

  return (
    <section className='guests-preview-container'>
      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Adults</h3>
          <p>Ages 13 or above</p>
        </section>

        <section className='guests-counter'>
          <button onClick={() => onAddGuest('adults', -1)}>
            <img src={minus} />
          </button>
          <span>{order.guests.adults}</span>
          <button onClick={() => onAddGuest('adults', 1)}>
            <img src={plus} />
          </button>
        </section>
      </article>

      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Children</h3>
          <p>Ages 2-12</p>
        </section>

        <section className='guests-counter'>
          <button>
            <img src={minus} />
          </button>
          <span>0</span>
          <button>
            <img src={plus} />
          </button>
        </section>
      </article>

      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Infants</h3>
          <p>Under 2</p>
        </section>
        <section className='guests-counter'>
          <button>
            <img src={minus} />
          </button>
          <span>0</span>
          <button>
            <img src={plus} />
          </button>
        </section>
      </article>

      <article className='guests-preview' style={{ width: `${width}px` }}>
        <section className='guests-content'>
          <h3>Pets</h3>
          <p className='pets'>Bringing a service animal?</p>
        </section>
        <section className='guests-counter'>
          <button>
            <img src={minus} />
          </button>
          <span>0</span>
          <button>
            <img src={plus} />
          </button>
        </section>
      </article>
    </section>
  )
}
