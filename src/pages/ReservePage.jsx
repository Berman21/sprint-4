
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { stayService } from "../services/stay.service.js"
import { socketService, SOCKET_EMIT_ADD_ORDER } from "../services/socket.service.js"

import arrowLeftSvg from '../assets/img/arrow-left.svg'
import starSvg from '../assets/img/star.svg'
import { AirbnbBtn } from '../cmps/AirbnbBtn'
import { updateOrder } from "../store/order.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useDispatch, useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"
import { store } from "../store/store.js"

export function ReservePage() {
    const { stayId } = useParams()
    const [currStay, setCurrStay] = useState(null)
    const navigate = useNavigate()

    const user = useSelector((storeState) => storeState.userModule.user)
    let order = useSelector(store => store.orderModule.order)

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            if (!stay) return navigate(`/stay/${stayId}`)
            setCurrStay(stay)
        } catch (err) {
            console.log('Had issues loading stay', err)
        }
    }

    function onPrevPage() {
        return navigate(`/stay/${stayId}`)
    }

    function onReserve() {
        const { _id, name, price, imgUrls, } = currStay

        const hostFullname = currStay.host.fullname
        const { country, city } = currStay.loc
        order = { ...order, stay: { _id, name, price, imgUrls, hostFullname, country, city } }
        order.hostId = currStay.host.id
        order.totalPrice = order.stay.price * utilService.calculateNights(order.startDate, order.endDate)
        onAddOrder(order)
    }

    async function onAddOrder(order) {
        try {
            const savedOrder = await updateOrder(order)
            showSuccessMsg(`Order added (id: ${savedOrder._id})`)
            // socketService.emit(SOCKET_EMIT_ADD_ORDER, order)
            navigate('/')
        } catch (err) {
            console.error('Cannot add order', err)
            showErrorMsg('Cannot add order')
        }
    }

    if (!currStay) return <h4>loading...</h4>
    return (

        <section className="reserve-container">

            <div className="reserve-header">
                <button onClick={onPrevPage}>
                    <img src={arrowLeftSvg} alt="" />
                </button>

                <h1>Confirm and pay</h1>
            </div>

            {/* <section className="mid-section"> */}
            <section>

                <div className="trip-details border-bottom">
                    <h3>Your trip</h3>
                    <div className="flex space-between">
                        <article>
                            <p>Dates</p>
                            <p>21-23 Dec 2023</p>
                        </article>
                        <button>Edit</button>
                    </div>

                    <div className="flex space-between">
                        <article>
                            <p>Guests</p>
                            <p>{order.guests.adults + order.guests.children + order.guests.infants} {order.guests.adults + order.guests.children + order.guests.infants > 1 ? 'guests' : 'guest'}</p>
                        </article>
                        <button>Edit</button>
                    </div>
                </div>

            </section>

            <section className="summary-card card">
                <div className="summary-stay border-bottom">
                    <img className="stay-img" src={currStay.imgUrls[0]} />
                    <article>
                        <p>Cycladic home</p>
                        <p>Rising Sun Villa, near Naousa and the beach, Paros home</p>

                        <div className='rating'>
                            <img className="star-img" src={starSvg} alt="" />
                            <p>{currStay.rating} <span>(1 reviews)</span></p>
                        </div>

                    </article>
                </div>

                <div className="price-details border-bottom">
                    <h1>Price details</h1>
                    <article className="price-calc flex space-between">
                        <span>${currStay.price} x {utilService.calculateNights(order.startDate, order.endDate)} nights</span>
                        <span>${new Intl.NumberFormat('he-IL').format(currStay.price * utilService.calculateNights(order.startDate, order.endDate))}</span>
                    </article>
                    <article className="price-calc flex space-between">
                        <span>Service fee</span>
                        <span>${new Intl.NumberFormat('he-IL').format(currStay.price * 0.2)}</span>
                    </article>
                </div>

                <div className="total-price">
                    <article className="price-calc flex space-between">
                        <span>Total (NIS)</span>
                        <span>${new Intl.NumberFormat('he-IL').format(currStay.price * utilService.calculateNights(order.startDate, order.endDate) + currStay.price * 0.2)}</span>
                    </article>
                </div>
            </section>

            <AirbnbBtn txt={'Confirm and pay'} callBackFunction={onReserve} />


        </section >
    )
}