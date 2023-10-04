import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Fragment, useState } from 'react'


import starSvg from '../assets/img/star.svg'
import heartSvg from '../assets/img/heart.svg'
import { WishlistIcon } from './WishlistIcon'

export function StayPreview({ stay }) {

  const navigate = useNavigate()
  const [setClr, onSetClr] = useState('#00000080')

  function onStay(stayId) {
    return navigate(`/stay/${stayId}`)
  }

  function onWishlistIcon() {
    if (setClr === '#00000080') {
      onSetClr('#ff385c')
    } else {
      onSetClr('#00000080')
    }
  }

  return (
    <Fragment>
      <WishlistIcon onWishlistIcon={onWishlistIcon} setClr={setClr} />
      <section className='stay-preview' onClick={() => onStay(stay._id)} >

        <img className='stay-img' src={stay.imgUrls[0]} />

        <div className='stay-loc'>Herzliya, Israel</div>
        {/* <div className='stay-loc'>{stay.loc.city}, {stay.loc.country}</div> */}

        <div className='stay-rating'><img src={starSvg} />5.0</div>
        <p className='stay-distance'>13 miles to Ramat Gan National Park</p>
        <p className='stay-date'>6-1 Oct Individual Host </p>

        <div className='stay-price'>£1,187 <span>night</span></div>
        {/* <div className='stay-price'>${stay.price} <span>total</span></div> */}

      </section>
    </Fragment>
  )
}
