
import { Link, useNavigate, useParams } from "react-router-dom"
import arrowLeftSvg from '../assets/img/arrow-left.svg'

export function ReservePage() {

    return (

        <section className="reserve-container">

            <div className="reserve-header">
                <img src={arrowLeftSvg} alt="" />
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

        </section >
    )
}