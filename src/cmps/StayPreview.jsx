import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import starSvg from '../assets/img/star.svg'
import heartSvg from '../assets/img/heart.svg'
import { WishlistIcon } from './WishlistIcon'

export function StayPreview({ stay }) {

  const [onWishlist, setonWishlist] = useState(false)
  const navigate = useNavigate()

  function onStay(stayId) {
    return navigate(`/stay/${stayId}`)
  }

  function setWishlist() {
    if (onWishlist) {
      setonWishlist(false)
      return '#00000080'
    } else {
      setonWishlist(true)
      return '#ff385c'
    }
  }

  return (
    <section className='stay-preview' onClick={() => onStay(stay._id)} >

      <WishlistIcon setWishlist={setWishlist} />
      <img className="stay-img" src={stay.imgUrls[0]} />

      <div className='stay-loc'>Herzliya, Israel</div>
      {/* <div className='stay-loc'>{stay.loc.city}, {stay.loc.country}</div> */}
      <div className="stay-rating">
        <img src={starSvg} />5.0
      </div>
      <p className='stay-distance'>11,855 km away from</p>
      <p className='stay-date'>Oct 24-27</p>

      <div className='stay-price'>$6,084 <span>total</span></div>
      {/* <div className='stay-price'>${stay.price} <span>total</span></div> */}

    </section>
  )
}
