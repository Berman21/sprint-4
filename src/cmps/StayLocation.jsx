import flexible from '../assets/img/flexible.jpg'
import middleEast from '../assets/img/middle-east.jpg'
import portugal from '../assets/img/portugal.jpg'
import unitedStates from '../assets/img/united-states.jpg'
import greece from '../assets/img/greece.jpg'
import southAmerica from '../assets/img/south-america.jpg'

export function StayLocation({ handleItemClick }) {
  return (
    <section className='locations-container'>
      <h3>Search by region</h3>
      <div className='locations'>
        <article className='flexible flex'>
          <button className='regions' onClick={() => handleItemClick('')}>
            <img src={flexible} />
          </button>
          <h5>I'm flexible</h5>
        </article>
        <article className='middle-east flex'>
          <button className='regions' onClick={() => handleItemClick('Middle East')}>
            <img src={middleEast} />
          </button>
          <h5>Middle East</h5>
        </article>
        <article className='italy flex'>
          <button className='regions' onClick={() => handleItemClick('portugal')}>
            <img src={portugal} />
          </button>
          <h5>portugal</h5>
        </article>
        <article className='united-states flex'>
          <button className='regions' onClick={() => handleItemClick('United States')}>
            <img src={unitedStates} />
          </button>
          <h5>United States</h5>
        </article>
        <article className='greece flex'>
          <button className='regions' onClick={() => handleItemClick('Greece')}>
            <img src={greece} />
          </button>
          <h5>Greece</h5>
        </article>
        <article className='south-america flex'>
          <button className='regions' onClick={() => handleItemClick('South America')}>
            <img src={southAmerica} />
          </button>
          <h5>South America</h5>
        </article>
      </div>
    </section>
  )
}
