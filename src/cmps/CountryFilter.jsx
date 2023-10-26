import location from '../assets/img/location.svg'

export function CountryFilter({ handleItemClick }) {
  return (
    <div className='country-filter-container'>
      <h3>Trending</h3>
      <ul className='country-filter clean-list'>
        <li className='country' onClick={() => handleItemClick('Porto')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Porto, Portugal</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Montreal')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Montreal, Canada</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Barcelona')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Barcelona, Spain</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Berlin')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Berlin, Germany</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Tokyo')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Tokyo, Japan</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Seoul')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Seoul, South Korea</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Bern')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Bern, Switzerland</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Paris')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Paris, France</span>
        </li>
        <li className='country' onClick={() => handleItemClick('Rome')}>
          <div className='location-container'>
            <img src={location} />
          </div>
          <span>Rome, Italy</span>
        </li>
      </ul>
    </div>
  )
}
