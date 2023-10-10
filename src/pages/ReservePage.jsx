
import { Link, useNavigate, useParams } from "react-router-dom"
import arrowLeftSvg from '../assets/img/arrow-left.svg'

export function ReservePage() {

    return (

        <section>

            <article>

                <section>
                    <img src={arrowLeftSvg} alt="" />
                </section>


                <section>
                    <h2>Request to book</h2>
                </section>

            </article>



            <article className="flex space-between">

                <section>

                </section>

                <section>

            </section>

            </article>

        </section>
    )
}