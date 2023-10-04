import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { orderService } from "../services/order.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"

import { loadOrders, removeOrder, updateOrder } from '../store/order.actions.js' //REMOVE AFTER MAKING ORDER INDEX

import starSvg from '../assets/img/star.svg'
import heartSvg from '../assets/img/heart.svg'

export function StayDetails() {

    const [stay, setStay] = useState(null)
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

    function onReserve(stayId) {
        console.log('onReserve', stayId);
        onAddOrder(stayId)
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
        <section className="detail-container">

            <div className="detail-title">

                <h1>{stay.summary}</h1>

                <div className="flex space-between">

                    <div className="flex">
                        <div className="detail-subtitle">

                            <span>
                                <span>
                                    <span>
                                        (star svg)
                                    </span>
                                    <span>
                                        4
                                    </span>
                                </span>

                                <button>
                                    <span>{stay.reviews.length}</span> reviews
                                </button>

                            </span>

                            <span>•</span>

                            <span>{stay.loc.city},{stay.loc.country}</span>

                            <div className="">
                            </div>
                        </div>
                    </div>



                    <button>
                        (heart svg)
                        Save
                    </button>


                </div>
            </div>

            <div className="detail-gallery">
                {stay.imgUrls.map((imgUrl, index) => (
                    <div>
                        <img src={imgUrl} alt="" key={index} />
                    </div>
                ))}
            </div>

            <div className="mid-section">
                <div className="stay-details">
                    <h2>{stay.type} hosted by {stay.host.fullname}</h2>
                    <div>
                        <span>•</span>
                        {stay.capacity} guests
                        <span>•</span>
                        {stay.capacity / 2} bedrooms
                        <span>•</span>
                        {stay.capacity} beds
                        <span>•</span>
                        {stay.capacity / 2} bathrooms
                    </div>
                </div>

                <div className="reservation-section">
                    <div className="reservation-container">
                        <div>
                            <div>
                                <p><span>{stay.price} night</span></p>
                                <div>
                                    <span>
                                        <div><img src={starSvg} alt="" /></div>
                                        4
                                    </span>
                                    <span>•</span>
                                    <span>20 reviews</span>
                                </div>
                            </div>
                            <button onClick={() => onReserve(stay._id)}>reserve</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}