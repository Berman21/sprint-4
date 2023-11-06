import { useSelector } from "react-redux"
import { orderService } from "../services/order.service"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { DashboardNav } from "../cmps/DashboardNav"
import userIcon from '../assets/img/user.svg'


export function TripsPage() {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
        fetchOrderByBuyer()
    }, [loggedInUser])

    async function fetchOrderByBuyer() {
        try {
            const userOrders = await orderService.getOrderByBuyer(loggedInUser._id)
            console.log('userorders', userOrders);
            setOrders(userOrders)
        }
        catch (err) {
            console.log('Error fetching user', err);
        }
    }

    return (

        <section className="trips-page-container">
            {/* <div>{orders && orders.map((order, idx) => (
                <div key={idx}>{order.buyer.fullname}</div>
            ))}</div> */}
            <section className="trips-header">
                <h1>Trips</h1>
                <img src={userIcon} />

            </section>
            <DashboardNav />
            <section className="trips-container">

                {orders && orders.map((order, idx) => (
                    <div key={idx} className="blog-container">


                        <div className="blog-header">
                            <div className="blog-cover">
                                <img src={order.stay.imgUrls[0]} />
                                <div className="blog-author">
                                    {/* <h3>{order.buyer.fullname}</h3> */}
                                </div>
                            </div>
                        </div>

                        <div className="blog-body">
                            <div className="blog-title">
                                <h1>{order.stay.name}</h1>
                            </div>
                            <div className="blog-summary">

                                <li>{order.stay.roomType} hosted by {order.stay.hostFullname}</li>
                                <li>{order.stay.city}, {order.stay.country}</li>
                            </div>
                            <div className="blog-tags">
                                <ul>
                                    <li>${order.totalPrice}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="blog-footer">
                            <ul>
                                <li>{order.startDate} - {order.endDate}</li>
                                <li className={order.status}>{order.status}</li>


                                {/* <li className="comments"><a href="#"><svg className="icon-bubble"><use xlink: href="#icon-bubble"></use></svg><span className="numero">4</span></a></li> */}
                                {/* <li className="shares"><a href="#"><svg className="icon-star"><use xlink: href="#icon-star"></use></svg><span className="numero">1</span></a></li> */}
                            </ul>
                        </div>

                    </div>
                ))}
            </section>


        </section>
    )
}
