

export function Reservation({stay,onReserve}){


    return(
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

    )
}