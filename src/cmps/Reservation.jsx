import React from 'react'
import { useState } from "react"
import { useSelector } from 'react-redux'
import { updateOrder } from '../store/order.actions'

import starSvg from '../assets/img/star.svg'
import arrowDownSvg from '../assets/img/arrow-down.svg'
import arrowUpSvg from '../assets/img/arrow-up.svg'
import { AirbnbBtn } from './AirbnbBtn'
import { StayGusts } from './StayGuests'
import { StayDate } from './StayDate'

export function Reservation({ stay, onReserve }) {

    const [date,setDate] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [dateSelection, setDateSelection] = useState(false)
    const order = useSelector(store => store.orderModule.order)

    function onOpenModal() {
        setIsOpen(!isOpen)
    }

    function onSelectDate() {
        setDateSelection(!dateSelection)
    }

    function onSetDate(date){
        console.log(date);
        setDate(date)
    }

    function convertDateFormat(inputDate) {
        const dateObj = new Date(inputDate);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are 0-based
        const year = dateObj.getFullYear();
      
        return `${day}/${month}/${year}`;
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
                            <span>{stay.score || '5.0'} •</span>
                            <span>{stay.reviews.length} reviews</span>
                        </div>
                    </div>

                    <div className="reservation-selection">
                        <div className="date">
                            <div className='check-in' onClick={() => onSelectDate()}>
                                <div>CHECK IN</div>
                                <div>21/12/21</div>
                            </div>
                            <div className='check-out' onClick={() => onSelectDate()}>
                                <div>CHECK OUT</div>
                                <div>23/12/21</div>
                            </div>
                        </div>

                        <div className='guest-container flex space-between' onClick={() => onOpenModal()}>
                            <div className='guest'>
                                <div>GUESTS</div>
                                <div>1 guests</div>
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
                            <StayDate onSetDate={onSetDate}/>
                        </div>}
                    <AirbnbBtn id={stay._id} txt={'Reserve'} />

                </div>

                <div className="reservation-notice">
                    You won't be charged yet
                </div>

                <div className='summery flex space-between'>
                    <span>₪{stay.price} x 2 nights</span>
                    <span>₪{new Intl.NumberFormat('he-IL').format(stay.price * 2)}</span>
                </div>

                <div className='total flex space-between'>
                    <div>Total</div>
                    <div>₪{new Intl.NumberFormat('he-IL').format(stay.price * 2)}</div>
                </div>

            </div>
        </div>
    )
}