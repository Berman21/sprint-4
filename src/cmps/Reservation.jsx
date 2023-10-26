import React from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import starSvg from '../assets/img/star.svg'
import arrowDownSvg from '../assets/img/arrow-down.svg'
import arrowUpSvg from '../assets/img/arrow-up.svg'
import { AirbnbBtn } from './AirbnbBtn'
import { StayGusts } from './StayGuests'
import { StayDate } from './StayDate'

export function Reservation({ stay, stayId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [dateSelection, setIsDateOpen] = useState(false)
    const navigate = useNavigate()

    const order = useSelector(store => store.orderModule.order)

    function onOpenModal() {
        setIsOpen(!isOpen)

    }

    function onOpenDateModal() {
        setIsDateOpen(!dateSelection)
    }

    function onReservePage() {
        return navigate(`/stay/${stayId}/reserve`)
    }

    return (
        <div className="reservation-section">
            <div className="reservation-container">

                <div className="reservation-details">

                    <div className="reservation-header flex space-between">
                        <div className='price'>
                            <span>${stay.price}</span>
                            <span> night</span>
                        </div>

                        <div className='rating'>
                            <img src={starSvg} alt="" />
                            <span>{stay.score || '5.0'} •</span>
                            <span>{stay.reviews.length} reviews</span>
                        </div>
                    </div>

                    <div className="reservation-selection">
                        <div className="date">
                            <div className='check-in' onClick={() => onOpenDateModal()}>
                                <div>CHECK IN</div>
                                <div>{order.startDate || 'SELECT'}</div>
                            </div>
                            <div className='check-out' onClick={() => onOpenDateModal()}>
                                <div>CHECK OUT</div>
                                <div>{order.endDate || 'SELECT'}</div>
                            </div>
                        </div>

                        <div className='guest-container flex space-between' onClick={() => onOpenModal()}>
                            <div className='guest'>
                                <div>GUESTS</div>
                                <div>{order.guests.adults + order.guests.children + order.guests.infants} guests</div>
                            </div>
                            <div>
                                {!isOpen && <img src={arrowDownSvg} alt="" />}
                                {isOpen && <img src={arrowUpSvg} alt="" />}
                            </div>
                        </div>
                    </div>

                    {isOpen &&
                        <div className='guest-list'>
                            <StayGusts width={281} />
                        </div>}

                    {dateSelection &&
                        <div className='modal check-out-modal'>
                            <StayDate />
                        </div>}
                    <AirbnbBtn id={stay._id} txt={'Reserve'} callBackFunction={onReservePage} />

                </div>

                <div className="reservation-notice">
                    You won't be charged yet
                </div>

                <div className='summery flex space-between'>
                    <span>${stay.price} x 2 nights</span>
                    <span>${new Intl.NumberFormat('he-IL').format(stay.price * 2)}</span>
                </div>

                <div className='total flex space-between'>
                    <div>Total</div>
                    <div>${new Intl.NumberFormat('he-IL').format(stay.price * 2)}</div>
                </div>

            </div>
        </div>
    )
}