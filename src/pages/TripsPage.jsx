import { useSelector } from "react-redux"
import { orderService } from "../services/order.service"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

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

        <section className="trips-container">
            {/* <div>{orders && orders.map((order, idx) => (
                <div key={idx}>{order.buyer.fullname}</div>
            ))}</div> */}


            {orders && orders.map((order, idx) => (
                <div className="blog-container">


                    <div className="blog-header">
                        <div className="blog-cover">
                            <img src={order.stay.imgUrls[0]} />
                            <div className="blog-author">
                                <h3>{order.buyer.fullname}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="blog-body">
                        <div className="blog-title">
                            <h1><a href="#">{order.stay.name}</a></h1>
                        </div>
                        <div className="blog-summary">
                            {/* <li>Host: {order.host.fullname}</li> */}
                        </div>
                        <div className="blog-tags">
                            <ul>
                                <li><a href="#">{order.status}</a></li>
                                <li><a href="#">${order.totalPrice}</a></li>
                                <li><a href="https://twitter.com/russbeye">twitter</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="blog-footer">
                        <ul>
                            <li><a href="#">{order.startDate} - {order.endDate}</a></li>

                            {/* <li className="comments"><a href="#"><svg className="icon-bubble"><use xlink: href="#icon-bubble"></use></svg><span className="numero">4</span></a></li> */}
                            {/* <li className="shares"><a href="#"><svg className="icon-star"><use xlink: href="#icon-star"></use></svg><span className="numero">1</span></a></li> */}
                        </ul>
                    </div>

                </div>
            ))}



        </section>
    )
}
