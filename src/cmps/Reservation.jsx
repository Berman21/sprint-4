import starSvg from '../assets/img/star.svg'
import arrowDownSvg from '../assets/img/arrow-down.svg'

export function Reservation({ stay, onReserve }) {


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

                        <div className='flex space-between'>
                            <div className='guest'>
                                <div>GUESTS</div>
                                <div>guests</div>
                            </div>
                            <div><img src={arrowDownSvg} alt="" /></div>
                        </div>
                    </div>


                    <div className='btn-reserve' onClick={() => onReserve(stay._id)}>
                        Reserve
                    </div>
                </div>

                <div className="reservation-notice">
                    You won't be charged yet
                </div>

                <div className="reservation-pricing">
                    <div></div>
                    <div>{stay.price}x{ }</div>
                    <div className='flex space-between'>
                        <div>Total</div>
                        <div>₪555</div>
                    </div>
                </div>

            </div>
        </div>

    )
}