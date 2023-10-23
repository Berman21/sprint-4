
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { stayService } from "../services/stay.service.local.js"

import arrowLeftSvg from '../assets/img/arrow-left.svg'
import starSvg from '../assets/img/star.svg'
import { AirbnbBtn } from '../cmps/AirbnbBtn'

export function ReservePage() {

    const { stayId } = useParams()
    const [currStay, setCurrStay] = useState(null)
    const navigate = useNavigate()

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

    if (!currStay) return <h4>loading...</h4>
    return (

        <section className="reserve-container">

            <div className="reserve-header">
                <button onClick={onPrevPage}>
                    <img  src={arrowLeftSvg} alt="" />
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
                            <p>1 guest</p>
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
                            <p>5.0 <span>(1 reviews)</span></p>
                        </div>

                    </article>
                </div>

                <div className="price-details border-bottom">
                    <h1>Price details</h1>
                    <article className="price-calc flex space-between">
                        <span>₪{currStay.price} x 2 nights</span>
                        <span>₪{new Intl.NumberFormat('he-IL').format(currStay.price * 2)}</span>
                    </article>
                    <article className="price-calc flex space-between">
                        <span>Service fee</span>
                        <span>₪220</span>
                    </article>
                </div>

                <div className="total-price">
                    <article className="price-calc flex space-between">
                        <span>Total (NIS)</span>
                        <span>₪{new Intl.NumberFormat('he-IL').format((currStay.price * 2) + 220)}</span>
                    </article>
                </div>
            </section>

            <AirbnbBtn txt={'Confirm and pay'} />

        </section >
    )
}