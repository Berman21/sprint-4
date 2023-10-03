import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"

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

    if (!stay) return <div>loading..</div>

    return (
        <section className="detail-container">
            <div className="detail-title">

                <h1>{stay.summary}</h1>

                <div className="detail-subtitle flex">

                    <div className="flex">
                        <img src={starSvg} alt="" />
                        <span>4</span>
                    </div>

                    <span>•</span>
                    {stay.reviews.length} reviews
                    <span>•</span>
                    {stay.loc.city},{stay.loc.country}
                    <span>•</span>

                    <div className="flex">
                        <img src={heartSvg} alt="" />
                        Save
                    </div>
                    
                </div>
            </div>

            <div className="detail-gallery">
                {stay.imgUrls.map((imgUrl) => (
                    <img src={imgUrl} alt="" key={imgUrl} />
                ))}
            </div>

            <div className="mid-section">
                <div className="stay-details">
                <h2>{stay.type} hosted by {stay.host.fullname}</h2>
                    <div>
                    <span>•</span>
                    {stay.capacity} guests
                    <span>•</span>
                    {stay.capacity/2} bedrooms
                    <span>•</span>
                    {stay.capacity} beds
                    <span>•</span>
                    {stay.capacity/2} bathrooms
                    </div>
                </div>

                <div className="reservation-section">
                    <div className="reservation-container">

                    </div>
                </div>
            </div>

        </section>
    )
}