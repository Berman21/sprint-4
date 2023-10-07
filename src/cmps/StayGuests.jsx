import plus from '../assets/img/plus.svg'
import minus from '../assets/img/minus.svg'

export function StayGusts() {
  return (
    <section className='guests-preview-container'>
      <article className='guests-preview'>
        <section className='guests-content'>
          <h3>Adults</h3>
          <p>Ages 13 or above</p>
        </section>
      </article>
      <article className='guests-preview'>
        <section className='guests-content'>
          <h3>Children</h3>
          <p>Ages 2-12</p>
        </section>
      </article>
      <article className='guests-preview'>
        <section className='guests-content'>
          <h3>Infants</h3>
          <p>Under 2</p>
        </section>
      </article>
      <article className='guests-preview'>
        <section className='guests-content'>
          <h3>Pets</h3>
          <p className='pets'>Bringing a service animal?</p>
        </section>

        <section className='guests-counter'>
          <button>
            <img src={plus} />
          </button>
        </section>
      </article>
    </section>
  )
}
