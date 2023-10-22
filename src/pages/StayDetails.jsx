import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service.local.js'
import { orderService } from '../services/order.service.local.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { useDispatch, useSelector } from 'react-redux'

import userIcon from '../assets/img/user.svg'
import checkInIcon from '../assets/img/self-check-in.svg'
import superhostIcon from '../assets/img/superhost.svg'
import cancellationIcon from '../assets/img/free-cancellation.svg'

import { Reservation } from '../cmps/Reservation.jsx'

import { loadOrders, removeOrder, updateOrder } from '../store/order.actions.js' //REMOVE AFTER MAKING ORDER INDEX
import { loadStays, removeStay, updateStay } from '../store/stay.actions.js' //REMOVE AFTER MAKING ORDER INDEX

import starSvg from '../assets/img/star.svg'
import heartSvg from '../assets/img/heart.svg'
import { WishlistIcon } from '../cmps/WishlistIcon.jsx'
import { CLOSE_EXPANDED_HEADER, CLOSE_EXPANDED_HEADER_MODAL } from '../store/system.reducer.js'

export function StayDetails() {
  const dispatch = useDispatch()
  useEffect(() => {
    function handleScroll() {
      dispatch({ type: CLOSE_EXPANDED_HEADER })
      dispatch({ type: CLOSE_EXPANDED_HEADER_MODAL })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [stay, setStay] = useState(null)
  const [clr, setClr] = useState('#00000080')
  const [btnTxt, setBtnTxt] = useState('Save')
  const { stayId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadStay()
  }, [stayId])

  async function loadStay() {
    try {
      const stay = await stayService.getById(stayId)
      setStay(stay)
    } catch (err) {
      console.log('Had issues in stay details', err)
      showErrorMsg('Cannot load stay')
      navigate('/stay')
    }
  }

  function onWishlistIcon() {
    if (clr === '#00000080') {
      setClr('#ff385c')
      setBtnTxt('Saved')
    } else {
      setClr('#00000080')
      setBtnTxt('Save')
    }
  }

  function onReserve(stayId) {
    console.log('onReserve', stayId)
    onAddOrder(stayId)
  }

  async function onRemove(stayId) {
    try {
      await removeStay(stayId)
      navigate('/')
    } catch {
      console.log('Had issues in stay details', err)
      showErrorMsg('Cannot remove stay')
    }
  }

  async function onAddOrder(stayId) {
    try {
      const orderToSave = orderService.getEmptyOrder()
      orderToSave.stay._id = stayId
      const savedOrder = await updateOrder(orderToSave)
      showSuccessMsg(`Order added (id: ${savedOrder._id})`)
    } catch (err) {
      console.error('Cannot add order', err)
      showErrorMsg('Cannot add order')
    }
  }

  if (!stay) return <div>loading..</div>

  return (
    <section className='detail-container'>
      <section className='detail-title'>
        <h1>{stay.name}</h1>

        <div className='flex space-between'>
          <div className='detail-subtitle'>
            <div className='stay-rating'>
              <img src={starSvg} />
              5.0
            </div>
            <span>•</span>
            <p className='stay-review'>{stay.reviews.length} reviews</p>
            <span>•</span>
            <p className='stay-loc'>
              {stay.loc.city}, {stay.loc.country}
            </p>
          </div>

          <button onClick={() => onWishlistIcon()}>
            <WishlistIcon onWishlistIcon={onWishlistIcon} setClr={clr} className='detail-wishlist-icon' />
            {btnTxt}
          </button>
        </div>
      </section>

      <div className='detail-gallery'>
        {stay.imgUrls.map((imgUrl, idx) => (
          <img key={idx} src={imgUrl} alt='' />
        ))}
      </div>

      <section className='mid-section'>
        <div className='stay-details'>
          <div className='about-host border-bottom'>
            <h2>
              Entire {stay.type} hosted by {stay.host.fullname}
            </h2>

            <article>
              <p>{stay.capacity} guests</p>
              <span>•</span>
              <p>2 bedrooms</p>
              <span>•</span>
              <p>3 beds</p>
              <span>•</span>
              <p>2 baths</p>
            </article>

            <img className='user-icon' src={userIcon} />
          </div>

          <div className='stay-highlights border-bottom'>
            <article>
              <img src={checkInIcon} />
              <h4>Self check-in</h4>
              <p>Check yourself in with the lockbox.</p>
            </article>

            <article>
              <h4>{stay.host.fullname} is a Superhost</h4>
              <p>Superhosts are experienced, highly rated Hosts.</p>
              <img src={superhostIcon} />
            </article>

            <article>
              <img src={cancellationIcon} />
              <h4 className='one-rows'>Free cancellation before Nov 24.</h4>
            </article>
          </div>

          <div className='stay-description border-bottom'>
            <p>{stay.summary}</p>

            {/* <h3>The space</h3>
                        <p>The space is for the private upper two floors of the house. The owner stays in a separate...</p> */}

            <div>
              <button>Show more</button>
              <img className='self-check-in' src='/src/assets/img/arrow-right.svg' />
            </div>
          </div>

          <section className='stay-amenities border-bottom'>
            <h2>What this place offers</h2>

            <div>
              {stay.amenities.map((amenity, idx) => (
                <article key={idx}>
                  <img className='self-check-in' src={`/src/assets/img/${amenity}.svg`} />
                  <p>{amenity}</p>
                </article>
              ))}
            </div>
          </section>

          {/* <button onClick={() => onRemove(stay._id)}>remove stay</button>
                    <Link to="/stay/edit">edit stay</Link> */}
        </div>

        <Reservation stay={stay} onReserve={onReserve} />
      </section>

      {/* <section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
            </section> */}
    </section>
  )
}
