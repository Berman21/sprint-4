import { useNavigate } from 'react-router-dom'
import { Fragment, useState } from 'react'

import starSvg from '../assets/img/star.svg'
import { WishlistIcon } from './WishlistIcon'
import { PreviewCarousel } from './PreviewCarousel'

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

      <section className='preview-card'>

        <section className='wishlist-btn-container'>
          <PreviewCarousel stay={stay} />
          <button className='wishlist-icon-btn'>
            <WishlistIcon onWishlistIcon={onWishlistIcon} setClr={setClr} className='preview-wishlist-icon' />
          </button>
        </section>

        <article className='stay-preview' onClick={() => onStay(stay._id)} >

          <div className='stay-loc'>{stay.loc.city}, {stay.loc.country}</div>

          <div className='stay-rating'><img src={starSvg} />{stay.rating}</div>
          <p className='stay-distance'>13 miles to Ramat Gan National Park</p>
          <p className='stay-date'>Oct 6-11 · Individual Host </p>

          <div className='stay-price'>${stay.price} <span>night</span></div>

        </article>
      </section>
    </Fragment>
  )
}
