import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

import starSvg from '../assets/img/star.svg'

export function StayPreview({ stay }) {

  const navigate = useNavigate()

  function onStay(stayId) {
    return navigate(`/stay/${stayId}`)
  }

  return (
    <section className='stay-preview' onClick={() => onStay(stay._id)} >
      <img className="stay-img" src={stay.imgUrls[0]} />
      <div className='stay-loc'>Herzliya, Isrrael</div>
      {/* <div className='stay-loc'>{stay.loc.city}, {stay.loc.country}</div> */}
      <div className="stay-rating">
        <img src={starSvg} />5
      </div>
      <p className='stay-distance'>11,855 km away from</p>
      <p className='stay-date'>Oct 24-27</p>
      {/* <div className='stay-price'>${stay.price} <span>total</span></div> */}
      <div className='stay-price'>$6,084 <span>total</span></div>
    </section>
  )
}
