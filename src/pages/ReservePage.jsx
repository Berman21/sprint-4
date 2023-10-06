import { Link, useNavigate, useParams } from "react-router-dom"







import arrowLeftSvg from '../assets/img/arrow-left.svg'



export function ReservePage() {

    return (

        <section className="reservation-page ">

            <article className="reservation-page-heading flex">

                <section className="return-to-details flex">
                    <img src={arrowLeftSvg} alt="" />
                </section>


                <section>
                    <h2>Request to book</h2>
                </section>

            </article>



            <article className="reservation-details">

                <section>
                    <h2>Your Trip</h2>

                    <article>

                        <section className="flex space-between">
                            <article>Dates</article>
                            <article>21/12-23/12</article>
                        </section>

                        <section className="flex space-between">
                            <article>Guests</article>
                            <article>1 Guest</article>
                        </section>

                    </article>



                    <article></article>

                </section>

                <section>

                </section>

            </article >

        </section >
    )
}