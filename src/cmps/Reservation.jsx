import React from 'react'

import { Link, useNavigate, useParams } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"

import starSvg from '../assets/img/star.svg'
import arrowDownSvg from '../assets/img/arrow-down.svg'
import arrowUpSvg from '../assets/img/arrow-up.svg'

export function Reservation({ stay, onReserve }) {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    
    function onOpenModal() {
        setIsOpen(!isOpen)
    }

    function onReservePage(){
        return navigate(`/stay/reserve`)
    }


    return (
        <div className="reservation-section">
            <div className="reservation-container">

                <div className="reservation-details">

                    <div className="reservation-header flex space-between">
                        <div className='price'>
                            <span>₪{stay.price}</span>
                            <span> night</span>
                        </div>

                        <div className='rating'>
                            <img src={starSvg} alt="" />
                            <span>{stay.score || 4}•</span>
                            <span>{stay.reviews.length} reviews</span>
                        </div>
                    </div>

                    <div className="reservation-selection">
                        <div className="date">
                            <div className='check-in'>
                                <div>CHECK IN</div>
                                <div>21/12/21</div>
                            </div>
                            <div className='check-out'>
                                <div>CHECK OUT</div>
                                <div>23/12/21</div>
                            </div>
                        </div>

                        <div className='guest-container flex space-between' onClick={() => onOpenModal()}>
                            <div className='guest'>
                                <div>GUESTS</div>
                                <div>guests</div>
                            </div>
                            <div>
                                {!isOpen &&<img src={arrowDownSvg} alt="" />}
                                {isOpen &&<img src={arrowUpSvg} alt="" />}
                            </div>
                        </div>
                    </div>

                    {isOpen && <div className='guest-list flex space-between'>
                        <div>
                            <div>
                                Adults
                            </div>
                            <div>
                                Age 13+
                            </div>
                        </div>

                        <div>
                            <button>-</button>
                            1
                            <button>+</button>
                        </div>
                    </div>}

                    <div className='btn-reserve' onClick={() => onReservePage()}>
                        Reserve
                    </div>
                </div>

                <div className="reservation-notice">
                    You won't be charged yet
                </div>

                <div className="reservation-pricing">
                    <div className='summery'>{stay.price}x{'Num days'}</div>
                    <div className='total flex space-between'>
                        <div>Total</div>
                        <div>₪555</div>
                    </div>
                </div>

            </div>
        </div>

    )
}