import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { orderService } from "../services/order.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"

import { loadOrders, removeOrder, updateOrder } from '../store/order.actions.js' //REMOVE AFTER MAKING ORDER INDEX
import { loadStays, removeStay, updateStay } from '../store/stay.actions.js' //REMOVE AFTER MAKING ORDER INDEX

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
                    <div key={index}>
                        <img src={imgUrl} alt="" />
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

                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, neque quae. Veritatis debitis dolorem possimus magnam vitae. Impedit dicta incidunt cumque. Delectus, vitae natus impedit earum nobis qui nihil alias!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam assumenda dolor minima, in maxime magni optio! Architecto, aut ullam. Cum placeat id, explicabo quod exercitationem asperiores corrupti perferendis deleniti natus!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint asperiores illo repudiandae magnam. Mollitia, consequuntur deserunt! A alias hic suscipit corporis sint illum odio, quidem laboriosam nam ipsa magnam itaque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita modi ipsam delectus aperiam nostrum, iste itaque quam nemo, neque molestias quo tenetur deleniti rerum fuga esse autem, sunt placeat atque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et magni expedita eligendi inventore quibusdam, optio enim, reprehenderit eum aut, veritatis nesciunt? Tenetur laudantium perferendis harum, iusto sed doloremque voluptates necessitatibus?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, neque quae. Veritatis debitis dolorem possimus magnam vitae. Impedit dicta incidunt cumque. Delectus, vitae natus impedit earum nobis qui nihil alias!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam assumenda dolor minima, in maxime magni optio! Architecto, aut ullam. Cum placeat id, explicabo quod exercitationem asperiores corrupti perferendis deleniti natus!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint asperiores illo repudiandae magnam. Mollitia, consequuntur deserunt! A alias hic suscipit corporis sint illum odio, quidem laboriosam nam ipsa magnam itaque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita modi ipsam delectus aperiam nostrum, iste itaque quam nemo, neque molestias quo tenetur deleniti rerum fuga esse autem, sunt placeat atque.
                        Lorem ipsum do
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, neque quae. Veritatis debitis dolorem possimus magnam vitae. Impedit dicta incidunt cumque. Delectus, vitae natus impedit earum nobis qui nihil alias!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam assumenda dolor minima, in maxime magni optio! Architecto, aut ullam. Cum placeat id, explicabo quod exercitationem asperiores corrupti perferendis deleniti natus!
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint asperiores illo repudiandae magnam. Mollitia, consequuntur deserunt! A alias hic suscipit corporis sint illum odio, quidem laboriosam nam ipsa magnam itaque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita modi ipsam delectus aperiam nostrum, iste itaque quam nemo, neque molestias quo tenetur deleniti rerum fuga esse autem, sunt placeat atque.
                        Lorem ipsum do
                    </div>
                    <button onClick={() => onRemove(stay._id)}>remove stay</button>
                    <Link to="/stay/edit">edit stay</Link>
                </div>

                <div className="reservation-section">
                    <div className="reservation-container">

                        <div className="reservation-details">

                            <div className="flex space-between">
                                <div>
                                    <span>{stay.price}</span>
                                    <span> night</span>
                                </div>

                                <div>
                                    <span>{stay.score || 4}</span>
                                    <span>{stay.reviews.length}</span>
                                </div>
                            </div>

                            <div className="reservation-selection">
                                <div className="flex">
                                    <div>checkin</div>
                                    <div>checkout</div>
                                </div>

                                <div>guests</div>
                            </div>


                            <div>
                                <button onClick={() => onReserve(stay._id)}>reserve</button>
                            </div>
                        </div>

                        <div className="reservation-notice">

                        </div>

                        <div className="reservation-pricing">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                    </div>
                </div>
            </div>

            <section>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat nemo a neque inventore. Laudantium explicabo asperiores aut voluptates nesciunt, dolorem impedit dolores error illum vel temporibus repellendus, sint deleniti quis.










            </section>

        </section>
    )
}